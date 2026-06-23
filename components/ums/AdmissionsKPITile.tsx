'use client'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { AdmissionsKPI } from '@/lib/useAdmissionsDashboardData'
import { motion, useReducedMotion } from 'framer-motion'

interface AdmissionsKPITileProps {
  metric: AdmissionsKPI
}

export function AdmissionsKPITile({ metric }: AdmissionsKPITileProps) {
  const isDelta = metric.delta !== undefined
  const isPositive = isDelta ? metric.delta > 0 : false
  const deltaColor = isPositive ? 'text-[#2E8B8B]' : 'text-[#B2566B]'
  const deltaBgColor = isPositive ? 'bg-[#E8F5F5]' : 'bg-[#F8E8EC]'
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="flex flex-col gap-2 px-3 py-3 rounded-[10px] bg-white border border-[#DFE7EF] hover:border-[#2E8B8B] transition-colors"
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Label + Badge */}
      <div className="flex min-w-0 items-center justify-between gap-2">
        <span title={metric.label} className="min-w-0 flex-1 truncate text-[11px] font-[700] text-[#5A6B7A]">
          {metric.label}
        </span>
        {metric.derived && (
          <span className="max-w-[54px] flex-shrink-0 truncate text-[9px] font-[800] text-[#1F3864] bg-[#EEF2F8] px-1.5 py-0.5 rounded-[4px]" title="Derived">
            Calc
          </span>
        )}
      </div>

      {/* Value */}
      <div className="text-[18px] font-[700] text-[#0F1722] tabular-nums">{metric.value}</div>

      {/* Delta */}
      {isDelta && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-[6px] ${deltaBgColor} w-fit`}>
          {isPositive ? (
            <TrendingUp size={12} className={deltaColor} />
          ) : (
            <TrendingDown size={12} className={deltaColor} />
          )}
          <span className={`text-[11px] font-[600] ${deltaColor}`}>
            {isPositive ? '+' : ''}{metric.delta}% {metric.unit || ''}
          </span>
        </div>
      )}
    </motion.div>
  )
}
