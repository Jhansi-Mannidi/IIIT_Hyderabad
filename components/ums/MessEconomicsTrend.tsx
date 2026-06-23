'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { MessData } from '@/lib/useHostelMessData'

interface MessEconomicsTrendProps {
  data: MessData[]
}

export function MessEconomicsTrend({ data }: MessEconomicsTrendProps) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  const chartData = data.map(item => ({
    date: item.date,
    costPerStudent: item.costPerStudent,
    totalCost: item.totalCost / 1000,
  }))

  const breakdownData = [
    { name: 'Veg Meals', value: data.reduce((sum, d) => sum + d.veg, 0) },
    { name: 'Non-Veg Meals', value: data.reduce((sum, d) => sum + d.nonVeg, 0) },
  ]

  const COLORS = ['#2E8B8B', '#C55A11']

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Mess Economics Trend</h3>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="px-3 py-1.5 rounded-[6px] text-[11px] font-[600] bg-[#EEF2F8] text-[#1F3864] hover:bg-[#D1D8DF]"
        >
          {showBreakdown ? 'Show Trend' : 'Show Breakdown'}
        </button>
      </div>

      {!showBreakdown ? (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
            <XAxis dataKey="date" fontSize={11} fill="#5A6B7A" />
            <YAxis fontSize={11} fill="#5A6B7A" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1722',
                border: 'none',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="costPerStudent"
              stroke="#2E8B8B"
              strokeWidth={2}
              dot={{ fill: '#2E8B8B', r: 4 }}
              name="Cost per Student"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={breakdownData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label
            >
              {breakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}

      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Avg Cost/Student</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(data.reduce((sum, d) => sum + d.costPerStudent, 0) / data.length).toFixed(0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Students Served</p>
          <p className="font-['Courier'] text-[13px] font-[700]">{data.reduce((sum, d) => sum + d.studentsServed, 0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Weekly Mess Cost</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(data.reduce((sum, d) => sum + d.totalCost, 0) / 100000).toFixed(2)}L</p>
        </div>
      </div>
    </div>
  )
}
