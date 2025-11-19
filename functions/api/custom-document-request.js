// Cloudflare Workers API endpoint for custom document requests
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const requestData = await request.json();
    
    // Validate required fields
    const requiredFields = ['documentType', 'contactInfo'];
    for (const field of requiredFields) {
      if (!requestData[field]) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Missing required field: ${field}` 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Validate contact info
    if (!requestData.contactInfo.name || !requestData.contactInfo.email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Name and email are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate unique request ID
    const requestId = 'DOC' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
    
    // Insert into database
    const stmt = env.DB.prepare(`
      INSERT INTO custom_document_requests (
        request_id, document_type, destination, travel_dates, group_size,
        specific_requests, contact_name, contact_email, contact_phone, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);
    
    const result = await stmt.bind(
      requestId,
      requestData.documentType,
      requestData.destination || null,
      requestData.travelDates || null,
      requestData.groupSize || null,
      requestData.specificRequests || null,
      requestData.contactInfo.name,
      requestData.contactInfo.email,
      requestData.contactInfo.phone || null
    ).run();
    
    // Optional: Send confirmation email
    // await sendDocumentRequestConfirmationEmail(requestData, requestId);
    
    return new Response(JSON.stringify({
      success: true,
      requestId: requestId,
      message: 'Document request submitted successfully! We\'ll prepare your custom document within 24 hours.'
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
    console.error('Custom document request error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process document request'
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