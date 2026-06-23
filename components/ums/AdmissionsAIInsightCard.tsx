'use client'
import { useState } from 'react'
import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp, X, Zap } from 'lucide-react'
import { AdmissionsAIInsight } from '@/lib/useAdmissionsDashboardData'

interface AdmissionsAIInsightCardProps {
  insight: AdmissionsAIInsight
  onDismiss?: (id: string) => void
}

export function AdmissionsAIInsightCard({ insight, onDismiss }: AdmissionsAIInsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const severityConfig = {
    critical: { bg: 'bg-[#FDE8EB]', border: 'border-[#B2566B]', icon: AlertTriangle, label: 'Critical', color: 'text-[#B2566B]' },
    warning: { bg: 'bg-[#FEF3E8]', border: 'border-[#C55A11]', icon: AlertCircle, label: 'Warning', color: 'text-[#C55A11]' },
    info: { bg: 'bg-[#E8F5F5]', border: 'border-[#2E8B8B]', icon: Info, label: 'Insight', color: 'text-[#2E8B8B]' },
  }

  const config = severityConfig[insight.severity]
  const SeverityIcon = config.icon

  return (
    <div className={`flex flex-col gap-3 px-4 py-3 rounded-[10px] border-2 ${config.bg} ${config.border}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          <SeverityIcon size={18} className={`${config.color} mt-0.5 flex-shrink-0`} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-[700] ${config.color}`}>{config.label}</span>
              <span className="text-[10px] font-[600] text-[#5A6B7A] bg-[#EEF2F8] px-1.5 py-0.5 rounded-[4px]">
                {insight.confidence}% confidence
              </span>
            </div>
            <h4 className="text-[13px] font-[700] text-[#0F1722] leading-snug">{insight.headline}</h4>
          </div>
        </div>
        <button
          onClick={() => onDismiss?.(insight.id)}
          className="p-1 hover:bg-white/50 rounded-[4px] transition-colors flex-shrink-0"
        >
          <X size={16} className="text-[#5A6B7A]" />
        </button>
      </div>

      {/* Expandable Factors */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-[6px] hover:bg-white/40 transition-colors text-left"
      >
        <span className="text-[11px] font-[600] text-[#0F1722]">Key Factors</span>
        {isExpanded ? (
          <ChevronUp size={14} className="text-[#5A6B7A]" />
        ) : (
          <ChevronDown size={14} className="text-[#5A6B7A]" />
        )}
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-1 px-2 py-2 rounded-[6px] bg-white/50">
          {insight.factors.map((factor, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-[10px] font-[700] text-[#5A6B7A] flex-shrink-0">•</span>
              <span className="text-[11px] text-[#0F1722]">{factor}</span>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <button className="flex items-center justify-between gap-2 px-3 py-2 rounded-[6px] bg-white hover:bg-[#F0F3F8] transition-colors">
        <div className="flex items-center gap-2">
          <Zap size={14} className={config.color} />
          <span className="text-[11px] font-[700] text-[#0F1722]">{insight.action}</span>
        </div>
        <span className="text-[10px] font-[600] text-[#5A6B7A]">{insight.category}</span>
      </button>
    </div>
  )
}
