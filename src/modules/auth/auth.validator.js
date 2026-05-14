import { z } from "zod";

/**
 * REGISTER
 */
export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .regex(
      /[A-Z]/,
      "Password must contain uppercase letter"
    )
    .regex(
      /[a-z]/,
      "Password must contain lowercase letter"
    )
    .regex(
      /[0-9]/,
      "Password must contain number"
    )
    .regex(
      /[@#$%^&*!]/,
      "Password must contain special character"
    ),
});

/**
 * LOGIN
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required"),
});

/**
 * FORGOT PASSWORD
 */
export const forgotPasswordSchema =
  z.object({
    email: z
      .string()
      .email("Invalid email format"),
  });

/**
 * VERIFY OTP
 */
export const verifyOtpSchema =
  z.object({
    email: z
      .string()
      .email("Invalid email format"),

    otp: z.number({
      message: "OTP must be a number",
    }),

    new_password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .regex(
        /[A-Z]/,
        "Password must contain uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain number"
      )
      .regex(
        /[@#$%^&*!]/,
        "Password must contain special character"
      ),
  });

/**
 * RESET PASSWORD
 */
export const resetPasswordSchema =
  z.object({
    email: z
      .string()
      .email("Invalid email format"),

    oldPassword: z
      .string()
      .min(
        1,
        "Old password is required"
      ),

    new_password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .regex(
        /[A-Z]/,
        "Password must contain uppercase letter"
      )
      .regex(
        /[a-z]/,
        "Password must contain lowercase letter"
      )
      .regex(
        /[0-9]/,
        "Password must contain number"
      )
      .regex(
        /[@#$%^&*!]/,
        "Password must contain special character"
      ),
  });