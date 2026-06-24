'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { RefundTrend } from '@/lib/useFinanceDashboardData'
import { MotionCard } from './MotionCard'

interface RefundTrendChartProps {
  data: RefundTrend[]
}

export function RefundTrendChart({ data }: RefundTrendChartProps) {
  const maxRefunds = Math.max(...data.map((item) => item.refunds), 1)
  const maxAvg = Math.max(...data.map((item) => item.avg), 1)

  return (
    <MotionCard className="flex flex-col gap-3 self-start p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Refund Processing Trend</h3>
        <span className="text-[11px] text-[#9AA6B4]">Count & Amount in ₹</span>
      </div>

      <div className="space-y-3 sm:hidden">
        {data.map((item) => (
          <div key={item.month} className="rounded-[12px] border border-[#E8EEF5] bg-[#F8FAFD] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[12px] font-[850] text-[#1F3864]">{item.month}</span>
              <span className="text-[12px] font-[850] tabular-nums text-[#0F1722]">{item.refunds} refunds</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="mb-1 flex items-center justify-between text-[10.5px] font-[750]">
                  <span className="text-[#6B7C99]">Refunds</span>
                  <span className="text-[#2E8B8B]">{item.refunds}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E8EEF5]">
                  <div
                    className="h-full rounded-full bg-[#2E8B8B]"
                    style={{ width: `${Math.max(5, (item.refunds / maxRefunds) * 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-[10.5px] font-[750]">
                  <span className="text-[#6B7C99]">Average</span>
                  <span className="text-[#C55A11]">{item.avg}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E8EEF5]">
                  <div
                    className="h-full rounded-full bg-[#C55A11]"
                    style={{ width: `${Math.max(5, (item.avg / maxAvg) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ums-analytics-chart-frame hidden h-[260px] min-w-0 sm:block">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240} debounce={80}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis
            dataKey="month"
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
          <Legend fontSize={11} wrapperStyle={{ paddingTop: '16px' }} />
          <Line
            type="monotone"
            dataKey="refunds"
            stroke="#2E8B8B"
            strokeWidth={2}
            dot={{ fill: '#2E8B8B', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#C55A11"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#C55A11', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </MotionCard>
  )
}
