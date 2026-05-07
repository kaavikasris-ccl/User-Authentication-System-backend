import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/config/prismaClient";
import { generateOtp, getOtpExpiry } from "@/core/utils/otp";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

class AuthService {
  /**
   * REGISTER USER
   */
  async register(input: { email: string; password: string }) {
    const { email, password } = input;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("USER_ALREADY_EXISTS");
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
   * LOGIN USER
   */
  async login(input: { email: string; password: string }) {
    const { email, password } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("INVALID_PASSWORD");
    }

    const token = jwt.sign(
      { email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }

  /**
   * FORGOT PASSWORD (GENERATE OTP)
   */
  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
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
    otp: number;
    newPassword: string;
  }) {
    const { email, otp, newPassword } = input;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.otp !== Number(otp)) {
      throw new Error("INVALID_OTP");
    }

    if (
      !user.otp_expiry ||
      new Date(user.otp_expiry) < new Date()
    ) {
      throw new Error("OTP_EXPIRED");
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
   * RESET PASSWORD (OLD PASSWORD CHECK)
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
      throw new Error("USER_NOT_FOUND");
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      throw new Error("OLD_PASSWORD_INCORRECT");
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