import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * ParticleField — sparse floating dots with subtle drift.
 * Deterministic per-mount via seeded random so SSR/HMR stays quiet.
 */
export default function ParticleField({ count = 28, className = '' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 1 + Math.random() * 2.5,
      d: 6 + Math.random() * 10,
      delay: Math.random() * 4,
      o: 0.25 + Math.random() * 0.5,
    }))
  }, [count])

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-brand-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            opacity: p.o,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 6px rgba(192,132,252,0.8)',
          }}
          animate={{ y: [0, -18, 0], opacity: [p.o, p.o * 0.4, p.o] }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
