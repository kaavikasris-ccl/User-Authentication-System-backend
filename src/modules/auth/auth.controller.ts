import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";

/**
 * --------------------
 * Auth Controller
 * --------------------
 * Only handles request & response
 */

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.register(req.body);

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await authService.login(req.body);

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.forgotPassword(req.body.email);

    return res.status(200).json({
      message: "OTP sent",
    });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.verifyOtp(req.body);

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.resetPassword(req.body);

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    next(err);
  }
};