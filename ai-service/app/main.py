from contextlib import asynccontextmanager
from time import perf_counter
from uuid import uuid4

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.routes import router
from app.core.config import get_settings
from app.core.logging import configure_logging
from app.inference.service import PredictionService, load_model_bundle
from app.preprocessing.text import build_preprocessor



@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    logger = configure_logging(settings.log_level)
    logger.info("model_initialization_started")
    
    preprocessor = build_preprocessor(settings)
    bundle = load_model_bundle(settings)
    app.state.prediction_service = PredictionService(bundle, preprocessor, settings.model_version)
    app.state.model_version = settings.model_version
    app.state.logger = logger
    logger.info("model_initialization_completed", extra={"model_version": settings.model_version})

    yield

    logger.info("service_shutdown_completed", extra={"model_version": settings.model_version})


app = FastAPI(
    title="EmotionSense AI Service",
    version="1.0.0",
    description="Private FastAPI service for emotion classification inference.",
    lifespan=lifespan,
)


@app.middleware("http")
async def request_context(request: Request, call_next):
    started_at = perf_counter()
    request.state.request_id = request.headers.get("x-request-id") or str(uuid4())

    response = await call_next(request)
    response.headers["x-request-id"] = request.state.request_id

    logger = request.app.state.logger
    logger.info(
        "request_completed",
        extra={
            "request_id": request.state.request_id,
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "response_time_ms": round((perf_counter() - started_at) * 1000, 3),
            "model_version": request.app.state.model_version,
        },
    )
    return response


@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    details = [
        {"field": ".".join(str(part) for part in error["loc"]), "message": error["msg"]}
        for error in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "The request is invalid.",
                "details": details,
                "request_id": request.state.request_id,
            }
        },
    )


@app.exception_handler(StarletteHTTPException)
async def http_error_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    detail = exc.detail if isinstance(exc.detail, dict) else {}
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": detail.get("code", "HTTP_ERROR"),
                "message": detail.get("message", "The request could not be completed."),
                "request_id": request.state.request_id,
            }
        },
    )


@app.exception_handler(Exception)
async def unhandled_error_handler(request: Request, exc: Exception) -> JSONResponse:
    request.app.state.logger.exception(
        "request_failed",
        extra={
            "request_id": request.state.request_id,
            "method": request.method,
            "path": request.url.path,
            "model_version": request.app.state.model_version,
        },
    )
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred.",
                "request_id": request.state.request_id,
            }
        },
    )


app.include_router(router)
