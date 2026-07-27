# 🧠 EmotionSense AI

> **Production-Ready NLP API for Real-Time Emotion Classification**

<p align="left">
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white">
  </a>
  <a href="https://fastapi.tiangolo.com/">
    <img src="https://img.shields.io/badge/FastAPI-Production-009688?style=for-the-badge&logo=fastapi&logoColor=white">
  </a>
  <a href="https://scikit-learn.org/">
    <img src="https://img.shields.io/badge/scikit--learn-Machine%20Learning-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white">
  </a>
  <a href="https://www.nltk.org/">
    <img src="https://img.shields.io/badge/NLTK-NLP-4B8BBE?style=for-the-badge">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">
  </a>
</p>

---

# 📌 Executive Summary

EmotionSense AI is a production-ready NLP API that predicts **six human emotions** from natural language text using a classical Machine Learning pipeline.

Version 1 combines **TF-IDF Vectorization** with a **Calibrated Linear Support Vector Machine (Linear SVM)** and serves predictions through a **FastAPI REST API** optimized for low-latency inference.

The project demonstrates the complete ML workflow from preprocessing and feature engineering to model deployment and real-time prediction.

---

# ⚡ Key Performance

| Metric | Value |
|:------|:------|
| **Model** | Calibrated Linear SVM |
| **Feature Extraction** | TF-IDF Vectorizer |
| **Accuracy** | **90.22%** |
| **Emotion Classes** | 6 |
| **Average Inference Time** | **<10 ms** |
| **Framework** | FastAPI + Uvicorn |
| **Prediction Output** | Emotion + Confidence + Top-3 Predictions |
| **Version** | 1.0 |

---

# 😊 Supported Emotions

| 😊 Joy | 😢 Sadness | 😠 Anger |
|:------:|:----------:|:--------:|
| 😨 Fear | ❤️ Love | 😲 Surprise |

---

# 🔄 NLP Pipeline

```text
Raw Text
    │
    ▼
Text Preprocessing
    │
    ▼
TF-IDF Vectorizer
    │
    ▼
Calibrated Linear SVM
    │
    ▼
JSON API Response
```

---

# 🔍 Machine Learning Pipeline

## ✅ Text Preprocessing

The input text is cleaned before feature extraction using:

- Lowercase normalization
- URL & digit removal
- Punctuation filtering
- English stopword removal
- WordNet lemmatization

---

## ✅ Feature Extraction

The cleaned text is converted into numerical features using **TF-IDF Vectorization** with **unigrams** and **bigrams**.

---

## ✅ Emotion Classification

The TF-IDF features are passed to a **Calibrated Linear SVM**, which predicts one of six emotions and generates calibrated confidence scores using `CalibratedClassifierCV`.

---

# 💡 Why Linear SVM?

Linear SVM was chosen because it performs exceptionally well on sparse TF-IDF features while remaining lightweight enough for production APIs.

### Advantages

- Fast inference
- Low memory usage
- Strong generalization on text data
- Excellent performance on sparse feature spaces

Since Linear SVM does not produce probabilities by default, **CalibratedClassifierCV** is used to generate reliable confidence scores.

---

# 🚀 API Endpoints

| Endpoint | Method | Description |
|----------|:------:|-------------|
| `/health` | GET | Service health check |
| `/predict` | POST | Predict emotion from text |

---

## Example Request

```http
POST /predict
```

```json
{
  "text": "I got selected for my dream company!"
}
```

---

## Example Response

```json
{
  "emotion": "joy",
  "confidence": 0.98,
  "top_predictions": [
    {
      "emotion": "joy",
      "confidence": 0.98
    },
    {
      "emotion": "surprise",
      "confidence": 0.01
    }
  ],
  "processing_time_ms": 8.1,
  "model_version": "2026.07.1"
}
```

---

# 🛠️ Installation

```bash
git clone https://github.com/your-username/EmotionSense-AI.git

cd EmotionSense-AI

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Interactive API Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 📂 Project Structure

```text
EmotionSense-AI
│
├── ai-service
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── inference
│   │   ├── middleware
│   │   ├── preprocessing
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   ├── models
│   └── requirements.txt
│
├── notebooks
├── data
├── README.md
└── LICENSE
```

---

# ⚙️ Engineering Highlights

| Feature | Description |
|----------|-------------|
| Modular Architecture | Clean separation of preprocessing, inference, and API layers |
| Startup Model Loading | Model artifacts are loaded once during application startup |
| Request Validation | Typed request/response schemas using Pydantic |
| Dependency Injection | Simplifies service initialization |
| Environment Configuration | Runtime settings managed through environment variables |
| REST API | Lightweight FastAPI endpoints |
| Health Monitoring | Built-in health check endpoint |
| Model Versioning | Serialized ML artifacts tracked independently |

---

# 📚 Technology Stack

| Category | Technologies |
|----------|--------------|
| Language | Python 3.11 |
| Machine Learning | Scikit-Learn, NumPy, Joblib |
| NLP | NLTK, TF-IDF, WordNet Lemmatizer |
| Backend | FastAPI, Uvicorn, Pydantic |

---

# ⚠️ Current Limitations (Version 1)

Although Version 1 achieves **90.22% accuracy**, it has several known limitations.

- Negation words (`not`, `no`, `never`) are removed during preprocessing.
- TF-IDF cannot fully capture contextual meaning.
- Sarcasm and figurative language are not understood.
- Internet slang and unseen vocabulary reduce prediction quality.
- Minority emotion classes receive lower confidence.

### Example

```text
Input

