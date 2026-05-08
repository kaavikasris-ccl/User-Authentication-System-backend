import "dotenv/config";
import { env } from "./env";

/**
 * --------------------
 * Application Config
 * --------------------
 * NEVER use process.env outside this file
 */
export const config = {
  

  port: env.PORT,

  cors: {
    origin:
      env.CORS_ORIGIN === "*"
        ? "*"
        : env.CORS_ORIGIN.split(","),
    credentials: true,
  },

  database: {
    url: env.DATABASE_URL,
  },

  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },

  otp: {
    expiryMinutes: env.OTP_EXPIRY_MINUTES,
  },

  rateLimit: {
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
  },
} as const;