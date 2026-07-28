import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <section className="container-app grid min-h-[70vh] place-items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong max-w-lg p-10 text-center"
      >
        <div className="font-display text-7xl font-bold gradient-text">404</div>
        <p className="mt-3 text-ink-2">
          This page doesn't exist — but plenty of emotions still do.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </motion.div>
    </section>
  )
}
