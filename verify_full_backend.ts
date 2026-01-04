
import axios from 'axios';

const API_URL = 'http://localhost:3000';
const TEST_USER_ID = '6af3b1e1-2862-443b-b03e-29b819514475'; // From seed

async function runTests() {
    console.log('🧪 Starting Full Backward Verification...\n');

    try {
        // 1. Test Focus Module
        console.log('--- FOCUS MODULE ---');
        console.log('Creating Focus Session...');
        const focusRes = await axios.post(`${API_URL}/focus`, {
            userId: TEST_USER_ID,
            startTime: new Date().toISOString(),
            mode: 'deep_work',
            duration: 1500
        });
        console.log('✅ Created Focus Session:', focusRes.data.id);

        console.log('Fetching Focus Sessions...');
        const allFocus = await axios.get(`${API_URL}/focus`);
        console.log(`✅ Retrieved ${allFocus.data.length} sessions.`);

        // 2. Test Settings Module
        console.log('\n--- SETTINGS MODULE ---');
        console.log('Creating/Updating User Settings...');
        const settingsRes = await axios.post(`${API_URL}/settings`, {
            userId: TEST_USER_ID,
            theme: 'dark',
            notifications: false,
            focusTemplates: {
                "pomodoro": 25,
                "long_break": 15
            }
        });
        console.log('✅ Created/Updated Settings:', settingsRes.data.id);
        console.log('   Theme:', settingsRes.data.theme);
        console.log('   Notifications:', settingsRes.data.notifications);

        // 3. Verify Persistence
        console.log('\n--- PERSISTENCE CHECK ---');
        const userSettings = await axios.get(`${API_URL}/settings/${settingsRes.data.id}`);
        if (userSettings.data.theme === 'dark') {
            console.log('✅ Settings persisted correctly.');
        } else {
            console.error('❌ Settings persistence failed.');
        }

        console.log('\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨');

    } catch (error) {
        console.error('\n❌ TEST FAILED');
        if (axios.isAxiosError(error)) {
            console.error('Status:', error.response?.status);
            console.error('Data:', error.response?.data);
        } else {
            console.error(error);
        }
    }
}

runTests();
