'use client'

import { useState } from 'react'
import { ChevronDown, AlertTriangle, AlertCircle, Info, TrendingUp, X, Clock } from 'lucide-react'
import { AcademicAIInsight } from '@/lib/useAcademicDashboardData'

interface AcademicAIInsightCardProps {
  insight: AcademicAIInsight
  onDismiss?: () => void
}

export function AcademicAIInsightCard({
  insight,
  onDismiss,
}: AcademicAIInsightCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle size={20} className="text-[#B2566B]" />
      case 'warning':
        return <AlertCircle size={20} className="text-[#C55A11]" />
      default:
        return <Info size={20} className="text-[#2E8B8B]" />
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-[#FFF0F0] border-[#FFE5CC]'
      case 'warning':
        return 'bg-[#FFF9E6] border-[#FFE5CC]'
      default:
        return 'bg-[#F0F9FA] border-[#DDEFF0]'
    }
  }

  return (
    <div
      className={`border rounded-[8px] p-4 space-y-3 ${getSeverityBg(insight.severity)}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          {getSeverityIcon(insight.severity)}
          <div className="flex-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-left hover:opacity-80 transition-opacity"
            >
              <h4 className="font-bold text-[#1F3864] text-sm leading-snug">
                {insight.headline}
              </h4>
            </button>
            <div className="text-xs text-[#6B7C99] mt-1">
              Domain: <strong>{insight.domain}</strong> • Confidence:{' '}
              <strong>{insight.confidence}%</strong>
            </div>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-[#6B7C99] hover:text-[#1F3864] transition-colors p-1"
        >
          <X size={16} />
        </button>
      </div>

      {/* Expandable Details */}
      {expanded && (
        <div className="pt-3 border-t border-current border-opacity-20 space-y-3">
          {/* Contributing Factors */}
          <div>
            <div className="text-xs font-semibold text-[#6B7C99] mb-2">Contributing Factors</div>
            <ul className="space-y-1">
              {insight.factors.map((factor, i) => (
                <li key={i} className="text-xs text-[#1F3864] flex gap-2">
                  <span className="text-[#2E8B8B] flex-shrink-0">→</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Action */}
          <div className="p-3 bg-white/60 rounded-[6px]">
            <div className="text-xs font-semibold text-[#6B7C99] mb-1">Recommended Action</div>
            <div className="text-sm text-[#1F3864]">{insight.action}</div>
          </div>

          {/* Confidence Indicator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E8B8B] transition-all"
                style={{ width: `${insight.confidence}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-[#1F3864]">
              {insight.confidence}%
            </span>
          </div>
        </div>
      )}

      {/* Collapsed View - show first factor preview */}
      {!expanded && insight.factors.length > 0 && (
        <div className="text-xs text-[#6B7C99] flex items-center justify-between">
          <span className="line-clamp-1">{insight.factors[0]}</span>
          <button
            onClick={() => setExpanded(true)}
            className="text-[#2E8B8B] font-semibold hover:underline flex-shrink-0 ml-2"
          >
            Details
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2 border-t border-current border-opacity-20">
        <button className="flex-1 px-3 py-1.5 rounded-[6px] bg-white/60 text-xs font-semibold text-[#1F3864] hover:bg-white transition-colors">
          View Details
        </button>
        <button className="px-3 py-1.5 rounded-[6px] bg-white/60 text-xs font-semibold text-[#6B7C99] hover:bg-white transition-colors flex items-center gap-1">
          <Clock size={12} />
          Snooze
        </button>
      </div>
    </div>
  )
}
