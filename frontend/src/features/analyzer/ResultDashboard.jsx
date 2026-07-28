import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, RotateCcw, PieChart as PieIcon, Radar as RadarIcon } from 'lucide-react'
import { toast } from 'sonner'
import GlassCard from '../../components/ui/GlassCard'
import Button from '../../components/ui/Button'
import PrimaryEmotionCard from './PrimaryEmotionCard'
import ConfidenceGauge from './ConfidenceGauge'
import TopPredictions from './TopPredictions'
import DistributionBars from './DistributionBars'
import RadarView from './RadarView'
import DonutView from './DonutView'
import MetaGrid from './MetaGrid'
import { getEmotionMeta } from '../../constants/emotions'

/**
 * ResultDashboard — the full analysis panel.
 * Given a PredictionResponse, renders:
 *   • Primary emotion hero
 *   • Confidence gauge + top predictions
 *   • Distribution + radar/donut toggle
 *   • Metadata (model, request id, timestamp, latency)
 */
export default function ResultDashboard({ response, inputText, onNew }) {
  const [chart, setChart] = useState('radar') // 'radar' | 'donut'
  const [copied, setCopied] = useState(false)

  const { data, meta } = response || {}
  const primary = useMemo(
    () => ({ emotion: data?.emotion, confidence: data?.confidence }),
    [data],
  )
  const primaryMeta = getEmotionMeta(primary.emotion)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(response, null, 2))
      setCopied(true)
      toast.success('Result copied to clipboard')
      setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error('Unable to copy')
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="chip">📊 Emotion Analysis</span>
          <span className="chip">
            Live result
            <span
              className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: primaryMeta.color, boxShadow: `0 0 8px ${primaryMeta.color}` }}
            />
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy JSON'}
          </Button>
          <Button
            variant="subtle"
            size="sm"
            leftIcon={<RotateCcw className="h-4 w-4" />}
            onClick={onNew}
          >
            New analysis
          </Button>
        </div>
      </div>

      {/* Hero */}
      <PrimaryEmotionCard
        emotion={primary.emotion}
        confidence={primary.confidence}
        input={inputText}
      />

      {/* Row: gauge + top predictions */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <GlassCard>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">🎛️</span>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-3">
              Confidence Gauge
            </h3>
          </div>
          <div className="grid place-items-center py-2">
            <ConfidenceGauge value={primary.confidence || 0} color={primaryMeta.color} />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-ink-3">Primary</div>
              <div className="mt-0.5 font-display text-lg font-semibold text-white">
                {primaryMeta.emoji} {primaryMeta.label}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-ink-3">Category</div>
              <div className="mt-0.5 text-sm text-ink-1">{primaryMeta.tag}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <TopPredictions items={data?.topPredictions || []} />
        </GlassCard>
      </div>

      {/* Row: distribution + radar/donut */}
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <GlassCard>
          <DistributionBars probabilities={data?.probabilities || {}} />
        </GlassCard>

        <GlassCard>
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧭</span>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-3">
                Emotion Fingerprint
              </h3>
            </div>
            <div className="inline-flex overflow-hidden rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setChart('radar')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                  chart === 'radar' ? 'bg-white/10 text-white' : 'text-ink-3 hover:text-white'
                }`}
              >
                <RadarIcon className="h-3.5 w-3.5" /> Radar
              </button>
              <button
                type="button"
                onClick={() => setChart('donut')}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors ${
                  chart === 'donut' ? 'bg-white/10 text-white' : 'text-ink-3 hover:text-white'
                }`}
              >
                <PieIcon className="h-3.5 w-3.5" /> Donut
              </button>
            </div>
          </div>
          {chart === 'radar' ? (
            <RadarView probabilities={data?.probabilities || {}} />
          ) : (
            <DonutView probabilities={data?.probabilities || {}} primary={primary} />
          )}
        </GlassCard>
      </div>

      {/* Meta */}
      <div>
        <div className="mb-3 flex items-center gap-2 pl-1">
          <span className="text-lg">🕒</span>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-3">
            Analysis Details
          </h3>
        </div>
        <MetaGrid data={data} meta={meta} />
      </div>

      {/* Footer note */}
      <div className="pt-2 text-center text-xs text-ink-3">
        Powered by <span className="text-brand-300">EmotionSense AI</span> · Model{' '}
        <span className="font-mono text-ink-1">v{data?.modelVersion || '—'}</span>
      </div>
    </motion.section>
  )
}
