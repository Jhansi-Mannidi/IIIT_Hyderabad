'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

interface AcademicKPITileProps {
  label: string
  value: string | number
  delta: number
  sparkline: number[]
  unit?: string
  derived?: boolean
}

export function AcademicKPITile({
  label,
  value,
  delta,
  unit,
  derived,
}: AcademicKPITileProps) {
  const isPositive = delta >= 0
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="bg-white border border-[#E8EEF5] rounded-[10px] p-4 flex flex-col justify-between h-full hover:border-[#2E8B8B] transition-colors"
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Label + Derived Badge */}
      <div className="mb-2 flex min-w-0 items-center justify-between gap-2">
        <span title={label} className="min-w-0 flex-1 truncate text-xs font-medium text-[#6B7C99]">
          {label}
        </span>
        {derived && (
          <span className="max-w-[54px] flex-shrink-0 truncate text-[9px] bg-[#E8F5F5] text-[#2E8B8B] px-1.5 py-0.5 rounded font-bold" title="Derived">
            Calc
          </span>
        )}
      </div>

      {/* Value + Unit */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-tabular-nums font-bold text-[#1F3864]">{value}</span>
        {unit && <span className="text-xs text-[#6B7C99]">{unit}</span>}
      </div>

      {/* Delta Chip */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex-1" />
        <div
          className={`px-2 py-1 rounded-[6px] flex items-center gap-1 text-xs font-semibold min-w-fit ${
            isPositive
              ? 'bg-[#E8F5F5] text-[#2E8B8B]'
              : 'bg-[#FFF4ED] text-[#C55A11]'
          }`}
        >
          {isPositive ? (
            <TrendingUp size={12} />
          ) : (
            <TrendingDown size={12} />
          )}
          {Math.abs(delta)}
          {delta < 0 ? '' : '+'}
        </div>
      </div>
    </motion.div>
  )
}
