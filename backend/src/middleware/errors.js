export class AppError extends Error {
  constructor({ status = 500, code = "INTERNAL_ERROR", message, details, cause } = {}) {
    super(message, { cause });
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.isOperational = status < 500;
  }
}

export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
