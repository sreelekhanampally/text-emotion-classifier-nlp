import { predictEmotion } from "../services/emotion.service.js";
import { sendSuccess } from "../utils/response.js";

export async function predictEmotionController(req, res) {
  const prediction = await predictEmotion({
    text: req.body.text,
    requestId: req.requestId
  });

  return sendSuccess(res, {
    data: prediction,
    meta: {
      requestId: req.requestId,
      processedAt: new Date().toISOString()
    }
  });
}