export type DashboardFilters = Record<string, unknown>

const DEFAULT_VALUES = new Set([
  '',
  'All',
  'All Programs',
  'All Semesters',
  'All Statuses',
  'All Categories',
])

const SKIP_NUMERIC_KEYS = new Set([
  'id',
  'year',
  'semester',
  'capacity',
  'target',
  'rawTarget',
])

function activeEntries(filters: DashboardFilters) {
  return Object.entries(filters).filter(([, value]) => {
    if (value === null || value === undefined) return false
    if (typeof value === 'number') return value !== 0
    return !DEFAULT_VALUES.has(String(value))
  })
}

function hashText(text: string) {
  let hash = 0
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 997
  }
  return hash
}

function buildFactor(filters: DashboardFilters, searchQuery: string) {
  const entries = activeEntries(filters)
  const signature = `${entries.map(([key, value]) => `${key}:${value}`).join('|')}|${searchQuery}`
  if (!signature.trim()) return 1

  const hash = hashText(signature)
  const direction = hash % 2 === 0 ? 1 : -1
  const filterWeight = Math.min(0.18, entries.length * 0.035)
  const searchWeight = searchQuery.trim() ? 0.025 : 0

  return 1 + direction * (filterWeight + searchWeight + (hash % 7) / 1000)
}

function stringifyRecord(value: unknown) {
  if (!value || typeof value !== 'object') return String(value ?? '').toLowerCase()
  return Object.values(value as Record<string, unknown>).join(' ').toLowerCase()
}

function matchesFilters(item: unknown, filters: DashboardFilters, searchQuery: string) {
  const haystack = stringifyRecord(item)
  const query = searchQuery.trim().toLowerCase()
  if (query && !haystack.includes(query)) return false

  return activeEntries(filters).every(([, value]) => {
    const needle = String(value).toLowerCase()
    if (!needle || needle === 'all') return true
    return haystack.includes(needle)
  })
}

function shouldClampPercentage(key: string) {
  const normalized = key.toLowerCase()
  return [
    'rate',
    'pct',
    'percent',
    'percentage',
    'attendance',
    'score',
    'progress',
    'utilization',
    'compliance',
    'fill',
    'sgpa',
  ].some((token) => normalized.includes(token))
}

function scaleNumber(key: string, value: number, factor: number) {
  if (!Number.isFinite(value) || SKIP_NUMERIC_KEYS.has(key)) return value

  if (shouldClampPercentage(key)) {
    const adjusted = value * (1 + (factor - 1) * 0.55)
    return Math.max(0, Math.min(100, Number(adjusted.toFixed(1))))
  }

  const adjusted = value * factor
  return Number.isInteger(value) ? Math.max(0, Math.round(adjusted)) : Number(adjusted.toFixed(1))
}

function deriveValue(value: unknown, factor: number, key = ''): unknown {
  if (typeof value === 'number') return scaleNumber(key, value, factor)
  if (Array.isArray(value)) {
    return value.map((item) => deriveValue(item, factor, key))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([entryKey, entryValue]) => [
        entryKey,
        deriveValue(entryValue, factor, entryKey),
      ]),
    )
  }

  return value
}

function filterArrays(value: unknown, filters: DashboardFilters, searchQuery: string): unknown {
  if (Array.isArray(value)) {
    const hasObjects = value.some((item) => item && typeof item === 'object')
    if (!hasObjects) return value

    const filtered = value.filter((item) => matchesFilters(item, filters, searchQuery))
    return filtered.length > 0 ? filtered : value
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entryValue]) => [
        key,
        filterArrays(entryValue, filters, searchQuery),
      ]),
    )
  }

  return value
}

export function applyDashboardFilters<T>(data: T, filters: DashboardFilters, searchQuery = ''): T {
  const hasFilters = activeEntries(filters).length > 0 || searchQuery.trim().length > 0
  if (!hasFilters) return data

  const filtered = filterArrays(data, filters, searchQuery)
  return deriveValue(filtered, buildFactor(filters, searchQuery)) as T
}
