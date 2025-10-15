import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create a new PrismaClient instance
const prismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// Check if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// Create a global instance of PrismaClient in development to avoid too many connections
const globalPrisma = global as unknown as { prisma: ReturnType<typeof prismaClient> };

// Use the existing PrismaClient instance if it exists, otherwise create a new one
export const db = globalPrisma.prisma || prismaClient();

// In development, store the PrismaClient instance in the global object
if (!isProduction) {
  globalPrisma.prisma = db;
}

export default db;