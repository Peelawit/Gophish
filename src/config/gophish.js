/**
 * Gophish Configuration
 * ตั้งค่าสำหรับการทำงานกับ Gophish phishing framework
 */

export const GOPHISH_CONFIG = {
  // API endpoint สำหรับส่งข้อมูล credentials
  API_ENDPOINT: '/api/gophish',
  
  // URL parameters ที่ Gophish ใช้
  URL_PARAMS: {
    RID: 'rid', // Recipient ID
    CAMPAIGN: 'campaign', // Campaign ID
    USER: 'user' // User ID
  },
  
  // Validation rules
  VALIDATION: {
    RID_PATTERN: /^[a-zA-Z0-9_-]{1,50}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 1
  },
  
  // Success page configuration
  SUCCESS: {
    REDIRECT_DELAY: 5000, // 5 seconds
    AUTO_CLOSE: true
  },
  
  // Logging configuration
  LOGGING: {
    ENABLED: true,
    LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
    CAPTURE_USER_AGENT: true,
    CAPTURE_IP: true
  },
  
  // Security settings
  SECURITY: {
    RATE_LIMIT: {
      ENABLED: true,
      MAX_REQUESTS: 10,
      WINDOW_MS: 60000 // 1 minute
    },
    CORS: {
      ENABLED: true,
      ALLOWED_ORIGINS: ['*'] // Configure for production
    }
  }
};

/**
 * Environment-specific configurations
 */
export const getGophishConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  const isVercel = process.env.VERCEL === '1';
  
  const baseConfig = { ...GOPHISH_CONFIG };
  
  if (isDevelopment) {
    // Development settings
    baseConfig.LOGGING.LEVEL = 'debug';
    baseConfig.SECURITY.RATE_LIMIT.ENABLED = false;
  }
  
  if (isProduction || isVercel) {
    // Production/Vercel settings
    baseConfig.LOGGING.LEVEL = 'info';
    baseConfig.SECURITY.RATE_LIMIT.ENABLED = true;
    
    // Get allowed origins from environment or use default
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS;
    if (allowedOrigins) {
      baseConfig.SECURITY.CORS.ALLOWED_ORIGINS = allowedOrigins.split(',').map(origin => origin.trim());
    } else {
      baseConfig.SECURITY.CORS.ALLOWED_ORIGINS = [
        process.env.GOPHISH_DOMAIN || 'https://your-gophish-domain.com'
      ];
    }
  }
  
  return baseConfig;
};

/**
 * Helper functions for configuration
 */
export const isGophishEnabled = () => {
  return process.env.NEXT_PUBLIC_GOPHISH_ENABLED === 'true';
};

export const getGophishDomain = () => {
  return process.env.GOPHISH_DOMAIN || 'https://your-gophish-domain.com';
};

export const getWebhookUrl = () => {
  return process.env.GOPHISH_WEBHOOK_URL || null;
};

export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }
  
  // For Vercel, use the deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
}; 