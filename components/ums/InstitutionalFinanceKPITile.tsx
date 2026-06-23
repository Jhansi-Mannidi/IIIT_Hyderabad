'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

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
    <div className="flex flex-col gap-3 p-4 rounded-[12px] bg-white border border-[#E5ECEF]">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[11px] font-[600] text-[#5A6B7A] uppercase tracking-wide">{label}</p>
            {isDerived && (
              <span className="px-1.5 py-0.5 rounded-[4px] bg-[#EEF2F8] text-[9px] font-[600] text-[#1F3864]">
                [Derived]
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
    </div>
  )
}
