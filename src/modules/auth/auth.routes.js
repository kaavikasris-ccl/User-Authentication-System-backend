import { Router } from "express";

import {
  register,
  login,
  getUsers,
  forgotPassword,
  verifyOtp,
  resetPassword,
  deleteUser,
} from "./auth.controller.js";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema, 
} from "./auth.validator.js";

import { validate } from "@middlewares/validate.middleware.js";

const router = Router();

// Auth routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

// Users
router.get("/users", getUsers);
router.delete("/users/:email", deleteUser);

// Password reset flow
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  "/verify-otp",
  validate(verifyOtpSchema),
  verifyOtp
);

// Reset password (OTP + new password + email recommended)
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPassword
);

export default router;