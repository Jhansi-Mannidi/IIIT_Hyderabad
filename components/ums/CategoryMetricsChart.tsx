'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CategoryMetric } from '@/lib/useAdmissionsDashboardData'
import { MotionCard } from './MotionCard'

interface CategoryMetricsChartProps {
  data: CategoryMetric[]
}

export function CategoryMetricsChart({ data }: CategoryMetricsChartProps) {
  const chartData = data.map((cat) => ({
    category: cat.category,
    applied: cat.applied,
    enrolled: cat.enrolled,
    target: cat.target,
  }))
  const maxValue = Math.max(...chartData.flatMap((item) => [item.applied, item.enrolled, item.target]), 1)

  return (
    <MotionCard className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      <div>
        <h3 className="text-[14px] font-[700] text-[#0F1722]">Category-wise Intake</h3>
        <p className="text-[12px] text-[#5A6B7A] mt-0.5">Applied vs. Enrolled vs. Target by reservation category</p>
      </div>

      <div className="space-y-3 sm:hidden">
        {chartData.map((item) => (
          <div key={item.category} className="rounded-[12px] border border-[#E8EEF5] bg-[#F8FAFD] p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[12px] font-[850] text-[#1F3864]">{item.category}</span>
              <span className="text-[10.5px] font-[750] text-[#6B7C99]">Intake mix</span>
            </div>
            {[
              { label: 'Applied', value: item.applied, color: '#5B8DEF' },
              { label: 'Enrolled', value: item.enrolled, color: '#2E8B8B' },
              { label: 'Target', value: item.target, color: '#C99A2E' },
            ].map((metric) => (
              <div key={metric.label} className="mb-2 last:mb-0">
                <div className="mb-1 flex items-center justify-between text-[10.5px] font-[750]">
                  <span className="text-[#6B7C99]">{metric.label}</span>
                  <span className="tabular-nums text-[#0F1722]">{metric.value.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E8EEF5]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${Math.max(4, (metric.value / maxValue) * 100)}%`, backgroundColor: metric.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden w-full h-64 sm:block">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE7EF" />
            <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#5A6B7A' }} />
            <YAxis tick={{ fontSize: 11, fill: '#5A6B7A' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1722',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#2E8B8B', fontSize: '11px', fontWeight: '600' }}
              formatter={(value) => value.toLocaleString()}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
            <Bar dataKey="applied" fill="#5B8DEF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="enrolled" fill="#2E8B8B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="#C99A2E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </MotionCard>
  )
}
