import express from "express";
import userRoutes from "./routes/authroutes";
import cors from "cors";
import { config } from "@/config";
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

app.use(
  cors({
    origin: config.cors.origin,
    credentials: config.cors.credentials,
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
app.use("/api", userRoutes); // ✅ FIXED HERE

/**
 * --------------------
 * Error Middleware (must be last)
 * --------------------
 */
app.use(errorMiddleware);

export default app;