// Cloudflare Workers API endpoint for tour booking submissions
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Parse the request body
    const bookingData = await request.json();
    
    // Validate required fields
    const requiredFields = ['destinations', 'startDate', 'endDate', 'adults'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Missing required field: ${field}` 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Generate unique booking reference
    const bookingReference = generateBookingReference();
    
    // Calculate estimated price (this should match your frontend calculation)
    const estimatedPrice = calculateTourPrice(bookingData);
    
    // Prepare data for database insertion
    const dbData = {
      booking_reference: bookingReference,
      customer_name: bookingData.customerName || null,
      customer_email: bookingData.customerEmail || null,
      customer_phone: bookingData.customerPhone || null,
      selected_destinations: JSON.stringify(bookingData.destinations),
      start_date: bookingData.startDate,
      end_date: bookingData.endDate,
      adults: bookingData.adults,
      children: bookingData.children || 0,
      accommodation_type: bookingData.accommodationType || 'standard',
      budget_range: bookingData.budgetRange || 'medium',
      transport_preference: bookingData.transportPreference || 'flight',
      dietary_restrictions: bookingData.dietaryRestrictions || null,
      accessibility_needs: bookingData.accessibilityNeeds || null,
      custom_activities: bookingData.customActivities || null,
      special_requests: bookingData.specialRequests || null,
      estimated_price: estimatedPrice,
      status: 'pending'
    };
    
    // Insert into database
    const stmt = env.DB.prepare(`
      INSERT INTO tour_bookings (
        booking_reference, customer_name, customer_email, customer_phone,
        selected_destinations, start_date, end_date, adults, children,
        accommodation_type, budget_range, transport_preference,
        dietary_restrictions, accessibility_needs, custom_activities,
        special_requests, estimated_price, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = await stmt.bind(
      dbData.booking_reference,
      dbData.customer_name,
      dbData.customer_email,
      dbData.customer_phone,
      dbData.selected_destinations,
      dbData.start_date,
      dbData.end_date,
      dbData.adults,
      dbData.children,
      dbData.accommodation_type,
      dbData.budget_range,
      dbData.transport_preference,
      dbData.dietary_restrictions,
      dbData.accessibility_needs,
      dbData.custom_activities,
      dbData.special_requests,
      dbData.estimated_price,
      dbData.status
    ).run();
    
    // Send confirmation email (optional - would need email service)
    // await sendBookingConfirmationEmail(dbData);
    
    return new Response(JSON.stringify({
      success: true,
      bookingReference: bookingReference,
      estimatedPrice: estimatedPrice,
      message: 'Tour booking request submitted successfully!'
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
    console.error('Tour booking error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process tour booking request'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
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

// Helper function to generate booking reference
function generateBookingReference() {
  const prefix = 'NT'; // Now Now Tours & Safaris
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${timestamp}${random}`;
}

// Helper function to calculate tour price
function calculateTourPrice(bookingData) {
  const basePrices = {
    'zanzibar': 1200,
    'cape-town': 1500,
    'angola': 2000,
    'dubai': 900
  };
  
  let basePrice = 0;
  bookingData.destinations.forEach(destId => {
    basePrice += basePrices[destId] || 0;
  });
  
  const totalPeople = bookingData.adults + (bookingData.children || 0);
  basePrice *= totalPeople;
  
  // Accommodation multiplier
  const accommodationMultiplier = {
    'budget': 0.8,
    'standard': 1.0,
    'luxury': 1.5,
    'premium': 2.0
  }[bookingData.accommodationType] || 1.0;
  
  basePrice *= accommodationMultiplier;
  
  // Children discount (50% off)
  if (bookingData.children > 0) {
    const childrenDiscount = bookingData.children * 0.5;
    basePrice *= (1 - (childrenDiscount / totalPeople));
  }
  
  return Math.round(basePrice);
}