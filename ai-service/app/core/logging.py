import json
import logging
from datetime import datetime, timezone
from typing import Any


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        payload: dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "service": "emotionsense-ai-service",
            "message": record.getMessage(),
        }
        for key in ("request_id", "method", "path", "status_code", "response_time_ms", "model_version"):
            value = getattr(record, key, None)
            if value is not None:
                payload[key] = value
        if record.exc_info:
            payload["exception"] = self.formatException(record.exc_info)
        return json.dumps(payload, default=str)


def configure_logging(level: str) -> logging.Logger:
    logger = logging.getLogger("emotionsense")
    logger.setLevel(level)
    logger.handlers.clear()
    logger.propagate = False

    handler = logging.StreamHandler()
    handler.setFormatter(JsonFormatter())
    logger.addHandler(handler)
    return logger
