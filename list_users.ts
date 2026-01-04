
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listUsers() {
    console.log('--- Current Users in DB ---');
    const users = await prisma.user.findMany();
    users.forEach(u => {
        console.log(`ID: ${u.id} | Name: '${u.name}' | Email: ${u.email} | Role: ${u.role}`);
    });
    await prisma.$disconnect();
}

listUsers();
