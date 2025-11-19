// Cloudflare Workers API endpoint for newsletter subscriptions
export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Parse the request body
    const subscriptionData = await request.json();
    
    // Validate required fields
    if (!subscriptionData.email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Email address is required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriptionData.email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if email already exists
    const existingStmt = env.DB.prepare(`
      SELECT id, status FROM newsletter_subscriptions WHERE email = ?
    `);
    const existing = await existingStmt.bind(subscriptionData.email).first();
    
    if (existing) {
      if (existing.status === 'active') {
        return new Response(JSON.stringify({
          success: false,
          error: 'This email is already subscribed to our newsletter'
        }), {
          status: 409,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        // Reactivate subscription
        const updateStmt = env.DB.prepare(`
          UPDATE newsletter_subscriptions 
          SET status = 'active', subscribed_at = CURRENT_TIMESTAMP, unsubscribed_at = NULL
          WHERE email = ?
        `);
        await updateStmt.bind(subscriptionData.email).run();
      }
    } else {
      // Insert new subscription
      const insertStmt = env.DB.prepare(`
        INSERT INTO newsletter_subscriptions (email, name, status)
        VALUES (?, ?, 'active')
      `);
      await insertStmt.bind(
        subscriptionData.email,
        subscriptionData.name || null
      ).run();
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully subscribed to our newsletter!'
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
    console.error('Newsletter subscription error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to subscribe. Please try again.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle unsubscribe requests
export async function onRequestDelete(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  
  if (!email) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Email parameter is required' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const stmt = env.DB.prepare(`
      UPDATE newsletter_subscriptions 
      SET status = 'unsubscribed', unsubscribed_at = CURRENT_TIMESTAMP
      WHERE email = ?
    `);
    
    const result = await stmt.bind(email).run();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to unsubscribe. Please try again.'
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
      'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}