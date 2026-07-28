import { motion } from 'framer-motion'

/**
 * AIOrb — animated "thinking" orb: 3 rotating rings + inner pulse + core.
 */
export default function AIOrb({ size = 140 }) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.55), rgba(124,58,237,0.15) 50%, transparent 70%)',
        }}
      />
      {/* Ring 1 */}
      <motion.div
        className="absolute inset-0 rounded-full border border-brand-400/40"
        style={{ borderTopColor: 'rgba(192,132,252,0.9)', borderRightColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      {/* Ring 2 */}
      <motion.div
        className="absolute inset-3 rounded-full border border-brand-300/30"
        style={{ borderBottomColor: 'rgba(168,85,247,0.85)', borderLeftColor: 'transparent' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      {/* Ring 3 */}
      <motion.div
        className="absolute inset-6 rounded-full border border-brand-200/20"
        style={{ borderTopColor: 'rgba(139,92,246,0.7)', borderRightColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      {/* Core */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, #F5F3FF, #C084FC 40%, #7C3AED 90%)',
          boxShadow: '0 0 40px rgba(168,85,247,0.7)',
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
