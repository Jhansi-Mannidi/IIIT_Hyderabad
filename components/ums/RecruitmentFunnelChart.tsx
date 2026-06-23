'use client'

import { RecruitmentFunnel } from '@/lib/useHRPayrollData'

interface RecruitmentFunnelChartProps {
  data: RecruitmentFunnel[]
}

export function RecruitmentFunnelChart({ data }: RecruitmentFunnelChartProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Recruitment Funnel (Active Cycle)</h3>
      
      <div className="flex justify-between items-end gap-1 h-64 px-2 py-4">
        {data.map((stage, idx) => {
          const height = (stage.percentage / 100) * 240
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-r from-[#2E8B8B] to-[#C55A11] rounded-t-[8px] transition-all hover:shadow-md"
                style={{ height: `${height}px` }}
              />
              <div className="text-center">
                <p className="text-[10px] font-[600] text-[#0F1722]">{stage.stage}</p>
                <p className="font-['Courier'] text-[11px] font-[700] text-[#1F3864]">{stage.count}</p>
                <p className="text-[9px] text-[#9AA6B4]">{stage.percentage.toFixed(1)}%</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