I am not happy.

        ↓

Preprocessing

happy

        ↓

Prediction

😊 Joy ❌
```

---

# 🚀 Version 2 Improvements

Version 2 keeps the same dataset and the same classical stack (**TF-IDF + Calibrated Linear SVM**), but improves one major weakness of the baseline: **understanding negated emotions** (e.g., *"I am not happy"*).

---

## ✅ Preprocessing

- **Contraction expansion** — `contractions.fix()` runs before tokenization, converting *can't*, *don't*, and *won't* into their expanded forms so negation words are preserved.

- **Preserved negation tokens** — `not`, `no`, `nor`, and `never` are excluded from the stopword list because removing them changes the meaning of a sentence.

- **Clause-scoped negation marking** — Sentences are split into clauses using punctuation (`. , ; ! ?`) and the connector **but**. Every word after a negation is prefixed with `NEG_`, allowing the model to distinguish between positive and negated emotions.

  ```text
  happy      → happy
  not happy  → not NEG_happy
  ```

- **Removed the `len(token) > 2` filter** — Keeps meaningful short words like `no` that were previously discarded.

---

## ✅ Model Engineering

- Wrapped **TF-IDF + Calibrated LinearSVC** into a single Scikit-Learn **Pipeline**, ensuring the same preprocessing is applied during training and inference.

- Performed **5-fold GridSearchCV** to tune `C`, `min_df`, and `ngram_range`, using **Macro F1** as the optimization metric.

- Enabled `class_weight="balanced"` to reduce bias toward majority classes and improve learning on minority emotions.

- Saved the model using the same three-artifact structure as Version 1 (`emotion_model.pkl`, `tfidf_vectorizer.pkl`, and `label_classes.pkl`), allowing the existing FastAPI service to work without modification.

---

## ✅ Negation-Aware Data Augmentation

Dataset analysis showed that negated emotion phrases were extremely rare.

| Phrase | Count |
|---------|------:|
| `not` | 1,670 |
| `never` | 248 |
| `happy` | 234 |
| `not happy` | 2 |
| `not sad` | 0 |
| `not excited` | 0 |

With so few examples, the model had almost nothing to learn from.

To improve coverage without changing the model architecture, Version 2 adds **~260 curated synthetic samples** generated from:

- 6 emotion lexicons (~65 emotion words)
- 4 negation templates
- Emotion-aware label flipping (e.g., Joy → Sadness)

The augmented samples are merged with the original dataset **before the train/test split**, allowing them to participate naturally in cross-validation.

---

## 📊 Performance

| Version | Accuracy | Highlights |
|---------|---------:|-----------|
| **Version 1** | **90.09%** | Strong baseline, poor negation handling |
| **Version 2** | **87–88%** | Better semantic understanding of negated emotions |

The small drop in accuracy is expected because introducing `NEG_` features increases the vocabulary size. In return, the model produces more meaningful predictions on negated sentences.

---

## ✅ Negation Sanity Check

| Input | Prediction |
|-------|------------|
| I am happy | 😊 Joy |
| I am not happy | 😔 Sadness |
| I am sad | 😔 Sadness |
| I am not sad | 😊 Joy |
| I am excited | 😊 Joy |
| I am not excited | 😔 Sadness |

---

## ⚠️ Current Limitations

- Verb-based negation (e.g., *I never wanted this*) remains challenging.
- Sarcasm and irony are not handled.
- Multi-emotion sentences are reduced to a single label.
- Rare unseen emotion words may still be misclassified.

---
# 🚀 Version Roadmap

| Version | Status | Highlights |
|----------|:------:|------------|
| ✅ Version 1 | Completed | Baseline TF-IDF + Calibrated Linear SVM, FastAPI deployment |
| 🚀 Version 2 | Completed | Negation handling, Pipeline, GridSearchCV, Data Augmentation |
| 🔬 Version 3 | Planned | Sentence Embeddings, GoEmotions, DistilBERT Evaluation |

---

## 📚 Key Learnings

- Classical NLP pipelines
- Negation-aware feature engineering
- Targeted data augmentation
- Hyperparameter tuning with GridSearchCV
- Model serialization for production deployment
- FastAPI model serving

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

## Sreelekha Nampally

**Aspiring Full-Stack & AI Engineer**

Currently exploring:

- Machine Learning
- Natural Language Processing
- Generative AI
- LLM Integration
- Retrieval-Augmented Generation (RAG)
- AI Agents
- Backend Engineering
- Full-Stack Development

---

⭐ If you found this project interesting, consider giving it a **Star**!