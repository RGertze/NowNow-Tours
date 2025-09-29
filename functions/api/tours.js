// Cloudflare Workers API endpoint for tours data
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const tourId = url.searchParams.get('id');
  
  try {
    let stmt, result;
    
    if (tourId) {
      // Get specific tour
      stmt = env.DB.prepare(`
        SELECT * FROM tours WHERE id = ?
      `);
      result = await stmt.bind(tourId).first();
      
      if (!result) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Tour not found'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Parse JSON fields
      result.images = JSON.parse(result.images || '[]');
      result.itinerary = JSON.parse(result.itinerary || '[]');
      
    } else {
      // Get all tours
      stmt = env.DB.prepare(`
        SELECT * FROM tours ORDER BY created_at DESC
      `);
      const tours = await stmt.all();
      
      result = tours.results.map(tour => ({
        ...tour,
        images: JSON.parse(tour.images || '[]'),
        itinerary: JSON.parse(tour.itinerary || '[]')
      }));
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: result
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Tours API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch tours data'
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}