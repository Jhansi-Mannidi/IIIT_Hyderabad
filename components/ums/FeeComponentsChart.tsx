'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { FeeComponent } from '@/lib/useFinanceDashboardData'

interface FeeComponentsChartProps {
  data: FeeComponent[]
}

export function FeeComponentsChart({ data }: FeeComponentsChartProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Fee Components Breakdown</h3>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
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
  )
}
