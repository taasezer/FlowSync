
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create Test User
    const user = await prisma.user.upsert({
        where: { email: 'test@flowsync.app' },
        update: {},
        create: {
            email: 'test@flowsync.app',
            name: 'Test Engineer',
        },
    });

    console.log({ user });

    // Create Test Sessions
    const session1 = await prisma.activitySession.create({
        data: {
            userId: user.id,
            startTime: new Date(new Date().getTime() - 3600 * 1000), // 1 hour ago
            endTime: new Date(),
            duration: 3600,
            activityScore: 85,
        },
    });

    const session2 = await prisma.activitySession.create({
        data: {
            userId: user.id,
            startTime: new Date(new Date().getTime() - 7200 * 1000), // 2 hours ago
            endTime: new Date(new Date().getTime() - 3600 * 1000),
            duration: 3600,
            activityScore: 72,
        },
    });

    console.log({ session1, session2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
