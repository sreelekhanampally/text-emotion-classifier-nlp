import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import ParticleField from '../../components/backgrounds/ParticleField'

const EMOJIS = [
  { e: '😊', x: '6%',  y: '18%', d: 0 },
  { e: '💜', x: '86%', y: '22%', d: 0.4 },
  { e: '😢', x: '10%', y: '72%', d: 0.6 },
  { e: '😨', x: '80%', y: '68%', d: 0.9 },
  { e: '😲', x: '48%', y: '8%',  d: 0.3 },
  { e: '😠', x: '52%', y: '88%', d: 0.7 },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <ParticleField count={32} />
      {/* floating emoji orbs */}
      {EMOJIS.map((it, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute hidden select-none text-3xl sm:text-4xl md:block"
          style={{ left: it.x, top: it.y }}
          initial={{ opacity: 0, y: 20, scale: 0.7 }}
          animate={{ opacity: 1, y: [0, -14, 0], scale: 1 }}
          transition={{
            opacity: { duration: 0.8, delay: it.d },
            scale: { duration: 0.8, delay: it.d },
            y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: it.d },
          }}
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-glow-sm">
            {it.e}
          </span>
        </motion.div>
      ))}

      <div className="container-app relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {/* <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="chip"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            <span className="text-ink-1">Powered by Deep Learning</span>
            <span className="mx-1 text-ink-3">·</span>
            <span className="text-ink-3">Model v2026.07.1</span>
          </motion.span> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
          >
            Understand the Emotion{' '}
            <span className="gradient-text">Behind Every Word</span>
            <br />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 text-balance"
          >
            EmotionSense uses machine learning and natural language processing to detect emotions from text with fast, reliable, real-time predictions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link
              to="/analyze"
              className="btn-primary group px-7 py-3.5 text-base"
            >
              <Sparkles className="h-4 w-4" />
              Start Analysis
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <a href="#features" className="btn-ghost text-base">
              <Zap className="h-4 w-4 text-brand-300" />
              Explore features
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-ink-3"
          >
            <span>⚡ &lt; 50ms average inference</span>
            <span>·</span>
            <span>🎯 6-class fine-tuned classifier</span>
            <span>·</span>
            <span>🛡️ REST · JSON · CORS ready</span>
          </motion.div>
        </motion.div>

        {/* Preview mock card */}
        <HeroPreview />
      </div>
    </section>
  )
}

function HeroPreview() {
  const bars = [
    { name: 'Joy', pct: 92, color: '#F5C043' },
    { name: 'Love', pct: 3.5, color: '#F472B6' },
    { name: 'Surprise', pct: 2.1, color: '#22D3EE' },
    { name: 'Fear', pct: 1.4, color: '#A78BFA' },
    { name: 'Sadness', pct: 0.7, color: '#60A5FA' },
    { name: 'Anger', pct: 0.3, color: '#F87171' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
      className="relative mx-auto mt-16 max-w-5xl"
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[36px] blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.45), transparent 60%)',
        }}
      />
      <div className="glass-strong rounded-3xl p-2">
        <div className="rounded-2xl bg-gradient-to-b from-surface-2/90 to-surface-1/80 p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-ink-3">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/60" />
              live inference · 8.3 ms
            </div>
            <div className="hidden gap-1.5 sm:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="text-xs uppercase tracking-widest text-ink-3">Input</div>
              <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-ink-1 text-[15px] leading-relaxed">
                “I finally got the promotion — everything I worked for these last two
                years actually paid off.”
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="text-6xl">😊</div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-ink-3">Primary emotion</div>
                  <div className="mt-0.5 font-display text-3xl font-semibold text-white">Joy</div>
                  <div className="mt-1 text-sm text-ink-2">Confidence <span className="text-white font-semibold">92.5%</span></div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-ink-3">Distribution</div>
              <ul className="mt-3 space-y-2.5">
                {bars.map((b, i) => (
                  <li key={b.name} className="grid grid-cols-[80px_1fr_44px] items-center gap-3 text-sm">
                    <span className="text-ink-2">{b.name}</span>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${b.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${b.color}AA, ${b.color})`,
                          boxShadow: `0 0 12px ${b.color}55`,
                        }}
                      />
                    </div>
                    <span className="text-right font-mono text-xs text-ink-2">
                      {b.pct}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
