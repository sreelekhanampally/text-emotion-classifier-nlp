import http from "node:http";
import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./observability/logger.js";

const server = http.createServer(app);

server.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "server_started");
});

function shutdown(signal) {
  logger.info({ signal }, "shutdown_started");

  server.close((error) => {
    if (error) {
      logger.error({ err: error }, "shutdown_failed");
      process.exitCode = 1;
    } else {
      logger.info("shutdown_completed");
    }
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
