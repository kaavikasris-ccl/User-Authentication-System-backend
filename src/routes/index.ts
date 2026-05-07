import { Router } from "express";
import authRoutes from "@/modules/auth/auth.routes";

const router = Router();

/**
 * --------------------
 * All Application Routes
 * --------------------
 */

// Auth module routes
router.use("/auth", authRoutes);

export default router;