import { env } from "@/config/env";

/**
 * Generate 6-digit OTP
 */
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

/**
 * OTP expiry based on environment config
 */
export const getOtpExpiry = () => {
  const expiryMinutes = env.OTP_EXPIRY_MINUTES;

  return new Date(Date.now() + expiryMinutes * 60 * 1000);
};