// Admin API endpoint for viewing tour bookings
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Simple authentication check (in production, use proper auth)
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication required'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const status = url.searchParams.get('status');
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    let params = [];
    
    if (status) {
      whereClause = 'WHERE status = ?';
      params.push(status);
    }
    
    // Get bookings with pagination
    const stmt = env.DB.prepare(`
      SELECT 
        id, booking_reference, customer_name, customer_email, customer_phone,
        selected_destinations, start_date, end_date, adults, children,
        accommodation_type, budget_range, estimated_price, status, created_at
      FROM tour_bookings 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);
    
    const bookings = await stmt.bind(...params, limit, offset).all();
    
    // Get total count
    const countStmt = env.DB.prepare(`
      SELECT COUNT(*) as total FROM tour_bookings ${whereClause}
    `);
    const countResult = await countStmt.bind(...params).first();
    
    // Parse JSON fields and format data
    const formattedBookings = bookings.results.map(booking => ({
      ...booking,
      selected_destinations: JSON.parse(booking.selected_destinations || '[]'),
      total_travelers: booking.adults + booking.children
    }));
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        bookings: formattedBookings,
        pagination: {
          page,
          limit,
          total: countResult.total,
          totalPages: Math.ceil(countResult.total / limit)
        }
      }
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
    
  } catch (error) {
    console.error('Admin bookings API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch bookings data'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Update booking status
export async function onRequestPatch(context) {
  const { request, env } = context;
  
  // Simple authentication check
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication required'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const { bookingId, status } = await request.json();
    
    if (!bookingId || !status) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Booking ID and status are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid status value'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const stmt = env.DB.prepare(`
      UPDATE tour_bookings 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    
    const result = await stmt.bind(status, bookingId).run();
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Booking not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Booking status updated successfully'
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
    
  } catch (error) {
    console.error('Admin booking update error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update booking status'
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
      'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}