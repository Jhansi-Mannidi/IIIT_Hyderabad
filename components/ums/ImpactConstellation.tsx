'use client'

import { useState } from 'react'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ZAxis, ReferenceLine,
} from 'recharts'
import { ImpactPoint } from '@/lib/useResearchData'
import { MotionCard } from './MotionCard'

// Center → color mapping
const CENTER_COLORS: Record<string, string> = {
  ECE:        '#2E8B8B',
  CSE:        '#1F3864',
  Mechanical: '#C55A11',
  Civil:      '#E67E22',
  Management: '#9B59B6',
  Physics:    '#27AE60',
}

const CENTERS = Object.keys(CENTER_COLORS)

interface ImpactConstellationProps {
  data: ImpactPoint[]
}

interface TooltipPayload {
  payload?: ImpactPoint
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length || !payload[0].payload) return null
  const p = payload[0].payload

  return (
    <div className="bg-[#0F1722] rounded-[10px] p-3 text-white max-w-[280px] shadow-xl">
      <p className="text-[11px] font-[700] leading-snug mb-2">{p.title}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <span className="text-[10px] text-[#9AA6B4]">Venue</span>
        <span className="text-[10px] font-[500]">{p.venue}</span>
        <span className="text-[10px] text-[#9AA6B4]">Center</span>
        <span className="text-[10px] font-[500]">{p.center}</span>
        <span className="text-[10px] text-[#9AA6B4]">Impact Factor</span>
        <span className="text-[10px] font-[700] text-[#2E8B8B]">{p.impactFactor > 0 ? p.impactFactor.toFixed(2) : 'N/A'}</span>
        <span className="text-[10px] text-[#9AA6B4]">Google H5</span>
        <span className="text-[10px] font-[500]">{p.googleH5 > 0 ? p.googleH5 : 'N/A'}</span>
        <span className="text-[10px] text-[#9AA6B4]">CORE</span>
        <span className="text-[10px] font-[500]">{p.core}</span>
        <span className="text-[10px] text-[#9AA6B4]">Authors</span>
        <span className="text-[10px] font-[500]">{p.authors}</span>
      </div>
    </div>
  )
}

export function ImpactConstellation({ data }: ImpactConstellationProps) {
  const [hoveredCenter, setHoveredCenter] = useState<string | null>(null)
  const validImpactPoints = data.filter(p => p.impactFactor > 0)

  // Split data per center for separate <Scatter> layers (needed for per-center colors)
  const byCenter = CENTERS.map(center => ({
    center,
    color: CENTER_COLORS[center],
    points: validImpactPoints.filter(p => p.center === center),
  })).filter(g => g.points.length > 0)

  // Avg IF reference line
  const avgIF = validImpactPoints.length > 0
    ? validImpactPoints.reduce((s, p) => s + p.impactFactor, 0) / validImpactPoints.length
    : 0

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[13px] font-[700] text-[#0F1722]">Impact Constellation</h3>
          <p className="text-[11px] text-[#9AA6B4] mt-0.5">
            Year × Impact Factor — bubble size = Google H5 — colour = center
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-[#EEF2F8] rounded-[6px] shrink-0">
          <span className="text-[10px] font-[600] text-[#5A6B7A]">Avg IF</span>
          <span className="text-[11px] font-[700] font-['Courier_New',monospace] text-[#0F1722]">{avgIF.toFixed(2)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {byCenter.map(({ center, color }) => (
          <button
            key={center}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-[6px] transition-opacity text-[11px] font-[500] text-[#0F1722] hover:bg-[#F6F8FB] ${
              hoveredCenter && hoveredCenter !== center ? 'opacity-30' : ''
            }`}
            onMouseEnter={() => setHoveredCenter(center)}
            onMouseLeave={() => setHoveredCenter(null)}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
            {center}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" />
          <XAxis
            type="number"
            dataKey="year"
            domain={[2018.5, 2024.5]}
            tickCount={6}
            tickFormatter={v => `${v}`}
            fontSize={11}
            stroke="#9AA6B4"
          />
          <YAxis
            type="number"
            dataKey="impactFactor"
            domain={[0, 10]}
            tickFormatter={v => v.toFixed(0)}
            fontSize={11}
            stroke="#9AA6B4"
            label={{
              value: 'Impact Factor',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              style: { fontSize: 10, fill: '#9AA6B4' },
            }}
          />
          <ZAxis type="number" dataKey="googleH5" range={[40, 400]} />
          <Tooltip content={<CustomTooltip />} />
          {/* Avg IF reference line */}
          <ReferenceLine
            y={avgIF}
            stroke="#E67E22"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={{ value: `Avg IF ${avgIF.toFixed(1)}`, position: 'insideTopRight', fontSize: 10, fill: '#E67E22' }}
          />
          {byCenter.map(({ center, color, points }) => (
            <Scatter
              key={center}
              name={center}
              data={points}
              fill={color}
              fillOpacity={hoveredCenter && hoveredCenter !== center ? 0.2 : 0.75}
              stroke={color}
              strokeWidth={1}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Note */}
      <p className="text-[10px] text-[#9AA6B4] border-t border-[#F0F4F7] pt-2">
        Note: Citation depth beyond Google H5 requires external enrichment (Scopus / Scholar). Bubble size uses H5 as proxy.
      </p>
    </MotionCard>
  )
}
