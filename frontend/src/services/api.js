import axios from 'axios'
import { API_BASE_URL, API_ENDPOINTS, REQUEST_TIMEOUT_MS } from '../constants/config'

/**
 * Shared Axios instance for the EmotionSense backend.
 */
export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Predict emotion from a single text input.
 * @param {string} text
 * @param {import('axios').AxiosRequestConfig} [config]
 * @returns {Promise<PredictionResponse>}
 */
export async function predictEmotion(text, config = {}) {
  const { data } = await http.post(
    API_ENDPOINTS.predict,
    { text },
    config,
  )
  return data
}

/**
 * @typedef {Object} TopPrediction
 * @property {string} emotion
 * @property {number} confidence
 *
 * @typedef {Object} PredictionData
 * @property {string} emotion
 * @property {number} confidence
 * @property {TopPrediction[]} topPredictions
 * @property {Record<string, number>} probabilities
 * @property {string} modelVersion
 * @property {number} processingTimeMs
 *
 * @typedef {Object} PredictionMeta
 * @property {string} requestId
 * @property {string} processedAt
 *
 * @typedef {Object} PredictionResponse
 * @property {PredictionData} data
 * @property {PredictionMeta} meta
 */
