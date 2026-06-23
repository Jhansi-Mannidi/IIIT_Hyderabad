'use client'

import { BranchSalary } from '@/lib/usePlacementsData'
import { MotionCard } from './MotionCard'

interface Props { data: BranchSalary[] }

const SCALE_MAX = 48   // max LPA on axis
const TICKS     = [0, 8, 16, 24, 32, 40, 48]

function pct(lpa: number) { return Math.min((lpa / SCALE_MAX) * 100, 100) }

export function SalaryBoxPlot({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.avgLPA - a.avgLPA)

  return (
    <MotionCard className="bg-white rounded-[12px] border border-[#E5ECEF] p-4">
      <div className="mb-3">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Salary Distribution by Branch</h3>
        <p className="text-[11px] text-[#9AA6B4] mt-0.5">
          High / Avg / Low LPA — summary stats only; offer-level distribution unavailable.
        </p>
      </div>

      {/* Axis ticks */}
      <div className="relative mb-1 pl-[84px]">
        <div className="flex justify-between">
          {TICKS.map(t => (
            <span key={t} className="text-[9px] text-[#9AA6B4]">{t}</span>
          ))}
        </div>
      </div>

      {/* Grid lines container */}
      <div className="space-y-1">
        {sorted.map(b => (
          <div key={b.branch} className="flex items-center gap-2">
            {/* Branch label */}
            <div className="w-[80px] flex-shrink-0 text-right pr-2">
              <p className="text-[11px] font-[600] text-[#0F1722]">{b.branch}</p>
            </div>

            {/* Plot area */}
            <div className="relative flex-1 h-8">
              {/* Grid lines */}
              {TICKS.map(t => (
                <div
                  key={t}
                  className="absolute top-0 bottom-0 w-px bg-[#F0F4F7]"
                  style={{ left: `${pct(t)}%` }}
                />
              ))}

              {/* Whisker line low → high */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#CBD5E0] rounded-full"
                style={{ left: `${pct(b.lowLPA)}%`, right: `${100 - pct(b.highLPA)}%` }}
              />

              {/* Low cap */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#9AA6B4] rounded-full"
                style={{ left: `${pct(b.lowLPA)}%` }}
              />

              {/* Avg pill */}
              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-[5px] h-5 text-[9px] font-[700] text-white px-1.5 whitespace-nowrap"
                style={{
                  left:            `${pct(b.avgLPA)}%`,
                  transform:       'translate(-50%, -50%)',
                  backgroundColor: '#1F3864',
                  minWidth:        '32px',
                }}
              >
                {b.avgLPA}
              </div>

              {/* High cap */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#9AA6B4] rounded-full"
                style={{ left: `${pct(b.highLPA)}%` }}
              />

              {/* Low / high labels */}
              <span
                className="absolute text-[8px] text-[#9AA6B4] top-0"
                style={{ left: `${pct(b.lowLPA)}%`, transform: 'translateX(-50%)' }}
              >
                {b.lowLPA}
              </span>
              <span
                className="absolute text-[8px] text-[#9AA6B4] top-0"
                style={{ left: `${pct(b.highLPA)}%`, transform: 'translateX(-50%)' }}
              >
                {b.highLPA}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-[#9AA6B4] italic mt-3">
        Salary sourced from placements_data aggregate grain (high/avg/low LPA per branch).
      </p>
    </MotionCard>
  )
}
