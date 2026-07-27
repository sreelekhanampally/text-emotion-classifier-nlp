import compression from "compression";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { AppError } from "./middleware/errors.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { requestContext } from "./middleware/request-context.js";
import { logger, morganStream } from "./observability/logger.js";
import { apiRouter } from "./routes/v1.routes.js";
import { sendError } from "./utils/response.js";

const app = express();

app.disable("x-powered-by");
app.use(requestContext);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: morganStream
  })
);
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new AppError({
          status: 403,
          code: "CORS_ORIGIN_DENIED",
          message: "This origin is not allowed to access the API."
        })
      );
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-Id"],
    maxAge: 86400
  })
);
app.use(express.json({ limit: "16kb", strict: true }));

app.use(
  "/v1",
  rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    limit: env.RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler(req, res) {
      logger.warn({ requestId: req.requestId, path: req.originalUrl }, "rate_limit_exceeded");
      return sendError(res, {
        status: 429,
        code: "RATE_LIMIT_EXCEEDED",
        message: "Too many requests. Please try again later.",
        requestId: req.requestId
      });
    }
  }),
  apiRouter
);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
