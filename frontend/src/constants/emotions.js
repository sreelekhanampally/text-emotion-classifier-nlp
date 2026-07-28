/**
 * Emotion metadata — labels, emojis, colors, gradients.
 * Extend freely; unknown emotions fall back to `default`.
 */

export const EMOTION_META = {
  joy: {
    label: 'Joy',
    emoji: '😊',
    color: '#F5C043',
    gradient: 'from-yellow-300 via-amber-400 to-orange-400',
    ring: 'ring-amber-300/30',
    glow: 'rgba(245, 192, 67, 0.35)',
    tag: 'Positive',
  },
  love: {
    label: 'Love',
    emoji: '💜',
    color: '#F472B6',
    gradient: 'from-pink-400 via-fuchsia-500 to-violet-500',
    ring: 'ring-pink-300/30',
    glow: 'rgba(244, 114, 182, 0.35)',
    tag: 'Positive',
  },
  surprise: {
    label: 'Surprise',
    emoji: '😲',
    color: '#22D3EE',
    gradient: 'from-cyan-300 via-sky-400 to-indigo-400',
    ring: 'ring-cyan-300/30',
    glow: 'rgba(34, 211, 238, 0.35)',
    tag: 'Neutral',
  },
  sadness: {
    label: 'Sadness',
    emoji: '😢',
    color: '#60A5FA',
    gradient: 'from-blue-400 via-indigo-500 to-violet-500',
    ring: 'ring-blue-300/30',
    glow: 'rgba(96, 165, 250, 0.35)',
    tag: 'Negative',
  },
  fear: {
    label: 'Fear',
    emoji: '😨',
    color: '#A78BFA',
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    ring: 'ring-violet-300/30',
    glow: 'rgba(167, 139, 250, 0.35)',
    tag: 'Negative',
  },
  anger: {
    label: 'Anger',
    emoji: '😠',
    color: '#F87171',
    gradient: 'from-rose-400 via-red-500 to-orange-500',
    ring: 'ring-rose-300/30',
    glow: 'rgba(248, 113, 113, 0.35)',
    tag: 'Negative',
  },
  default: {
    label: 'Unknown',
    emoji: '🤖',
    color: '#A855F7',
    gradient: 'from-brand-400 via-brand-500 to-brand-700',
    ring: 'ring-brand-400/30',
    glow: 'rgba(168, 85, 247, 0.35)',
    tag: 'Neutral',
  },
}

export const getEmotionMeta = (key) =>
  EMOTION_META[(key || '').toLowerCase()] || EMOTION_META.default

/** Canonical order for distribution charts. */
export const EMOTION_ORDER = ['joy', 'love', 'surprise', 'sadness', 'fear', 'anger']

/** Medal emojis for top-N presentation. */
export const MEDALS = ['🥇', '🥈', '🥉']
