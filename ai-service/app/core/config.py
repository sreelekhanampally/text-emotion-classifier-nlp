from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_env: str = Field(default="development", validation_alias="APP_ENV")
    host: str = Field(default="0.0.0.0", validation_alias="HOST")
    port: int = Field(default=8000, ge=1, le=65535, validation_alias="PORT")
    model_bundle_path: Path = Field(validation_alias="MODEL_BUNDLE_PATH")
    model_version: str = Field(min_length=1, validation_alias="MODEL_VERSION")
    internal_api_key: str = Field(min_length=16, validation_alias="INTERNAL_API_KEY")
    max_text_length: int = Field(default=5000, ge=1, le=50000, validation_alias="MAX_TEXT_LENGTH")
    max_batch_size: int = Field(default=100, ge=1, le=1000, validation_alias="MAX_BATCH_SIZE")
    log_level: str = Field(default="INFO", validation_alias="LOG_LEVEL")
    nltk_data_path: Path = Field(default=Path("/app/nltk_data"), validation_alias="NLTK_DATA_PATH")

    @field_validator("app_env")
    @classmethod
    def validate_environment(cls, value: str) -> str:
        if value not in {"development", "test", "production"}:
            raise ValueError("APP_ENV must be development, test, or production")
        return value

    @field_validator("log_level")
    @classmethod
    def validate_log_level(cls, value: str) -> str:
        normalized = value.upper()
        if normalized not in {"CRITICAL", "ERROR", "WARNING", "INFO", "DEBUG"}:
            raise ValueError("LOG_LEVEL must be a valid Python logging level")
        return normalized


@lru_cache
def get_settings() -> Settings:
    return Settings()
