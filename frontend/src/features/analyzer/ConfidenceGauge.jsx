import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { clamp } from '../../utils/format'

/**
 * ConfidenceGauge — animated circular progress ring with core percentage.
 */
export default function ConfidenceGauge({
  value = 0,
  size = 200,
  stroke = 14,
  color = '#A855F7',
  label = 'Confidence',
}) {
  const v = clamp(value)
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const dashOffset = c * (1 - v)

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      {/* soft aura */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${color}44, transparent 60%)`,
        }}
      />
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="60%" stopColor={color} />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          filter="url(#gaugeGlow)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-4xl font-semibold text-white sm:text-5xl">
          <CountUp end={v * 100} decimals={1} duration={1.4} />
          <span className="text-brand-300">%</span>
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-widest text-ink-3">
          {label}
        </div>
      </div>
    </div>
  )
}
