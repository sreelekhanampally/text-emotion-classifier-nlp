import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { getEmotionMeta, EMOTION_ORDER } from '../../constants/emotions'
import { titleCase } from '../../utils/format'

/**
 * RadarView — six-axis emotion fingerprint using Recharts.
 */
export default function RadarView({ probabilities = {} }) {
  const data = EMOTION_ORDER.map((k) => ({
    key: k,
    label: titleCase(getEmotionMeta(k).label || k),
    value: (probabilities[k] ?? 0) * 100,
    emoji: getEmotionMeta(k).emoji,
  }))

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="72%">
          <defs>
            <radialGradient id="radarFill" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          <PolarGrid stroke="rgba(255,255,255,0.12)" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: '#B9B1D6', fontSize: 11, fontWeight: 500 }}
            stroke="rgba(255,255,255,0.15)"
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#5A5378', fontSize: 9 }}
            stroke="rgba(255,255,255,0.06)"
            tickCount={5}
          />
          <Radar
            name="Confidence"
            dataKey="value"
            stroke="#C084FC"
            strokeWidth={2}
            fill="url(#radarFill)"
            isAnimationActive
            animationDuration={1400}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
