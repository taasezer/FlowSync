"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@flowsync.app' },
        update: {},
        create: {
            email: 'seed-test@flowsync.app',
            name: 'Seed User',
            password: '$2b$10$EpIxQi0q0q/5r6q.5r6q.5r6q.5r6q.5r6q.5r6q.5r6q.5r6q',
            role: 'USER',
        },
    });
    console.log({ user });
    const session1 = await prisma.activitySession.create({
        data: {
            userId: user.id,
            startTime: new Date(new Date().getTime() - 3600 * 1000),
            endTime: new Date(),
            duration: 3600,
            activityScore: 85,
        },
    });
    const session2 = await prisma.activitySession.create({
        data: {
            userId: user.id,
            startTime: new Date(new Date().getTime() - 7200 * 1000),
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
//# sourceMappingURL=seed.js.map