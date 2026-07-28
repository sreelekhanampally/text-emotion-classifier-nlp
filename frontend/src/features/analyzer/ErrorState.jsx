import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from '../../components/ui/Button'

export default function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="glass-strong p-8 sm:p-10"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-500/15 text-rose-300">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-white">
            Something went wrong
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-2">
            {message ||
              'We couldn’t reach the emotion model. Please check your connection and try again.'}
          </p>
          <div className="mt-5 flex gap-2">
            <Button onClick={onRetry} leftIcon={<RefreshCw className="h-4 w-4" />}>
              Try again
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
