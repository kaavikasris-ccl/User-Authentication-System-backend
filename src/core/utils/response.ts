import { Response } from "express";

export interface Meta {
  correlation_id: string;
  page?: number;
  limit?: number;
  total?: number;
  total_pages?: number;
  has_next?: boolean;
  has_prev?: boolean;
}

export interface ErrorDetail {
  general: string;
}

export class ResponseBuilder {
  /**
   * SUCCESS RESPONSE
   */
  static success<T>(
    res: Response,
    data: T,
    correlation_id: string,
    statusCode = 200,
    message = "Success"
  ): Response {
    return res.status(statusCode).json({
      data,
      error: null,
      message,
      meta: {
        correlation_id,
      },
    });
  }

  /**
   * ERROR RESPONSE
   */
  static error(
    res: Response,
    message: string,
    correlation_id: string,
    statusCode = 400
  ): Response {
    return res.status(statusCode).json({
      data: null,
      error: {
        errors: [
          {
            general: message,
          },
        ],
      },
      message: "Error",
      meta: {
        correlation_id,
      },
    });
  }
}