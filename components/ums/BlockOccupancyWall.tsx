'use client'

import { BlockOccupancy } from '@/lib/useHostelMessData'

interface BlockOccupancyWallProps {
  data: BlockOccupancy[]
  onBlockClick?: (block: BlockOccupancy) => void
}

export function BlockOccupancyWall({ data, onBlockClick }: BlockOccupancyWallProps) {
  const getStatusColor = (percent: number) => {
    if (percent < 70) return { bg: '#D1F2F2', border: '#2E8B8B', text: '#2E8B8B' }
    if (percent < 90) return { bg: '#FCE8D6', border: '#E67E22', text: '#E67E22' }
    return { bg: '#FADBD8', border: '#E74C3C', text: '#E74C3C' }
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Block Occupancy Wall</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {data.map((block) => {
          const colors = getStatusColor(block.occupancyPercent)
          const emptySpaces = block.capacity - block.occupied

          return (
            <button
              key={block.blockId}
              onClick={() => onBlockClick?.(block)}
              className="flex flex-col gap-3 p-4 rounded-[10px] border-2 transition-all hover:shadow-md cursor-pointer"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.bg,
              }}
            >
              <div>
                <p className="text-[11px] font-[600] text-[#0F1722]">{block.blockName}</p>
                <p className="text-[9px] text-[#9AA6B4] mt-1">{block.gender}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-[700]" style={{ color: colors.text }}>
                    {block.occupancyPercent.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-[#5A6B7A]">{block.occupied}/{block.capacity}</span>
                </div>
                
                <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${block.occupancyPercent}%`,
                      backgroundColor: colors.text,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[9px] text-[#9AA6B4]">
                  <span>{block.occupied} Occupied</span>
                  <span>{emptySpaces} Vacant</span>
                </div>
              </div>

              <div className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] text-center capitalize ${
                block.occupancyPercent > 90 ? 'bg-[#E74C3C]/20 text-[#E74C3C]' :
                block.occupancyPercent > 80 ? 'bg-[#F39C12]/20 text-[#F39C12]' :
                'bg-[#27AE60]/20 text-[#27AE60]'
              }`}>
                {block.status}
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Capacity</p>
          <p className="font-['Courier'] text-[13px] font-[700]">{data.reduce((sum, b) => sum + b.capacity, 0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Occupied</p>
          <p className="font-['Courier'] text-[13px] font-[700]">{data.reduce((sum, b) => sum + b.occupied, 0)}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Avg Occupancy %</p>
          <p className="font-['Courier'] text-[13px] font-[700]">
            {(data.reduce((sum, b) => sum + b.occupied, 0) / data.reduce((sum, b) => sum + b.capacity, 0) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  )
}
