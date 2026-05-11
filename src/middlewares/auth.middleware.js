import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
export const verifyToken = (
  req,
  res,
  next
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  try {
    jwt.verify(token, env.JWT_SECRET);

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};