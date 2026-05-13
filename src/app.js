import express from "express";
import userRoutes from "@auth/auth.routes.js";
import cors from "cors";
import { config } from "@config/index.js";
import { errorMiddleware } from "@middlewares/error.middleware.js";
import { connectDB } from "@db/prisma.js";
import { apiRateLimiter } from "@middlewares/rate-limit.middleware.js";

const app = express();

/**
 * --------------------
 * Middlewares
 * --------------------
 */
app.use(express.json());

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

/**
 * --------------------
 * Database Connection
 * --------------------
 */
connectDB();

/**
 * --------------------
 * Rate Limiting (GLOBAL)
 * --------------------
 */
app.use(apiRateLimiter);

/**
 * --------------------
 * Routes
 * --------------------
 */
app.use("/api/auth", userRoutes);

/**
 * --------------------
 * Error Middleware (must be last)
 * --------------------
 */
app.use(errorMiddleware);

export default app;