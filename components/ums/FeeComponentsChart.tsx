'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FeeComponent } from '@/lib/useFinanceDashboardData'
import { MotionCard } from './MotionCard'

interface FeeComponentsChartProps {
  data: FeeComponent[]
}

export function FeeComponentsChart({ data }: FeeComponentsChartProps) {
  const maxTotal = Math.max(
    ...data.map((item) => item.tuition + item.hostel + item.library + item.sports + item.misc),
    1,
  )

  return (
    <MotionCard className="flex flex-col gap-3 self-start p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Fee Components Breakdown</h3>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <div className="ums-mobile-native-analytics grid gap-3 md:hidden">
        {data.map((item) => {
          const total = item.tuition + item.hostel + item.library + item.sports + item.misc
          const pct = Math.round((total / maxTotal) * 100)

          return (
            <div key={item.name} className="rounded-[12px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="truncate text-[12px] font-[800] text-[#5A6B7A]" title={item.name}>{item.name}</span>
                <span className="text-[12px] font-[850] text-[#0F1722]">₹{total.toFixed(1)}L</span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full bg-[#E5ECEF]">
                {[
                  ['tuition', item.tuition, '#2E8B8B'],
                  ['hostel', item.hostel, '#C55A11'],
                  ['library', item.library, '#C99A2E'],
                  ['sports', item.sports, '#8E6FB8'],
                  ['misc', item.misc, '#4A9B7F'],
                ].map(([key, value, color]) => (
                  <div key={key} style={{ width: `${(Number(value) / Math.max(total, 1)) * 100}%`, backgroundColor: String(color) }} />
                ))}
              </div>
              <div className="mt-1 text-right text-[10px] font-[800] text-[#9AA6B4]">{pct}% of highest component group</div>
            </div>
          )
        })}
      </div>

      <div className="ums-analytics-chart-frame hidden h-[260px] min-w-0 md:block">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240} debounce={80}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis
            dataKey="name"
            fontSize={11}
            fill="#5A6B7A"
            axisLine={{ stroke: '#E5ECEF' }}
            tickLine={false}
          />
          <YAxis
            fontSize={11}
            fill="#5A6B7A"
            axisLine={{ stroke: '#E5ECEF' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#2E8B8B', fontSize: '12px', fontWeight: '600' }}
          />
          <Legend
            fontSize={11}
            wrapperStyle={{ paddingTop: '16px' }}
            iconType="square"
          />
          <Bar dataKey="tuition" fill="#2E8B8B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="hostel" fill="#C55A11" radius={[4, 4, 0, 0]} />
          <Bar dataKey="library" fill="#C99A2E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sports" fill="#8E6FB8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="misc" fill="#4A9B7F" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </MotionCard>
  )
}
