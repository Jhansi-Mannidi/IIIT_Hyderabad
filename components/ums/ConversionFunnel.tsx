'use client'
import { useState } from 'react'
import { Info, Badge } from 'lucide-react'
import { FunnelStage } from '@/lib/useAdmissionsDashboardData'
import { MotionCard } from './MotionCard'

interface ConversionFunnelProps {
  data: FunnelStage[]
  onStageClick?: (stage: FunnelStage) => void
}

export function ConversionFunnel({ data, onStageClick }: ConversionFunnelProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null)
  const maxCount = Math.max(...data.map((s) => s.count))

  return (
    <MotionCard className="flex flex-col gap-4 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-[700] text-[#0F1722]">Admissions Funnel</h3>
          <p className="text-[12px] text-[#5A6B7A] mt-0.5">Applied → Enrolled conversion stages</p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-[600] text-[#5A6B7A] bg-[#EEF2F8] px-2 py-1 rounded-[6px]">
          <Info size={12} />
          Conversion %
        </div>
      </div>

      {/* Funnel Stages */}
      <div className="flex flex-col gap-3">
        {data.map((stage, idx) => {
          const widthPercent = (stage.count / maxCount) * 100
          const prevStage = idx > 0 ? data[idx - 1] : null
          const conversionRate = prevStage ? (stage.count / prevStage.count) * 100 : 100
          const isLast = idx === data.length - 1
          const isDerived = isLast

          return (
            <div key={stage.stage} className="flex flex-col gap-2">
              {/* Stage Bar */}
              <button
                onClick={() => onStageClick?.(stage)}
                onMouseEnter={() => setHoveredStage(stage.stage)}
                onMouseLeave={() => setHoveredStage(null)}
                className="text-left transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-[700] text-[#0F1722]">{stage.label}</span>
                    {isDerived && (
                      <span className="flex items-center gap-1 text-[9px] font-[600] text-[#1F3864] bg-[#EEF2F8] px-1.5 py-0.5 rounded-[4px]">
                        <Badge size={10} />
                        Derived
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="admissions-chart-metric text-[12px] font-[650] text-[#0F1722] tabular-nums">{stage.count.toLocaleString()}</span>
                    {idx > 0 && (
                      <span className="text-[11px] font-[600] text-[#2E8B8B] px-2 py-0.5 rounded-[4px] bg-[#E8F5F5]">
                        {conversionRate.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Bar */}
                <div
                  style={{ width: `${widthPercent}%` }}
                  className={`h-8 rounded-[6px] transition-all ${
                    hoveredStage === stage.stage
                      ? 'bg-[#1F3864] shadow-md'
                      : idx === 0
                        ? 'bg-[#5B8DEF]'
                        : idx === 1
                          ? 'bg-[#2E8B8B]'
                          : idx === 2
                            ? 'bg-[#C55A11]'
                            : idx === 3
                              ? 'bg-[#C99A2E]'
                              : 'bg-[#2E8B8B]'
                  } ${
                    hoveredStage === stage.stage ? 'shadow-lg' : ''
                  }`}
                />
              </button>

              {/* Drop-off indicator */}
              {idx > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#9AA6B4]">
                    Lost: {(prevStage?.count || 0) - stage.count} applicants
                  </span>
                  <span className="text-[10px] font-[600] text-[#B2566B]">
                    {(((prevStage?.count || 0) - stage.count) / (prevStage?.count || 1) * 100).toFixed(1)}% drop
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#DFE7EF]">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Overall Conversion</span>
          <span className="admissions-chart-metric text-[13px] font-[650] text-[#0F1722] tabular-nums">
            {((data[data.length - 1].count / data[0].count) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Total Lost</span>
          <span className="admissions-chart-metric text-[13px] font-[650] text-[#B2566B] tabular-nums">
            {(data[0].count - data[data.length - 1].count).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Largest Drop</span>
          <span className="admissions-chart-metric text-[13px] font-[650] text-[#1F3864] tabular-nums">
            Applied → Ranked ({((data[1].count / data[0].count) * 100).toFixed(1)}%)
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Final Enrolled</span>
          <span className="admissions-chart-metric text-[13px] font-[650] text-[#2E8B8B] tabular-nums">
            {data[data.length - 1].count.toLocaleString()}
          </span>
        </div>
      </div>
    </MotionCard>
  )
}
