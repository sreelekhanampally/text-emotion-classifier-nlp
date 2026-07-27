import { requestPrediction } from "../clients/ai-service.client.js";
import { AppError } from "../middleware/errors.js";

export async function predictEmotion({ text, requestId }) {
  const prediction = await requestPrediction({ text, requestId });

  if (
    !prediction ||
    typeof prediction.emotion !== "string" ||
    typeof prediction.confidence !== "number" ||
    typeof prediction.modelVersion !== "string"
  ) {
    throw new AppError({
      status: 503,
      code: "AI_SERVICE_INVALID_RESPONSE",
      message: "The prediction service returned an invalid response."
    });
  }

  return prediction;
}
