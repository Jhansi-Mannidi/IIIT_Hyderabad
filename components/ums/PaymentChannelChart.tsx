'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { PaymentChannel } from '@/lib/useFinanceDashboardData'
import { MotionCard } from './MotionCard'

interface PaymentChannelChartProps {
  data: PaymentChannel[]
}

const COLORS = ['#2E8B8B', '#C55A11', '#C99A2E', '#8E6FB8', '#4A9B7F']

export function PaymentChannelChart({ data }: PaymentChannelChartProps) {
  return (
    <MotionCard className="flex flex-col gap-3 self-start p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Payment Channel Mix</h3>
        <span className="text-[11px] text-[#9AA6B4]">Total Collections</span>
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(180px,0.95fr)] lg:items-center">
        <div className="ums-mobile-native-analytics grid gap-3 md:hidden">
          {data.map((item, index) => (
            <div key={item.channel} className="rounded-[12px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="truncate text-[12px] font-[800] text-[#5A6B7A]" title={item.channel}>{item.channel}</span>
                </div>
                <span className="text-[12px] font-[850] text-[#0F1722]">{item.percentage.toFixed(0)}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#E5ECEF]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.percentage}%`, backgroundColor: COLORS[index % COLORS.length] }}
                />
              </div>
              <div className="mt-1 text-right text-[10px] font-[800] text-[#9AA6B4]">₹{(item.amount / 100).toFixed(1)}L</div>
            </div>
          ))}
        </div>

        <div className="ums-analytics-chart-frame hidden h-60 min-w-0 md:block md:h-[260px]">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220} debounce={80}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.percentage.toFixed(0)}%`}
                outerRadius="72%"
                fill="#8884d8"
                dataKey="amount"
                stroke="#FFFFFF"
                strokeWidth={2}
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
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap content-center gap-x-4 gap-y-2 border-t border-[#E5ECEF] pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
          {data.map((item, index) => (
            <div key={item.channel} className="flex min-w-0 items-center gap-1.5">
              <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="min-w-0 flex-1 truncate text-[11px] font-[750] text-[#5A6B7A]" title={item.channel}>{item.channel}</span>
              <span className="text-[11px] font-[850] text-[#0F1722]">{item.percentage.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </MotionCard>
  )
}
