'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

interface AcademicFilterBarProps {
  onFiltersChange?: (filters: AcademicFilters) => void
}

export interface AcademicFilters {
  program: string
  semester: number | null
  riskStatus: string
  category: string
  attendanceMin: number
  sgpaMin: number
}

const PROGRAMS = ['All Programs', 'B.Tech CSE', 'B.Tech ECE', 'B.Tech Mech', 'B.Tech Civil']
const SEMESTERS = ['All Semesters', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
const RISK_STATUSES = ['All Statuses', 'Healthy', 'At-Risk', 'Warning', 'Critical']
const CATEGORIES = ['All Categories', 'Gen', 'OBC', 'SC', 'ST', 'PwD']

export function AcademicFilterBar({ onFiltersChange }: AcademicFilterBarProps) {
  const [filters, setFilters] = useState<AcademicFilters>({
    program: 'All Programs',
    semester: null,
    riskStatus: 'All Statuses',
    category: 'All Categories',
    attendanceMin: 0,
    sgpaMin: 0,
  })

  const handleFilterChange = (key: keyof AcademicFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleReset = () => {
    const resetFilters: AcademicFilters = {
      program: 'All Programs',
      semester: null,
      riskStatus: 'All Statuses',
      category: 'All Categories',
      attendanceMin: 0,
      sgpaMin: 0,
    }
    setFilters(resetFilters)
    onFiltersChange?.(resetFilters)
  }

  const activeFilters = Object.entries(filters).filter(
    ([, value]) =>
      value !== 'All Programs' &&
      value !== 'All Semesters' &&
      value !== 'All Statuses' &&
      value !== 'All Categories' &&
      value !== 0
  ).length

  return (
    <div className="relative z-30 bg-white border border-[#E8EEF5] rounded-[12px] p-4 space-y-3">
      {/* Filter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Program */}
        <FilterSelect
          label="Program"
          options={PROGRAMS}
          value={filters.program}
          onChange={(v) => handleFilterChange('program', v)}
        />

        {/* Semester */}
        <FilterSelect
          label="Semester"
          options={SEMESTERS}
          value={filters.semester === null ? 'All Semesters' : `Sem ${filters.semester}`}
          onChange={(v) =>
            handleFilterChange('semester', v === 'All Semesters' ? null : parseInt(v.split(' ')[1]))
          }
        />

        {/* Risk Status */}
        <FilterSelect
          label="Risk Status"
          options={RISK_STATUSES}
          value={filters.riskStatus}
          onChange={(v) => handleFilterChange('riskStatus', v)}
        />

        {/* Category */}
        <FilterSelect
          label="Category"
          options={CATEGORIES}
          value={filters.category}
          onChange={(v) => handleFilterChange('category', v)}
        />

        {/* Attendance Min */}
        <div>
          <label className="text-xs font-semibold text-[#6B7C99] block mb-1">Min Attendance</label>
          <input
            type="number"
            min="0"
            max="100"
            value={filters.attendanceMin}
            onChange={(e) => handleFilterChange('attendanceMin', parseInt(e.target.value) || 0)}
            className="w-full px-2 py-2 border border-[#E8EEF5] rounded-[6px] text-xs bg-white focus:outline-none focus:border-[#2E8B8B]"
            placeholder="0%"
          />
        </div>

        {/* SGPA Min */}
        <div>
          <label className="text-xs font-semibold text-[#6B7C99] block mb-1">Min SGPA</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={filters.sgpaMin}
            onChange={(e) => handleFilterChange('sgpaMin', parseFloat(e.target.value) || 0)}
            className="w-full px-2 py-2 border border-[#E8EEF5] rounded-[6px] text-xs bg-white focus:outline-none focus:border-[#2E8B8B]"
            placeholder="0.0"
          />
        </div>
      </div>

      {/* Active Filter Count + Reset */}
      {activeFilters > 0 && (
        <div className="flex items-center justify-between pt-2 border-t border-[#E8EEF5]">
          <span className="text-xs text-[#6B7C99]">
            <strong>{activeFilters}</strong> filter{activeFilters !== 1 ? 's' : ''} active
          </span>
          <button
            onClick={handleReset}
            className="text-xs text-[#C55A11] hover:text-[#8B3A3A] font-semibold flex items-center gap-1"
          >
            <X size={12} />
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}

interface FilterSelectProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

function FilterSelect({ label, options, value, onChange }: FilterSelectProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative z-40">
      <label className="text-xs font-semibold text-[#6B7C99] block mb-1">{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-2 py-2 border border-[#E8EEF5] rounded-[6px] bg-white text-left text-xs flex items-center justify-between hover:border-[#2E8B8B] transition-colors"
      >
        <span className="truncate">{value}</span>
        <ChevronDown size={14} className="flex-shrink-0 text-[#6B7C99]" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E8EEF5] rounded-[6px] shadow-lg z-[90]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-xs hover:bg-[#F5F8FB] ${
                value === opt ? 'bg-[#E8F5F5] text-[#2E8B8B] font-semibold' : 'text-[#1F3864]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
