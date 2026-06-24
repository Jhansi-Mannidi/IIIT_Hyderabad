'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { EducationLoanMetric } from '@/lib/useFinanceDashboardData'
import { MotionCard } from './MotionCard'

interface EducationLoanChartProps {
  data: EducationLoanMetric[]
}

export function EducationLoanChart({ data }: EducationLoanChartProps) {
  const chartData = data.map(item => ({
    ...item,
    nonBeneficiaries: item.totalStudents - item.loanBeneficiaries,
  }))
  const maxTotal = Math.max(...chartData.map((item) => item.totalStudents), 1)

  return (
    <MotionCard className="flex flex-col gap-3 self-start p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Education Loan Uptake by Category</h3>
        <span className="text-[11px] text-[#9AA6B4]">Student Count</span>
      </div>

      <div className="ums-mobile-native-analytics grid gap-3 md:hidden">
        {chartData.map((item) => {
          const loanPct = Math.round((item.loanBeneficiaries / Math.max(item.totalStudents, 1)) * 100)
          const scalePct = Math.round((item.totalStudents / maxTotal) * 100)

          return (
            <div key={item.category} className="rounded-[12px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="truncate text-[12px] font-[800] text-[#5A6B7A]" title={item.category}>{item.category}</span>
                <span className="text-[12px] font-[850] text-[#0F1722]">{item.loanBeneficiaries}/{item.totalStudents}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[#E5ECEF]">
                <div className="h-full rounded-full bg-[#2E8B8B]" style={{ width: `${loanPct}%` }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] font-[800] text-[#9AA6B4]">
                <span>{loanPct}% loan uptake</span>
                <span>{scalePct}% cohort scale</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="ums-analytics-chart-frame hidden h-[260px] min-w-0 md:block">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240} debounce={80}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis
            dataKey="category"
            fontSize={11}
            fill="#5A6B7A"
            axisLine={{ stroke: '#E5ECEF' }}
            tickLine={false}
          />
          <YAxis
            fontSize={11}
            fill="#5A6B7A"
            axisLine={{ stroke: '#E5ECEF' }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#2E8B8B', fontSize: '12px', fontWeight: '600' }}
          />
          <Legend fontSize={11} wrapperStyle={{ paddingTop: '16px' }} />
          <Bar dataKey="loanBeneficiaries" name="Loan Beneficiaries" fill="#2E8B8B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="nonBeneficiaries" name="Non-Beneficiaries" fill="#D1D8DF" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </MotionCard>
  )
}
