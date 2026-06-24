'use client'

import { AppraisalProgress } from '@/lib/useHRPayrollData'
import { VIZ } from '@/lib/tokens'
import { MotionCard } from './MotionCard'
import { useTheme } from './ThemeProvider'

interface AppraisalProgressChartProps {
  data: AppraisalProgress[]
}

export function AppraisalProgressChart({ data }: AppraisalProgressChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const barColor = isDark ? '#64BDB6' : VIZ.teal
  const trackColor = isDark ? '#162033' : '#EEF2F8'

  return (
    <MotionCard className="flex h-full min-h-[310px] flex-col gap-4 rounded-[12px] border border-[#E5ECEF] bg-white p-4">
      <div>
        <h3 className="text-[13px] font-[800] text-[#0F1722]">Appraisal Completion Progress</h3>
        <p className="mt-0.5 text-[11px] font-[600] text-[#9AA6B4]">Cycle-wise appraisal completion against eligible faculty</p>
      </div>
      
      <div className="flex flex-1 flex-col justify-center space-y-4">
        {data.map((cycle) => (
          <div key={cycle.cycle} className="grid grid-cols-[104px_1fr_44px] items-center gap-3">
            <div className="min-w-0">
              <p className="truncate text-[10px] font-[800] text-[#0F1722]" title={cycle.cycle}>{cycle.cycle}</p>
              <p className="text-[9px] font-[650] text-[#9AA6B4]">{cycle.completed} / {cycle.total}</p>
            </div>
            <div className="min-w-0">
              <div
                className="h-5 w-full overflow-hidden rounded-[7px] border"
                style={{ backgroundColor: trackColor, borderColor: isDark ? '#263448' : '#E5ECEF' }}
              >
                <div
                  className="h-full rounded-[7px] transition-all"
                  style={{ width: `${cycle.percentComplete}%`, backgroundColor: barColor }}
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-[800] text-[#0F1722]">{cycle.percentComplete.toFixed(0)}%</p>
            </div>
          </div>
        ))}
      </div>
    </MotionCard>
  )
}
