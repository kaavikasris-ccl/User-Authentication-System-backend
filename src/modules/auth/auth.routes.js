import { Router } from "express";
import {register,login,getUsers,forgotPassword,verifyOtp,deleteUser,} from "./auth.controller.js";

import {registerSchema,loginSchema,forgotPasswordSchema,verifyOtpSchema,} from "./auth.validator.js";

import { validate } from "@middlewares/validate.middleware.js";

const router = Router();

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema), login);
router.get("/users",getUsers);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/verify-otp",validate(verifyOtpSchema),verifyOtp);
router.delete("/users/:email",deleteUser);

export default router;