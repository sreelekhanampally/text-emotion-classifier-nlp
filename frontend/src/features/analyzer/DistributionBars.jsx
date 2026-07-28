import { motion } from 'framer-motion'
import { getEmotionMeta, EMOTION_ORDER } from '../../constants/emotions'
import { toPercent, titleCase } from '../../utils/format'

/**
 * DistributionBars — animated horizontal bars for full probability distribution.
 */
export default function DistributionBars({ probabilities = {} }) {
  // build ordered list; fallback to Object.entries order for unknowns
  const known = EMOTION_ORDER.filter((k) => k in probabilities)
  const rest = Object.keys(probabilities).filter((k) => !known.includes(k))
  const keys = [...known, ...rest]

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">📈</span>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-3">
          Emotion Distribution
        </h3>
      </div>
      <ul className="space-y-3">
        {keys.map((key, i) => {
          const meta = getEmotionMeta(key)
          const v = Math.max(0, Math.min(1, probabilities[key] || 0))
          return (
            <motion.li
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
              className="grid grid-cols-[112px_1fr_60px] items-center gap-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <span>{meta.emoji}</span>
                <span className="text-ink-2">{titleCase(meta.label || key)}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v * 100}%` }}
                  transition={{ duration: 1.2, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${meta.color}AA, ${meta.color})`,
                    boxShadow: `0 0 12px ${meta.color}55`,
                  }}
                />
              </div>
              <span className="text-right font-mono text-xs text-ink-1">
                {toPercent(v, 1)}
              </span>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
