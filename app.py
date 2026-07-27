"""Streamlit interface for the text emotion classifier."""

from pathlib import Path
import joblib

import streamlit as st

ROOT = Path(__file__).resolve().parent
MODELS = ROOT / "models"


@st.cache_resource
def load_artifacts():
    """Load the trained classifier and its text vectorizer once per session."""
    model = joblib.load(MODELS / "emotion_model.pkl")
    vectorizer = joblib.load(MODELS / "tfidf_vectorizer.pkl")
    return model, vectorizer


def predict_emotion(text: str):
    model, vectorizer = load_artifacts()
    features = vectorizer.transform([text])
    prediction = model.predict(features)[0]
    confidence = None
    if hasattr(model, "predict_proba"):
        confidence = float(model.predict_proba(features).max())
    return prediction, confidence


st.set_page_config(page_title="Emotion Classifier", page_icon="💬")
st.title("Text Emotion Classifier")
st.caption("Paste or type text below, then classify its emotion.")

text = st.text_area(
    "Text to analyse",
    placeholder="Paste your text here (Ctrl+V), or type it…",
    height=180,
)

if st.button("Classify emotion", type="primary"):
    cleaned_text = text.strip()
    if not cleaned_text:
        st.warning("Paste or type some text before classifying it.")
    else:
        try:
            emotion, confidence = predict_emotion(cleaned_text)
        except FileNotFoundError:
            st.error("The trained model files could not be found in the models folder.")
        except Exception as error:
            st.error(f"Unable to classify this text: {error}")
        else:
            st.success(f"Predicted emotion: **{emotion}**")
            if confidence is not None:
                st.caption(f"Model confidence: {confidence:.1%}")
