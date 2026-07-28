import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Info, Clock } from 'lucide-react'
import AIOrb from './AIOrb'
import { LOADING_PHRASES } from '../../constants/config'
import { toMs } from '../../utils/format'

/**
 * LoadingState — animated orb + rotating phrases + cold-start hint.
 */
export default function LoadingState({ elapsedMs = 0, coldStart = false }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setI((v) => (v + 1) % LOADING_PHRASES.length)
    }, 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="glass-strong flex flex-col items-center gap-6 p-10 text-center"
    >
      <AIOrb size={160} />

      <div className="min-h-[2.25rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={LOADING_PHRASES[i]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="font-display text-xl font-medium text-white"
          >
            {LOADING_PHRASES[i]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 text-xs text-ink-3">
        <Clock className="h-3.5 w-3.5" />
        <span className="font-mono">{toMs(elapsedMs)}</span>
        <span>·</span>
        <span>Streaming from EmotionSense backend</span>
      </div>

      <AnimatePresence>
        {coldStart && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-2 flex max-w-lg items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/[0.05] p-4 text-left"
          >
            <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-400/15">
              <Info className="h-4 w-4 text-amber-300" />
            </div>
            <p className="text-sm leading-relaxed text-amber-100/90">
              The AI model is starting on the free hosting plan.
              The first request may take around <strong className="text-amber-200">one minute</strong>.
              We'll keep waiting — no action needed.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skeleton preview */}
      <div className="mt-4 grid w-full max-w-2xl grid-cols-6 gap-2">
        {Array.from({ length: 6 }).map((_, k) => (
          <motion.div
            key={k}
            className="h-1.5 rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-brand-500/60 to-brand-300/60"
              animate={{ x: ['-100%', '350%'] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: k * 0.12, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
