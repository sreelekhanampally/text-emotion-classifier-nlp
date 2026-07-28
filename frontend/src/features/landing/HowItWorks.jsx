import { motion } from 'framer-motion'
import { PencilLine, Cpu, BarChart3 } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    icon: PencilLine,
    title: 'Analyze Your Text',
    body: 'Enter any sentence, message, review, or paragraph. EmotionSense accepts natural language exactly as people write it.',
  },
  {
    n: '02',
    icon: Cpu,
    title: 'Process the Language',
    body: 'The text is cleaned, transformed into numerical features, and evaluated by the trained emotion classification model.',
  },
  {
    n: '03',
    icon: BarChart3,
    title: 'Explore the Results',
    body: 'View the predicted emotion, confidence score, and probability distribution through interactive visualizations.',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="chip">How it works</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            From text to <span className="gradient-text">emotion </span>in seconds.
          </h2>
          <p> Every prediction follows a simple pipeline designed for speed, accuracy, and clarity.</p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass relative p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-brand-300">
                  STEP {s.n}
                </span>
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <s.icon className="h-5 w-5 text-brand-300" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
