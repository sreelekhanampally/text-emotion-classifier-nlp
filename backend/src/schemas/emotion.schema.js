import { body } from "express-validator";

export const predictEmotionValidation = [
  body("text")
    .exists({ checkFalsy: true })
    .withMessage("Text is required.")
    .bail()
    .isString()
    .withMessage("Text must be a string.")
    .bail()
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage("Text must be between 1 and 5000 characters.")
];
