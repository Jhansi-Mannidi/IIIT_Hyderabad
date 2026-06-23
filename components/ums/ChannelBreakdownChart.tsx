'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { ChannelMetric } from '@/lib/useAdmissionsDashboardData'

interface ChannelBreakdownChartProps {
  data: ChannelMetric[]
}

export function ChannelBreakdownChart({ data }: ChannelBreakdownChartProps) {
  const chartData = data.map((ch) => ({
    name: ch.channel,
    value: ch.enrolled,
  }))

  const colors = ['#5B8DEF', '#2E8B8B', '#C55A11', '#C99A2E']

  return (
    <div className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      <div>
        <h3 className="text-[14px] font-[700] text-[#0F1722]">Enrolled by Channel</h3>
        <p className="text-[12px] text-[#5A6B7A] mt-0.5">Enrollment distribution across admission channels</p>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1722',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
              }}
              formatter={(value: any) => [value.toLocaleString(), 'Enrolled']}
            />
            <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#DFE7EF]">
        {data.map((ch) => (
          <div key={ch.channel}>
            <span className="text-[11px] text-[#5A6B7A]">{ch.channel}</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[13px] font-[700] text-[#0F1722] tabular-nums">{ch.enrolled}</span>
              <span className="text-[10px] text-[#9AA6B4]">
                {((ch.enrolled / data.reduce((sum, c) => sum + c.enrolled, 0)) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
