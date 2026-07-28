import { motion } from 'framer-motion'
import { Gauge, Target, BrainCircuit, PlugZap, Sparkles, LineChart } from 'lucide-react'
import GlassCard from '../../components/ui/GlassCard'

const FEATURES = [
  {
    title: 'Fast Response',
    body: 'Get predictions in milliseconds with an optimized inference pipeline built for smooth, real-time analysis.',
    icon: Gauge,
    tone: 'from-brand-400 to-brand-700',
    tag: 'PERFORMANCE',
  },
  {
    title: 'Precise Predictions',
    body: 'Trained to recognize six distinct emotions with balanced performance across different writing styles and contexts.',
    icon: Target,
    tone: 'from-fuchsia-400 to-brand-600',
    tag: 'ACCURACY',
  },
  {
    title: 'Context-Aware Analysis',
    body: 'Looks beyond individual words to understand the emotional meaning carried by an entire sentence.',
    icon: BrainCircuit,
    tone: 'from-indigo-400 to-brand-700',
    tag: 'NLP',
  },
  {
    title: 'Simple REST API',
    body: 'Integrate emotion detection into any application using clean, lightweight REST endpoints.',
    icon: PlugZap,
    tone: 'from-brand-300 to-brand-600',
    tag: 'API',
  },
  {
    title: 'Confidence Scores',
    body: 'Every prediction includes confidence values and emotion probabilities for better understanding.',
    icon: LineChart,
    tone: 'from-cyan-400 to-brand-600',
    tag: 'INSIGHTS',
  },
  {
    title: 'Clean Experience',
    body: 'A focused interface that keeps emotion analysis simple, readable, and enjoyable to use.',
    icon: Sparkles,
    tone: 'from-pink-400 to-brand-600',
    tag: 'INTERFACE',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="chip">Why EmotionSense</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Built to understand <span className="gradient-text">text</span>
          </h2>
          <p className="mt-4 text-ink-2">
            EmotionSense combines natural language processing with machine learning to identify emotions hidden in everyday text. Whether it's a short message or a long paragraph, every prediction is fast, transparent, and easy to understand.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-start gap-4">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${f.tone} shadow-glow-sm`}
                  >
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-ink-3">
                        {f.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{f.body}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
