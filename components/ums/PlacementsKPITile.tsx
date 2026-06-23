'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { PlacementsKPI } from '@/lib/usePlacementsData'

interface PlacementsKPITileProps {
  kpi: PlacementsKPI
}

function formatValue(kpi: PlacementsKPI): string {
  if (kpi.format === 'percent') return `${(kpi.value as number).toFixed(1)}%`
  if (kpi.format === 'lpa')     return `${(kpi.value as number).toFixed(1)} LPA`
  if (kpi.format === 'count')   return (kpi.value as number).toLocaleString('en-IN')
  return String(kpi.value)
}

export function PlacementsKPITile({ kpi }: PlacementsKPITileProps) {
  const hasDelta   = kpi.delta !== undefined && kpi.delta !== 0
  const isPositive = (kpi.delta ?? 0) >= 0

  // For "not placed", fewer is better — invert the color logic
  const isGood = kpi.id === 'students-not-placed' ? !isPositive : isPositive

  return (
    <div className="flex flex-col gap-3 p-4 rounded-[12px] bg-white border border-[#E5ECEF]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <p className="text-[11px] font-[600] text-[#5A6B7A] uppercase tracking-wide leading-tight">
              {kpi.label}
            </p>
            {kpi.isDerived && (
              <span className="px-1.5 py-0.5 rounded-[4px] bg-[#EEF2F8] text-[9px] font-[600] text-[#1F3864]">
                [Derived]
              </span>
            )}
          </div>
          <p className="font-['Courier_New',_monospace] text-[22px] font-[700] text-[#0F1722] leading-none">
            {formatValue(kpi)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {kpi.sub && (
          <span className="text-[11px] text-[#9AA6B4] truncate">{kpi.sub}</span>
        )}
        {hasDelta && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {isGood
              ? <TrendingUp  size={12} className="text-[#27AE60]" />
              : <TrendingDown size={12} className="text-[#E74C3C]" />}
            <span className={`text-[11px] font-[600] font-['Courier_New',_monospace] ${isGood ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
              {isPositive ? '+' : ''}{(kpi.delta as number).toFixed(1)}
              {kpi.format === 'percent' ? 'pp' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
