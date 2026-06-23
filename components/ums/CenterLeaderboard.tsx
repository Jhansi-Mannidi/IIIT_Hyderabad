'use client'

import { CenterOutput } from '@/lib/useResearchData'
import { MotionCard } from './MotionCard'

const CENTER_COLORS: Record<string, string> = {
  ECE:        '#2E8B8B',
  CSE:        '#1F3864',
  Mechanical: '#C55A11',
  Civil:      '#E67E22',
  Management: '#9B59B6',
  Physics:    '#27AE60',
}

interface CenterLeaderboardProps {
  data: CenterOutput[]
  onCenterClick?: (center: CenterOutput) => void
}

export function CenterLeaderboard({ data, onCenterClick }: CenterLeaderboardProps) {
  const maxPubs = Math.max(...data.map(d => d.pubs))

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Center Output Leaderboard</h3>

      <div className="space-y-2.5">
        {data.map((item, idx) => {
          const color = CENTER_COLORS[item.center] ?? '#9AA6B4'
          const barW  = (item.pubs / maxPubs) * 100

          return (
            <button
              key={item.center}
              onClick={() => onCenterClick?.(item)}
              className="w-full text-left group"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-[700] text-[#9AA6B4] w-4">{idx + 1}</span>
                <span className="text-[11px] font-[600] text-[#0F1722] flex-1">{item.center}</span>
                <span className="font-['Courier_New',monospace] text-[11px] font-[700] text-[#0F1722]">{item.pubs}</span>
                <span className="text-[10px] text-[#9AA6B4]">pubs</span>
                <span className="font-['Courier_New',monospace] text-[10px] font-[600] px-1.5 py-0.5 rounded-[4px]"
                  style={{ backgroundColor: `${color}20`, color }}>
                  IF {item.avgIF.toFixed(2)}
                </span>
                <span className="text-[10px] text-[#9AA6B4]">₹{item.funding}L</span>
              </div>
              <div className="w-full h-2 bg-[#F0F4F7] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all group-hover:opacity-80"
                  style={{ width: `${barW}%`, backgroundColor: color }}
                />
              </div>
            </button>
          )
        })}
      </div>
    </MotionCard>
  )
}
