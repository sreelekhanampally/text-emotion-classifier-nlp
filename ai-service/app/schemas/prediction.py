from typing import Annotated

from pydantic import AliasChoices, BaseModel, ConfigDict, Field, field_validator

from app.core.config import get_settings


class PredictionRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    text: Annotated[str, Field(min_length=1, max_length=50000)]

    @field_validator("text")
    @classmethod
    def enforce_text_limit(cls, value: str) -> str:
        if len(value) > get_settings().max_text_length:
            raise ValueError(f"Text must not exceed {get_settings().max_text_length} characters")
        return value


class InternalPredictionRequest(PredictionRequest):
    request_id: str | None = Field(
        default=None,
        validation_alias=AliasChoices("requestId", "request_id"),
        serialization_alias="requestId",
    )


class BatchPredictionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    texts: Annotated[list[str], Field(min_length=1, max_length=1000)]

    @field_validator("texts")
    @classmethod
    def validate_texts(cls, values: list[str]) -> list[str]:
        settings = get_settings()
        if len(values) > settings.max_batch_size:
            raise ValueError(f"Batch size must not exceed {settings.max_batch_size}")

        normalized = [value.strip() if isinstance(value, str) else value for value in values]
        if any(not isinstance(value, str) or not value for value in normalized):
            raise ValueError("Every batch item must be a non-empty string")
        if any(len(value) > settings.max_text_length for value in normalized):
            raise ValueError(f"Each text must not exceed {settings.max_text_length} characters")
        return normalized


class RankedPrediction(BaseModel):
    emotion: str
    confidence: float = Field(ge=0, le=1)


class PredictionResult(BaseModel):
    emotion: str
    confidence: float = Field(ge=0, le=1)
    top_predictions: list[RankedPrediction] = Field(min_length=1, max_length=3)
    probabilities: dict[str, float]
    model_version: str
    processing_time_ms: float = Field(ge=0)


class PredictionResponse(PredictionResult):
    request_id: str
    response_time_ms: float = Field(ge=0)


class BatchPredictionResponse(BaseModel):
    predictions: list[PredictionResult]
    model_version: str
    request_id: str
    response_time_ms: float = Field(ge=0)


class HealthResponse(BaseModel):
    status: str
    model_version: str


class RootResponse(BaseModel):
    service: str
    status: str
    docs_url: str
