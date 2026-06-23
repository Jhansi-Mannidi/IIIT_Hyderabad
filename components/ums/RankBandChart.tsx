'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { RankBand } from '@/lib/useAdmissionsDashboardData'
import { MotionCard } from './MotionCard'

interface RankBandChartProps {
  data: RankBand[]
}

export function RankBandChart({ data }: RankBandChartProps) {
  const colors = ['#5B8DEF', '#2E8B8B', '#C55A11', '#C99A2E', '#B2566B']

  return (
    <MotionCard className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      <div>
        <h3 className="text-[14px] font-[700] text-[#0F1722]">JEE Rank Distribution</h3>
        <p className="text-[12px] text-[#5A6B7A] mt-0.5">Applicants and enrollees by rank bands</p>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#DFE7EF" />
            <XAxis dataKey="band" tick={{ fontSize: 11, fill: '#5A6B7A' }} />
            <YAxis tick={{ fontSize: 11, fill: '#5A6B7A' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1722',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#2E8B8B', fontSize: '11px', fontWeight: '600' }}
              formatter={(value) => value.toLocaleString()}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#DFE7EF]">
        <div>
          <span className="text-[11px] text-[#5A6B7A]">Top 2000 Enrolled</span>
          <p className="text-[14px] font-[700] text-[#2E8B8B] tabular-nums">{data[0].enrolled}</p>
        </div>
        <div>
          <span className="text-[11px] text-[#5A6B7A]">Avg. Rank of Enrolled</span>
          <p className="text-[14px] font-[700] text-[#1F3864] tabular-nums">4,842</p>
        </div>
      </div>
    </MotionCard>
  )
}
