'use client'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { PaymentChannel } from '@/lib/useFinanceDashboardData'
import { MotionCard } from './MotionCard'

interface PaymentChannelChartProps {
  data: PaymentChannel[]
}

const COLORS = ['#2E8B8B', '#C55A11', '#C99A2E', '#8E6FB8', '#4A9B7F']

export function PaymentChannelChart({ data }: PaymentChannelChartProps) {
  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Payment Channel Mix</h3>
        <span className="text-[11px] text-[#9AA6B4]">Total Collections</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry: any) => `${entry.percentage.toFixed(0)}%`}
            outerRadius={104}
            fill="#8884d8"
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: any) => `₹${(value / 100).toFixed(1)}L`}
          />
          <Legend fontSize={11} />
        </PieChart>
      </ResponsiveContainer>
    </MotionCard>
  )
}
