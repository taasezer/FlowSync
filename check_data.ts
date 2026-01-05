
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.user.count();
  const users = await prisma.user.findMany({ select: { email: true, name: true } });
  
  console.log(`Total Users: ${count}`);
  console.table(users);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
