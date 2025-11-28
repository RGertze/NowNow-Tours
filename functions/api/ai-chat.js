// Cloudflare Pages Functions API endpoint for AI chat using Anthropic Claude 3.5 Haiku
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

    // Build context about Now Now Tours & Safaris
       const tourContext = `
    You are an AI assistant for Now Now Tours & Safaris, a premium African tour company. Here's important information about the company:

    TOURS OFFERED:
    1. Zanzibar Getaway (Tanzania) - N$21,800 pp (N$2,500 deposit)
      - Return ticket from Windhoek to Zanzibar, Boat Trip, Dolphin Snorkel
      - Beach and cultural experiences in Stone Town

    2. Cape Town Adventure (South Africa) - N$6,800 pp (N$1,000 deposit)
      - Table Mountain, Cape Peninsula, V&A Waterfront, Cape Winelands
      - Activities: Wine tasting, boat cruises, city tours

    3. Lubango Wonders (Angola) - N$5,200 pp (N$1,000 deposit)
      - Cristo Rei Miradouro, Pulukua Resort, Beach Hopping
      - Nature and coastal experiences

    4. Victoria Falls (Zambia) - N$7,500 pp (N$1,000 deposit)
      - Day visit to Victoria Falls, Livingstone Waterfront, Sunset Cruise (Optional)

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

    const systemPrompt = tourContext.trim();

    // Get Anthropic API key from environment (set via Pages secrets)
    const apiKey = env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('Missing ANTHROPIC_API_KEY in environment');
    }

    // Build messages for Anthropic Messages API
    const messages = [
      ...(conversationHistory || []).map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ];

    // Call Anthropic Messages API
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-latest',
        max_tokens: 1024,
        temperature: 0.7,
        system: systemPrompt,
        messages
      })
    });

    if (!anthropicResponse.ok) {
      const errText = await anthropicResponse.text();
      const errorMessage = `Anthropic API error: ${anthropicResponse.status} ${errText}`;
      console.error(errorMessage);
      return new Response(JSON.stringify({
        success: false,
        error: errorMessage,
        debug: {
          status: anthropicResponse.status,
          statusText: anthropicResponse.statusText,
          response: errText
        }
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

    const anthropicData = await anthropicResponse.json();
    console.log('Anthropic response:', JSON.stringify(anthropicData));
    const aiResponse = anthropicData?.content?.[0]?.text?.trim();
    if (!aiResponse) {
      const errorMsg = 'No response text from Anthropic API';
      console.error(errorMsg, 'Response data:', anthropicData);
      return new Response(JSON.stringify({
        success: false,
        error: errorMsg,
        debug: { anthropicData }
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
    const errorMessage = error.message || 'Unknown error';
    console.error('AI Chat error:', errorMessage, error);
    
    // Return actual error instead of fallback
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
      debug: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
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