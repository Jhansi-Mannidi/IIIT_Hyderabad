'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ProjectBurndown } from '@/lib/useInstitutionalFinanceData'

interface ProjectBurndownChartProps {
  data: ProjectBurndown[]
}

export function ProjectBurndownChart({ data }: ProjectBurndownChartProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Project Burn-Down Status</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis dataKey="project" fontSize={11} fill="#5A6B7A" />
          <YAxis fontSize={11} fill="#5A6B7A" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
            }}
          />
          <Legend fontSize={11} wrapperStyle={{ paddingTop: '16px' }} />
          <Bar dataKey="spent" fill="#C55A11" radius={[4, 4, 0, 0]} />
          <Bar dataKey="remaining" fill="#2E8B8B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
