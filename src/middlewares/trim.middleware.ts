import { Request, Response, NextFunction } from "express";

export const trimBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => {
      const value = req.body[key];

      if (typeof value === "string") {
        req.body[key] = value.trim();
      }
    });
  }

  next();
};