'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { TypeMixSlice } from '@/lib/useResearchData'

interface PubTypeMixDonutProps {
  data: TypeMixSlice[]
}

export function PubTypeMixDonut({ data }: PubTypeMixDonutProps) {
  const total = data.reduce((s, d) => s + d.n, 0)

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Publication Type Mix</h3>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="shrink-0" style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={60}
                paddingAngle={2}
                dataKey="n"
                startAngle={90}
                endAngle={-270}
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
                formatter={(value: number, name: string) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
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
    </div>
  )
}
