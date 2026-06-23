'use client'

import { SlidersHorizontal, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface ActiveFilterSummaryProps {
  dashboard: string
  filters?: Record<string, unknown>
  searchQuery?: string
}

function isActive(value: unknown) {
  if (value === undefined || value === null || value === '') return false
  if (typeof value === 'number') return value !== 0
  if (typeof value === 'string') {
    return !['All', 'All Programs', 'All Semesters', 'All Statuses', 'All Categories'].includes(value)
  }
  return true
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function ActiveFilterSummary({ dashboard, filters = {}, searchQuery = '' }: ActiveFilterSummaryProps) {
  const chips = Object.entries(filters)
    .filter(([, value]) => isActive(value))
    .map(([key, value]) => `${formatLabel(key)}: ${String(value)}`)

  if (searchQuery.trim()) {
    chips.unshift(`Search: ${searchQuery.trim()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 rounded-[14px] border border-[#D8E0EE] bg-white/80 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,34,0.06)] backdrop-blur dark:border-[#263448] dark:bg-[#111827]/80"
    >
      <span className="inline-flex items-center gap-2 text-[12px] font-[800] uppercase tracking-[0.08em] text-[#1F3864] dark:text-[#8FE0DE]">
        <SlidersHorizontal size={14} />
        Smart View
      </span>
      {chips.length > 0 ? (
        <>
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[#D8E0EE] bg-[#EEF2F8] px-2.5 py-1 text-[11px] font-[700] text-[#2B3645] dark:border-[#263448] dark:bg-[#162033] dark:text-[#DDE7F7]"
            >
              {chip}
            </span>
          ))}
          <span className="ml-auto text-[11px] font-[600] text-[#5A6675]">
            Applied to {dashboard}
          </span>
        </>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[12px] text-[#5A6675]">
          <Sparkles size={13} className="text-[#C55A11]" />
          Showing the full {dashboard} view. Use filters or search to focus the dashboard.
        </span>
      )}
    </motion.div>
  )
}
