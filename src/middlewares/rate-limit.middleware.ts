import rateLimit from "express-rate-limit";
import { env } from "@/config/env";

/**
 * --------------------
 * API Rate Limiter
 * --------------------
 */
export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS * 60 * 1000,

  max: env.RATE_LIMIT_MAX,

  message: {
    message: "Too many requests, please try again later.",
  },

});