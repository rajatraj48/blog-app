import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed default roles
  await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' },
  });

  await prisma.role.upsert({
    where: { name: 'Writer' },
    update: {},
    create: { name: 'Writer' },
  });

  await prisma.role.upsert({
    where: { name: 'Visitor' },
    update: {},
    create: { name: 'Visitor' },
  });

  console.log('Roles seeded!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
