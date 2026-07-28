import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export default function Logo({ className, showText = true }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <motion.div
        initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative"
      >
        <div
          className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-glow-sm"
          style={{
            background: 'linear-gradient(135deg,#A855F7 0%,#7C3AED 60%,#4C1D95 100%)',
          }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M4 10c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v3c0 2.2-1.8 4-4 4h-3l-4 4v-4c-2.2 0-4-1.8-4-4z"
              fill="currentColor"
              opacity="0.95"
            />
            <circle cx="9.5" cy="11" r="1.15" fill="#5B21B6" />
            <circle cx="14.5" cy="11" r="1.15" fill="#5B21B6" />
          </svg>
        </div>
        <span className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl bg-brand-500/30 blur-xl" />
      </motion.div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">
            EmotionSense
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-300">
            AI
          </span>
        </div>
      )}
    </div>
  )
}
