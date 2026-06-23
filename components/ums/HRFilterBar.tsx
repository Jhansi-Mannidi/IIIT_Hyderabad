'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

interface HRFilters {
  fiscalYear: string
  department: string
  designation: string
  employmentType: string
  gender: string
  appraisalStatus: string
}

export function HRFilterBar({ onFiltersChange }: { onFiltersChange?: (filters: HRFilters) => void }) {
  const [filters, setFilters] = useState<HRFilters>({
    fiscalYear: '2024-25',
    department: 'All',
    designation: 'All',
    employmentType: 'All',
    gender: 'All',
    appraisalStatus: 'All',
  })

  const handleFilterChange = (key: keyof HRFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleClearAll = () => {
    const cleared: HRFilters = {
      fiscalYear: '2024-25',
      department: 'All',
      designation: 'All',
      employmentType: 'All',
      gender: 'All',
      appraisalStatus: 'All',
    }
    setFilters(cleared)
    onFiltersChange?.(cleared)
  }

  const activeCount = Object.values(filters).filter(v => v !== 'All' && v !== '2024-25').length

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
          { key: 'fiscalYear' as const, label: 'Fiscal Year', options: ['2024-25', '2023-24', '2022-23'] },
          { key: 'department' as const, label: 'Department', options: ['All', 'CSE', 'Mechanical', 'Civil', 'Economics', 'Admin'] },
          { key: 'designation' as const, label: 'Designation', options: ['All', 'Professor', 'Associate Prof', 'Asst. Professor', 'Lecturer', 'Admin'] },
          { key: 'employmentType' as const, label: 'Employment Type', options: ['All', 'Full-Time', 'Part-Time', 'Contract'] },
          { key: 'gender' as const, label: 'Gender', options: ['All', 'Male', 'Female', 'Other'] },
          { key: 'appraisalStatus' as const, label: 'Appraisal Status', options: ['All', 'Completed', 'Pending', 'In-Progress'] },
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
