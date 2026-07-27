import axios from "axios";
import { env } from "../config/env.js";
import { AppError } from "../middleware/errors.js";

const client = axios.create({
  baseURL: env.AI_SERVICE_BASE_URL,
  timeout: env.AI_SERVICE_TIMEOUT_MS,
  headers: {
    "content-type": "application/json",
    "x-ai-service-key": env.AI_SERVICE_API_KEY
  }
});

export async function requestPrediction({ text, requestId }) {
  try {
    const response = await client.post("/internal/v1/predictions", { text, requestId }, {
      headers: { "x-request-id": requestId }
    });

    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      throw new AppError({
        status: 504,
        code: "AI_SERVICE_TIMEOUT",
        message: "The prediction service took too long to respond.",
        cause: error
      });
    }

    if (error.response?.status === 400) {
      throw new AppError({
        status: 400,
        code: "AI_SERVICE_REJECTED_REQUEST",
        message: "The text could not be processed.",
        cause: error
      });
    }

    throw new AppError({
      status: 503,
      code: "AI_SERVICE_UNAVAILABLE",
      message: "The prediction service is temporarily unavailable.",
      cause: error
    });
  }
}
