'use client'

import { ChartCard } from './ChartCard'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { GradeDistribution } from '@/lib/useAcademicDashboardData'

interface GradeDistributionHistogramProps {
  data: GradeDistribution[]
}

export function GradeDistributionHistogram({
  data,
}: GradeDistributionHistogramProps) {
  const chartData = data.map((d) => ({
    name: d.grade,
    count: d.count,
    pct: d.percentage,
  }))

  return (
    <ChartCard
      title="Grade Distribution"
      subtitle="Current cohort across all subjects"
      info="Distribution of letter grades (A–F) for all attempted assessments this semester. Higher bars on left indicate stronger cohort performance."
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF5" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6B7C99' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#6B7C99' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#F5F8FB',
              border: '1px solid #E8EEF5',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value} students`, 'Count']}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-6 gap-2 text-[11px]">
        {data.map((d) => (
          <div key={d.grade} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-[#6B7C99]">
              {d.grade}: {d.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
