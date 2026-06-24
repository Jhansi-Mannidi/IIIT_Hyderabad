'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { AppliedFiltersInline } from './AppliedFiltersInline'

interface AttendanceFilters {
  month: string
  department: string
  courseLevel: string
  attendanceRange: string
  employeeType: string
  riskStatus: string
}

export function AttendanceFilterBar({ onFiltersChange }: { onFiltersChange?: (filters: AttendanceFilters) => void }) {
  const [filters, setFilters] = useState<AttendanceFilters>({
    month: 'Sep2024',
    department: 'All',
    courseLevel: 'All',
    attendanceRange: 'All',
    employeeType: 'All',
    riskStatus: 'All',
  })

  const handleFilterChange = (key: keyof AttendanceFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleClearAll = () => {
    const cleared: AttendanceFilters = {
      month: 'Sep2024',
      department: 'All',
      courseLevel: 'All',
      attendanceRange: 'All',
      employeeType: 'All',
      riskStatus: 'All',
    }
    setFilters(cleared)
    onFiltersChange?.(cleared)
  }

  const activeCount = Object.values(filters).filter(v => v !== 'All' && v !== 'Sep2024').length

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
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
          { key: 'month' as const, label: 'Month', options: ['Sep2024', 'Aug2024', 'Jul2024', 'Jun2024'] },
          { key: 'department' as const, label: 'Department', options: ['All', 'CSE', 'Mechanical', 'Civil', 'Electronics', 'Electrical'] },
          { key: 'courseLevel' as const, label: 'Course Level', options: ['All', 'UG', 'PG', 'Elective'] },
          { key: 'attendanceRange' as const, label: 'Attendance %', options: ['All', '<60%', '60-75%', '75-90%', '>90%'] },
          { key: 'employeeType' as const, label: 'Employee Type', options: ['All', 'Faculty', 'Staff', 'Contractors'] },
          { key: 'riskStatus' as const, label: 'Risk Status', options: ['All', 'Critical', 'High', 'Medium', 'Healthy'] },
        ].map(({ key, label, options }) => (
          <div key={key} className="relative">
            <select
              value={filters[key]}
              onChange={(e) => handleFilterChange(key, e.target.value)}
              className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
            >
              {options.map((opt, index) => (
                <option key={opt} value={opt}>{index === 0 ? `Select ${label}` : opt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
          </div>
        ))}
      </div>
      <AppliedFiltersInline
        filters={filters}
        defaults={{
          month: 'Sep2024',
          department: 'All',
          courseLevel: 'All',
          attendanceRange: 'All',
          employeeType: 'All',
          riskStatus: 'All',
        }}
      />
    </div>
  )
}
