'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

interface FinanceFilterBarProps {
  onFiltersChange?: (filters: FinanceFilters) => void
}

export interface FinanceFilters {
  academicYear: string
  term: string
  category: string
  status: string
  ageing: string
  paymentChannel: string
}

const ACADEMIC_YEARS = ['2024-25', '2023-24', '2022-23']
const TERMS = ['Term 1', 'Term 2', 'Term 3']
const CATEGORIES = ['All', 'Gen', 'OBC', 'SC', 'ST', 'PwD']
const STATUSES = ['All', 'Paid', 'Outstanding', 'Partial', 'Refunded']
const AGEING_OPTIONS = ['All', '0-30', '30-60', '60-90', '90+']
const CHANNELS = ['All', 'Net Banking', 'UPI', 'Cheque', 'DD', 'Cash']

export function FinanceFilterBar({ onFiltersChange }: FinanceFilterBarProps) {
  const [filters, setFilters] = useState<FinanceFilters>({
    academicYear: '2024-25',
    term: 'Term 1',
    category: 'All',
    status: 'All',
    ageing: 'All',
    paymentChannel: 'All',
  })

  const handleFilterChange = (key: keyof FinanceFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleClearAll = () => {
    const cleared: FinanceFilters = {
      academicYear: '2024-25',
      term: 'Term 1',
      category: 'All',
      status: 'All',
      ageing: 'All',
      paymentChannel: 'All',
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
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-[600] text-[#1F3864] hover:bg-[#EEF2F8] rounded-[6px]"
          >
            <X size={12} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* Academic Year */}
        <div className="relative">
          <select
            value={filters.academicYear}
            onChange={(e) => handleFilterChange('academicYear', e.target.value)}
            className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
          >
            {ACADEMIC_YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
        </div>

        {/* Term */}
        <div className="relative">
          <select
            value={filters.term}
            onChange={(e) => handleFilterChange('term', e.target.value)}
            className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
          >
            {TERMS.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
        </div>

        {/* Category */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
        </div>

        {/* Status */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
          >
            {STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
        </div>

        {/* Ageing */}
        <div className="relative">
          <select
            value={filters.ageing}
            onChange={(e) => handleFilterChange('ageing', e.target.value)}
            className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
          >
            {AGEING_OPTIONS.map(a => (
              <option key={a} value={a}>{a === '90+' ? '>90 Days' : a}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
        </div>

        {/* Payment Channel */}
        <div className="relative">
          <select
            value={filters.paymentChannel}
            onChange={(e) => handleFilterChange('paymentChannel', e.target.value)}
            className="w-full px-3 py-2 text-[12px] bg-white border border-[#D1D8DF] rounded-[8px] appearance-none cursor-pointer text-[#0F1722] font-[500]"
          >
            {CHANNELS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A6B7A]" />
        </div>
      </div>
    </div>
  )
}
