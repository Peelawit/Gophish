import { getGophishConfig, isGophishEnabled } from '@/config/gophish';

export async function POST(request) {
  try {
    // Check if Gophish is enabled
    if (!isGophishEnabled()) {
      return Response.json(
        { success: false, message: 'Gophish integration is disabled' },
        { status: 403 }
      );
    }

    const config = getGophishConfig();
    const body = await request.json();
    const { email, password, rid } = body;
    
    // Validate required fields
    if (!email || !password || !rid) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate RID format
    if (!config.VALIDATION.RID_PATTERN.test(rid)) {
      return Response.json(
        { success: false, message: 'Invalid RID format' },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!config.VALIDATION.EMAIL_PATTERN.test(email)) {
      return Response.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate password length
    if (password.length < config.VALIDATION.PASSWORD_MIN_LENGTH) {
      return Response.json(
        { success: false, message: 'Password too short' },
        { status: 400 }
      );
    }
    
    // Get client information
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               request.headers.get('x-client-ip') || 
               'Unknown';
    
    // Log the captured credentials (for testing purposes)
    if (config.LOGGING.ENABLED) {
      const logData = {
        timestamp: new Date().toISOString(),
        event: 'credential_capture',
        email: email,
        password: password ? '***' : 'not provided',
        rid: rid,
        userAgent: config.LOGGING.CAPTURE_USER_AGENT ? userAgent : 'Not captured',
        ip: config.LOGGING.CAPTURE_IP ? ip : 'Not captured',
        success: true
      };
      
      console.log('Gophish Credential Capture:', logData);
    }
    
    // In a real scenario, you might want to:
    // 1. Store these credentials securely
    // 2. Send them to your Gophish server via webhook
    // 3. Log the event for analysis
    // 4. Implement rate limiting
    // 5. Add additional security measures
    
    // For now, we'll just return a success response
    return Response.json({ 
      success: true, 
      message: 'Credentials captured successfully',
      rid: rid,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error capturing credentials:', error);
    return Response.json(
      { success: false, message: 'Failed to capture credentials' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request) {
  const config = getGophishConfig();
  
  if (!config.SECURITY.CORS.ENABLED) {
    return new Response(null, { status: 403 });
  }
  
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': config.SECURITY.CORS.ALLOWED_ORIGINS.join(', '),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 