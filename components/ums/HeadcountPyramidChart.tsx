'use client'

import { HeadcountData } from '@/lib/useHRPayrollData'
import { VIZ } from '@/lib/tokens'
import { useTheme } from './ThemeProvider'

interface HeadcountPyramidChartProps {
  data: HeadcountData[]
}

export function HeadcountPyramidChart({ data }: HeadcountPyramidChartProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const maxTotal = Math.max(...data.map(d => d.total))
  const barColor = isDark ? '#6E91B8' : VIZ.blue
  const trackColor = isDark ? '#162033' : '#EEF2F8'

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Headcount Pyramid by Designation</h3>
        <span className="text-[11px] text-[#9AA6B4]">Total Headcount</span>
      </div>

      <div className="space-y-3">
        {data.map((item) => {
          const widthPercent = (item.total / maxTotal) * 100

          return (
            <div key={item.designation} className="flex items-center gap-3">
              <div className="w-24 text-right">
                <p className="text-[10px] font-[600] text-[#0F1722]">{item.designation}</p>
              </div>
              <div className="flex-1">
                <div
                  className="flex h-6 rounded-[6px] overflow-hidden border"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: trackColor,
                    borderColor: isDark ? '#263448' : '#E5ECEF',
                  }}
                >
                  <div
                    className="h-full rounded-[6px]"
                    style={{ width: '100%', backgroundColor: barColor }}
                    title={`${item.designation}: ${item.total}`}
                  />
                </div>
              </div>
              <div className="w-12 text-right">
                <p className="text-[11px] font-[600] text-[#0F1722]">{item.total}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Headcount</p>
          <p className="font-['Courier'] text-[13px] font-[700]">{data.reduce((sum, d) => sum + d.total, 0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Female %</p>
          <p className="font-['Courier'] text-[13px] font-[700]">
            {((data.reduce((sum, d) => sum + d.female, 0) / data.reduce((sum, d) => sum + d.total, 0)) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  )
}
