'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

interface AttendanceKPITileProps {
  id: string
  label: string
  value: number
  target?: number
  delta: number
  isDerived?: boolean
  percentage?: boolean
}

export function AttendanceKPITile({
  id,
  label,
  value,
  target,
  delta,
  isDerived = false,
  percentage = false,
}: AttendanceKPITileProps) {
  const isPositive = delta >= 0 || (id.includes('risk') ? delta <= 0 : delta >= 0)
  const shouldReduceMotion = useReducedMotion()
  
  const formatValue = () => {
    if (percentage) return `${value.toFixed(1)}%`
    return value.toLocaleString('en-IN')
  }

  return (
    <motion.div
      className="flex flex-col gap-3 p-4 rounded-[12px] bg-white border border-[#E5ECEF]"
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex min-w-0 items-center gap-2">
            <p title={label} className="min-w-0 flex-1 truncate text-[11px] font-[700] text-[#5A6B7A] uppercase tracking-wide">{label}</p>
            {isDerived && (
              <span className="max-w-[54px] flex-shrink-0 truncate px-1.5 py-0.5 rounded-[4px] bg-[#EEF2F8] text-[9px] font-[800] text-[#1F3864]" title="Derived">
                Calc
              </span>
            )}
          </div>
          <p className="font-['Courier'] text-[16px] font-[650] text-[#0F1722]">{formatValue()}</p>
        </div>
        {target && (
          <div className="text-right">
            <p className="text-[10px] text-[#9AA6B4]">Target</p>
            <p className="font-['Courier'] text-[13px] font-[600] text-[#5A6B7A]">
              {percentage ? `${target.toFixed(1)}%` : target.toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp size={14} className="text-[#27AE60]" />
        ) : (
          <TrendingDown size={14} className="text-[#E74C3C]" />
        )}
        <span
          className={`text-[12px] font-[600] font-['Courier'] ${
            isPositive ? 'text-[#27AE60]' : 'text-[#E74C3C]'
          }`}
        >
          {isPositive ? '+' : ''}{delta.toFixed(1)}{percentage ? '%' : ''}
        </span>
        <span className="text-[11px] text-[#9AA6B4]">vs target</span>
      </div>
    </motion.div>
  )
}
