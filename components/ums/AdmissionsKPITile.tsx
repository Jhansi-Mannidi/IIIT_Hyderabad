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
      className="chart-card flex min-h-[148px] flex-col rounded-[12px] border border-[#E4E8EF] bg-white p-4 transition-colors hover:border-[#2E8B8B]"
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Label + Badge */}
      <div className="flex min-h-[22px] min-w-0 items-start justify-between gap-2">
        <span title={metric.label} className="min-w-0 flex-1 truncate text-[10.5px] font-[650] uppercase leading-4 tracking-[0.055em] text-[#5A6675]">
          {metric.label}
        </span>
        {metric.derived && (
          <span className="max-w-[58px] flex-shrink-0 truncate rounded-full border border-[#D8E0EE] bg-[#F8FAFD] px-1.5 py-0.5 text-[9px] font-[650] leading-4 text-[#1F3864]" title="Derived">
            Calc
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-2 min-h-[34px]">
        <span data-metric className="block truncate text-[16px] font-[650] leading-none tracking-[-0.015em] text-[#14223D] tabular-nums" title={metric.value}>
          {metric.value}
        </span>
      </div>

      {/* Delta */}
      {isDelta && (
        <div className={`mt-2 flex w-fit items-center gap-1 rounded-[6px] px-2 py-1 ${deltaBgColor}`}>
          {isPositive ? (
            <TrendingUp size={12} className={deltaColor} />
          ) : (
            <TrendingDown size={12} className={deltaColor} />
          )}
          <span className={`text-[10px] font-[600] ${deltaColor}`}>
            {isPositive ? '+' : ''}{metric.delta}% {metric.unit || ''}
          </span>
        </div>
      )}
    </motion.div>
  )
}
