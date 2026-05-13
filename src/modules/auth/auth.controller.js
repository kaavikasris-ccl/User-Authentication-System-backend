import { authService }
  from "./auth.service.js";

import { HTTP_STATUS }
  from "../../core/utils/httpStatus.js";

/**
 * REGISTER
 */
export const register = async (
  req,
  res,
  next
) => {
  try {

    await authService.register(req.body);

    return res
      .status(
        HTTP_STATUS.CREATED.statusCode
      )
      .json({
        message:
          "Created",
      });

  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN
 */
export const login = async (
  req,
  res,
  next
) => {
  try {

    const token =
      await authService.login(req.body);

    return res
      .status(
        HTTP_STATUS.OK.statusCode
      )
      .json({
        message: "OK",
        token,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * GET USERS
 */
export const getUsers = async (
  req,
  res,
  next
) => {
  try {

    const users =
      await authService.getUsers();

    return res
      .status(
        HTTP_STATUS.OK.statusCode
      )
      .json({
        data: users,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (
  req,
  res,
  next
) => {
  try {

    const { email } = req.body;

    const otp = await authService.forgotPassword(email);

    return res
      .status(
        HTTP_STATUS.OK.statusCode
      )
      .json({
        message:
          "OTP sent",
          otp:otp,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * VERIFY OTP
 */
export const verifyOtp = async (
  req,
  res,
  next
) => {
  try {
    console.log("VERIFY OTP REQ BODY:", req.body); // ← ADD THIS

    await authService.resetPasswordWithOtp(req.body);

    return res
      .status(
        HTTP_STATUS.OK.statusCode
      )
      .json({
        message:
          "OTP verified successfully",
      });

  } catch (error) {
    next(error);
  }
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async (req, res, next) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("TYPE OF EMAIL:", typeof req.body.email);
    const { email, otp, newPassword } = req.body;

    await authService.resetPasswordWithOtp({
      email,
      otp,
      newPassword,
    });

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json({
        message: "Password updated successfully",
      });

  } catch (error) {
    next(error);
  }
};
/**
 * DELETE USER
 */
export const deleteUser = async (
  req,
  res,
  next
) => {
  try {

    const { email } = req.params;

    await authService
      .deleteUser(email);

    return res
      .status(
        HTTP_STATUS.OK.statusCode
      )
      .json({
        message:
          "User deleted successfully",
      });

  } catch (error) {
    next(error);
  }
};
