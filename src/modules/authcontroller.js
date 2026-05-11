import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/config/prismaClient";
import { generateOtp, getOtpExpiry } from "@/utils/otp.js";
import { HTTP_STATUS } from "@/utils/httpStatus.js";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(HTTP_STATUS.CREATED.statusCode).json({
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode).json({
      message: "Error registering user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND.statusCode).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(HTTP_STATUS.UNAUTHORIZED.statusCode).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(HTTP_STATUS.OK.statusCode).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode).json({
      message: "Error logging in",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND.statusCode).json({
        message: "User not found",
      });
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

    return res.status(HTTP_STATUS.OK.statusCode).json({
      message: "OTP sent",
    });
  } catch {
    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode
    ).json({
      message: "Error sending OTP",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.otp !== Number(otp)) {
      return res.status(HTTP_STATUS.BAD_REQUEST.statusCode).json({
        message: "Invalid OTP",
      });
    }

    if (
      !user.otp_expiry ||
      new Date(user.otp_expiry) < new Date()
    ) {
      return res.status(HTTP_STATUS.BAD_REQUEST.statusCode).json({
        message: "OTP expired",
      });
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

    return res.status(HTTP_STATUS.OK.statusCode).json({
      message: "Password updated successfully",
    });
  } catch {
    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode
    ).json({
      message: "Error verifying OTP",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND.statusCode).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(
        HTTP_STATUS.UNAUTHORIZED.statusCode
      ).json({
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(HTTP_STATUS.OK.statusCode).json({
      message: "Password updated successfully",
    });
  } catch {
    return res.status(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode
    ).json({
      message: "Error resetting password",
    });
  }
};