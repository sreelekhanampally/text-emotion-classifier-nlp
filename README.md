# 🧠 EmotionSense AI

<p align="left">

<img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white">

<img src="https://img.shields.io/badge/FastAPI-Production-009688?style=for-the-badge&logo=fastapi&logoColor=white">

<img src="https://img.shields.io/badge/scikit--learn-Machine%20Learning-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white">

<img src="https://img.shields.io/badge/NLTK-NLP-4B8BBE?style=for-the-badge">

<img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">

</p>

Production-ready full-stack AI application for real-time emotion classification from natural language text using a FastAPI inference service, Express.js backend, React frontend, and a classical NLP pipeline powered by TF-IDF and a Calibrated Linear SVM.

---

# Overview

EmotionSense AI demonstrates an end-to-end machine learning system, covering data preprocessing, model training, API serving, deployment, and frontend integration.

The project is designed to classify user text into one of six emotions while exposing a lightweight REST API suitable for production environments. It emphasizes modular architecture, fast inference, maintainability, and reproducible machine learning workflows.

The repository contains four independent but connected components:

| Component | Purpose |
|-----------|---------|
| **AI Service** | FastAPI inference service serving the trained emotion classifier |
| **Backend API** | Express.js application responsible for business logic and API integration |
| **Frontend** | React application for user interaction |
| **Demo App** | Streamlit interface for quick model experimentation |

---

# Architecture

## System Architecture

```text
                    User
                      │
                      ▼
              React Frontend (Vercel)
                      │
                      ▼
            Express Backend (Render)
                      │
                      ▼
        FastAPI AI Inference Service
      (Hugging Face Docker Spaces)
                      │
                      ▼
         TF-IDF + Calibrated Linear SVM
                      │
                      ▼
            Emotion Prediction API
```

The frontend communicates with the Express backend, which delegates emotion prediction requests to the FastAPI inference service. The AI service loads the trained model during application startup and returns predictions with calibrated confidence scores through a REST interface.

---

## Machine Learning Pipeline

```text
Raw Text
    │
    ▼
Text Preprocessing
    │
    ▼
TF-IDF Vectorization
    │
    ▼
Calibrated Linear SVM
    │
    ▼
Emotion Prediction
    │
    ▼
JSON Response
```

The inference pipeline performs text preprocessing before transforming input into TF-IDF features. These features are passed to a calibrated Linear Support Vector Machine that predicts one of six supported emotions and returns confidence scores together with ranked predictions.

---

## Repository Structure

```text
EmotionSense-AI
│
├── ai-demo/                  # Streamlit demonstration
│
├── ai-service/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── inference/
│   │   ├── preprocessing/
│   │   ├── schemas/
│   │   └── main.py
│   │
│   ├── models/
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
│
├── backend/
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── .env.example
│
├── notebooks/
├── data/
├── screenshots/
└── README.md
```

The repository separates training, inference, backend services, frontend, and demonstration applications into independent modules, allowing each component to evolve without tightly coupling the overall system.

---
# Features

## AI Features

- Classical NLP pipeline using **TF-IDF Vectorization** and a **Calibrated Linear SVM**
- Real-time emotion prediction with **calibrated confidence scores**
- Top-3 ranked emotion predictions
- Six supported emotion classes
- Text preprocessing with:
  - Lowercase normalization
  - URL and digit removal
  - Punctuation filtering
  - English stopword removal
  - WordNet lemmatization
- Modular preprocessing and inference pipelines
- Serialized model artifacts for reproducible inference

---

## Backend Features

- RESTful inference API built with **FastAPI**
- Express.js backend for full-stack integration
- Pydantic request and response validation
- Centralized configuration using environment variables
- Health monitoring endpoint
- Lightweight JSON-based communication
- Modular project architecture for maintainability

---

## Production Features

- Dockerized AI inference service
- Startup model loading to eliminate per-request disk I/O
- Separate training and inference workflows
- Versioned model artifacts
- Environment-based configuration
- Production-ready folder structure
- Multi-service deployment architecture

---

# Technology Stack

| Layer | Technologies |
|--------|--------------|
| Frontend | React, Vite, JavaScript |
| Backend | Node.js, Express.js |
| AI Service | FastAPI, Uvicorn |
| Machine Learning | Scikit-learn, NumPy, Joblib |
| NLP | TF-IDF, NLTK, WordNet |
| Validation | Pydantic |
| Containerization | Docker |
| Deployment | Hugging Face Spaces, Render, Vercel |

---

# Performance

| Metric | Value |
|---------|-------|
| Model | Calibrated Linear SVM |
| Feature Extraction | TF-IDF Vectorizer |
| Accuracy | **90.22%** |
| Emotion Classes | **6** |
| Average Inference Time | **< 10 ms** |
| Prediction Output | Emotion + Confidence + Top-3 Predictions |
| Framework | FastAPI + Uvicorn |
| Current Version | 1.0 |

---

## Supported Emotions

| Joy | Sadness | Anger |
|:---:|:--------:|:-----:|
| Fear | Love | Surprise |

---

# API Reference

## Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| GET | `/health` | Service health check |
| POST | `/predict` | Predict emotion from input text |

---

### Request

```http
POST /predict
```

```json
{
  "text": "I got selected for my dream company!"
}
```

---

### Response

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
    },
    {
      "emotion": "love",
      "confidence": 0.01
    }
  ],
  "processing_time_ms": 8.1,
  "model_version": "2026.07.1"
}
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/sreelekhanampally/text-emotion-classifier-nlp.git

