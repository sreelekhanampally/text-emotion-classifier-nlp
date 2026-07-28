import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { getEmotionMeta, EMOTION_ORDER } from '../../constants/emotions'
import { titleCase, toPercent } from '../../utils/format'

export default function DonutView({ probabilities = {}, primary }) {
  const data = EMOTION_ORDER.map((k) => {
    const meta = getEmotionMeta(k)
    return {
      name: titleCase(meta.label || k),
      value: (probabilities[k] ?? 0) * 100,
      color: meta.color,
      key: k,
    }
  }).filter((d) => d.value > 0.01)

  return (
    <div className="relative h-[300px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Tooltip
            cursor={false}
            contentStyle={{
              background: 'rgba(21,16,42,0.9)',
              border: '1px solid rgba(139,92,246,0.35)',
              borderRadius: 12,
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: 12,
            }}
            formatter={(v, n) => [`${v.toFixed(2)}%`, n]}
          />
          <Pie
            data={data}
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={2}
            dataKey="value"
            stroke="rgba(10,5,20,0.9)"
            strokeWidth={2}
            isAnimationActive
            animationDuration={1400}
          >
            {data.map((d) => (
              <Cell key={d.key} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl">
          {getEmotionMeta(primary?.emotion).emoji}
        </div>
        <div className="mt-1 font-display text-lg font-semibold text-white">
          {titleCase(primary?.emotion || '')}
        </div>
        <div className="text-xs text-ink-3">
          {toPercent(primary?.confidence || 0, 1)}
        </div>
      </div>
    </div>
  )
}
