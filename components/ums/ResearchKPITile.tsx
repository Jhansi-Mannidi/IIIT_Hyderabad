'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { ResearchKPI } from '@/lib/useResearchData'

interface ResearchKPITileProps {
  kpi: ResearchKPI
}

export function ResearchKPITile({ kpi }: ResearchKPITileProps) {
  const { label, value, target, delta, isDerived, format } = kpi

  const formatValue = (v: number) => {
    if (format === 'decimal')   return v.toFixed(2)
    if (format === 'currency')  return `₹${(v / 100).toFixed(1)}L`
    if (format === 'percentage') return `${v.toFixed(1)}%`
    return v.toLocaleString('en-IN')
  }

  const formatTarget = (v: number) => {
    if (format === 'decimal')   return v.toFixed(1)
    if (format === 'currency')  return `₹${(v / 100).toFixed(1)}L`
    if (format === 'percentage') return `${v.toFixed(1)}%`
    return v.toLocaleString('en-IN')
  }

  const positive = delta >= 0

  return (
    <div className="flex flex-col gap-3 p-4 rounded-[12px] bg-white border border-[#E5ECEF]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="text-[11px] font-[600] text-[#5A6B7A] uppercase tracking-wide leading-tight">{label}</p>
            {isDerived && (
              <span className="px-1.5 py-0.5 rounded-[4px] bg-[#EEF2F8] text-[9px] font-[600] text-[#1F3864] shrink-0">
                [Derived]
              </span>
            )}
          </div>
          <p className="font-['Courier_New',monospace] text-[20px] font-[700] text-[#0F1722] leading-none">
            {formatValue(value)}
          </p>
        </div>
        {target !== undefined && (
          <div className="text-right shrink-0">
            <p className="text-[10px] text-[#9AA6B4]">Target</p>
            <p className="font-['Courier_New',monospace] text-[13px] font-[600] text-[#5A6B7A]">{formatTarget(target)}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {positive
          ? <TrendingUp  size={14} className="text-[#27AE60] shrink-0" />
          : <TrendingDown size={14} className="text-[#E74C3C] shrink-0" />}
        <span className={`text-[12px] font-[600] font-['Courier_New',monospace] ${positive ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
          {positive ? '+' : ''}{delta.toFixed(1)}%
        </span>
        <span className="text-[11px] text-[#9AA6B4]">vs target</span>
      </div>
    </div>
  )
}
