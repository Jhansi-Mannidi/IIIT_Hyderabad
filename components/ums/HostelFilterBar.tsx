'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

interface HostelFilters {
  period: string
  block: string
  roomStatus: string
  occupancyRange: string
  utilityType: string
  messPeriod: string
}

export function HostelFilterBar({ onFiltersChange }: { onFiltersChange?: (filters: HostelFilters) => void }) {
  const [filters, setFilters] = useState<HostelFilters>({
    period: 'Sep2024',
    block: 'All',
    roomStatus: 'All',
    occupancyRange: 'All',
    utilityType: 'All',
    messPeriod: 'Weekly',
  })

  const handleFilterChange = (key: keyof HostelFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleClearAll = () => {
    const cleared: HostelFilters = {
      period: 'Sep2024',
      block: 'All',
      roomStatus: 'All',
      occupancyRange: 'All',
      utilityType: 'All',
      messPeriod: 'Weekly',
    }
    setFilters(cleared)
    onFiltersChange?.(cleared)
  }

  const activeCount = Object.values(filters).filter(v => v !== 'All' && v !== 'Sep2024' && v !== 'Weekly').length

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Filters</h3>
        {activeCount > 0 && (
          <button onClick={handleClearAll} className="flex items-center gap-1 px-2 py-1 text-[11px] font-[600] text-[#1F3864] hover:bg-[#EEF2F8] rounded-[6px]">
            <X size={12} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {[
          { key: 'period' as const, label: 'Period', options: ['Sep2024', 'Aug2024', 'Jul2024', 'Jun2024'] },
          { key: 'block' as const, label: 'Hostel Block', options: ['All', 'Boys A', 'Boys B', 'Girls', 'PG'] },
          { key: 'roomStatus' as const, label: 'Room Status', options: ['All', 'Occupied', 'Vacant', 'Maintenance'] },
          { key: 'occupancyRange' as const, label: 'Occupancy %', options: ['All', '<70%', '70-85%', '85-95%', '>95%'] },
          { key: 'utilityType' as const, label: 'Utility Type', options: ['All', 'Electricity', 'Water', 'Gas', 'Maintenance'] },
          { key: 'messPeriod' as const, label: 'Mess Period', options: ['Weekly', 'Monthly', 'Semester'] },
        ].map(({ key, label, options }) => (
          <div key={key} className="relative">
            <select
              value={filters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
            >
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
          </div>
        ))}
      </div>
    </div>
  )
}
