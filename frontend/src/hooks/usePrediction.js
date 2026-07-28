import { useCallback, useRef, useState } from 'react'
import { predictEmotion } from '../services/api'
import { COLD_START_HINT_MS } from '../constants/config'

/**
 * usePrediction — encapsulates request lifecycle:
 *   idle → loading → (coldStart)? → success | error
 *
 * Never auto-fails on timeout below REQUEST_TIMEOUT_MS.
 * Signals `coldStart` after COLD_START_HINT_MS while still waiting.
 */
export function usePrediction() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [coldStart, setColdStart] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)

  const timerRef = useRef(null)
  const coldTimerRef = useRef(null)
  const startedAtRef = useRef(0)

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (coldTimerRef.current) clearTimeout(coldTimerRef.current)
    timerRef.current = null
    coldTimerRef.current = null
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setStatus('idle')
    setResult(null)
    setError(null)
    setColdStart(false)
    setElapsedMs(0)
  }, [clearTimers])

  const analyze = useCallback(
    async (text) => {
      setStatus('loading')
      setResult(null)
      setError(null)
      setColdStart(false)
      setElapsedMs(0)
      startedAtRef.current = performance.now()

      timerRef.current = setInterval(() => {
        setElapsedMs(performance.now() - startedAtRef.current)
      }, 250)

      coldTimerRef.current = setTimeout(() => {
        setColdStart(true)
      }, COLD_START_HINT_MS)

      try {
        const response = await predictEmotion(text)
        setResult(response)
        setStatus('success')
        return response
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Something went wrong while analyzing.'
        setError({ message, raw: err })
        setStatus('error')
        throw err
      } finally {
        clearTimers()
      }
    },
    [clearTimers],
  )

  return {
    status,
    result,
    error,
    coldStart,
    elapsedMs,
    analyze,
    reset,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
