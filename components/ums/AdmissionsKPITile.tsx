'use client'
import { TrendingUp, TrendingDown, Badge } from 'lucide-react'
import { AdmissionsKPI } from '@/lib/useAdmissionsDashboardData'

interface AdmissionsKPITileProps {
  metric: AdmissionsKPI
}

export function AdmissionsKPITile({ metric }: AdmissionsKPITileProps) {
  const isDelta = metric.delta !== undefined
  const isPositive = isDelta ? metric.delta > 0 : false
  const deltaColor = isPositive ? 'text-[#2E8B8B]' : 'text-[#B2566B]'
  const deltaBgColor = isPositive ? 'bg-[#E8F5F5]' : 'bg-[#F8E8EC]'

  return (
    <div className="flex flex-col gap-2 px-3 py-3 rounded-[10px] bg-white border border-[#DFE7EF] hover:border-[#2E8B8B] transition-colors">
      {/* Label + Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-[600] text-[#5A6B7A] truncate">{metric.label}</span>
        {metric.derived && (
          <span className="flex items-center gap-1 text-[9px] font-[600] text-[#1F3864] bg-[#EEF2F8] px-1.5 py-0.5 rounded-[4px]">
            <Badge size={10} />
            Derived
          </span>
        )}
      </div>

      {/* Value */}
      <div className="text-[18px] font-[700] text-[#0F1722] tabular-nums">{metric.value}</div>

      {/* Delta */}
      {isDelta && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-[6px] ${deltaBgColor} w-fit`}>
          {isPositive ? (
            <TrendingUp size={12} className={deltaColor} />
          ) : (
            <TrendingDown size={12} className={deltaColor} />
          )}
          <span className={`text-[11px] font-[600] ${deltaColor}`}>
            {isPositive ? '+' : ''}{metric.delta}% {metric.unit || ''}
          </span>
        </div>
      )}
    </div>
  )
}
