import { authService }
  from "./auth.service.js";

import { HTTP_STATUS }
  from "../../utils/httpStatus.js";

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
          "User registered successfully",
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
        message: "Login successful",
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

    await authService
      .forgotPassword(email);

    return res
      .status(
        HTTP_STATUS.OK.statusCode
      )
      .json({
        message:
          "OTP sent successfully",
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

    await authService
      .verifyOtp(req.body);

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
export const resetPassword = async (
  req,
  res,
  next
) => {
  try {

    await authService
      .resetPassword(req.body);

    return res
      .status(
        HTTP_STATUS.OK.statusCode
      )
      .json({
        message:
          "Password changed successfully",
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