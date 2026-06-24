'use client'

interface AppliedFiltersInlineProps {
  filters: Record<string, unknown>
  defaults?: Record<string, unknown>
  labels?: Record<string, string>
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function isApplied(key: string, value: unknown, defaults?: Record<string, unknown>) {
  if (defaults && value === defaults[key]) return false
  if (value === undefined || value === null || value === '') return false
  if (typeof value === 'number') return value !== 0
  if (typeof value === 'string') {
    return !['All', 'All Programs', 'All Semesters', 'All Statuses', 'All Categories'].includes(value)
  }

  return true
}

export function AppliedFiltersInline({ filters, defaults, labels = {} }: AppliedFiltersInlineProps) {
  const applied = Object.entries(filters).filter(([key, value]) => isApplied(key, value, defaults))

  if (applied.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-[#E5ECEF] pt-3">
      <span className="text-[11px] font-[800] uppercase tracking-[0.08em] text-[#6B7C99]">Applied</span>
      {applied.map(([key, value]) => (
        <span
          key={key}
          className="inline-flex max-w-full items-center rounded-full border border-[#D8E0EE] bg-white px-2.5 py-1 text-[11px] font-[700] text-[#2B3645]"
        >
          <span className="mr-1 text-[#6B7C99]">{labels[key] ?? formatLabel(key)}:</span>
          <span className="truncate text-[#0F1722]">{String(value)}</span>
        </span>
      ))}
    </div>
  )
}
