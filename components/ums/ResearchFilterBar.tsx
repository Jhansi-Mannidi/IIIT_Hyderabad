'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { AppliedFiltersInline } from './AppliedFiltersInline'

export interface ResearchFilters {
  publishYear: string
  publicationType: string
  center: string
  facultyCode: string
  reviewLevel: string
  degree: string
}

const DEFAULTS: ResearchFilters = {
  publishYear:     'All',
  publicationType: 'All',
  center:          'All',
  facultyCode:     'All',
  reviewLevel:     'All',
  degree:          'All',
}

const FILTER_CONFIG = [
  {
    key: 'publishYear' as const,
    label: 'Publish Year',
    options: ['All', '2024', '2023', '2022', '2021', '2020', '2019'],
  },
  {
    key: 'publicationType' as const,
    label: 'Pub Type',
    options: ['All', 'Journal', 'Conference', 'Patent'],
  },
  {
    key: 'center' as const,
    label: 'Center',
    options: ['All', 'ECE', 'CSE', 'Mechanical', 'Civil', 'Management', 'Physics'],
  },
  {
    key: 'facultyCode' as const,
    label: 'Faculty',
    options: ['All', 'Mehta R.', 'Desai N.', 'Iyer S.', 'Pillai R.', 'Verma S.', 'Rao T.'],
  },
  {
    key: 'reviewLevel' as const,
    label: 'CORE Rank',
    options: ['All', 'A*', 'A', 'B', 'C', 'Unranked'],
  },
  {
    key: 'degree' as const,
    label: 'Degree / Programme',
    options: ['All', 'PhD', 'M.Tech', 'MBA', 'B.Tech'],
  },
]

interface ResearchFilterBarProps {
  onFiltersChange?: (f: ResearchFilters) => void
}

export function ResearchFilterBar({ onFiltersChange }: ResearchFilterBarProps) {
  const [filters, setFilters] = useState<ResearchFilters>(DEFAULTS)

  const handleChange = (key: keyof ResearchFilters, value: string) => {
    const next = { ...filters, [key]: value }
    setFilters(next)
    onFiltersChange?.(next)
  }

  const handleClear = () => {
    setFilters(DEFAULTS)
    onFiltersChange?.(DEFAULTS)
  }

  const activeCount = Object.values(filters).filter(v => v !== 'All').length

  return (
    <div className="p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-[600] text-[#1F3864] hover:bg-[#EEF2F8] rounded-[6px]"
          >
            <X size={12} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {FILTER_CONFIG.map(({ key, label, options }) => (
          <div key={key} className="relative">
            <label className="block text-[10px] font-[600] text-[#9AA6B4] uppercase tracking-wide mb-1">{label}</label>
            <select
              value={filters[key]}
              onChange={e => handleChange(key, e.target.value)}
              className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
            >
              {options.map((opt, index) => (
                <option key={opt} value={opt}>{index === 0 ? `Select ${label}` : opt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 bottom-[9px] pointer-events-none text-[#5A6B7A]" />
          </div>
        ))}
      </div>
      <AppliedFiltersInline filters={filters} defaults={DEFAULTS} />
    </div>
  )
}
