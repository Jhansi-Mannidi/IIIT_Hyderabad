'use client'

import { WaterfallStep } from '@/lib/useFinanceDashboardData'
import { MotionCard } from './MotionCard'

interface DemandCollectionWaterfallProps {
  steps: WaterfallStep[]
}

export function DemandCollectionWaterfall({ steps }: DemandCollectionWaterfallProps) {
  const maxValue = Math.max(...steps.map(s => s.cumulative))
  const scale = 300 / maxValue

  return (
    <MotionCard className="flex flex-col gap-4 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Demand → Collection Waterfall</h3>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <div className="flex items-flex-end gap-2 h-80 px-2 py-4">
        {steps.map((step, idx) => {
          const height = (step.cumulative / maxValue) * 300
          const prevHeight = idx > 0 ? (steps[idx - 1].cumulative / maxValue) * 300 : 0
          const barHeight = Math.abs(height - prevHeight)
          const isNegative = step.value < 0
          const topPos = isNegative ? height : prevHeight

          return (
            <div key={idx} className="flex flex-col items-center flex-1 gap-2">
              {/* Bar */}
              <div className="relative w-full" style={{ height: '320px' }}>
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 rounded-t-[6px] transition-all"
                  style={{
                    height: `${barHeight}px`,
                    top: `${320 - topPos - barHeight}px`,
                    backgroundColor: step.color,
                    opacity: 0.85,
                  }}
                />
              </div>

              {/* Label & Value */}
              <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-[10px] font-[600] text-[#0F1722]">{step.label}</p>
                <p className="font-['Courier'] text-[11px] font-[700] text-[#1F3864]">
                  ₹{(step.cumulative / 100).toFixed(0)}L
                </p>
                <p className="text-[9px] text-[#9AA6B4]">
                  {isNegative ? '−' : '+'}{Math.abs(step.value / 100).toFixed(0)}L
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-3 gap-4 p-3 bg-[#F6F8FB] rounded-[8px] border border-[#E5ECEF]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Realization %</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#1F3864]">90.2%</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Receivables</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#B2566B]">₹12.9L</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Refunds Issued</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#C99A2E]">₹1.56L</p>
        </div>
      </div>
    </MotionCard>
  )
}
