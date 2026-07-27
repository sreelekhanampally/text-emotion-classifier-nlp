from hashlib import sha256
from hmac import compare_digest

from fastapi import Header, HTTPException, status

from app.core.config import get_settings


def verify_internal_api_key(
    x_ai_service_key: str | None = Header(default=None),
) -> None:
    settings = get_settings()
    received = sha256((x_ai_service_key or "").encode()).digest()
    expected = sha256(settings.internal_api_key.encode()).digest()

    if not compare_digest(received, expected):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": "INVALID_SERVICE_CREDENTIAL", "message": "Invalid service credential."},
        )
