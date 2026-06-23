'use client'
import { useState } from 'react'
import {
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AIInsight } from '@/lib/useExecutiveCockpitData'

interface AIInsightCardProps {
  insight: AIInsight
  onDismiss?: (id: string) => void
}

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertCircle,
    border: 'border-l-[#C0392B]',
    iconColor: 'text-[#C0392B]',
    badge: 'bg-[#C0392B]/10 text-[#C0392B] border-[#C0392B]/20',
    label: 'Critical',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-l-[#C55A11]',
    iconColor: 'text-[#C55A11]',
    badge: 'bg-[#FBEEE4] text-[#C55A11] border-[#E59B6A]',
    label: 'Attention',
  },
  info: {
    icon: Info,
    border: 'border-l-[#2F6FB0]',
    iconColor: 'text-[#2F6FB0]',
    badge: 'bg-[#EEF2F8] text-[#1F3864] border-[#D8E0EE]',
    label: 'Insight',
  },
}

export function AIInsightCard({ insight, onDismiss }: AIInsightCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showWhy, setShowWhy] = useState(false)
  const [snoozed, setSnoozed] = useState(false)

  const cfg = SEVERITY_CONFIG[insight.severity]
  const SeverityIcon = cfg.icon

  if (snoozed) return null

  return (
    <div
      className={cn(
        'chart-card rounded-[10px] bg-white border border-[#E4E8EF] border-l-4',
        cfg.border,
        'transition-all duration-200',
      )}
      role="article"
      aria-label={`AI insight: ${insight.headline}`}
    >
      <div className="px-4 pt-4 pb-3">
        {/* Domain + severity badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} className="text-[#9AA6B4]" aria-hidden />
            <span className="text-[10.5px] font-[600] uppercase tracking-[0.06em] text-[#9AA6B4]">
              {insight.domain}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={cn(
                'text-[10px] font-[700] uppercase tracking-wider px-1.5 py-0.5 rounded-full border',
                cfg.badge,
              )}
            >
              {cfg.label}
            </span>
            <button
              type="button"
              aria-label="Snooze insight"
              onClick={() => setSnoozed(true)}
              title="Snooze"
              className="text-[#D8E0EE] hover:text-[#9AA6B4] transition-colors ml-1"
            >
              <Clock size={13} />
            </button>
            {onDismiss && (
              <button
                type="button"
                aria-label="Dismiss insight"
                onClick={() => onDismiss(insight.id)}
                className="text-[#D8E0EE] hover:text-[#9AA6B4] transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Headline */}
        <p className="text-[13px] font-[600] text-[#0F1722] leading-[1.45] text-pretty">
          {insight.headline}
        </p>

        {/* Factors (expandable) */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 mt-2 text-[11.5px] text-[#5A6675] hover:text-[#1F3864] transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'Hide factors' : `${insight.factors.length} contributing factors`}
        </button>

        {expanded && (
          <ul className="mt-2 space-y-1" aria-label="Contributing factors">
            {insight.factors.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12px] text-[#5A6675] leading-[1.5]"
              >
                <SeverityIcon
                  size={11}
                  className={cn('flex-shrink-0 mt-0.5', cfg.iconColor)}
                  aria-hidden
                />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Confidence */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex-1 h-1 rounded-full bg-[#EEF2F7] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#1F3864] transition-all duration-700"
              style={{ width: `${insight.confidence}%` }}
              role="progressbar"
              aria-valuenow={insight.confidence}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <span className="text-[10.5px] text-[#9AA6B4] tabular-nums flex-shrink-0">
            {insight.confidence}% confidence
          </span>
        </div>
      </div>

      {/* Action strip */}
      <div className="border-t border-[#F6F8FB] px-4 py-2.5 flex items-center justify-between gap-2">
        <button
          type="button"
          className={cn(
            'flex items-center gap-1.5 text-[12px] font-[600] transition-colors',
            insight.severity === 'critical'
              ? 'text-[#C0392B] hover:text-[#9E4810]'
              : insight.severity === 'warning'
              ? 'text-[#C55A11] hover:text-[#9E4810]'
              : 'text-[#1F3864] hover:text-[#34507F]',
          )}
        >
          {insight.action}
          <ArrowRight size={12} />
        </button>
        <button
          type="button"
          onClick={() => setShowWhy((v) => !v)}
          title="Why am I seeing this?"
          className="text-[#D8E0EE] hover:text-[#9AA6B4] transition-colors flex-shrink-0"
          aria-label="Why am I seeing this?"
        >
          <HelpCircle size={14} />
        </button>
      </div>

      {showWhy && (
        <div className="px-4 pb-3">
          <p className="text-[11.5px] text-[#9AA6B4] bg-[#F6F8FB] rounded-[6px] px-3 py-2 leading-relaxed">
            This insight is generated by analyzing schema-grounded metrics across the{' '}
            {insight.domain} domain. AI advises — you decide. No irreversible actions are taken
            automatically.
          </p>
        </div>
      )}
    </div>
  )
}
