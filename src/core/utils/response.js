export class ResponseBuilder {
  /**
   * SUCCESS RESPONSE
   */
  static success(
    res,
    data,
    correlation_id,
    statusCode = 200,
    message = "Success"
  ) {
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
    res,
    message,
    correlation_id,
    statusCode = 400
  ) {
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