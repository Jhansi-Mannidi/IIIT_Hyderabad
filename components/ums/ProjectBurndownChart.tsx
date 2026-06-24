'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ProjectBurndown } from '@/lib/useInstitutionalFinanceData'
import { MotionCard } from './MotionCard'

interface ProjectBurndownChartProps {
  data: ProjectBurndown[]
}

export function ProjectBurndownChart({ data }: ProjectBurndownChartProps) {
  const maxTotal = Math.max(...data.map((item) => item.spent + item.remaining), 1)

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Project Burn-Down Status</h3>
      <div className="grid gap-3 md:hidden">
        {data.map((item) => {
          const total = item.spent + item.remaining
          const spentPct = Math.round((item.spent / Math.max(total, 1)) * 100)
          const scalePct = Math.round((total / maxTotal) * 100)

          return (
            <div key={item.project} className="rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="truncate text-[12px] font-[850] text-[#0F1722]" title={item.project}>{item.project}</span>
                <span className="text-[11px] font-[800] text-[#9AA6B4]">{spentPct}% spent</span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full bg-[#E5ECEF]">
                <div className="h-full bg-[#C55A11]" style={{ width: `${spentPct}%` }} />
                <div className="h-full bg-[#2E8B8B]" style={{ width: `${100 - spentPct}%` }} />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] font-[800] text-[#9AA6B4]">
                <span>₹{item.spent.toFixed(1)}L spent</span>
                <span>{scalePct}% scale</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="hidden h-[240px] min-w-0 md:block">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220} debounce={80}>
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
    </MotionCard>
  )
}
