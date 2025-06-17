/**
 * Test script for Gophish integration
 * ใช้สำหรับทดสอบการทำงานของ API endpoints
 */

const BASE_URL = 'http://localhost:3000';

// Test data
const testCredentials = {
  email: 'test@example.com',
  password: 'testpassword123',
  rid: 'test_recipient_123'
};

// Test cases
const testCases = [
  {
    name: 'Valid credentials with RID',
    data: testCredentials,
    expectedStatus: 200
  },
  {
    name: 'Missing email',
    data: { password: 'testpass', rid: 'test123' },
    expectedStatus: 400
  },
  {
    name: 'Missing password',
    data: { email: 'test@example.com', rid: 'test123' },
    expectedStatus: 400
  },
  {
    name: 'Missing RID',
    data: { email: 'test@example.com', password: 'testpass' },
    expectedStatus: 400
  },
  {
    name: 'Invalid email format',
    data: { email: 'invalid-email', password: 'testpass', rid: 'test123' },
    expectedStatus: 400
  },
  {
    name: 'Invalid RID format',
    data: { email: 'test@example.com', password: 'testpass', rid: 'invalid!@#' },
    expectedStatus: 400
  }
];

/**
 * Test API endpoint
 */
async function testApiEndpoint(testCase) {
  console.log(`\n🧪 Testing: ${testCase.name}`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/gophish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCase.data),
    });

    const result = await response.json();
    
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, result);
    
    if (response.status === testCase.expectedStatus) {
      console.log('✅ PASS');
    } else {
      console.log('❌ FAIL - Expected status:', testCase.expectedStatus);
    }
    
    return { success: response.status === testCase.expectedStatus, result };
  } catch (error) {
    console.log('❌ FAIL - Network error:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Test URL parameter extraction
 */
function testUrlParameters() {
  console.log('\n🔗 Testing URL parameter extraction');
  
  const testUrls = [
    'http://localhost:3000/auth?rid=test123',
    'http://localhost:3000/auth?rid=test_123&campaign=456',
    'http://localhost:3000/auth',
    'http://localhost:3000/auth?invalid=param'
  ];
  
  testUrls.forEach(url => {
    try {
      const urlObj = new URL(url);
      const rid = urlObj.searchParams.get('rid');
      console.log(`URL: ${url}`);
      console.log(`RID: ${rid || 'Not found'}`);
      console.log('---');
    } catch (error) {
      console.log(`Invalid URL: ${url}`);
    }
  });
}

/**
 * Test validation functions
 */
function testValidation() {
  console.log('\n🔍 Testing validation functions');
  
  const testRids = [
    'valid_rid_123',
    'VALID-RID',
    'invalid!@#',
    'too_long_rid_that_exceeds_fifty_characters_limit_for_testing_purposes',
    ''
  ];
  
  const ridPattern = /^[a-zA-Z0-9_-]{1,50}$/;
  
  testRids.forEach(rid => {
    const isValid = ridPattern.test(rid);
    console.log(`RID: "${rid}" -> ${isValid ? '✅ Valid' : '❌ Invalid'}`);
  });
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🚀 Starting Gophish Integration Tests');
  console.log('=====================================');
  
  // Test URL parameters
  testUrlParameters();
  
  // Test validation
  testValidation();
  
  // Test API endpoints
  console.log('\n📡 Testing API Endpoints');
  console.log('========================');
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  for (const testCase of testCases) {
    const result = await testApiEndpoint(testCase);
    if (result.success) {
      passedTests++;
    }
  }
  
  console.log('\n📊 Test Results');
  console.log('===============');
  console.log(`Passed: ${passedTests}/${totalTests}`);
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Please check the output above.');
  }
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runTests().catch(console.error);
}

// Export for use in other files
module.exports = {
  testApiEndpoint,
  testUrlParameters,
  testValidation,
  runTests
}; 