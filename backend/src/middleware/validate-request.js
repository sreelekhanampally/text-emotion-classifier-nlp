import { validationResult } from "express-validator";
import { AppError } from "./errors.js";

export function validateRequest(req, res, next) {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return next(
    new AppError({
      status: 400,
      code: "VALIDATION_ERROR",
      message: "The request is invalid.",
      details: result.array().map(({ path, msg }) => ({ field: path, message: msg }))
    })
  );
}
