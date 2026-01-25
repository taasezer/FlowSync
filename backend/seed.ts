
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error('ADMIN_EMAIL ve ADMIN_PASSWORD environment variable\'ları tanımlanmalıdır!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Upsert user
    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'ADMIN',
            status: 'OFFLINE'
        },
        create: {
            email,
            name: 'Taha Sezer',
            password: hashedPassword,
            role: 'ADMIN',
            status: 'OFFLINE',
            githubUrl: 'https://github.com/taasezer'
        },
    });

    console.log(`Admin user seeded: ${user.email}`);
    // UserSettings will be created on-demand by SettingsService
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
