const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

async function main() {
    console.log('--- Checking DB User ---');
    const user = await prisma.user.findUnique({
        where: { email: 'taha.sezer@istun.edu.tr' },
        select: { id: true, name: true, githubUrl: true }
    });
    console.log('User found:', user);

    if (user && user.githubUrl) {
        console.log('\n--- Checking GitHub API ---');
        const username = extractUsername(user.githubUrl);
        console.log('Extracted Username:', username);

        if (username) {
            try {
                console.log(`Fetching https://api.github.com/users/${username}...`);
                const res = await axios.get(`https://api.github.com/users/${username}`);
                console.log('GitHub Profile Found:', res.data.login);
                console.log('Avatar URL:', res.data.avatar_url);
            } catch (error) {
                console.error('GitHub API Error:', error.message);
                if (error.response) console.error('Status:', error.response.status);
            }
        }
    }
}

function extractUsername(url) {
    if (!url) return null;
    try {
        const parts = url.split('/');
        return parts[parts.length - 1] || parts[parts.length - 2];
    } catch (e) {
        return null;
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
