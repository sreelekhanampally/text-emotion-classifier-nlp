import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import GlassCard from '../../components/ui/GlassCard'

const STATS = [
  { label: 'Avg. inference', value: 8, suffix: ' ms', decimals: 0 },
  { label: 'Emotion classes', value: 6, suffix: '' },
  { label: 'Model accuracy', value: 90.2, suffix: '%', decimals: 1 },
  { label: 'Model version', value: 2026.071, prefix: 'v', decimals: 3, sep: '' },
]

export default function Stats() {
  return (
    <section className="relative py-14">
      <div className="container-app">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <GlassCard className="text-center" hoverLift>
                <div className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  {s.prefix}
                  <CountUp
                    end={s.value}
                    duration={2}
                    decimals={s.decimals ?? 0}
                    separator={s.sep ?? ','}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                  <span className="text-brand-300">{s.suffix || ''}</span>
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-ink-3">
                  {s.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
