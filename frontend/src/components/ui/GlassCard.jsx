import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * GlassCard — glassmorphism container with animated border sheen.
 */
export default function GlassCard({
  as: Comp = 'div',
  className,
  children,
  hoverLift = true,
  glow = false,
  ...rest
}) {
  const MotionComp = motion(Comp)
  return (
    <MotionComp
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'glass p-6 sm:p-7',
        glow && 'shadow-glow',
        'transition-shadow duration-500 hover:shadow-glow-sm',
        className,
      )}
      {...rest}
    >
      {/* Border sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(192,132,252,0.08))',
          maskImage:
            'linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: 1,
        }}
      />
      <div className="relative">{children}</div>
    </MotionComp>
  )
}
