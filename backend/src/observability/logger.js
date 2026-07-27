import pino from "pino";
import { env } from "../config/env.js";

export const logger = pino({
  level: env.LOG_LEVEL,
  base: {
    service: "emotionsense-backend",
    environment: env.NODE_ENV
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.x-ai-service-key",
      "authorization",
      "x-ai-service-key"
    ],
    censor: "[REDACTED]"
  }
});

export const morganStream = {
  write(message) {
    logger.info({ http: message.trim() }, "http_request");
  }
};
