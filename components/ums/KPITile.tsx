'use client'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KPIMetric } from '@/lib/useExecutiveCockpitData'
import { motion, useReducedMotion } from 'framer-motion'

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
  const shouldReduceMotion = useReducedMotion()

  const isPositiveDelta = metric.delta > 0
  const deltaColor = isPositiveDelta ? 'text-[#2E8B8B]' : 'text-[#C55A11]'
  const DeltaIcon = isPositiveDelta ? TrendingUp : TrendingDown

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
    <motion.div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={`${metric.label}: ${metric.value}, ${isPositiveDelta ? 'up' : 'down'} ${Math.abs(metric.delta).toFixed(1)}% ${metric.deltaLabel}`}
      className={cn(
        'chart-card relative flex min-h-[148px] flex-col rounded-[12px] bg-white p-4 cursor-pointer select-none overflow-hidden sm:min-h-[148px]',
        'transition-colors duration-200',
        breachBorder || 'border-[#E4E8EF]',
      )}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.015 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header row */}
      <div className="flex min-h-[22px] items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2 pr-1">
          {breachDot && (
            <span
              className={cn('inline-block w-2 h-2 rounded-full flex-shrink-0 mt-0.5', breachDot)}
              aria-label={`${metric.breachLevel} threshold breach`}
            />
          )}
          <span
            title={metric.label}
            className="block max-w-full whitespace-normal text-[10.5px] font-[650] uppercase leading-4 tracking-[0.055em] text-[#5A6675] sm:truncate"
          >
            {metric.label}
          </span>
        </div>
        {badge && (
          <span
            className={cn(
              'max-w-[58px] flex-shrink-0 truncate rounded-full border px-1.5 py-0.5 text-[9px] font-[650] leading-4',
              badge.cls,
            )}
            title={badge.label}
          >
            {badge.label}
          </span>
        )}
      </div>

      {/* Value */}
      <div className={cn('animate-count-up mt-2 min-h-[34px]')}>
        <span
          data-metric
          className="block truncate text-[16px] font-[650] leading-none tracking-[-0.015em] text-[#14223D] tabular-nums"
          title={metric.value}
        >
          {metric.value}
        </span>
      </div>

      {/* Delta chip */}
      <div className="mt-2 flex min-h-[34px] items-end justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span
            className={cn(
              'inline-flex items-center gap-1 text-[9.5px] font-[650]',
              deltaColor,
            )}
          >
            <DeltaIcon size={13} strokeWidth={2.5} aria-hidden />
            {Math.abs(metric.delta).toFixed(1)}%
          </span>
          <span className="mt-0.5 block truncate text-[10px] font-[600] text-[#9AA6B4]" title={metric.deltaLabel}>
            {metric.deltaLabel}
          </span>
        </div>
      </div>

      {/* Progress bar toward target */}
      {hasTarget && (
        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="truncate pr-2 text-[9.5px] font-[700] uppercase tracking-[0.055em] text-[#9AA6B4]" title={metric.targetLabel}>
              {metric.targetLabel}
            </span>
            <span className="text-[9px] font-[550] text-[#5A6675] tabular-nums">
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

    </motion.div>
  )
}