cd EmotionSense-AI
```

---

## AI Service

```bash
cd ai-service

python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Streamlit Demo

```bash
cd ai-demo

pip install -r requirements.txt

streamlit run app.py
```

---

Interactive API documentation:

```
http://127.0.0.1:8000/docs
```

---

# Deployment

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Render |
| AI Service | Hugging Face Docker Spaces |
| Demo Application | Hugging Face Spaces |

The frontend communicates with the Express backend, which forwards inference requests to the FastAPI AI service running as a Docker container. This separation enables independent deployment, scaling, and future model upgrades without impacting the client application.

---
# Engineering Highlights

The project focuses on building a maintainable and production-oriented machine learning system rather than only maximizing classification accuracy.

### Model Selection

- **Linear SVM** was selected because it performs efficiently on sparse TF-IDF feature spaces while providing fast inference and low memory usage.
- **CalibratedClassifierCV** generates reliable confidence scores without replacing the underlying classifier.

### System Design

- Modular architecture separating preprocessing, inference, API, backend, and training components.
- FastAPI inference service with typed request and response validation using Pydantic.
- Model artifacts loaded once during application startup to eliminate repeated disk I/O.
- Independent training and inference pipelines simplify future model upgrades.
- Environment-based configuration for deployment portability.
- Dockerized AI service for reproducible local and production environments.

---

# Version Evolution

## Version 1

### Key Capabilities

- TF-IDF Vectorization
- Calibrated Linear SVM
- FastAPI inference service
- Six emotion classes
- Confidence scores
- Docker deployment

### Known Limitations

Although Version 1 achieves **90.22% accuracy**, it has several known limitations.

- Negation words (`not`, `no`, `never`) are removed during preprocessing.
- TF-IDF cannot fully capture contextual meaning.
- Sarcasm and figurative language are not understood.
- Internet slang and unseen vocabulary reduce prediction quality.
- Minority emotion classes receive lower confidence.

#### Example

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

## 🚀 Version 2 Improvements

Version 2 keeps the same dataset and the same classical stack (**TF-IDF + Calibrated Linear SVM**), but improves one major weakness of the baseline: **understanding negated emotions** (e.g., *"I am not happy"*).

---

### ✅ Preprocessing

- **Contraction expansion** — `contractions.fix()` runs before tokenization, converting *can't*, *don't*, and *won't* into their expanded forms so negation words are preserved.

- **Preserved negation tokens** — `not`, `no`, `nor`, and `never` are excluded from the stopword list because removing them changes the meaning of a sentence.

- **Clause-scoped negation marking** — Sentences are split into clauses using punctuation (`. , ; ! ?`) and the connector **but**. Every word after a negation is prefixed with `NEG_`, allowing the model to distinguish between positive and negated emotions.

```text
happy      → happy
not happy  → not NEG_happy
```

- **Removed the `len(token) > 2` filter** — Keeps meaningful short words like `no` that were previously discarded.

---

### ✅ Model Engineering

- Wrapped **TF-IDF + Calibrated LinearSVC** into a single Scikit-Learn **Pipeline**, ensuring the same preprocessing is applied during training and inference.

- Performed **5-fold GridSearchCV** to tune `C`, `min_df`, and `ngram_range`, using **Macro F1** as the optimization metric.

- Enabled `class_weight="balanced"` to reduce bias toward majority classes and improve learning on minority emotions.

- Saved the model using the same three-artifact structure as Version 1 (`emotion_model.pkl`, `tfidf_vectorizer.pkl`, and `label_classes.pkl`), allowing the existing FastAPI service to work without modification.

---

### ✅ Negation-Aware Data Augmentation

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

### 📊 Performance

| Version | Accuracy | Highlights |
|---------|---------:|-----------|
| **Version 1** | **90.09%** | Strong baseline, poor negation handling |
| **Version 2** | **87–88%** | Better semantic understanding of negated emotions |

The small drop in accuracy is expected because introducing `NEG_` features increases the vocabulary size. In return, the model produces more meaningful predictions on negated sentences.

---

### ✅ Negation Sanity Check

| Input | Prediction |
|-------|------------|
| I am happy | 😊 Joy |
| I am not happy | 😔 Sadness |
| I am sad | 😔 Sadness |
| I am not sad | 😊 Joy |
| I am excited | 😊 Joy |
| I am not excited | 😔 Sadness |

---

### ⚠️ Current Limitations

- Verb-based negation (e.g., *I never wanted this*) remains challenging.
- Sarcasm and irony are not handled.
- Multi-emotion sentences are reduced to a single label.
- Rare unseen emotion words may still be misclassified.

---

## Version 3 (Planned)

The next iteration will focus on contextual language understanding while preserving the existing production architecture.

### Planned Enhancements

- Evaluate transformer-based sentence embeddings.
- Explore the GoEmotions dataset.
- Benchmark DistilBERT against the classical NLP pipeline.
- Compare latency, memory usage, and prediction quality.
- Investigate multi-label emotion classification.

---

# Roadmap

- [x] Baseline TF-IDF + Calibrated Linear SVM
- [x] FastAPI inference service
- [x] Dockerized AI deployment
- [x] Negation-aware preprocessing
- [x] Hyperparameter tuning with GridSearchCV
- [x] Targeted synthetic data augmentation
- [ ] Transformer-based emotion classification
- [ ] Expanded emotion taxonomy
- [ ] Multi-label emotion prediction
- [ ] Model benchmarking dashboard

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
