
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function promoteToAdmin() {
    const name = "Taha Sezer";
    console.log(`Searching for user: ${name}...`);

    try {
        const user = await prisma.user.findFirst({
            where: { name: { equals: name, mode: 'insensitive' } } // Case insensitive search
        });

        if (!user) {
            console.error(`❌ User '${name}' not found! Please register with this name first.`);
            return;
        }

        const updated = await prisma.user.update({
            where: { id: user.id },
            data: { role: 'ADMIN' }
        });

        console.log(`✅ User '${updated.name}' (${updated.email}) is now an ADMIN.`);

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

promoteToAdmin();
