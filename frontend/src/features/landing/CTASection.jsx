import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative py-20">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden p-10 sm:p-14 text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(168,85,247,0.35), transparent 60%)',
            }}
          />
          <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to <span className="gradient-text">feel the model</span>?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-ink-2">
            Try EmotionSense on your own text and see a full analysis dashboard.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/analyze" className="btn-primary px-7 py-3.5 text-base">
              <Sparkles className="h-4 w-4" />
              Analyze Text
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/about" className="btn-ghost text-base">
              Read about the model
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
