
import axios from 'axios';

async function checkStats() {
    try {
        const res = await axios.get('http://localhost:3000/api/admin/stats');
        console.log('Admin Stats Response:');
        console.log(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
        console.error('Error fetching stats:', err.message);
    }
}

checkStats();
