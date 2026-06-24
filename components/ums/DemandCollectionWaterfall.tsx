'use client'

import { WaterfallStep } from '@/lib/useFinanceDashboardData'
import { MotionCard } from './MotionCard'

interface DemandCollectionWaterfallProps {
  steps: WaterfallStep[]
}

export function DemandCollectionWaterfall({ steps }: DemandCollectionWaterfallProps) {
  const maxValue = Math.max(...steps.map((s) => s.cumulative))
  const chartHeight = 145
  const labelLaneHeight = 28

  return (
    <MotionCard
      className="flex flex-col gap-4 self-start overflow-visible rounded-[12px] border border-[#E5ECEF] bg-white p-4"
      style={{ height: 'fit-content', alignSelf: 'start' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[13px] font-[800] text-[#0F1722]">Demand → Collection Waterfall</h3>
          <p className="mt-0.5 text-[11px] font-[600] text-[#9AA6B4]">
            Demand, collection, adjustments, and net realization bridge
          </p>
        </div>
        <span className="text-[11px] text-[#9AA6B4]">Amount in ₹ Lakhs</span>
      </div>

      <div className="relative overflow-x-auto rounded-[14px] border border-[#E5ECEF] bg-[#F8FBFD] px-4 pb-4 pt-4">
        <div className="min-w-[640px]">
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-[#DDE6EF]" />
            <div
              className="grid grid-cols-6 items-end gap-4"
              style={{ height: `${labelLaneHeight + chartHeight}px` }}
            >
              {steps.map((step, idx) => {
                const height = (step.cumulative / maxValue) * chartHeight
                const displayHeight = Math.max(height, 34)

                return (
                  <div key={step.label} className="relative flex h-full min-w-0 items-end justify-center">
                    {idx < steps.length - 1 && (
                      <div
                        className="absolute left-1/2 hidden h-px w-[calc(100%+1rem)] translate-x-5 border-t border-dashed border-[#C8D4E2] sm:block"
                        style={{ bottom: `${height}px` }}
                      />
                    )}
                    <div className="flex w-full flex-col items-center">
                      <span className="mb-2 whitespace-nowrap text-[10px] font-[850] leading-none text-[#0F1722]">
                        ₹{(step.cumulative / 100).toFixed(0)}L
                      </span>
                      <div
                        className="z-10 w-full min-w-[42px] max-w-[58px] rounded-t-[10px] shadow-[0_12px_24px_rgba(31,56,100,0.14)] ring-1 ring-black/5 transition-all duration-500"
                        style={{
                          height: `${displayHeight}px`,
                          backgroundColor: step.color,
                        }}
                        aria-label={`${step.label}: ₹${(step.cumulative / 100).toFixed(1)}L`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-6 gap-4">
            {steps.map((step, idx) => {
              const isNegative = step.value < 0
              const valueLabel = `${isNegative ? '−' : '+'}₹${Math.abs(step.value / 100).toFixed(0)}L`

              return (
                <div
                  key={step.label}
                  className="flex min-h-[54px] flex-col justify-center rounded-[10px] bg-white px-2 py-2 text-center shadow-[inset_0_0_0_1px_rgba(31,56,100,0.08)]"
                >
                  <p className="truncate text-[10px] font-[800] text-[#0F1722]" title={step.label}>
                    {step.label}
                  </p>
                  <p className="text-[9px] font-[700] text-[#9AA6B4]">
                    {idx === 0 ? 'base demand' : valueLabel}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Summary Footer */}
      <div className="grid grid-cols-1 gap-3 rounded-[12px] border border-[#E5ECEF] bg-[#F6F8FB] p-3 sm:grid-cols-3">
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
