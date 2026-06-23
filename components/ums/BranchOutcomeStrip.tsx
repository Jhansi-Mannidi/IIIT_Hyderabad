'use client'

import { useState } from 'react'
import { BranchSalary } from '@/lib/usePlacementsData'
import { MotionCard } from './MotionCard'

interface Props {
  data: BranchSalary[]
  onBranchClick?: (branch: BranchSalary) => void
}

// Derives a bar fill colour from placement rate vs target
function rateColor(rate: number, target: number): string {
  const gap = rate - target
  if (gap >= 0)    return '#1B7A4A'  // met or exceeded — dark green
  if (gap >= -5)   return '#F39C12'  // within 5pp — amber
  if (gap >= -10)  return '#E67E22'  // 5–10pp below — orange
  return '#E74C3C'                   // >10pp below — red
}

// Positions the salary marker within a 0–50 LPA scale
const SCALE_MAX = 50

function pct(lpa: number) { return Math.min((lpa / SCALE_MAX) * 100, 100) }

export function BranchOutcomeStrip({ data, onBranchClick }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const sorted = [...data].sort((a, b) => b.placementRate - a.placementRate)

  return (
    <MotionCard className="bg-white rounded-[12px] border border-[#E5ECEF] p-4">
      {/* Card header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[13px] font-[700] text-[#0F1722]">Branch Outcome Strip</h3>
          <p className="text-[11px] text-[#9AA6B4] mt-0.5">
            Placement rate vs target (bar) · Salary range low–avg–high (marker)
          </p>
        </div>
        <span className="text-[10px] text-[#9AA6B4] font-[500]">Salary scale: 0–50 LPA</span>
      </div>

      {/* Column labels */}
      <div className="grid items-center mb-2" style={{ gridTemplateColumns: '96px 1fr 140px 56px' }}>
        <span className="text-[10px] font-[600] text-[#9AA6B4] uppercase tracking-wide">Branch</span>
        <span className="text-[10px] font-[600] text-[#9AA6B4] uppercase tracking-wide pl-1">Placement rate vs target</span>
        <span className="text-[10px] font-[600] text-[#9AA6B4] uppercase tracking-wide pl-2">Salary range (LPA)</span>
        <span className="text-[10px] font-[600] text-[#9AA6B4] uppercase tracking-wide text-right">Placed</span>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {sorted.map((b) => {
          const fill  = rateColor(b.placementRate, b.target)
          const isHov = hovered === b.branch

          return (
            <button
              key={b.branch}
              onClick={() => onBranchClick?.(b)}
              onMouseEnter={() => setHovered(b.branch)}
              onMouseLeave={() => setHovered(null)}
              className="w-full grid items-center rounded-[8px] px-2 py-2.5 transition-colors text-left"
              style={{
                gridTemplateColumns: '96px 1fr 140px 56px',
                backgroundColor: isHov ? '#F6F8FB' : 'transparent',
              }}
            >
              {/* Branch label */}
              <div>
                <p className="text-[12px] font-[600] text-[#0F1722]">{b.branch}</p>
                <p className="text-[10px] text-[#9AA6B4]">{b.stream}</p>
              </div>

              {/* Placement rate bar + target line */}
              <div className="px-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="text-[11px] font-[700] font-['Courier_New',_monospace]"
                    style={{ color: fill }}
                  >
                    {b.placementRate.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-[#9AA6B4]">
                    {b.placementRate >= b.target
                      ? `+${(b.placementRate - b.target).toFixed(1)}pp`
                      : `${(b.placementRate - b.target).toFixed(1)}pp`}
                  </span>
                </div>

                {/* Bar track — rate fills left, target line overlaid */}
                <div className="relative h-2.5 bg-[#F0F4F7] rounded-full overflow-visible">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all"
                    style={{ width: `${b.placementRate}%`, backgroundColor: fill }}
                  />
                  {/* Red-dashed target reference line */}
                  <div
                    className="absolute top-[-3px] bottom-[-3px] w-[2px] rounded-full"
                    style={{
                      left: `${b.target}%`,
                      background: `repeating-linear-gradient(
                        to bottom,
                        #E74C3C 0px,
                        #E74C3C 3px,
                        transparent 3px,
                        transparent 5px
                      )`,
                    }}
                    title={`Target: ${b.target}%`}
                  />
                </div>
              </div>

              {/* Salary range marker: low ——[avg]—— high */}
              <div className="px-2">
                <div className="relative h-5 mt-1">
                  {/* Horizontal connector line from low to high */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#CBD5E0] rounded-full"
                    style={{
                      left:  `${pct(b.lowLPA)}%`,
                      right: `${100 - pct(b.highLPA)}%`,
                    }}
                  />
                  {/* Low whisker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#9AA6B4] rounded-full"
                    style={{ left: `${pct(b.lowLPA)}%` }}
                    title={`Low: ${b.lowLPA} LPA`}
                  />
                  {/* Avg box */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-[4px] px-1 h-4 text-[8px] font-[700] text-white whitespace-nowrap"
                    style={{
                      left:            `${pct(b.avgLPA)}%`,
                      transform:       'translate(-50%, -50%)',
                      backgroundColor: '#1F3864',
                      minWidth:        '30px',
                    }}
                    title={`Avg: ${b.avgLPA} LPA`}
                  >
                    {b.avgLPA}
                  </div>
                  {/* High whisker */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-[2px] h-3 bg-[#9AA6B4] rounded-full"
                    style={{ left: `${pct(b.highLPA)}%` }}
                    title={`High: ${b.highLPA} LPA`}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[9px] text-[#9AA6B4]">{b.lowLPA}</span>
                  <span className="text-[9px] text-[#9AA6B4]">{b.highLPA}</span>
                </div>
              </div>

              {/* Placed / registered count */}
              <div className="text-right">
                <p className="text-[12px] font-[700] font-['Courier_New',_monospace] text-[#0F1722]">
                  {b.placed}
                </p>
                <p className="text-[10px] text-[#9AA6B4]">/ {b.registered}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 pt-3 border-t border-[#F0F4F7]">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-[2px]" style={{
            background: `repeating-linear-gradient(to right,#E74C3C 0,#E74C3C 3px,transparent 3px,transparent 5px)`
          }} />
          <span className="text-[10px] text-[#5A6B7A]">Target line</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-2.5 rounded-full bg-[#1B7A4A]" />
          <span className="text-[10px] text-[#5A6B7A]">At / above target</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-2.5 rounded-full bg-[#F39C12]" />
          <span className="text-[10px] text-[#5A6B7A]">Within 5pp</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-2.5 rounded-full bg-[#E74C3C]" />
          <span className="text-[10px] text-[#5A6B7A]">&gt;10pp below</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="w-5 h-3.5 rounded-[3px] bg-[#1F3864]" />
          <span className="text-[10px] text-[#5A6B7A]">Avg LPA box</span>
        </div>
      </div>

      <p className="text-[10px] text-[#9AA6B4] italic mt-2">
        Note: salary distribution beyond high/avg/low is unavailable — offer-level data required for full box-plot.
      </p>
    </MotionCard>
  )
}
