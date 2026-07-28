import { motion } from 'framer-motion'

/**
 * AuroraBackground — full-viewport animated gradient + noise + grid.
 * Pure decoration; pointer-events disabled.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0 bg-aurora animate-aurora"
        style={{ backgroundSize: '200% 200%' }}
      />
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,5,20,0.65)_75%,#0A0514_100%)]" />

      {/* Grid overlay with fade */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] mask-fade-b" />

      {/* Floating orbs */}
      <motion.div
        className="absolute -left-40 top-24 h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.55), transparent 60%)' }}
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-160px] top-[40%] h-[460px] w-[460px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.45), transparent 60%)' }}
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[30%] bottom-[-160px] h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 60%)' }}
        animate={{ y: [0, -20, 0], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.35] mix-blend-overlay" />
    </div>
  )
}
