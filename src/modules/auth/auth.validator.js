import { z } from "zod";

/**
 * REGISTER
 */
export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[@#$%^&*!]/, "Must contain special character"),
});

/**
 * LOGIN
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

/**
 * FORGOT PASSWORD
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

/**
 * VERIFY OTP (ONLY OTP CHECK)
 */
export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email format"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

/**
 * RESET PASSWORD (FINAL STEP)
 */
export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),

  otp_verified_token: z.string(),

  new_password: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[@#$%^&*!]/),
});