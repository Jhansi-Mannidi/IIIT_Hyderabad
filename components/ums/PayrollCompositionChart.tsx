'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { PayrollComponent } from '@/lib/useHRPayrollData'

interface PayrollCompositionChartProps {
  data: PayrollComponent[]
}

export function PayrollCompositionChart({ data }: PayrollCompositionChartProps) {
  const chartData = data.map(item => ({
    category: item.category,
    earnings: item.basic + item.da + item.hra + item.allowances,
    deductions: -(item.pf + item.tax + item.other),
  }))

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Payroll Composition (Earnings vs Deductions)</h3>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis dataKey="category" fontSize={11} fill="#5A6B7A" />
          <YAxis fontSize={11} fill="#5A6B7A" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
          />
          <Legend fontSize={11} wrapperStyle={{ paddingTop: '16px' }} />
          <Bar dataKey="earnings" fill="#2E8B8B" name="Earnings" radius={[4, 4, 0, 0]} />
          <Bar dataKey="deductions" fill="#E74C3C" name="Deductions" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Payroll</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(data.reduce((sum, d) => sum + d.total, 0) / 100).toFixed(1)}L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Earnings</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(data.reduce((sum, d) => sum + d.basic + d.da + d.hra + d.allowances, 0) / 100).toFixed(1)}L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Deductions</p>
          <p className="font-['Courier'] text-[13px] font-[700] text-[#E74C3C]">₹{(data.reduce((sum, d) => sum + d.pf + d.tax + d.other, 0) / 100).toFixed(1)}L</p>
        </div>
      </div>
    </div>
  )
}
