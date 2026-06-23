'use client'

import { useState } from 'react'
import { ChevronDown, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { FinanceAIInsight } from '@/lib/useInstitutionalFinanceData'
import { MotionCard } from './MotionCard'

interface InstitutionalFinanceAICardProps {
  insight: FinanceAIInsight
  onDismiss?: () => void
  onAction?: () => void
}

export function InstitutionalFinanceAICard({ insight, onDismiss, onAction }: InstitutionalFinanceAICardProps) {
  const [expanded, setExpanded] = useState(false)

  const severityConfig = {
    critical: { icon: AlertTriangle, color: '#E74C3C', bg: '#FADBD8' },
    warning: { icon: AlertCircle, color: '#E67E22', bg: '#FCE8D6' },
    info: { icon: Info, color: '#2E8B8B', bg: '#D1F2F2' },
  }

  const config = severityConfig[insight.severity]
  const Icon = config.icon

  return (
    <MotionCard className="ai-severity-card flex flex-col gap-3 p-4 rounded-[10px] border-l-4" style={{ borderColor: config.color, backgroundColor: config.bg }}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Icon size={18} style={{ color: config.color, marginTop: '2px', flexShrink: 0 }} />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-[600] uppercase tracking-wide" style={{ color: config.color }}>{insight.severity}</p>
            <p className="text-[13px] font-[600] text-[#0F1722] mt-1">{insight.headline}</p>
          </div>
        </div>
        <button onClick={onDismiss} className="p-1 hover:bg-white rounded-[6px] transition-colors flex-shrink-0">
          <X size={14} className="text-[#9AA6B4]" />
        </button>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between gap-2 py-1.5 -mx-2 px-2 hover:bg-white/30 rounded-[6px]"
      >
        <span className="text-[11px] font-[600] text-[#0F1722]">Root Factors ({insight.factors.length})</span>
        <ChevronDown size={14} className={`text-[#5A6B7A] transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="space-y-1.5 pl-7">
          {insight.factors.map((factor, idx) => (
            <p key={idx} className="text-[11px] text-[#0F1722]">• {factor}</p>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#9AA6B4]">Confidence</span>
        <div className="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${insight.confidence}%`,
              backgroundColor: config.color,
            }}
          />
        </div>
        <span className="text-[10px] font-[600] text-[#0F1722]">{insight.confidence}%</span>
      </div>

      <button
        onClick={onAction}
        className="flex items-center justify-between px-3 py-2 rounded-[8px] text-[11px] font-[600] transition-all"
        style={{
          backgroundColor: config.color,
          color: '#FFFFFF',
        }}
      >
        <span>{insight.action}</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded-[4px]" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
          {insight.domain}
        </span>
      </button>
    </MotionCard>
  )
}
