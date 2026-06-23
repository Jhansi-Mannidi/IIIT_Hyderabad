'use client'

import { CostCenter } from '@/lib/useInstitutionalFinanceData'

interface CostCenterTreemapProps {
  data: CostCenter[]
  onCenterClick?: (center: CostCenter) => void
}

export function CostCenterTreemap({ data, onCenterClick }: CostCenterTreemapProps) {
  const maxSpend = Math.max(...data.map(cc => cc.actual))
  const totalBudget = data.reduce((sum, cc) => sum + cc.budget, 0)
  const totalActual = data.reduce((sum, cc) => sum + cc.actual, 0)

  const getUtilizationColor = (utilization: number) => {
    if (utilization < 75) return '#2E8B8B'
    if (utilization < 90) return '#C99A2E'
    return '#E74C3C'
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Cost-Center Spend Distribution</h3>
        <span className="text-[11px] text-[#9AA6B4]">Size = Spend | Color = Utilization</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {data.map((cc) => {
          const sizePercent = (cc.actual / maxSpend) * 100
          const heightClass = sizePercent > 80 ? 'h-32' : sizePercent > 50 ? 'h-28' : 'h-24'
          const color = getUtilizationColor(cc.utilization)

          return (
            <button
              key={cc.id}
              onClick={() => onCenterClick?.(cc)}
              className={`flex flex-col justify-between p-3 rounded-[10px] border-2 transition-all hover:shadow-md cursor-pointer ${heightClass}`}
              style={{
                borderColor: color,
                backgroundColor: color + '10',
              }}
            >
              <div>
                <p className="text-[11px] font-[600] text-[#0F1722] line-clamp-2">{cc.name}</p>
                <div className={`inline-flex px-1.5 py-0.5 rounded-[4px] mt-1 text-[9px] font-[600] capitalize ${
                  cc.status === 'critical' ? 'bg-[#E74C3C]/20 text-[#E74C3C]' :
                  cc.status === 'warning' ? 'bg-[#F39C12]/20 text-[#F39C12]' :
                  'bg-[#27AE60]/20 text-[#27AE60]'
                }`}>
                  {cc.status}
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-['Courier'] text-[12px] font-[700]" style={{ color }}>
                  ₹{(cc.actual / 100).toFixed(1)}L / ₹{(cc.budget / 100).toFixed(1)}L
                </p>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(cc.utilization, 100)}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
                <p className="text-[9px] text-[#9AA6B4]">{cc.utilization.toFixed(0)}% Util.</p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Budget</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(totalBudget / 100).toFixed(1)}L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Spent</p>
          <p className="font-['Courier'] text-[13px] font-[700]">₹{(totalActual / 100).toFixed(1)}L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Avg Utilization</p>
          <p className="font-['Courier'] text-[13px] font-[700]">{(totalActual / totalBudget * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}
