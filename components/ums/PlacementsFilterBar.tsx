'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

interface PlacementsFilters {
  year: string
  branch: string
  stream: string
  semester: string
  company: string
}

const FILTERS: Array<{ key: keyof PlacementsFilters; label: string; options: string[] }> = [
  { key: 'year',     label: 'Year',     options: ['2025', '2024', '2023', '2022', '2021'] },
  { key: 'branch',   label: 'Branch',   options: ['All', 'CSE', 'ECE', 'Mechanical', 'Civil', 'Electrical', 'MBA', 'MCA'] },
  { key: 'stream',   label: 'Stream',   options: ['All', 'Engineering', 'Management', 'Computer'] },
  { key: 'semester', label: 'Semester', options: ['All', 'Even', 'Odd'] },
  { key: 'company',  label: 'Company',  options: ['All', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Amazon', 'Google'] },
]

const DEFAULTS: PlacementsFilters = {
  year: '2025', branch: 'All', stream: 'All', semester: 'All', company: 'All',
}

export function PlacementsFilterBar({
  onFiltersChange,
}: { onFiltersChange?: (f: PlacementsFilters) => void }) {
  const [filters, setFilters] = useState<PlacementsFilters>(DEFAULTS)

  const update = (key: keyof PlacementsFilters, val: string) => {
    const next = { ...filters, [key]: val }
    setFilters(next)
    onFiltersChange?.(next)
  }

  const reset = () => { setFilters(DEFAULTS); onFiltersChange?.(DEFAULTS) }

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => v !== DEFAULTS[k as keyof PlacementsFilters]
  ).length

  return (
    <div className="sticky top-0 z-10 bg-white rounded-[12px] border border-[#E5ECEF] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-[600] text-[#1F3864] hover:bg-[#EEF2F8] rounded-[6px]"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {FILTERS.map(({ key, label, options }) => (
          <div key={key} className="relative">
            <label className="block text-[10px] font-[600] text-[#9AA6B4] mb-1 uppercase tracking-wide">
              {label}
            </label>
            <div className="relative">
              <select
                value={filters[key]}
                onChange={e => update(key, e.target.value)}
                className="w-full px-3 py-2 pr-7 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none text-[#0F1722] font-[500] cursor-pointer"
              >
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
