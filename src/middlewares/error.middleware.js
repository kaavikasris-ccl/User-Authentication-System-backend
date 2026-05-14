import { AppError } from "@errors/app-error.js";

export const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  console.error(err);

  // HANDLE CUSTOM APP ERROR
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // DEFAULT ERROR
  return res.status(500).json({
    message: "Internal Server Error",
  });
};