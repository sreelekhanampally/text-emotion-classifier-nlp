from dataclasses import dataclass
from pathlib import Path
from time import perf_counter
from typing import Any

import joblib
import numpy as np

from app.core.config import Settings
from app.preprocessing.text import TextPreprocessor
from app.schemas.prediction import PredictionResult, RankedPrediction


@dataclass(frozen=True)
class ModelBundle:
    model: Any
    vectorizer: Any
    label_classes: tuple[str, ...]


def load_model_bundle(settings: Settings) -> ModelBundle:
    bundle_path = Path(settings.model_bundle_path).resolve()
    artifact_paths = {
        "model": bundle_path / "emotion_model.pkl",
        "vectorizer": bundle_path / "tfidf_vectorizer.pkl",
        "label_classes": bundle_path / "label_classes.pkl",
    }

    missing = [name for name, path in artifact_paths.items() if not path.is_file() or path.stat().st_size == 0]
    if missing:
        raise RuntimeError(f"Missing or empty model artifacts: {', '.join(missing)}")

    model = joblib.load(artifact_paths["model"])
    vectorizer = joblib.load(artifact_paths["vectorizer"])
    labels = tuple(str(label) for label in joblib.load(artifact_paths["label_classes"]))

    if not hasattr(model, "predict_proba") or not hasattr(model, "classes_"):
        raise RuntimeError("The classifier must expose predict_proba and classes_")
    if not hasattr(vectorizer, "transform"):
        raise RuntimeError("The vectorizer must expose transform")
    if not labels or tuple(str(label) for label in model.classes_) != labels:
        raise RuntimeError("The saved label classes do not match the classifier classes")

    return ModelBundle(model=model, vectorizer=vectorizer, label_classes=labels)


class PredictionService:
    def __init__(self, bundle: ModelBundle, preprocessor: TextPreprocessor, model_version: str) -> None:
        self._bundle = bundle
        self._preprocessor = preprocessor
        self._model_version = model_version

    def predict(self, text: str) -> PredictionResult:
        return self.predict_batch([text])[0]

    def predict_batch(self, texts: list[str]) -> list[PredictionResult]:
        started_at = perf_counter()
        cleaned_texts = [self._preprocessor.process(text) for text in texts]
        features = self._bundle.vectorizer.transform(cleaned_texts)
        probability_matrix = self._bundle.model.predict_proba(features)
        processing_time_ms = round((perf_counter() - started_at) * 1000, 3)
        per_item_time_ms = round(processing_time_ms / len(texts), 3)

        return [
            self._format_prediction(probabilities, per_item_time_ms)
            for probabilities in probability_matrix
        ]

    def _format_prediction(self, probabilities: np.ndarray, processing_time_ms: float) -> PredictionResult:
        ranked_indices = np.argsort(probabilities)[::-1]
        probability_map = {
            label: round(float(probabilities[index]), 6)
            for index, label in enumerate(self._bundle.label_classes)
        }
        top_predictions = [
            RankedPrediction(
                emotion=self._bundle.label_classes[index],
                confidence=round(float(probabilities[index]), 6),
            )
            for index in ranked_indices[:3]
        ]
        best = top_predictions[0]

        return PredictionResult(
            emotion=best.emotion,
            confidence=best.confidence,
            top_predictions=top_predictions,
            probabilities=probability_map,
            model_version=self._model_version,
            processing_time_ms=processing_time_ms,
        )
