'use client'
import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

interface AdmissionsFilterBarProps {
  onFiltersChange?: (filters: AdmissionsFilters) => void
}

export interface AdmissionsFilters {
  year?: number
  channel?: string
  category?: string
  state?: string
  stage?: string
  rankBand?: string
}

export function AdmissionsFilterBar({ onFiltersChange }: AdmissionsFilterBarProps) {
  const [filters, setFilters] = useState<AdmissionsFilters>({})

  const handleFilterChange = (key: keyof AdmissionsFilters, value?: string | number) => {
    const newFilters = { ...filters, [key]: value }
    if (!value) delete newFilters[key]
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleClearAll = () => {
    setFilters({})
    onFiltersChange?.({})
  }

  const activeCount = Object.keys(filters).length

  return (
    <div className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-[600] text-[#5A6B7A]">FILTERS</span>
          {activeCount > 0 && (
            <span className="text-[11px] font-[600] px-1.5 py-0.5 rounded-[4px] bg-[#C55A11] text-white">
              {activeCount} active
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[11px] font-[600] text-[#2E8B8B] hover:text-[#1F3864] transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {/* Academic Year */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-[600] text-[#5A6B7A]">Academic Year</label>
          <select
            value={filters.year ?? ''}
            onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : undefined)}
            className="px-2 py-1.5 text-[11px] font-[500] border border-[#DFE7EF] rounded-[6px] bg-white text-[#0F1722] focus:outline-none focus:border-[#2E8B8B]"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        {/* Channel */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-[600] text-[#5A6B7A]">Channel</label>
          <select
            value={filters.channel ?? ''}
            onChange={(e) => handleFilterChange('channel', e.target.value || undefined)}
            className="px-2 py-1.5 text-[11px] font-[500] border border-[#DFE7EF] rounded-[6px] bg-white text-[#0F1722] focus:outline-none focus:border-[#2E8B8B]"
          >
            <option value="">All Channels</option>
            <option value="jee">JEE Mains</option>
            <option value="dasa">DASA</option>
            <option value="direct">Direct Admission</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-[600] text-[#5A6B7A]">Category</label>
          <select
            value={filters.category ?? ''}
            onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
            className="px-2 py-1.5 text-[11px] font-[500] border border-[#DFE7EF] rounded-[6px] bg-white text-[#0F1722] focus:outline-none focus:border-[#2E8B8B]"
          >
            <option value="">All Categories</option>
            <option value="GEN">General (GEN)</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>

        {/* Stage */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-[600] text-[#5A6B7A]">Funnel Stage</label>
          <select
            value={filters.stage ?? ''}
            onChange={(e) => handleFilterChange('stage', e.target.value || undefined)}
            className="px-2 py-1.5 text-[11px] font-[500] border border-[#DFE7EF] rounded-[6px] bg-white text-[#0F1722] focus:outline-none focus:border-[#2E8B8B]"
          >
            <option value="">All Stages</option>
            <option value="Applied">Applied</option>
            <option value="Ranked">Ranked</option>
            <option value="Allotted">Allotted</option>
            <option value="Reported">Reported</option>
          </select>
        </div>

        {/* State */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-[600] text-[#5A6B7A]">State</label>
          <select
            value={filters.state ?? ''}
            onChange={(e) => handleFilterChange('state', e.target.value || undefined)}
            className="px-2 py-1.5 text-[11px] font-[500] border border-[#DFE7EF] rounded-[6px] bg-white text-[#0F1722] focus:outline-none focus:border-[#2E8B8B]"
          >
            <option value="">All States</option>
            <option value="Delhi">Delhi</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
        </div>

        {/* Rank Band */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-[600] text-[#5A6B7A]">Rank Band</label>
          <select
            value={filters.rankBand ?? ''}
            onChange={(e) => handleFilterChange('rankBand', e.target.value || undefined)}
            className="px-2 py-1.5 text-[11px] font-[500] border border-[#DFE7EF] rounded-[6px] bg-white text-[#0F1722] focus:outline-none focus:border-[#2E8B8B]"
          >
            <option value="">All Ranks</option>
            <option value="1-2000">1-2000</option>
            <option value="2001-5000">2001-5000</option>
            <option value="5001-10000">5001-10000</option>
          </select>
        </div>
      </div>
    </div>
  )
}
