'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { StateMetric } from '@/lib/useAdmissionsDashboardData'
import { MotionCard } from './MotionCard'

interface StateMetricsChartProps {
  data: StateMetric[]
}

export function StateMetricsChart({ data }: StateMetricsChartProps) {
  const getColor = (rate: number) => {
    if (rate >= 25) return '#2E8B8B'
    if (rate >= 20) return '#C99A2E'
    return '#C55A11'
  }
  const maxRate = Math.max(...data.map((item) => item.conversionRate), 1)

  return (
    <MotionCard className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      <div>
        <h3 className="text-[14px] font-[700] text-[#0F1722]">State-wise Conversion Rates</h3>
        <p className="text-[12px] text-[#5A6B7A] mt-0.5">Top performing states and areas needing attention</p>
      </div>

      <div className="space-y-3 sm:hidden">
        {data.map((item) => {
          const color = getColor(item.conversionRate)
          const width = Math.max(8, (item.conversionRate / maxRate) * 100)
          return (
            <div key={item.state} className="rounded-[12px] border border-[#E8EEF5] bg-[#F8FAFD] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-[12px] font-[800] text-[#1F3864]" title={item.state}>
                  {item.state}
                </span>
                <span className="text-[12px] font-[850] tabular-nums text-[#0F1722]">
                  {item.conversionRate.toFixed(1)}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#E8EEF5]">
                <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10.5px] font-[700] text-[#6B7C99]">
                <span>Applicants</span>
                <span className="tabular-nums">{item.applicants.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="hidden w-full h-64 sm:block">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE7EF" />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#5A6B7A' }} />
            <YAxis dataKey="state" type="category" tick={{ fontSize: 10, fill: '#5A6B7A' }} width={75} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1722',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
              }}
              formatter={(value) => `${value.toFixed(1)}%`}
            />
            <Bar dataKey="conversionRate" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.conversionRate)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-2 pt-2 border-t border-[#DFE7EF] sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[2px] bg-[#2E8B8B]" />
          <span className="text-[10px] text-[#5A6B7A]">High (25%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[2px] bg-[#C99A2E]" />
          <span className="text-[10px] text-[#5A6B7A]">Moderate (20-24%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-[2px] bg-[#C55A11]" />
          <span className="text-[10px] text-[#5A6B7A]">{'Low (<20%)'}</span>
        </div>
      </div>
    </MotionCard>
  )
}
