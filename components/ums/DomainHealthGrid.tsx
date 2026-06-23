'use client'
import { TrendingUp, TrendingDown, Minus, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { DomainSummary } from '@/lib/useExecutiveCockpitData'

interface DomainHealthGridProps {
  domains: DomainSummary[]
}

const STATUS_CONFIG = {
  healthy: {
    icon: CheckCircle2,
    color: 'text-[#2E8B8B]',
    bg: 'bg-[#E7F2F2]',
    border: 'border-[#2E8B8B]/20',
    dot: 'bg-[#2E8B8B]',
    label: 'Healthy',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-[#C55A11]',
    bg: 'bg-[#FBEEE4]',
    border: 'border-[#C55A11]/20',
    dot: 'bg-[#C55A11]',
    label: 'Attention',
  },
  critical: {
    icon: XCircle,
    color: 'text-[#C0392B]',
    bg: 'bg-[#FEF2F2]',
    border: 'border-[#C0392B]/20',
    dot: 'bg-[#C0392B]',
    label: 'Critical',
  },
}

const TREND_ICON = {
  up:   { icon: TrendingUp,   color: 'text-[#2E8B8B]' },
  down: { icon: TrendingDown, color: 'text-[#C55A11]' },
  flat: { icon: Minus,        color: 'text-[#9AA6B4]' },
}

export function DomainHealthGrid({ domains }: DomainHealthGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3" role="list" aria-label="Domain health overview">
      {domains.map((d) => {
        const cfg = STATUS_CONFIG[d.status]
        const StatusIcon = cfg.icon
        const trend = TREND_ICON[d.trend]
        const TrendIcon = trend.icon

        return (
          <div
            key={d.domain}
            role="listitem"
            className={cn(
              'rounded-[10px] border p-3 flex flex-col gap-2 transition-all duration-150 hover:-translate-y-0.5 cursor-pointer',
              'bg-white border-[#E4E8EF] hover:shadow-[0_4px_12px_rgba(15,23,34,0.08)]',
            )}
            tabIndex={0}
            aria-label={`${d.domain}: ${cfg.label}, score ${d.score}`}
          >
            {/* Domain + status */}
            <div className="flex items-start justify-between gap-2">
              <span className="text-[12px] font-[600] text-[#0F1722] leading-4 flex-1 min-w-0">
                {d.domain}
              </span>
              <StatusIcon size={14} className={cn('flex-shrink-0 mt-0.5', cfg.color)} aria-hidden />
            </div>

            {/* Score bar */}
            <div>
              <div
                className="h-1.5 w-full rounded-full overflow-hidden bg-[#EEF2F7]"
                role="progressbar"
                aria-valuenow={d.score}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${d.score}%`,
                    backgroundColor:
                      d.status === 'healthy'
                        ? '#2E8B8B'
                        : d.status === 'warning'
                        ? '#C55A11'
                        : '#C0392B',
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10.5px] font-[700] tabular-nums text-[#5A6675]">
                  {d.score}
                </span>
                <TrendIcon size={11} className={trend.color} aria-label={`Trend: ${d.trend}`} />
              </div>
            </div>

            {/* Top issue */}
            <p className="text-[10.5px] text-[#9AA6B4] leading-[1.45] line-clamp-2">
              {d.topIssue}
            </p>
          </div>
        )
      })}
    </div>
  )
}
