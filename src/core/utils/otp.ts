import { env } from "@/config/env";

export const generateOtp = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getOtpExpiry = (): Date => {
  const expiry = new Date();

  expiry.setMinutes(
    expiry.getMinutes() + env.OTP_EXPIRY_MINUTES
  );

  return expiry;
};