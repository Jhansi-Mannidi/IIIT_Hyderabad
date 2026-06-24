'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { TypeMixSlice } from '@/lib/useResearchData'
import { MotionCard } from './MotionCard'

interface PubTypeMixDonutProps {
  data: TypeMixSlice[]
}

export function PubTypeMixDonut({ data }: PubTypeMixDonutProps) {
  const total = Math.max(data.reduce((s, d) => s + d.n, 0), 1)

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Publication Type Mix</h3>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        {/* Donut */}
        <div className="ums-mobile-native-analytics grid w-full gap-3 md:hidden">
          {data.map((slice) => {
            const pct = Math.round((slice.n / total) * 100)

            return (
              <div key={slice.type} className="rounded-[12px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
                    <span className="truncate text-[12px] font-[800] text-[#5A6B7A]" title={slice.type}>{slice.type}</span>
                  </div>
                  <span className="text-[12px] font-[850] text-[#0F1722]">{slice.n}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#E5ECEF]">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: slice.color }} />
                </div>
                <div className="mt-1 text-right text-[10px] font-[800] text-[#9AA6B4]">{pct}%</div>
              </div>
            )
          })}
        </div>

        <div className="ums-analytics-chart-frame mx-auto hidden h-48 w-full min-w-0 md:mx-0 md:block md:h-44 md:w-44 md:shrink-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={180} debounce={80}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius="42%"
                outerRadius="72%"
                paddingAngle={2}
                dataKey="n"
                startAngle={90}
                endAngle={-270}
                stroke="#FFFFFF"
                strokeWidth={2}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F1722',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: '#fff',
                }}
                formatter={(value, name) => {
                  const numericValue = Number(value ?? 0)
                  return [`${numericValue} (${((numericValue / total) * 100).toFixed(1)}%)`, String(name)]
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="min-w-0 flex-1 space-y-3">
          {data.map((slice) => (
            <div key={slice.type} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[11px] font-[500] text-[#0F1722]">{slice.type}</span>
                  <span className="font-['Courier_New',monospace] text-[11px] font-[700] text-[#0F1722]">{slice.n}</span>
                </div>
                <div className="w-full h-1.5 bg-[#F0F4F7] rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(slice.n / total) * 100}%`, backgroundColor: slice.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-[#F6F8FB] rounded-[8px]">
        <p className="text-[10px] text-[#9AA6B4] mb-0.5">Total Publications</p>
        <p className="font-['Courier_New',monospace] text-[13px] font-[700]">{total}</p>
      </div>
    </MotionCard>
  )
}
