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
} from 'recharts'
import { EquityMetric } from '@/lib/useAcademicDashboardData'

interface EquityMetricsChartProps {
  data: EquityMetric[]
}

export function EquityMetricsChart({ data }: EquityMetricsChartProps) {
  const chartData = data.map((d) => ({
    category: d.category,
    sgpa: d.avgSgpa,
    passRate: d.passRate,
    count: d.count,
  }))

  return (
    <ChartCard
      title="Equity Dashboard"
      subtitle="Performance by category with support recommendations"
      info="Shows average SGPA and pass rate by SC/ST/Gen category. Wider gaps indicate need for targeted support."
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF5" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11, fill: '#6B7C99' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 10]}
            tick={{ fontSize: 11, fill: '#6B7C99' }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'SGPA', angle: -90, position: 'insideLeft', style: { fontSize: '11px' } }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: '#6B7C99' }}
            axisLine={false}
            tickLine={false}
            label={{ value: 'Pass Rate %', angle: 90, position: 'insideRight', style: { fontSize: '11px' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#F5F8FB',
              border: '1px solid #E8EEF5',
              borderRadius: '6px',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string) => {
              if (name === 'sgpa') return [value.toFixed(2), 'Avg SGPA']
              if (name === 'passRate') return [`${value.toFixed(1)}%`, 'Pass Rate']
              return value
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', color: '#6B7C99' }}
            verticalAlign="top"
            height={20}
          />

          <Bar yAxisId="left" dataKey="sgpa" fill="#2E8B8B" radius={[8, 8, 0, 0]} name="Avg SGPA" />
          <Bar yAxisId="right" dataKey="passRate" fill="#C99A2E" radius={[8, 8, 0, 0]} name="Pass Rate %" />
        </BarChart>
      </ResponsiveContainer>

      {/* Equity Gap Analysis */}
      <div className="mt-4 p-3 bg-[#FFF4ED] rounded-[8px] border border-[#FFE5CC]">
        <div className="text-[11px] text-[#6B7C99] font-semibold mb-2">EQUITY GAP ANALYSIS:</div>
        <div className="text-xs text-[#C55A11] space-y-1">
          <div>
            • <strong>SGPA Gap:</strong> Gen {data[0]?.avgSgpa.toFixed(2)} vs ST{' '}
            {data[3]?.avgSgpa.toFixed(2)} = {(data[0]?.avgSgpa - data[3]?.avgSgpa).toFixed(2)} points
          </div>
          <div>
            • <strong>Pass Rate Gap:</strong> Gen {data[0]?.passRate.toFixed(1)}% vs SC{' '}
            {data[2]?.passRate.toFixed(1)}% = {(data[0]?.passRate - data[2]?.passRate).toFixed(1)}
            pp
          </div>
          <div>
            • <strong>Recommendation:</strong> Allocate peer mentoring & tutoring hours for SC/ST cohorts
          </div>
        </div>
      </div>
    </ChartCard>
  )
}
