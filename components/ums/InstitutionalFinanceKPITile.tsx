'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { motion, useReducedMotion } from 'framer-motion'

interface InstitutionalFinanceKPITileProps {
  id: string
  label: string
  value: number
  target?: number
  delta: number
  isDerived?: boolean
  currency?: boolean
  percentage?: boolean
}

export function InstitutionalFinanceKPITile({
  id,
  label,
  value,
  target,
  delta,
  isDerived = false,
  currency = true,
  percentage = false,
}: InstitutionalFinanceKPITileProps) {
  const isPositive = delta >= 0
  const shouldReduceMotion = useReducedMotion()
  const sparkData = Array.from({ length: 6 }, (_, i) => ({
    value: Math.max(value * 0.8 + Math.random() * value * 0.4, 0),
  }))

  const formatValue = () => {
    if (percentage) return `${value.toFixed(1)}%`
    if (currency) {
      if (value >= 10000) return `₹${(value / 10000).toFixed(1)}L`
      if (value >= 100) return `₹${value.toLocaleString('en-IN')}`
      return `₹${value}`
    }
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
          <p className="font-['Courier'] text-[20px] font-[700] text-[#0F1722]">{formatValue()}</p>
        </div>
        {target && (
          <div className="text-right">
            <p className="text-[10px] text-[#9AA6B4]">Target</p>
            <p className="font-['Courier'] text-[13px] font-[600] text-[#5A6B7A]">
              {currency ? `₹${(target / 10000).toFixed(1)}L` : target.toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>

      <div className="h-8 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? '#2E8B8B' : '#E74C3C'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
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
          {isPositive ? '+' : ''}{delta.toFixed(1)}{percentage ? '%' : 'L'}
        </span>
        <span className="text-[11px] text-[#9AA6B4]">vs target</span>
      </div>
    </motion.div>
  )
}
