'use client'

import { PhDStage } from '@/lib/useResearchData'
import { MotionCard } from './MotionCard'

interface PhDPipelineFunnelProps {
  data: PhDStage[]
  onStageClick?: (stage: PhDStage) => void
}

export function PhDPipelineFunnel({ data, onStageClick }: PhDPipelineFunnelProps) {
  const maxN = data[0]?.n ?? 1

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">PhD Scholar Pipeline</h3>
      <p className="text-[11px] text-[#9AA6B4] -mt-2">Registered → Coursework → Synopsis → Submission → Defended</p>

      <div className="flex flex-col items-center gap-1">
        {data.map((stage, idx) => {
          const widthPct = (stage.n / maxN) * 100
          const dropPct  = idx > 0 ? (((data[idx - 1].n - stage.n) / data[idx - 1].n) * 100) : null

          return (
            <div key={stage.stage} className="w-full flex flex-col items-center">
              {/* Drop indicator */}
              {dropPct !== null && (
                <div className="flex items-center gap-1.5 my-0.5">
                  <div className="w-px h-3 bg-[#E5ECEF]" />
                  <span className="text-[9px] text-[#E74C3C] font-[600]">-{dropPct.toFixed(0)}%</span>
                </div>
              )}

              {/* Stage bar */}
              <button
                onClick={() => onStageClick?.(stage)}
                className="w-full flex items-center gap-3 group"
                style={{ paddingLeft: `${((1 - widthPct / 100) / 2) * 40}%`, paddingRight: `${((1 - widthPct / 100) / 2) * 40}%` }}
              >
                <div
                  className="flex-1 flex items-center justify-between px-3 py-2 rounded-[8px] transition-opacity group-hover:opacity-80"
                  style={{ backgroundColor: stage.color }}
                >
                  <span className="text-[11px] font-[600] text-white">{stage.stage}</span>
                  <span className="font-['Courier_New',monospace] text-[13px] font-[700] text-white">{stage.n}</span>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Conversion summary */}
      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-0.5">Registered</p>
          <p className="font-['Courier_New',monospace] text-[13px] font-[700]">{data[0]?.n ?? 0}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-0.5">Defended (Graduates)</p>
          <p className="font-['Courier_New',monospace] text-[13px] font-[700] text-[#27AE60]">{data[data.length - 1]?.n ?? 0}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-0.5">Overall Conversion</p>
          <p className="font-['Courier_New',monospace] text-[13px] font-[700]">
            {data[0] ? (((data[data.length - 1].n / data[0].n) * 100)).toFixed(1) : 0}%
          </p>
        </div>
      </div>
    </MotionCard>
  )
}
