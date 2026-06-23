'use client'

import { useState } from 'react'
import { ChevronDown, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface HRAICardProps {
  insight: {
    id: string
    severity: 'critical' | 'warning' | 'info'
    headline: string
    factors: string[]
    confidence: number
    action: string
    domain: string
  }
  onDismiss?: () => void
  onAction?: () => void
}

export function HRPayrollAICard({ insight, onDismiss, onAction }: HRAICardProps) {
  const [expanded, setExpanded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const severityConfig = {
    critical: { icon: AlertTriangle, color: '#E74C3C', bg: '#FFF1F0', border: '#F2B8B5' },
    warning: { icon: AlertCircle, color: '#C55A11', bg: '#FFF7ED', border: '#F2C69B' },
    info: { icon: Info, color: '#2E8B8B', bg: '#F0FAFA', border: '#AFDCDC' },
  }

  const config = severityConfig[insight.severity]
  const Icon = config.icon

  return (
    <motion.div
      className="flex flex-col gap-3 rounded-[12px] border border-l-4 bg-white p-4 shadow-[0_12px_28px_rgba(31,56,100,0.07)]"
      style={{ borderColor: config.border, borderLeftColor: config.color }}
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-24px' }}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[9px]"
            style={{ color: config.color, backgroundColor: config.bg }}
          >
            <Icon size={17} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[10.5px] font-[800] uppercase tracking-[0.08em]" style={{ color: config.color }}>{insight.severity}</p>
            <p className="mt-1 text-[13px] font-[700] leading-5 text-[#0F1722]">{insight.headline}</p>
          </div>
        </div>
        <button onClick={onDismiss} className="p-1 hover:bg-[#EEF2F8] rounded-[6px] transition-colors flex-shrink-0">
          <X size={14} className="text-[#9AA6B4]" />
        </button>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between gap-2 rounded-[8px] bg-[#F8FAFD] px-3 py-2 hover:bg-[#EEF2F8]"
      >
        <span className="text-[11px] font-[600] text-[#0F1722]">Root Factors ({insight.factors.length})</span>
        <ChevronDown size={14} className={`text-[#5A6B7A] transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="space-y-1.5 overflow-hidden rounded-[10px] bg-[#F8FAFD] px-3 py-2"
            initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {insight.factors.map((factor, idx) => (
              <p key={idx} className="text-[11px] leading-5 text-[#2B3645]">• {factor}</p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#9AA6B4]">Confidence</span>
        <div className="flex-1 h-1.5 bg-[#EEF2F8] rounded-full overflow-hidden">
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
        className="flex items-center justify-between gap-3 rounded-[9px] px-3 py-2 text-[11px] font-[700] transition-all"
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
    </motion.div>
  )
}
