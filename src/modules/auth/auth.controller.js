import { authService } from "@auth/auth.service.js";
import { HTTP_STATUS } from "@utils/httpStatus.js";
import { AUTH_MESSAGES } from "@constants/messages.js";

/**
 * REGISTER
 */
export const register = async (req, res, next) => {
  try {
    await authService.register(req.body);

    return res
      .status(HTTP_STATUS.CREATED.statusCode)
      .json({
        message: AUTH_MESSAGES.USER_REGISTERED,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN
 */
export const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json({
        message: AUTH_MESSAGES.LOGIN_SUCCESS,
        token,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * GET USERS
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await authService.getUsers();

    return res
      .status(HTTP_STATUS.OK.statusCode)
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
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const otp = await authService.forgotPassword(email);

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json({
        message: AUTH_MESSAGES.OTP_SENT,
        otp: otp,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * VERIFY OTP
 */
export const verifyOtp = async (req, res, next) => {
  try {
    await authService.resetPasswordWithOtp(req.body);

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json({
        message: AUTH_MESSAGES.PASSWORD_UPDATED,
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
    const { email, otp, new_password } = req.body;

    await authService.resetPasswordWithOtp({
      email,
      otp,
      new_password,
    });

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json({
        message: AUTH_MESSAGES.PASSWORD_UPDATED,
      });

  } catch (error) {
    next(error);
  }
};

/**
 * DELETE USER
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.params;

    await authService.deleteUser(email);

    return res
      .status(HTTP_STATUS.OK.statusCode)
      .json({
        message: AUTH_MESSAGES.USER_DELETED,
      });

  } catch (error) {
    next(error);
  }
};