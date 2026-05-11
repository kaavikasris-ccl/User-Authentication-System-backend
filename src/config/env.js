import { z } from "zod";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const envSchema = z.object({
  // Server
  PORT: z.coerce.number().default(3000),

  // Database
  DATABASE_URL: z.string(),

  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z
    .enum(["15m", "1h", "7d"])
    .default("1h"),
  
  // OTP
  OTP_EXPIRY_MINUTES: z.coerce.number().default(5),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .default(15 * 60 * 1000),

  RATE_LIMIT_MAX: z.coerce
    .number()
    .default(100),

  // CORS
  CORS_ORIGIN: z.string().default("*"),
});

export const env = envSchema.parse(process.env);
export default env;