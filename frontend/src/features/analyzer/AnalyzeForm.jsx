import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Sparkles, Wand2, RotateCcw, Type } from 'lucide-react'
import Button from '../../components/ui/Button'
import { analyzeSchema } from './schema'
import { TEXTAREA_LIMIT, SAMPLE_TEXTS } from '../../constants/config'

export default function AnalyzeForm({ onSubmit, isLoading, defaultValue = '' }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(analyzeSchema),
    mode: 'onChange',
    defaultValues: { text: defaultValue },
  })

  const value = watch('text') || ''
  const chars = value.length
  const pct = Math.min(100, (chars / TEXTAREA_LIMIT) * 100)

  const pickSample = () => {
    const sample = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]
    setValue('text', sample, { shouldValidate: true })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(({ text }) => onSubmit(text))}
      className="glass-strong relative overflow-hidden p-6 sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-glow-sm">
            <Type className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Your text</div>
            <div className="text-xs text-ink-3">Write anything — a sentence, tweet, message.</div>
          </div>
        </div>
        <button
          type="button"
          onClick={pickSample}
          className="chip hover:border-white/25 hover:text-white transition"
        >
          <Wand2 className="h-3.5 w-3.5 text-brand-300" />
          Try a sample
        </button>
      </div>

      <div className="relative">
        <textarea
          {...register('text')}
          rows={6}
          maxLength={TEXTAREA_LIMIT}
          placeholder="Describe how you're feeling..."
          disabled={isLoading}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-[15px] leading-relaxed text-white placeholder:text-ink-3 outline-none transition-all duration-300 focus:border-brand-400/50 focus:bg-white/[0.05] focus:shadow-glow-sm disabled:opacity-60"
        />
        <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between text-xs">
          <span className={errors.text ? 'text-rose-300' : 'text-ink-3'}>
            {errors.text?.message || 'Tip: nuance and length improve accuracy.'}
          </span>
          <span className="font-mono text-ink-3">
            <span className={chars > TEXTAREA_LIMIT * 0.9 ? 'text-amber-300' : 'text-white'}>
              {chars}
            </span>
            /{TEXTAREA_LIMIT}
          </span>
        </div>
      </div>

      {/* Character progress */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300"
          style={{ boxShadow: '0 0 12px rgba(168,85,247,0.55)' }}
        />
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => reset({ text: '' })}
          disabled={isLoading || chars === 0}
          className="btn-ghost text-sm disabled:opacity-50"
        >
          <RotateCcw className="h-4 w-4" />
          Clear
        </button>
        <Button
          type="submit"
          loading={isLoading}
          disabled={!isValid || isLoading}
          size="lg"
          className="min-w-[180px]"
          leftIcon={<Sparkles className="h-4 w-4" />}
        >
          {isLoading ? 'Analyzing…' : 'Analyze Emotion'}
        </Button>
      </div>
    </motion.form>
  )
}
