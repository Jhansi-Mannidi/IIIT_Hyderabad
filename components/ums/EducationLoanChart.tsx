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

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Education Loan Uptake by Category</h3>
        <span className="text-[11px] text-[#9AA6B4]">Student Count</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
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
    </MotionCard>
  )
}
