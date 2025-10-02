import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export function getDb(): PrismaClient {
  if (global.prisma) return global.prisma;

  const prisma = new PrismaClient({
    log: ["query", "error", "warn"],
  });

  if (process.env.NODE_ENV !== "production") global.prisma = prisma;

  return prisma;
}



