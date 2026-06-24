'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { AppliedFiltersInline } from './AppliedFiltersInline'

interface FinanceFilters {
  fiscalYear: string
  costCenter: string
  projectStatus: string
  assetCategory: string
  accountType: string
  reconStatus: string
}

export function InstitutionalFinanceFilterBar({ onFiltersChange }: { onFiltersChange?: (filters: FinanceFilters) => void }) {
  const [filters, setFilters] = useState<FinanceFilters>({
    fiscalYear: '2024-25',
    costCenter: 'All',
    projectStatus: 'All',
    assetCategory: 'All',
    accountType: 'All',
    reconStatus: 'All',
  })

  const handleFilterChange = (key: keyof FinanceFilters, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleClearAll = () => {
    const cleared: FinanceFilters = {
      fiscalYear: '2024-25',
      costCenter: 'All',
      projectStatus: 'All',
      assetCategory: 'All',
      accountType: 'All',
      reconStatus: 'All',
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
          { key: 'costCenter' as const, label: 'Cost Center', options: ['All', 'Administration', 'Academics', 'Infrastructure', 'R&D', 'IT & Systems'] },
          { key: 'projectStatus' as const, label: 'Project Status', options: ['All', 'On-Track', 'At-Risk', 'Delayed', 'Completed'] },
          { key: 'assetCategory' as const, label: 'Asset Category', options: ['All', 'Equipment', 'IT', 'Infrastructure', 'Vehicles'] },
          { key: 'accountType' as const, label: 'Account Type', options: ['All', 'Revenue', 'Expense', 'Capital', 'Liabilities'] },
          { key: 'reconStatus' as const, label: 'Recon Status', options: ['All', 'Cleared', 'Pending', 'Unmatched'] },
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
          fiscalYear: '2024-25',
          costCenter: 'All',
          projectStatus: 'All',
          assetCategory: 'All',
          accountType: 'All',
          reconStatus: 'All',
        }}
      />
    </div>
  )
}
