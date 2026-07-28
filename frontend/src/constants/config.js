export const APP_NAME = 'EmotionSense AI'
export const APP_TAGLINE = 'Understand What Words Really Mean'
export const APP_DESCRIPTION =
  'EmotionSense uses machine learning and natural language processing to detect emotions from text with fast, reliable, real-time predictions.'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const API_ENDPOINTS = {
  predict: '/v1/emotions:predict',
}

/** Show cold-start hint if the model doesn't respond within this many ms. */
export const COLD_START_HINT_MS = 10_000
/** Overall client timeout (kept generous for free-tier hosting cold starts). */
export const REQUEST_TIMEOUT_MS = 180_000

export const TEXTAREA_LIMIT = 1000
export const TEXTAREA_MIN = 3

export const LOADING_PHRASES = [
  'Analyzing emotions…',
  'Extracting sentiment…',
  'Running inference…',
  'Mapping feature space…',
  'Generating prediction…',
  'Calibrating confidence…',
]

export const SAMPLE_TEXTS = [
  'I finally got the promotion — everything I worked for these last two years actually paid off.',
  'I can’t stop thinking about what could go wrong tomorrow. My hands won’t stop shaking.',
  'I miss the way things used to be. The house feels so quiet without her.',
  'How dare they lie to me after everything I did for this team.',
  'I did not see that coming at all — that plot twist just broke my brain.',
  'You mean the world to me. I don’t know where I’d be without you.',
]
