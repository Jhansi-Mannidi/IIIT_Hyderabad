'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BudgetMonthData } from '@/lib/useInstitutionalFinanceData'
import { MotionCard } from './MotionCard'

interface BudgetVarianceWallProps {
  data: BudgetMonthData[]
}

export function BudgetVarianceWall({ data }: BudgetVarianceWallProps) {
  const chartData = data.map(d => ({
    month: d.month,
    under: d.status === 'under' ? d.variance : 0,
    over: d.status === 'over' ? -d.variance : 0,
  }))
  const maxVariance = Math.max(...data.map((item) => Math.abs(item.variance)), 1)

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Budget vs Actual Variance Wall</h3>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <div className="grid gap-3 md:hidden">
        {data.map((item) => {
          const isUnder = item.status === 'under'
          const pct = Math.round((Math.abs(item.variance) / maxVariance) * 100)
          const color = isUnder ? '#2E8B8B' : '#E74C3C'

          return (
            <div key={item.month} className="rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-[12px] font-[850] text-[#0F1722]">{item.month}</span>
                <span className="rounded-full px-2 py-1 text-[10px] font-[850]" style={{ backgroundColor: `${color}18`, color }}>
                  ₹{Math.abs(item.variance).toFixed(1)}L {isUnder ? 'Under' : 'Over'}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#E5ECEF]">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
              </div>
              <div className="mt-1 text-right text-[10px] font-[800] text-[#9AA6B4]">{pct}% of max variance</div>
            </div>
          )
        })}
      </div>

      <div className="hidden h-[280px] min-w-0 md:block">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240} debounce={80}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
            <XAxis dataKey="month" fontSize={11} fill="#5A6B7A" />
            <YAxis fontSize={11} fill="#5A6B7A" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1722',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
            />
            <Bar dataKey="under" fill="#2E8B8B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="over" fill="#E74C3C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3 bg-[#F6F8FB] rounded-[8px] sm:grid-cols-3">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Under-Spend</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#2E8B8B]">₹11.2L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Over-Spend</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#E74C3C]">₹6.3L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Net Variance</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#2E8B8B]">₹4.9L Under</p>
        </div>
      </div>
    </MotionCard>
  )
}
