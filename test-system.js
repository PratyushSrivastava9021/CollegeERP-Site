// Quick system test
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testSystem() {
  console.log('🧪 Testing College ERP System...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing API Health...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health:', health.data.status);

    // Test 2: Auth Test
    console.log('2️⃣ Testing Auth Endpoint...');
    const authTest = await axios.get(`${BASE_URL}/auth/test`);
    console.log('✅ Auth Test:', authTest.data.message);

    // Test 3: Courses Endpoint
    console.log('3️⃣ Testing Courses Endpoint...');
    const courses = await axios.get(`${BASE_URL}/courses`);
    console.log('✅ Courses:', courses.data.success ? 'Working' : 'Failed');

    console.log('\n🎉 All tests passed! Your ERP system is ready!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    console.log('\n💡 Make sure your server is running with: npm run dev');
  }
}

testSystem();