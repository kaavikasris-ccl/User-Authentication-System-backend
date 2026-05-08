import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { HTTP_STATUS } from "@/utils/httpStatus";

/**
 * REGISTER
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.register(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await authService.login(req.body);

    return res.status(HTTP_STATUS.OK).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    await authService.forgotPassword(email);

    return res.status(HTTP_STATUS.OK).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * VERIFY OTP
 */
export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.verifyOtp(req.body);

    return res.status(HTTP_STATUS.OK).json({
      message: "OTP verified successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.resetPassword(req.body);

    return res.status(HTTP_STATUS.OK).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};