import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../users/user.repository.js";
import { generateOtp, getOtpExpiry } from "../../core/utils/otp.js";
import { config } from "../../config/index.js";
import { AppError } from "../../core/errors/app-error.js";

class AuthService {

  /**
   * REGISTER
   */
  async register(input) {

    const { email, password } = input;

    const existingUser =
      await userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError(
        "User already exists",
        409
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await userRepository.createUser({
      email,
      password: hashedPassword,
    });

    return true;
  }

  /**
   * LOGIN
   */
  async login(input) {

    const { email, password } = input;

    const user =
      await userRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new AppError(
        "Invalid password",
        401
      );
    }

    const token = jwt.sign(
      { email: user.email },
      config.jwt.secret,
      {
        expiresIn:
          config.jwt.expiresIn,
      }
    );

    return token;
  }

  /**
   * GET USERS
   */
  async getUsers() {
    return userRepository.getUsers();
  }

  /**
   * FORGOT PASSWORD
   */
  async forgotPassword(email) {

    const user =
      await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const otp = generateOtp();

    const expiry = getOtpExpiry();

    await userRepository.updateUser(
      email,
      {
        otp: String(otp),
        otpExpiry: expiry,
      }
    );

    console.log("OTP:", otp);

    return true;
  }

  /**
   * VERIFY OTP
   */
  async verifyOtp(input) {

    const {
      email,
      otp,
      newPassword,
    } = input;

    const user =
      await userRepository.findByEmail(email);

    if (
      !user ||
      !user.otp ||
      !user.otpExpiry
    ) {
      throw new AppError(
        "Invalid OTP",
        400
      );
    }

    if (user.otp !== String(otp)) {
      throw new AppError(
        "Invalid OTP",
        400
      );
    }

    if (
      user.otpExpiry < new Date()
    ) {
      throw new AppError(
        "OTP expired",
        410
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await userRepository.updateUser(
      email,
      {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
      }
    );

    return true;
  }

  /**
   * RESET PASSWORD
   */
  async resetPassword(input) {

    const {
      email,
      oldPassword,
      newPassword,
    } = input;

    const user =
      await userRepository.findByEmail(email);

    if (!user || !user.password) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {
      throw new AppError(
        "Old password incorrect",
        401
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await userRepository.updateUser(
      email,
      {
        password: hashedPassword,
      }
    );

    return true;
  }

  /**
   * DELETE USER
   */
  async deleteUser(email) {

    const user =
      await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    await userRepository.deleteUser(email);

    return true;
  }
}

// ONLY ONE export - keep this one at the bottom
export const authService = new AuthService();