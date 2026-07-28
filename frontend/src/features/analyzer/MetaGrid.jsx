import { Cpu, Timer, Hash, Clock, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { toMs, truncateId, formatDateTime } from '../../utils/format'

export default function MetaGrid({ data, meta }) {
  const items = [
    { icon: Tag, label: 'Model version', value: `v${data?.modelVersion || '—'}` },
    { icon: Timer, label: 'Inference time', value: toMs(data?.processingTimeMs) },
    { icon: Hash, label: 'Request ID', value: truncateId(meta?.requestId), mono: true, title: meta?.requestId },
    { icon: Clock, label: 'Processed at', value: formatDateTime(meta?.processedAt) },
  ]
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
          className="glass p-4"
          title={it.title}
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink-3">
            <it.icon className="h-3.5 w-3.5 text-brand-300" />
            {it.label}
          </div>
          <div className={`mt-1.5 truncate text-sm font-semibold text-white ${it.mono ? 'font-mono' : ''}`}>
            {it.value}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
