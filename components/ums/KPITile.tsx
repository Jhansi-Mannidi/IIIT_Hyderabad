'use client'
import { useEffect, useRef, useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts'
import { cn } from '@/lib/utils'
import type { KPIMetric } from '@/lib/useExecutiveCockpitData'

interface KPITileProps {
  metric: KPIMetric
  onClick?: () => void
}

const PROVENANCE_BADGE: Record<KPIMetric['provenance'], { label: string; cls: string } | null> = {
  direct:   null,
  derived:  { label: 'Derived', cls: 'border-teal-500 text-teal-700 bg-teal-50' },
  'ddl-gap': { label: 'Computed', cls: 'border-amber-400 text-amber-700 bg-amber-50' },
}

export function KPITile({ metric, onClick }: KPITileProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Animate in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const isPositiveDelta = metric.delta > 0
  const deltaColor = isPositiveDelta ? 'text-[#2E8B8B]' : 'text-[#C55A11]'
  const DeltaIcon = isPositiveDelta ? TrendingUp : TrendingDown

  const sparkData = metric.sparkline.map((v, i) => ({ i, v }))

  const breachBorder =
    metric.breach
      ? metric.breachLevel === 'danger'
        ? 'border-[#C0392B] shadow-[0_0_0_1px_#C0392B22]'
        : 'border-[#C55A11] shadow-[0_0_0_1px_#C55A1122]'
      : ''

  const breachDot =
    metric.breach
      ? metric.breachLevel === 'danger'
        ? 'bg-[#C0392B]'
        : 'bg-[#C55A11]'
      : null

  const badge = PROVENANCE_BADGE[metric.provenance]

  // Progress toward target
  const hasTarget = metric.target !== undefined
  let progress = 0
  if (hasTarget && metric.target) {
    progress = Math.min(100, (metric.rawValue / metric.target) * 100)
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={`${metric.label}: ${metric.value}, ${isPositiveDelta ? 'up' : 'down'} ${Math.abs(metric.delta).toFixed(1)}% ${metric.deltaLabel}`}
      className={cn(
        'chart-card relative flex flex-col gap-3 rounded-[12px] bg-white p-5 cursor-pointer select-none',
        'transition-all duration-200 hover:-translate-y-0.5',
        breachBorder || 'border-[#E4E8EF]',
        !visible && 'opacity-0 translate-y-1',
        visible && 'opacity-100 translate-y-0',
        'transition-opacity duration-300',
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {breachDot && (
            <span
              className={cn('inline-block w-2 h-2 rounded-full flex-shrink-0 mt-0.5', breachDot)}
              aria-label={`${metric.breachLevel} threshold breach`}
            />
          )}
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5A6675] truncate leading-4">
            {metric.label}
          </span>
        </div>
        {badge && (
          <span
            className={cn(
              'flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border',
              badge.cls,
            )}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Value */}
      <div className={cn('animate-count-up')}>
        <span
          data-metric
          className="text-[28px] font-[700] leading-none tracking-[-0.01em] text-[#14223D] tabular-nums"
        >
          {metric.value}
        </span>
      </div>

      {/* Delta chip + sparkline */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'inline-flex items-center gap-1 text-[12px] font-[600]',
              deltaColor,
            )}
          >
            <DeltaIcon size={13} strokeWidth={2.5} aria-hidden />
            {Math.abs(metric.delta).toFixed(1)}%
          </span>
          <span className="text-[11px] text-[#9AA6B4]">{metric.deltaLabel}</span>
        </div>

        {/* Inline sparkline */}
        <div className="w-20 h-8 flex-shrink-0" aria-hidden>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={isPositiveDelta ? '#2E8B8B' : '#C55A11'}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
              <Tooltip
                content={() => null}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress bar toward target */}
      {hasTarget && (
        <div className="mt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-[#9AA6B4]">{metric.targetLabel}</span>
            <span className="text-[10px] font-[600] text-[#5A6675] tabular-nums">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div
            className="h-1 w-full rounded-full overflow-hidden bg-[#EEF2F7]"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                backgroundColor:
                  progress >= 95
                    ? '#2E8B8B'
                    : progress >= 75
                    ? '#1F3864'
                    : '#C55A11',
              }}
            />
          </div>
        </div>
      )}

      {/* Breach alert icon */}
      {metric.breach && (
        <span className="absolute top-4 right-4" aria-hidden>
          {metric.breachLevel === 'danger' ? (
            <AlertCircle size={15} className="text-[#C0392B]" />
          ) : (
            <AlertTriangle size={15} className="text-[#C55A11]" />
          )}
        </span>
      )}
    </div>
  )
}
