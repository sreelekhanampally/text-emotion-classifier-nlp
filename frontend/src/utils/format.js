/**
 * Utility formatters. Pure functions, no side effects.
 */

export const clamp = (n, min = 0, max = 1) =>
  Math.max(min, Math.min(max, Number.isFinite(n) ? n : min))

export const toPercent = (v, digits = 1) =>
  `${(clamp(v) * 100).toFixed(digits)}%`

export const toMs = (ms) => {
  if (!Number.isFinite(ms)) return '—'
  if (ms < 1) return `${(ms * 1000).toFixed(0)} µs`
  if (ms < 1000) return `${ms.toFixed(ms < 10 ? 2 : 0)} ms`
  return `${(ms / 1000).toFixed(2)} s`
}

export const truncateId = (id, head = 6, tail = 4) => {
  if (!id) return '—'
  if (id.length <= head + tail + 1) return id
  return `${id.slice(0, head)}…${id.slice(-tail)}`
}

export const formatDateTime = (iso) => {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  } catch {
    return iso
  }
}

export const titleCase = (s) =>
  (s || '')
    .toString()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
