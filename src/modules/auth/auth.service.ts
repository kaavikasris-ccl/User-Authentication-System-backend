import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/config/prismaClient";
import { generateOtp, getOtpExpiry } from "@/core/utils/otp";
import { config } from "@/config";
import { AppError } from "@/core/errors/app-error";

class AuthService {
  /**
   * REGISTER
   */
  async register(input: { email: string; password: string }) {
    const { email, password } = input;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return true;
  }

  /**
   * LOGIN
   */
  async login(input: { email: string; password: string }) {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Invalid password", 401);
    }

    /**
     *  FIXED: store token properly
     */
    const token = jwt.sign(
      { email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return token;
  }

  /**
   * FORGOT PASSWORD
   */
  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const otp = generateOtp();
    const expiry = getOtpExpiry();

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otp_expiry: expiry,
      },
    });

    console.log("OTP:", otp);

    return true;
  }

  /**
   * VERIFY OTP + RESET PASSWORD
   */
  async verifyOtp(input: {
    email: string;
    otp: string | number;
    newPassword: string;
  }) {
    const { email, otp, newPassword } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.otp !== Number(otp)) {
      throw new AppError("Invalid OTP", 400);
    }

    if (!user.otp_expiry || new Date(user.otp_expiry) < new Date()) {
      throw new AppError("OTP expired", 410);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otp_expiry: null,
      },
    });

    return true;
  }

  /**
   * RESET PASSWORD
   */
  async resetPassword(input: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) {
    const { email, oldPassword, newPassword } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new AppError("Old password is incorrect", 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    return true;
  }
}

export const authService = new AuthService();