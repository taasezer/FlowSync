
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function upsertUser() {
    const email = 'taha.sezer@istun.edu.tr';
    const name = 'Taha Sezer';
    const githubUrl = 'https://github.com/taasezer';
    const password = 'Aett5734'; // User Provided

    console.log('--- UPSERTING ADMIN USER ---');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            name,
            role: 'ADMIN',
            password: hashedPassword,
            githubUrl,
            status: 'OFFLINE'
        },
        create: {
            email,
            name,
            role: 'ADMIN',
            password: hashedPassword,
            githubUrl,
            status: 'OFFLINE'
        }
    });

    console.log('--- USER SYNCED SUCCESSFULLY ---');
    console.log(`ID: ${user.id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`GitHub: ${user.githubUrl}`);
    console.log('------------------------------');

    await prisma.$disconnect();
}

upsertUser();
