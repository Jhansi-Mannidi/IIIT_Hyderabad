'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CategoryMetric } from '@/lib/useAdmissionsDashboardData'

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

  return (
    <div className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      <div>
        <h3 className="text-[14px] font-[700] text-[#0F1722]">Category-wise Intake</h3>
        <p className="text-[12px] text-[#5A6B7A] mt-0.5">Applied vs. Enrolled vs. Target by reservation category</p>
      </div>

      <div className="w-full h-64">
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
    </div>
  )
}
