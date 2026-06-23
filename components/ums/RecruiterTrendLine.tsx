'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { RecruiterPoint } from '@/lib/usePlacementsData'
import { MotionCard } from './MotionCard'

interface Props {
  data: RecruiterPoint[]
  onPointClick?: (point: RecruiterPoint) => void
}

interface TooltipPayload {
  payload: RecruiterPoint
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white border border-[#E5ECEF] rounded-[8px] px-3 py-2 shadow-md">
      <p className="text-[11px] font-[700] text-[#0F1722]">{d.year}</p>
      <p className="text-[13px] font-[700] font-['Courier_New',_monospace] text-[#1F3864]">
        {d.count} recruiters
      </p>
    </div>
  )
}

export function RecruiterTrendLine({ data, onPointClick }: Props) {
  const yoy  = data.length >= 2
    ? data[data.length - 1].count - data[data.length - 2].count
    : 0
  const sign = yoy >= 0 ? '+' : ''

  return (
    <MotionCard className="bg-white rounded-[12px] border border-[#E5ECEF] p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-[700] text-[#0F1722]">Recruiter Engagement Trend</h3>
          <p className="text-[11px] text-[#9AA6B4] mt-0.5">
            COUNT(recuriter_login) by year
          </p>
        </div>
        <span
          className="text-[12px] font-[700] font-['Courier_New',_monospace] px-2 py-1 rounded-[6px]"
          style={{ color: yoy >= 0 ? '#1B7A4A' : '#E74C3C', background: yoy >= 0 ? '#E8F7EF' : '#FEF0EE' }}
        >
          {sign}{yoy} YoY
        </span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} onClick={e => e?.activePayload && onPointClick?.(e.activePayload[0].payload as RecruiterPoint)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F7" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: '#9AA6B4' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9AA6B4' }}
            axisLine={false}
            tickLine={false}
            width={32}
            domain={[60, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={100} stroke="#E74C3C" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: '100', position: 'right', fontSize: 10, fill: '#E74C3C' }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1F3864"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#1F3864', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#1F3864' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-[10px] text-[#9AA6B4] italic mt-1">
        Click a data point to view recruiter list (company name, roles, offers).
      </p>
    </MotionCard>
  )
}
