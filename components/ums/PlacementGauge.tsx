'use client'

import { PlacementYear } from '@/lib/usePlacementsData'
import { MotionCard } from './MotionCard'

interface Props {
  current: PlacementYear
  target: number
}

// Draws a half-circle gauge using SVG arcs
// 0% → left end, 100% → right end (180° sweep)
const R = 70
const CX = 90
const CY = 90
const STROKE = 14

function arc(pct: number, full = false): string {
  const angle = full ? 180 : (pct / 100) * 180
  const rad   = (angle - 180) * (Math.PI / 180)
  const x     = CX + R * Math.cos(rad)
  const y     = CY + R * Math.sin(rad)
  const large = angle > 180 ? 1 : 0
  if (full) {
    return `M ${CX - R} ${CY} A ${R} ${R} 0 1 1 ${CX + R} ${CY}`
  }
  return `M ${CX - R} ${CY} A ${R} ${R} 0 ${large} 1 ${x} ${y}`
}

export function PlacementGauge({ current, target }: Props) {
  const rate      = current.placementRate
  const met       = rate >= target
  const fillColor = met ? '#1B7A4A' : rate >= target - 5 ? '#F39C12' : '#E74C3C'

  // Target needle position
  const targetAngle = ((target / 100) * 180 - 180) * (Math.PI / 180)
  const nx1 = CX + (R - STROKE / 2 - 4) * Math.cos(targetAngle)
  const ny1 = CY + (R - STROKE / 2 - 4) * Math.sin(targetAngle)
  const nx2 = CX + (R + STROKE / 2 + 4) * Math.cos(targetAngle)
  const ny2 = CY + (R + STROKE / 2 + 4) * Math.sin(targetAngle)

  return (
    <MotionCard className="bg-white rounded-[12px] border border-[#E5ECEF] p-4 flex flex-col items-center gap-2">
      <h3 className="text-[13px] font-[700] text-[#0F1722] self-start">Placement Rate Gauge</h3>

      <div className="relative" style={{ width: 180, height: 104 }}>
        <svg width="180" height="104" viewBox="0 0 180 104" overflow="visible">
          {/* Track */}
          <path
            d={arc(100, true)}
            fill="none"
            stroke="#E5ECEF"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
          {/* Fill */}
          <path
            d={arc(rate)}
            fill="none"
            stroke={fillColor}
            strokeWidth={STROKE}
            strokeLinecap="round"
          />
          {/* Target needle (dashed red line across the arc at target %) */}
          <line
            x1={nx1} y1={ny1} x2={nx2} y2={ny2}
            stroke="#E74C3C"
            strokeWidth={2}
            strokeDasharray="3 2"
          />
        </svg>

        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <p
            className="text-[26px] font-[700] font-['Courier_New',_monospace] leading-none"
            style={{ color: fillColor }}
          >
            {rate.toFixed(1)}%
          </p>
          <p className="text-[11px] text-[#9AA6B4] mt-0.5">
            Target <span className="font-[700] text-[#E74C3C]">{target}%</span>
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-[#F0F4F7]">
        {[
          { label: 'Placed',     value: current.placed.toLocaleString('en-IN') },
          { label: 'Not Placed', value: current.notPlaced.toLocaleString('en-IN') },
          { label: 'Registered', value: current.registered.toLocaleString('en-IN') },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-[14px] font-[700] font-['Courier_New',_monospace] text-[#0F1722]">{value}</p>
            <p className="text-[10px] text-[#9AA6B4]">{label}</p>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-[#9AA6B4] italic self-start">
        Registration vs placed ratio is a [Derived] metric — placements_reg / placements_data aggregate grain.
      </p>
    </MotionCard>
  )
}
