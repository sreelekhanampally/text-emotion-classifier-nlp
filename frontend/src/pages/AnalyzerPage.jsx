import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import AnalyzeForm from '../features/analyzer/AnalyzeForm'
import LoadingState from '../features/analyzer/LoadingState'
import ErrorState from '../features/analyzer/ErrorState'
import ResultDashboard from '../features/analyzer/ResultDashboard'
import { usePrediction } from '../hooks/usePrediction'

export default function AnalyzerPage() {
  const {
    status,
    result,
    error,
    coldStart,
    elapsedMs,
    analyze,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = usePrediction()

  const [lastInput, setLastInput] = useState('')

  const runAnalysis = async (text) => {
    setLastInput(text)
    try {
      await analyze(text)
      toast.success('Analysis complete')
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to analyze')
    }
  }

  return (
    <section className="container-app pt-6 pb-16 sm:pt-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-3xl text-center"
      >
        <span className="chip">Analyzer</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Feel the <span className="gradient-text">signal</span> in your words.
        </h1>
        <p className="mt-3 text-ink-2">
          Paste any text and get a full emotional breakdown...
        </p>
      </motion.div>

      {/* Form */}
      <div className="mx-auto mt-10 max-w-3xl">
        <AnalyzeForm
          onSubmit={runAnalysis}
          isLoading={isLoading}
          defaultValue={lastInput}
        />
      </div>

      {/* Below-fold: loading / error / result */}
      <div className="mx-auto mt-10 max-w-5xl">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingState elapsedMs={elapsedMs} coldStart={coldStart} />
            </motion.div>
          )}

          {isError && !isLoading && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ErrorState
                message={error?.message}
                onRetry={() => runAnalysis(lastInput)}
              />
            </motion.div>
          )}

          {isSuccess && !isLoading && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultDashboard
                response={result}
                inputText={lastInput}
                onNew={() => {
                  reset()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            </motion.div>
          )}

          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glass p-8 text-center"
            >
              <div className="mx-auto max-w-md">
                <div className="text-3xl">✨</div>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  Your dashboard will appear here
                </h3>
                <p className="mt-2 text-sm text-ink-2">
                  Enter some text above and press <span className="text-white">Analyze Emotion</span>.
                  You'll see a primary emotion, confidence gauge, top predictions and a
                  full distribution radar.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
