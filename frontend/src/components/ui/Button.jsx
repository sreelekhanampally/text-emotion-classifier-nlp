import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/**
 * Button — primary / ghost / subtle variants with hover lift & glow.
 */
const VARIANT = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  subtle:
    'inline-flex items-center justify-center gap-2 rounded-2xl bg-white/[0.04] px-5 py-2.5 text-ink-1 border border-white/10 hover:bg-white/[0.08] transition-all duration-300',
}

const SIZE = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-3',
  lg: 'text-base px-7 py-3.5',
}

const Button = forwardRef(function Button(
  {
    as: Comp = 'button',
    variant = 'primary',
    size = 'md',
    className,
    children,
    leftIcon,
    rightIcon,
    loading = false,
    disabled = false,
    ...rest
  },
  ref,
) {
  const MotionComp = motion(Comp)
  return (
    <MotionComp
      ref={ref}
      whileHover={disabled || loading ? undefined : { y: -2 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      className={cn(VARIANT[variant], SIZE[size], 'ring-brand select-none', className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="mr-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {!loading && leftIcon}
      <span className="whitespace-nowrap">{children}</span>
      {!loading && rightIcon}
    </MotionComp>
  )
})

export default Button
