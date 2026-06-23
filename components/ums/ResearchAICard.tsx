'use client'

import { useState } from 'react'
import { ChevronDown, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { ResearchAIInsight } from '@/lib/useResearchData'

interface ResearchAICardProps {
  insight: ResearchAIInsight
  onDismiss?: () => void
  onAction?: () => void
}

const CONFIG = {
  critical: { Icon: AlertTriangle, color: '#E74C3C', bg: '#FADBD8' },
  warning:  { Icon: AlertCircle,  color: '#E67E22', bg: '#FCE8D6' },
  info:     { Icon: Info,         color: '#2E8B8B', bg: '#D1F2F2' },
} as const

export function ResearchAICard({ insight, onDismiss, onAction }: ResearchAICardProps) {
  const [expanded, setExpanded] = useState(false)
  const { Icon, color, bg } = CONFIG[insight.severity]

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-[10px] border-l-4"
      style={{ borderColor: color, backgroundColor: bg }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <Icon size={18} style={{ color, marginTop: 2, flexShrink: 0 }} />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-[700] uppercase tracking-wide" style={{ color }}>
              {insight.severity}
            </p>
            <p className="text-[13px] font-[600] text-[#0F1722] mt-0.5 leading-snug">
              {insight.headline}
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-white/60 rounded-[6px] transition-colors shrink-0"
        >
          <X size={14} className="text-[#9AA6B4]" />
        </button>
      </div>

      {/* Factors toggle */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="flex items-center justify-between gap-2 py-1 px-1 hover:bg-white/30 rounded-[6px] -mx-1"
      >
        <span className="text-[11px] font-[600] text-[#0F1722]">
          Root Factors ({insight.factors.length})
        </span>
        <ChevronDown
          size={14}
          className={`text-[#5A6B7A] transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <ul className="space-y-1 pl-6">
          {insight.factors.map((f, i) => (
            <li key={i} className="text-[11px] text-[#0F1722] list-disc">{f}</li>
          ))}
        </ul>
      )}

      {/* Confidence bar */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#9AA6B4] shrink-0">Confidence</span>
        <div className="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${insight.confidence}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-[10px] font-[600] text-[#0F1722] shrink-0">{insight.confidence}%</span>
      </div>

      {/* Action */}
      <button
        onClick={onAction}
        className="flex items-center justify-between gap-2 px-3 py-2 rounded-[8px] text-[11px] font-[600] text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: color }}
      >
        <span className="text-left leading-snug">{insight.action}</span>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded-[4px] shrink-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
        >
          {insight.domain}
        </span>
      </button>
    </div>
  )
}
