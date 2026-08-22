import dotenv from 'dotenv';
dotenv.config();

import ws from 'ws';
import { seedProducts } from './seed_utils';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import {InsulationSeedData} from "@/constants/InsulationSeedData";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });


async function main() {
  const categoryName = 'Insulation';
  let category = await prisma.category.findFirst({ where: { name: categoryName } });
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: categoryName,
        slug: 'insulation',
      }
    });
  }

  await seedProducts(prisma, category, InsulationSeedData);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
