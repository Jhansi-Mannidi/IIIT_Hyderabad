'use client'

import { useState } from 'react'
import { AlertTriangle, AlertCircle, Info, ChevronDown, X } from 'lucide-react'
import { PlacementsAIInsight } from '@/lib/usePlacementsData'

const SEV = {
  critical: { Icon: AlertTriangle, color: '#E74C3C', bg: '#FEF0EE' },
  warning:  { Icon: AlertCircle,  color: '#E67E22', bg: '#FEF7ED' },
  info:     { Icon: Info,         color: '#1F6B8A', bg: '#EEF7FC' },
} as const

interface Props {
  insight: PlacementsAIInsight
  onDismiss: () => void
}

export function PlacementsAICard({ insight, onDismiss }: Props) {
  const [open, setOpen] = useState(false)
  const { Icon, color, bg } = SEV[insight.severity]

  return (
    <div
      className="rounded-[10px] border-l-[4px] p-4"
      style={{ borderColor: color, backgroundColor: bg }}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <Icon size={16} style={{ color, flexShrink: 0, marginTop: 2 }} />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-[700] uppercase tracking-wide mb-0.5" style={{ color }}>
            {insight.severity}
          </p>
          <p className="text-[13px] font-[600] text-[#0F1722] leading-snug">
            {insight.headline}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-[6px] hover:bg-white/60 transition-colors flex-shrink-0"
        >
          <X size={13} className="text-[#9AA6B4]" />
        </button>
      </div>

      {/* Expand factors */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 mt-2.5 text-[11px] font-[600] text-[#0F1722] hover:underline"
      >
        <ChevronDown
          size={13}
          style={{ color }}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
        Root factors ({insight.factors.length})
      </button>

      {open && (
        <ul className="mt-2 space-y-1 pl-5">
          {insight.factors.map((f, i) => (
            <li key={i} className="text-[11px] text-[#0F1722] list-disc">{f}</li>
          ))}
        </ul>
      )}

      {/* Confidence bar */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] text-[#9AA6B4] flex-shrink-0">Confidence</span>
        <div className="flex-1 h-1.5 bg-white/70 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${insight.confidence}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-[10px] font-[700] font-['Courier_New',_monospace]" style={{ color }}>
          {insight.confidence}%
        </span>
      </div>

      {/* Action button */}
      <button
        className="mt-3 w-full text-left px-3 py-2 rounded-[8px] text-[11px] font-[600] text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: color }}
      >
        {insight.action}
      </button>
    </div>
  )
}
