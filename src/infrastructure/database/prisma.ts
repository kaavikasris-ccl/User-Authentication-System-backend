import { PrismaClient } from "@prisma/client";
import { env } from "@/config/env";

/**
 * --------------------
 * Prisma Client Instance
 * --------------------
 */
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});

/**
 * --------------------
 * Connect Database
 * --------------------
 */
export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

/**
 * --------------------
 * Disconnect Database
 * --------------------
 */
export const disconnectDB = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error(" Error disconnecting database:", error);
  }
};