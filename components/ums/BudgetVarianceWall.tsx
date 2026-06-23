'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BudgetMonthData } from '@/lib/useInstitutionalFinanceData'

interface BudgetVarianceWallProps {
  data: BudgetMonthData[]
}

export function BudgetVarianceWall({ data }: BudgetVarianceWallProps) {
  const chartData = data.map(d => ({
    month: d.month,
    under: d.status === 'under' ? d.variance : 0,
    over: d.status === 'over' ? -d.variance : 0,
  }))

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Budget vs Actual Variance Wall</h3>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
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

      <div className="flex gap-6 p-3 bg-[#F6F8FB] rounded-[8px]">
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
    </div>
  )
}
