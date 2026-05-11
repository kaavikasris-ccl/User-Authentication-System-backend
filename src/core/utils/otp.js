import { env } from "../../config/env.js";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getOtpExpiry = ()=> {
  const expiry = new Date();

  expiry.setMinutes(
    expiry.getMinutes() + env.OTP_EXPIRY_MINUTES
  );

  return expiry;
};