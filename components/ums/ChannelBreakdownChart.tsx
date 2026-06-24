'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { ChannelMetric } from '@/lib/useAdmissionsDashboardData'
import { MotionCard } from './MotionCard'

interface ChannelBreakdownChartProps {
  data: ChannelMetric[]
}

export function ChannelBreakdownChart({ data }: ChannelBreakdownChartProps) {
  const chartData = data.map((ch) => ({
    name: ch.channel,
    value: ch.enrolled,
  }))
  const totalEnrolled = Math.max(data.reduce((sum, ch) => sum + ch.enrolled, 0), 1)

  const colors = ['#5B8DEF', '#2E8B8B', '#C55A11', '#C99A2E']

  return (
    <MotionCard className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      <div>
        <h3 className="text-[14px] font-[700] text-[#0F1722]">Enrolled by Channel</h3>
        <p className="text-[12px] text-[#5A6B7A] mt-0.5">Enrollment distribution across admission channels</p>
      </div>

      <div className="ums-mobile-native-analytics grid gap-3 md:hidden">
        {data.map((ch, index) => {
          const pct = Math.round((ch.enrolled / totalEnrolled) * 100)

          return (
            <div key={ch.channel} className="rounded-[12px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span className="truncate text-[12px] font-[800] text-[#5A6B7A]" title={ch.channel}>{ch.channel}</span>
                </div>
                <span className="text-[12px] font-[850] text-[#0F1722]">{ch.enrolled.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#E5ECEF]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: colors[index % colors.length] }}
                />
              </div>
              <div className="mt-1 text-right text-[10px] font-[800] text-[#9AA6B4]">{pct}%</div>
            </div>
          )
        })}
      </div>

      <div className="ums-analytics-chart-frame hidden h-60 min-w-0 md:block md:h-72">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220} debounce={80}>
          <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="72%"
              paddingAngle={2}
              dataKey="value"
              stroke="#FFFFFF"
              strokeWidth={2}
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
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="ums-mobile-two-col grid gap-3 border-t border-[#DFE7EF] pt-3 sm:grid-cols-4">
        {data.map((ch) => (
          <div key={ch.channel} className="min-w-0 rounded-[10px] bg-[#F8FAFD] p-2">
            <span className="block truncate text-[11px] font-[700] text-[#5A6B7A]" title={ch.channel}>{ch.channel}</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[13px] font-[700] text-[#0F1722] tabular-nums">{ch.enrolled}</span>
              <span className="text-[10px] text-[#9AA6B4]">
                {((ch.enrolled / totalEnrolled) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </MotionCard>
  )
}
