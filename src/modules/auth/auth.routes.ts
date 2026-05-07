import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "./auth.controller";

const router = Router();

/**
 * --------------------
 * Auth Routes
 * --------------------
 */

// Register new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Forgot password (send OTP)
router.post("/forgot-password", forgotPassword);

// Verify OTP + set new password
router.post("/verify-otp", verifyOtp);

// Reset password (old password check)
router.post("/reset-password", resetPassword);

export default router;