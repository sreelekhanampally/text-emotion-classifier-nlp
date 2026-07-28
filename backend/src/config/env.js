import "dotenv/config";
import { cleanEnv, num, str } from "envalid";

const environment = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production"], default: "development" }),
  PORT: num({ default: 3000 }),
  CORS_ALLOWED_ORIGINS: str({ default: "http://localhost:5173,http://localhost:3000" }),
  AI_SERVICE_BASE_URL: str(),
  AI_SERVICE_API_KEY: str(),
  AI_SERVICE_TIMEOUT_MS: num({ default: 5000 }),
  RATE_LIMIT_WINDOW_MS: num({ default: 900000 }),
  RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
  LOG_LEVEL: str({ choices: ["fatal", "error", "warn", "info", "debug", "trace"], default: "info" })
});

const allowedOrigins = environment.CORS_ALLOWED_ORIGINS.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const env = Object.freeze({
  ...environment,
  allowedOrigins
});