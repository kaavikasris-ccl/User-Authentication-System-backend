import express from "express";
import routes from "@/routes";
import { errorMiddleware } from "@/middlewares/error.middleware";
import { connectDB } from "@/infrastructure/database/prisma";
import { apiRateLimiter } from "@/middlewares/rate-limit.middleware";

const app = express();

/**
 * --------------------
 * Middlewares
 * --------------------
 */
app.use(express.json());

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
app.use("/api", routes);

/**
 * --------------------
 * Error Middleware (must be last)
 * --------------------
 */
app.use(errorMiddleware);

export default app;