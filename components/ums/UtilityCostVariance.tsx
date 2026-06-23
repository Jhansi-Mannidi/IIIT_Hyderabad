'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { UtilityCost } from '@/lib/useHostelMessData'

interface UtilityCostVarianceProps {
  data: UtilityCost[]
}

export function UtilityCostVariance({ data }: UtilityCostVarianceProps) {
  const chartData = data.map(item => ({
    utility: item.utility,
    favorable: item.variance > 0 ? item.variance : 0,
    unfavorable: item.variance < 0 ? -item.variance : 0,
  }))

  const totalBudget = data.reduce((sum, d) => sum + d.budget, 0)
  const totalActual = data.reduce((sum, d) => sum + d.actual, 0)
  const totalVariance = totalBudget - totalActual

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Utility Cost Variance (Budget vs Actual)</h3>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis dataKey="utility" fontSize={11} fill="#5A6B7A" />
          <YAxis fontSize={11} fill="#5A6B7A" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="favorable" fill="#27AE60" name="Under Budget" radius={[4, 4, 0, 0]} />
          <Bar dataKey="unfavorable" fill="#E74C3C" name="Over Budget" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Budget</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(totalBudget / 100).toFixed(1)}L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Actual</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(totalActual / 100).toFixed(1)}L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Net Variance</p>
          <p className={`font-['Courier'] text-[13px] font-[700] ${totalVariance > 0 ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
            {totalVariance > 0 ? '+' : ''}₹{(totalVariance / 100).toFixed(1)}L
          </p>
        </div>
      </div>
    </div>
  )
}
