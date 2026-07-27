import { Router } from "express";
import { asyncHandler } from "../middleware/errors.js";
import { validateRequest } from "../middleware/validate-request.js";
import { predictEmotionValidation } from "../schemas/emotion.schema.js";
import { predictEmotionController } from "../controllers/emotion.controller.js";

export const emotionRouter = Router();

emotionRouter.post(
  "/emotions:predict",
  predictEmotionValidation,
  validateRequest,
  asyncHandler(predictEmotionController)
);
