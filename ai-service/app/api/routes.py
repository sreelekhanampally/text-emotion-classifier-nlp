from time import perf_counter

from fastapi import APIRouter, Depends, Request

from app.api.dependencies import verify_internal_api_key
from app.schemas.prediction import (
    BatchPredictionRequest,
    BatchPredictionResponse,
    HealthResponse,
    InternalPredictionRequest,
    PredictionRequest,
    PredictionResponse,
    RootResponse,
)

router = APIRouter()


def prediction_response(request: Request, text: str) -> PredictionResponse:
    started_at = perf_counter()
    prediction = request.app.state.prediction_service.predict(text)
    return PredictionResponse(
        **prediction.model_dump(),
        request_id=request.state.request_id,
        response_time_ms=round((perf_counter() - started_at) * 1000, 3),
    )


@router.get("/", response_model=RootResponse, tags=["service"])
def root() -> RootResponse:
    return RootResponse(service="emotionsense-ai-service", status="ok", docs_url="/docs")


@router.get("/health", response_model=HealthResponse, tags=["service"])
def health(request: Request) -> HealthResponse:
    return HealthResponse(status="ok", model_version=request.app.state.model_version)


@router.post("/predict", response_model=PredictionResponse, tags=["inference"])
def predict(payload: PredictionRequest, request: Request) -> PredictionResponse:
    return prediction_response(request, payload.text)


@router.post("/batch-predict", response_model=BatchPredictionResponse, tags=["inference"])
def batch_predict(payload: BatchPredictionRequest, request: Request) -> BatchPredictionResponse:
    started_at = perf_counter()
    predictions = request.app.state.prediction_service.predict_batch(payload.texts)
    return BatchPredictionResponse(
        predictions=predictions,
        model_version=request.app.state.model_version,
        request_id=request.state.request_id,
        response_time_ms=round((perf_counter() - started_at) * 1000, 3),
    )


@router.post(
    "/internal/v1/predictions",
    response_model=PredictionResponse,
    dependencies=[Depends(verify_internal_api_key)],
    include_in_schema=False,
)
def internal_predict(payload: InternalPredictionRequest, request: Request) -> PredictionResponse:
    return prediction_response(request, payload.text)
