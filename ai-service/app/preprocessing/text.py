import re
import string
from dataclasses import dataclass
from pathlib import Path

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

from app.core.config import Settings

_URL_PATTERN = re.compile(r"http\S+|www\S+")
_DIGIT_PATTERN = re.compile(r"\d+")
_PUNCTUATION_TABLE = str.maketrans("", "", string.punctuation)
_REQUIRED_NLTK_RESOURCES = ("tokenizers/punkt_tab", "corpora/stopwords", "corpora/wordnet")


@dataclass(frozen=True)
class TextPreprocessor:
    stop_words: frozenset[str]
    lemmatizer: WordNetLemmatizer

    def process(self, text: str) -> str:
        normalized = text.lower()
        normalized = _URL_PATTERN.sub("", normalized)
        normalized = _DIGIT_PATTERN.sub("", normalized)
        normalized = normalized.translate(_PUNCTUATION_TABLE)
        normalized = normalized.encode("ascii", "ignore").decode()

        tokens = word_tokenize(normalized)
        retained_tokens = [
            token for token in tokens if token not in self.stop_words and len(token) > 2
        ]
        return " ".join(self.lemmatizer.lemmatize(token) for token in retained_tokens)


def build_preprocessor(settings: Settings) -> TextPreprocessor:
    nltk_data_path = Path(settings.nltk_data_path)
    if str(nltk_data_path) not in nltk.data.path:
        nltk.data.path.insert(0, str(nltk_data_path))

    for resource in _REQUIRED_NLTK_RESOURCES:
        try:
            nltk.data.find(resource)
        except LookupError as error:
            raise RuntimeError(
                f"Required NLTK resource '{resource}' is unavailable at {nltk_data_path}. "
                "Install NLTK resources during the image build."
            ) from error

    # Build custom stopword list
    stop_words = set(stopwords.words("english"))

    # Preserve negation words
    negation_words = {
    "not",
    "no",
    "nor",
    "never",
    "don't",
    "doesn't",
    "didn't",
    "can't",
    "couldn't",
    "won't",
    "wouldn't",
    "isn't",
    "aren't",
    "wasn't",
    "weren't",
    "hasn't",
    "haven't",
    "hadn't",
}

    stop_words = stop_words - negation_words

    return TextPreprocessor(
        stop_words=frozenset(stop_words),   # <-- Use the variable here
        lemmatizer=WordNetLemmatizer(),
    )