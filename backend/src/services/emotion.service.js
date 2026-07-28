import { requestPrediction } from "../clients/ai-service.client.js";
import { AppError } from "../middleware/errors.js";

export async function predictEmotion({ text, requestId }) {
  const prediction = await requestPrediction({ text, requestId });

  const normalized = {
    emotion: prediction.emotion,
    confidence: prediction.confidence,
    topPredictions: prediction.top_predictions,
    probabilities: prediction.probabilities,
    modelVersion: prediction.model_version,
    processingTimeMs: prediction.processing_time_ms
  };

  if (
    typeof normalized.emotion !== "string" ||
    typeof normalized.confidence !== "number" ||
    typeof normalized.modelVersion !== "string"
  ) {
    throw new AppError({
      status: 503,
      code: "AI_SERVICE_INVALID_RESPONSE",
      message: "The prediction service returned an invalid response."
    });
  }

  return normalized;
}