'use client'

import { ChartCard } from './ChartCard'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { SgpaTrend } from '@/lib/useAcademicDashboardData'

interface SGPATrendChartProps {
  data: SgpaTrend[]
}

export function SGPATrendChart({ data }: SGPATrendChartProps) {
  const chartData = data.map((d) => ({
    name: `Sem ${d.semester}`,
    avg: d.avgSgpa,
    median: d.median,
    q1: d.q1,
    q3: d.q3,
  }))

  return (
    <ChartCard
      title="SGPA Trend"
      subtitle="Semester-wise progression with quartile bands"
      info="Blue line = average, Black dashed = median. Shaded area shows 25th–75th percentile range. Upward trend indicates improved cohort performance."
    >
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF5" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6B7C99' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 10]}
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
            formatter={(value: number) => value.toFixed(2)}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', color: '#6B7C99' }}
            verticalAlign="top"
            height={20}
          />

          {/* Quartile band fill */}
          <defs>
            <linearGradient id="quartileGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2E8B8B" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#2E8B8B" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          {/* Q1–Q3 band (visual reference) */}
          <Line
            type="monotone"
            dataKey="q3"
            stroke="transparent"
            strokeWidth={0}
            isAnimationActive={false}
          />

          {/* Average line */}
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#2E8B8B"
            strokeWidth={3}
            dot={{ fill: '#2E8B8B', r: 4 }}
            name="Average SGPA"
            isAnimationActive={false}
          />

          {/* Median line (dashed) */}
          <Line
            type="monotone"
            dataKey="median"
            stroke="#1F3864"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Median"
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-4 gap-3 text-xs">
        {[
          { label: 'Current Avg', value: data[data.length - 1]?.avgSgpa.toFixed(2) || '—' },
          { label: 'Trend', value: `+${(data[data.length - 1]?.avgSgpa - data[0]?.avgSgpa).toFixed(2)}` },
          { label: 'Median', value: data[data.length - 1]?.median.toFixed(2) || '—' },
          { label: 'Q1–Q3 Range', value: `${data[data.length - 1]?.q1.toFixed(1)}–${data[data.length - 1]?.q3.toFixed(1)}` },
        ].map((stat) => (
          <div key={stat.label} className="p-2 bg-[#F5F8FB] rounded-[6px]">
            <div className="text-[#6B7C99] font-medium mb-0.5">{stat.label}</div>
            <div className="text-[#1F3864] font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
