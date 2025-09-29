// Admin API endpoint for viewing contact messages
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
    
    // Get contact messages with pagination
    const stmt = env.DB.prepare(`
      SELECT id, name, email, phone, subject, message, status, created_at
      FROM contact_messages 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);
    
    const messages = await stmt.bind(...params, limit, offset).all();
    
    // Get total count
    const countStmt = env.DB.prepare(`
      SELECT COUNT(*) as total FROM contact_messages ${whereClause}
    `);
    const countResult = await countStmt.bind(...params).first();
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        messages: messages.results,
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
    console.error('Admin contacts API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch contact messages'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Mark message as read/replied
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
    const { messageId, status } = await request.json();
    
    if (!messageId || !status) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Message ID and status are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const validStatuses = ['new', 'read', 'replied'];
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
      UPDATE contact_messages 
      SET status = ? 
      WHERE id = ?
    `);
    
    const result = await stmt.bind(status, messageId).run();
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Message not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Message status updated successfully'
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
    console.error('Admin contact update error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update message status'
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