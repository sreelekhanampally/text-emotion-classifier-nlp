import re
import string
from dataclasses import dataclass
from pathlib import Path

import contractions
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

from app.core.config import Settings

_URL_PATTERN = re.compile(r"http\S+|www\S+")
_DIGIT_PATTERN = re.compile(r"\d+")
_CLAUSE_SPLIT_PATTERN = re.compile(r"[.,;!?]+")
_PUNCTUATION_TABLE = str.maketrans("", "", string.punctuation)
_REQUIRED_NLTK_RESOURCES = ("tokenizers/punkt_tab", "corpora/stopwords", "corpora/wordnet")

# Must match the notebook exactly — training vocabulary uses these tokens.
_NEGATIONS = frozenset({"not", "no", "nor", "never"})
_CLAUSE_BREAKS = frozenset({"but"})


@dataclass(frozen=True)
class TextPreprocessor:
    stop_words: frozenset[str]
    lemmatizer: WordNetLemmatizer

    def _process_clause(self, clause: str) -> list[str]:
        clause = clause.encode("ascii", "ignore").decode()
        clause = clause.translate(_PUNCTUATION_TABLE)

        tokens = word_tokenize(clause)
        tokens = [t for t in tokens if t not in self.stop_words]

        negate = False
        tagged: list[str] = []
        for w in tokens:
            if w in _CLAUSE_BREAKS:
                negate = False
                continue
            if w in _NEGATIONS:
                negate = True
                tagged.append(w)
                continue
            tagged.append(f"NEG_{w}" if negate else w)

        return [self.lemmatizer.lemmatize(w) for w in tagged]

    def process(self, text: str) -> str:
        if not isinstance(text, str):
            return ""

        normalized = contractions.fix(text)
        normalized = normalized.lower()
        normalized = _URL_PATTERN.sub("", normalized)
        normalized = _DIGIT_PATTERN.sub("", normalized)

        clauses = _CLAUSE_SPLIT_PATTERN.split(normalized)

        all_tokens: list[str] = []
        for clause in clauses:
            if clause.strip():
                all_tokens.extend(self._process_clause(clause))

        return " ".join(all_tokens)


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

    stop_words = set(stopwords.words("english"))

    # Preserve negation words (both bare and contracted forms; contractions
    # will be expanded to bare form before tokenization, but we keep both
    # in the set to be safe against library version differences).
    negation_words = {
        "not", "no", "nor", "never",
        "don't", "doesn't", "didn't", "can't", "couldn't", "won't", "wouldn't",
        "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "hadn't",
    }
    stop_words = stop_words - negation_words

    return TextPreprocessor(
        stop_words=frozenset(stop_words),
        lemmatizer=WordNetLemmatizer(),
    )