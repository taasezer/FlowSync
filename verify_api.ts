
import axios from 'axios';

async function verify() {
    try {
        console.log('Fetching analytics data...');
        const response = await axios.get('http://localhost:3000/analytics');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(response.data, null, 2));

        if (response.data.length >= 2) {
            console.log('SUCCESS: Retrieved expected test data.');
        } else {
            console.log('WARNING: unexpected data length.');
        }

    } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

verify();
