import { logger } from "../observability/logger.js";
import { sendError } from "../utils/response.js";

export function notFoundHandler(req, res) {
  return sendError(res, {
    status: 404,
    code: "ROUTE_NOT_FOUND",
    message: "The requested endpoint does not exist.",
    requestId: req.requestId
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const status = Number.isInteger(error.status) ? error.status : 500;
  const code = error.code || "INTERNAL_ERROR";
  const isOperational = error.isOperational === true;
  const log = status >= 500 ? logger.error.bind(logger) : logger.warn.bind(logger);

  log(
    {
      err: error,
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      status,
      code
    },
    "request_failed"
  );

  return sendError(res, {
    status,
    code,
    message: isOperational ? error.message : "An unexpected error occurred.",
    requestId: req.requestId,
    ...(isOperational && error.details ? { details: error.details } : {})
  });
}
