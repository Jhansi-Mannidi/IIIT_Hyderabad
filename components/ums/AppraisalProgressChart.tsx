'use client'

import { AppraisalProgress } from '@/lib/useHRPayrollData'

interface AppraisalProgressChartProps {
  data: AppraisalProgress[]
}

export function AppraisalProgressChart({ data }: AppraisalProgressChartProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Appraisal Completion Progress</h3>
      
      <div className="space-y-3">
        {data.map((cycle) => (
          <div key={cycle.cycle} className="flex items-center gap-3">
            <div className="w-32">
              <p className="text-[10px] font-[600] text-[#0F1722]">{cycle.cycle}</p>
              <p className="text-[9px] text-[#9AA6B4]">{cycle.completed} / {cycle.total}</p>
            </div>
            <div className="flex-1">
              <div className="w-full h-5 bg-[#F0F4F7] rounded-[6px] overflow-hidden border border-[#E5ECEF]">
                <div
                  className="h-full bg-[#2E8B8B] transition-all rounded-[6px]"
                  style={{ width: `${cycle.percentComplete}%` }}
                />
              </div>
            </div>
            <div className="w-12 text-right">
              <p className="text-[11px] font-[600] text-[#0F1722]">{cycle.percentComplete.toFixed(0)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
