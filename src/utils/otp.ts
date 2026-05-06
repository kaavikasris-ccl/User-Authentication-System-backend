export const generateOtp = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const getOtpExpiry = (): Date => {
  const expiryMinutes = Number(process.env.OTP_EXPIRY_MINUTES || 5);

  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + expiryMinutes);

  return expiry;
};