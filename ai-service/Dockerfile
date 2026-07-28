FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    NLTK_DATA=/app/nltk_data \
    NLTK_DATA_PATH=/app/nltk_data \
    MODEL_BUNDLE_PATH=/app/models

WORKDIR /app

COPY requirements.txt /tmp/requirements.txt

RUN pip install --no-cache-dir -r /tmp/requirements.txt

RUN mkdir -p /app/nltk_data

RUN python -m nltk.downloader -d /app/nltk_data punkt_tab stopwords wordnet

RUN find /app/nltk_data

COPY app /app/app
COPY models /app/models
COPY .env.example /app/.env.example

RUN useradd --create-home --uid 10001 appuser \
    && chown -R appuser:appuser /app

USER appuser

EXPOSE 8000

CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1 --proxy-headers"]