import { ZodError } from "zod";
import { AppError } from "@errors/app-error.js";

export const validate =
  (schema) => (req, res, next) => {
    try {

      schema.parse(req.body);

      next();

    } catch (error) {

      if (error instanceof ZodError) {

        const message =
          error.issues?.[0]?.message ||
          "Validation Error";

        return next(
          new AppError(message, 400)
        );
      }

      next(error);
    }
  };