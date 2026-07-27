# 🧠 EmotionSense AI

> **Production-Ready NLP API for Real-Time Emotion Classification**

<p align="left">
  <a href="https://www.python.org/">
    <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  </a>
  <a href="https://fastapi.tiangolo.com/">
    <img src="https://img.shields.io/badge/FastAPI-Production-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  </a>
  <a href="https://scikit-learn.org/">
    <img src="https://img.shields.io/badge/scikit--learn-Machine%20Learning-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn">
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

EmotionSense AI is a production-ready NLP API that predicts human emotions from natural language text using a classical Machine Learning pipeline.

The application combines a **TF-IDF Vectorizer** with a **Calibrated Linear Support Vector Machine (Linear SVM)** and exposes the trained model through a **FastAPI REST API** capable of low-latency real-time inference.

This project demonstrates the complete machine learning lifecycle, including:

- Data preprocessing
- Feature engineering
- Model training
- Model evaluation
- Model serialization
- FastAPI deployment
- Production inference

---

# ⚡ Key Performance Metrics

| Metric | Value |
| :------ | :---- |
| **Model** | Calibrated Linear SVM |
| **Feature Extraction** | TF-IDF Vectorization |
| **Accuracy** | **90.22%** |
| **Emotion Classes** | 6 |
| **Average Inference Time** | **<10 ms** |
| **Framework** | FastAPI + Uvicorn |
| **Prediction Output** | Emotion + Confidence + Top-3 Predictions |
| **Status** | Version 1.0 |

---

# 😊 Supported Emotions

<p align="center">

😊 Joy &nbsp; | &nbsp;
😢 Sadness &nbsp; | &nbsp;
😠 Anger &nbsp; | &nbsp;
😨 Fear &nbsp; | &nbsp;
❤️ Love &nbsp; | &nbsp;
😲 Surprise

</p>

---

# 🔄 NLP & Inference Pipeline

```text
┌───────────┐
│ Raw Text  │
└─────┬─────┘
      │
      ▼
┌─────────────────────┐
│ Text Preprocessing  │
└─────┬───────────────┘
      │
      ▼
┌─────────────────────┐
│ TF-IDF Vectorizer   │
└─────┬───────────────┘
      │
      ▼
┌─────────────────────┐
│ Calibrated Linear   │
│ SVM Classifier      │
└─────┬───────────────┘
      │
      ▼
┌─────────────────────┐
│ JSON API Response   │
└─────────────────────┘
```

---

# 🔍 Machine Learning Pipeline

## Text Preprocessing

- Lowercase normalization
- URL removal
- Digit removal
- Punctuation filtering
- ASCII normalization
- Word tokenization
- English stopword removal
- WordNet lemmatization

---

## Feature Engineering

- TF-IDF Vectorization
- Sparse vector representation
- Unigram & Bigram feature extraction

---

## Classification

- Linear Support Vector Machine
- Probability calibration using `CalibratedClassifierCV`
- Multi-class emotion prediction

---

# 💡 Why Linear SVM?

Linear SVM was selected because it offers:

- Excellent performance on sparse TF-IDF vectors
- Fast prediction latency
- Low memory footprint
- Strong generalization
- Reliable performance for real-time REST APIs

Since standard SVM models do not produce calibrated probability estimates, **CalibratedClassifierCV** is used to generate confidence scores for every prediction.

---

# 🚀 API Reference

## Health Check

### Request

```http
GET /health
```

### Response

```json
{
  "status": "ok",
  "model_version": "2026.07.1"
}
```

---

## Predict Emotion

### Request

```http
POST /predict
```

```json
{
  "text": "I got selected for my dream company!"
}
```

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
    }
  ],
  "processing_time_ms": 8.1,
  "model_version": "2026.07.1"
}
```

---

# 🛠️ Installation

## Prerequisites

- Python 3.11+
- Git

---

## Clone Repository

```bash
git clone https://github.com/your-username/EmotionSense-AI.git
cd EmotionSense-AI
```

---

## Create Virtual Environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Start the API

```bash
uvicorn app.main:app --reload
```

---

## Interactive Documentation

```
http://127.0.0.1:8000/docs
```

Swagger UI provides interactive API testing.

---

# 🏗️ Project Structure

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
│
├── data
│
├── README.md
│
└── LICENSE
```

---

# ⚙️ Engineering Highlights

- Modular FastAPI architecture
- Separation of preprocessing and inference layers
- Startup-only model loading
- Structured request validation using Pydantic
- Dependency injection
- Environment-based configuration
- Low-latency prediction pipeline
- Version-controlled ML artifacts
- Health monitoring endpoint
- Clean REST API design

---

# 📚 Technologies Used

### Machine Learning

- Scikit-Learn
- Joblib
- NumPy

### Natural Language Processing

- NLTK
- TF-IDF
- WordNet Lemmatizer

### Backend

- FastAPI
- Uvicorn
- Pydantic

---

# ⚠️ Current Limitations (Version 1)

Although the model achieves **90.22% accuracy**, several limitations remain:

- Negation words such as **not**, **no**, and **never** are removed during preprocessing.
- TF-IDF cannot fully capture contextual meaning.
- Limited handling of sarcasm and figurative language.
- Reduced performance on internet slang and out-of-domain vocabulary.
- Lower confidence for underrepresented emotion classes.

Example:

```text
Input:
I am not happy.

Current preprocessing:

I am not happy
        ↓
happy

Prediction:
Joy ❌
```

---

# 🚀 Version Roadmap

## ✅ Version 1

- TF-IDF Vectorizer
- Calibrated Linear SVM
- FastAPI Deployment
- Health Endpoint
- Confidence Scores
- Top-3 Predictions
- REST API

---

## 🔜 Planned for Version 2

- Preserve negation words
- Expand contractions (`don't → do not`)
- Retrain the model
- Benchmark Version 1 vs Version 2
- Improve contextual understanding

---

# 📚 Learning Outcomes

This project strengthened my understanding of:

- Natural Language Processing
- Machine Learning
- Feature Engineering
- Model Calibration
- FastAPI
- REST API Design
- Model Serialization
- Production ML Deployment
- Backend Architecture

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
- LLM Integration
- RAG Systems
- AI Agents
- Backend Engineering
- Full-Stack Development

---

⭐ If you found this project interesting, consider giving it a **Star**!