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

const router = Router();

/**
 * AUTH ROUTES
 */

router.post("/register", register);

router.post("/login", login);

router.get("/users", getUsers);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-otp",
  verifyOtp
);

router.post(
  "/reset-password",
  resetPassword
);

router.delete(
  "/users/:email",
  deleteUser
);

export default router;