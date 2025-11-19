// Cloudflare Workers API endpoint for tracking downloads
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Parse the request body
    const downloadData = await request.json();
    
    // Validate required fields
    if (!downloadData.documentName) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Document name is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get client information
    const clientIP = request.headers.get('CF-Connecting-IP') || 
                    request.headers.get('X-Forwarded-For') || 
                    'unknown';
    const userAgent = request.headers.get('User-Agent') || 'unknown';
    
    // Insert download tracking record
    const stmt = env.DB.prepare(`
      INSERT INTO download_tracking (document_name, user_email, user_ip, user_agent)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = await stmt.bind(
      downloadData.documentName,
      downloadData.userEmail || null,
      clientIP,
      userAgent
    ).run();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Download tracked successfully'
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
    console.error('Download tracking error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to track download'
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