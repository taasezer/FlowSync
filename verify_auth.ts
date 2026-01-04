
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testAuth() {
    console.log('--- Auth Verification ---');

    const email = `test${Date.now()}@example.com`;
    const password = 'password123';

    // 1. Register
    try {
        console.log('1. Registering new user:', email);
        const regRes = await axios.post(`${API_URL}/auth/register`, {
            email,
            password,
            name: 'Test Auth User'
        });
        console.log('✅ Registered:', regRes.data.id);
    } catch (error: any) {
        console.error('❌ Register failed:', error.response?.data || error.message);
    }

    // 2. Login
    try {
        console.log('2. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        console.log('✅ Login successful. Token:', loginRes.data.access_token ? 'Received' : 'Missing');

        const token = loginRes.data.access_token;

        // 3. Access Protected Route (Profile)
        console.log('3. Accessing protected profile...');
        const profileRes = await axios.get(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Profile accessed:', profileRes.data.email);

        // 4. Access Admin Stats (Public for now, or protected)
        console.log('4. Accessing Admin Stats...');
        const statsRes = await axios.get(`${API_URL}/admin/stats`);
        console.log('✅ Admin Stats:', statsRes.data);

    } catch (error: any) {
        console.error('❌ Login/Flow failed:', error.response?.data || error.message);
    }
}

testAuth();
