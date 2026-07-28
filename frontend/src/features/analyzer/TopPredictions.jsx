import { motion } from 'framer-motion'
import { getEmotionMeta, MEDALS } from '../../constants/emotions'
import { toPercent, titleCase } from '../../utils/format'

export default function TopPredictions({ items = [] }) {
  const top = items.slice(0, 3)
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">🎯</span>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-3">
          Top Predictions
        </h3>
      </div>
      <ul className="space-y-3">
        {top.map((p, i) => {
          const meta = getEmotionMeta(p.emotion)
          const pct = Math.max(0, Math.min(1, p.confidence)) * 100
          return (
            <motion.li
              key={p.emotion + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              className="group grid grid-cols-[36px_1fr_auto] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-all hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.06] text-xl">
                {MEDALS[i] || '🎖️'}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{meta.emoji}</span>
                  <span className="font-display text-lg font-semibold text-white">
                    {titleCase(meta.label || p.emotion)}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-widest text-ink-3">
                    {meta.tag}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${meta.color}AA, ${meta.color})`,
                      boxShadow: `0 0 14px ${meta.color}66`,
                    }}
                  />
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-lg font-semibold text-white">
                  {toPercent(p.confidence, 1)}
                </div>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
