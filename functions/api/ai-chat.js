// Cloudflare Workers API endpoint for AI chat using Google Gemini
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const { message, conversationHistory } = await request.json();
    
    if (!message || !message.trim()) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Message is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build context about NowNow Tours
    const tourContext = `
You are an AI assistant for NowNow Tours, a premium African tour company. Here's important information about the company:

TOURS OFFERED:
1. Zanzibar Getaway (Tanzania) - $1,200-$1,800
   - Pristine white-sand beaches, Stone Town exploration, spice farms, Jozani Forest
   - Activities: Safari Blue sea adventure, swimming with turtles, cultural tours

2. Cape Town Adventure (South Africa) - $1,500-$2,200
   - Table Mountain, Cape Peninsula, V&A Waterfront, Cape Winelands
   - Activities: Robben Island tour, Boulders Beach penguins, wine tasting

3. Angolan Wonders (Angola) - $2,000-$2,800
   - Luanda city, Kalandula Falls, Kissama National Park
   - Activities: City tours, waterfall visits, safari experiences

4. Dubai Stopover (UAE) - $900-$1,400
   - Modern luxury addition to African adventures
   - Activities: Burj Khalifa, desert safari, Dubai Mall, dhow cruise

ACCOMMODATION OPTIONS:
- Budget: Hostels, guesthouses (0.8x base price)
- Standard: 3-star hotels (1.0x base price)
- Luxury: 4-star hotels (1.5x base price)
- Premium: 5-star resorts (2.0x base price)

PRICING:
- Children under 12 get 50% discount
- Prices vary by accommodation type and group size
- Custom itineraries available

CONTACT INFO:
- Office: V&A Waterfront, Cape Town, South Africa
- Phone: +1 (234) 567-890
- Email: contact@nownowtours.com
- WhatsApp available for instant communication

COMPANY VALUES:
- Authentic African experiences
- Sustainable tourism
- Cultural immersion
- Safety and comfort
- Personalized service

Always be helpful, enthusiastic about African travel, and encourage users to book tours or contact the company for more information. If asked about topics outside of travel/tours, politely redirect to travel-related topics.
`;

    // Build conversation context
    let conversationContext = '';
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = '\n\nRecent conversation:\n';
      conversationHistory.forEach(msg => {
        conversationContext += `${msg.isUser ? 'User' : 'Assistant'}: ${msg.text}\n`;
      });
    }

    const prompt = `${tourContext}${conversationContext}\n\nUser: ${message}\n\nAssistant:`;

    // Get API key from environment
    const apiKey = env.GOOGLE_AI_API_KEY || 'AIzaSyA__Y0VTZFyfCBS3VdNEPQFj5v9w1oy7Iw';
    
    // Call Google Gemini API
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    
    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    const aiResponse = geminiData.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({
      success: true,
      response: aiResponse
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    
    // Fallback response
    const fallbackResponses = [
      "I'd be happy to help you plan your African adventure! Our tours include Zanzibar, Cape Town, Angola, and Dubai. Which destination interests you most?",
      "Thank you for your interest in NowNow Tours! We offer authentic African experiences with accommodations from budget to luxury. What would you like to know about our tours?",
      "I'm here to help you discover the beauty of Africa! We have amazing tours to Tanzania, South Africa, Angola, and UAE. Would you like to hear about our packages?",
      "Welcome to NowNow Tours! I can help you with information about our destinations, pricing, and booking process. What questions do you have about African travel?"
    ];
    
    const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return new Response(JSON.stringify({
      success: true,
      response: randomFallback
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}