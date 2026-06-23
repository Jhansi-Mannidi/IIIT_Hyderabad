'use client'

import { RecruitmentFunnel } from '@/lib/useHRPayrollData'
import { MotionCard } from './MotionCard'

interface RecruitmentFunnelChartProps {
  data: RecruitmentFunnel[]
}

export function RecruitmentFunnelChart({ data }: RecruitmentFunnelChartProps) {
  return (
    <MotionCard className="flex h-full min-h-[310px] flex-col gap-3 rounded-[12px] border border-[#E5ECEF] bg-white p-4">
      <div>
        <h3 className="text-[13px] font-[800] text-[#0F1722]">Recruitment Funnel (Active Cycle)</h3>
        <p className="mt-0.5 text-[11px] font-[600] text-[#9AA6B4]">Pipeline movement from applications to joining</p>
      </div>
      
      <div className="grid min-h-0 flex-1 grid-cols-5 items-end gap-2 px-1 pt-2">
        {data.map((stage, idx) => {
          const height = Math.max(12, (stage.percentage / 100) * 176)
          return (
            <div key={idx} className="flex min-w-0 flex-col items-center gap-2">
              <div className="flex h-44 w-full items-end">
                <div
                  className="w-full rounded-t-[10px] bg-gradient-to-r from-[#2E8B8B] to-[#C55A11] shadow-[0_10px_24px_rgba(31,56,100,0.12)] transition-all hover:shadow-md"
                  style={{ height: `${height}px` }}
                  title={`${stage.stage}: ${stage.count} (${stage.percentage.toFixed(1)}%)`}
                />
              </div>
              <div className="min-h-[46px] w-full text-center">
                <p className="truncate text-[10px] font-[800] text-[#0F1722]" title={stage.stage}>{stage.stage}</p>
                <p className="font-['Courier'] text-[11px] font-[800] text-[#1F3864]">{stage.count}</p>
                <p className="text-[9px] font-[650] text-[#9AA6B4]">{stage.percentage.toFixed(1)}%</p>
              </div>
            </div>
          )
        })}
      </div>
    </MotionCard>
  )
}
