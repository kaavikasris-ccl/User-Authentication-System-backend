import { env } from './env.js';

export const config = {
  port: env.PORT,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: env.DATABASE_URL,
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
  cors: {
    origin: env.CORS_ORIGIN,
  },
};

export default config;