import ws from "ws";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
