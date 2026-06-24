'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { PlacementsKPI } from '@/lib/usePlacementsData'
import { motion, useReducedMotion } from 'framer-motion'

interface PlacementsKPITileProps {
  kpi: PlacementsKPI
}

function formatValue(kpi: PlacementsKPI): string {
  if (kpi.format === 'percent') return `${(kpi.value as number).toFixed(1)}%`
  if (kpi.format === 'lpa')     return `${(kpi.value as number).toFixed(1)} LPA`
  if (kpi.format === 'count')   return (kpi.value as number).toLocaleString('en-IN')
  return String(kpi.value)
}

export function PlacementsKPITile({ kpi }: PlacementsKPITileProps) {
  const hasDelta   = kpi.delta !== undefined && kpi.delta !== 0
  const isPositive = (kpi.delta ?? 0) >= 0
  const shouldReduceMotion = useReducedMotion()

  // For "not placed", fewer is better — invert the color logic
  const isGood = kpi.id === 'students-not-placed' ? !isPositive : isPositive

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
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex min-w-0 items-center gap-1.5">
            <p title={kpi.label} className="min-w-0 flex-1 truncate text-[11px] font-[700] text-[#5A6B7A] uppercase tracking-wide leading-tight">
              {kpi.label}
            </p>
            {kpi.isDerived && (
              <span className="max-w-[54px] flex-shrink-0 truncate px-1.5 py-0.5 rounded-[4px] bg-[#EEF2F8] text-[9px] font-[800] text-[#1F3864]" title="Derived">
                Calc
              </span>
            )}
          </div>
          <p className="font-['Courier_New',_monospace] text-[16px] font-[650] text-[#0F1722] leading-none">
            {formatValue(kpi)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        {kpi.sub && (
          <span className="text-[11px] text-[#9AA6B4] truncate">{kpi.sub}</span>
        )}
        {hasDelta && (
          <div className="flex items-center gap-1 flex-shrink-0">
            {isGood
              ? <TrendingUp  size={12} className="text-[#27AE60]" />
              : <TrendingDown size={12} className="text-[#E74C3C]" />}
            <span className={`text-[11px] font-[600] font-['Courier_New',_monospace] ${isGood ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
              {isPositive ? '+' : ''}{(kpi.delta as number).toFixed(1)}
              {kpi.format === 'percent' ? 'pp' : ''}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
