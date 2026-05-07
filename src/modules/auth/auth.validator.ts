import { z } from "zod";

/**
 * --------------------
 * Register Validation
 * --------------------
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
 * --------------------
 * Login Validation
 * --------------------
 */
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

/**
 * --------------------
 * Forgot Password
 * --------------------
 */
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

/**
 * --------------------
 * Verify OTP
 * --------------------
 */
export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.number(),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[@#$%^&*!]/),
});

/**
 * --------------------
 * Reset Password
 * --------------------
 */
export const resetPasswordSchema = z.object({
  email: z.string().email(),
  oldPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[@#$%^&*!]/),
});

/**
 * --------------------
 * Types (optional but useful)
 * --------------------
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;