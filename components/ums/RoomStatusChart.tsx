'use client'

import { RoomStatus } from '@/lib/useHostelMessData'
import { MotionCard } from './MotionCard'

interface RoomStatusChartProps {
  data: RoomStatus[]
}

export function RoomStatusChart({ data }: RoomStatusChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Room Status Distribution</h3>
      
      <div className="space-y-3">
        {data.map((item) => {
          const statusColors = {
            'Occupied': { bg: '#2E8B8B', light: '#D1F2F2' },
            'Vacant': { bg: '#F39C12', light: '#FCE8D6' },
            'Maintenance': { bg: '#E74C3C', light: '#FADBD8' },
          }
          const colors = statusColors[item.status as keyof typeof statusColors] || { bg: '#9AA6B4', light: '#F0F4F7' }

          return (
            <div key={item.status} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="text-[11px] font-[600] text-[#0F1722]">{item.status}</p>
                  <p className="text-[11px] font-[600] font-['Courier']">{item.count}</p>
                </div>
                <div className="w-full h-2 bg-[#F0F4F7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: colors.bg,
                    }}
                  />
                </div>
              </div>
              <div className="w-16 text-right">
                <p className="text-[11px] font-[600]" style={{ color: colors.bg }}>
                  {item.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-3 bg-[#F6F8FB] rounded-[8px]">
        <p className="text-[10px] text-[#9AA6B4] mb-1">Total Rooms</p>
        <p className="font-['Courier'] text-[13px] font-[700]">{total}</p>
      </div>
    </MotionCard>
  )
}
