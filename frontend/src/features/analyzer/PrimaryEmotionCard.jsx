import { motion } from 'framer-motion'
import { getEmotionMeta } from '../../constants/emotions'
import { titleCase } from '../../utils/format'

/**
 * PrimaryEmotionCard — hero card showing the winning emotion.
 * Emoji is animated ("thinking → reveal") on mount.
 */
export default function PrimaryEmotionCard({ emotion, confidence, input }) {
  const meta = getEmotionMeta(emotion)
  const pct = ((confidence || 0) * 100).toFixed(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 220, damping: 24 }}
      className="glass-strong relative overflow-hidden p-8"
    >
      {/* halo behind emoji */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${meta.glow}, transparent 60%)`,
        }}
      />
      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <motion.div
          initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
          className="grid h-28 w-28 shrink-0 place-items-center rounded-3xl border border-white/10 bg-white/[0.05] text-6xl shadow-glow-sm sm:h-32 sm:w-32 sm:text-7xl"
          style={{
            background: `radial-gradient(120% 120% at 30% 20%, ${meta.color}33, rgba(255,255,255,0.03) 60%)`,
          }}
        >
          <motion.span
            animate={{ y: [0, -4, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {meta.emoji}
          </motion.span>
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">Primary emotion detected</span>
            <span
              className="chip"
              style={{
                borderColor: `${meta.color}55`,
                color: meta.color,
              }}
            >
              {meta.tag}
            </span>
          </div>
          <h2 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, #fff, ${meta.color})`,
              }}
            >
              {titleCase(meta.label || emotion || 'Unknown')}
            </span>
          </h2>
          <p className="mt-2 text-sm text-ink-2">
            The model is <span className="font-semibold text-white">{pct}%</span> confident about this emotion.
          </p>

          {input ? (
            <blockquote className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 text-sm italic text-ink-2">
              “{input}”
            </blockquote>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}
