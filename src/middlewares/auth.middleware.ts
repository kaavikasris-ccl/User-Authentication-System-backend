import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "@/config/env";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
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