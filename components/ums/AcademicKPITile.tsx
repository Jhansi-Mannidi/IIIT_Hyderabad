'use client'

import { TrendingUp, TrendingDown, Zap } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

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
  sparkline,
  unit,
  derived,
}: AcademicKPITileProps) {
  const isPositive = delta >= 0
  const sparkData = sparkline.map((v, i) => ({ x: i, y: v }))

  return (
    <div className="bg-white border border-[#E8EEF5] rounded-[10px] p-4 flex flex-col justify-between h-full hover:border-[#2E8B8B] transition-colors">
      {/* Label + Derived Badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#6B7C99]">{label}</span>
        {derived && (
          <span className="text-[10px] bg-[#E8F5F5] text-[#2E8B8B] px-2 py-0.5 rounded font-semibold">
            [Derived]
          </span>
        )}
      </div>

      {/* Value + Unit */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-tabular-nums font-bold text-[#1F3864]">{value}</span>
        {unit && <span className="text-xs text-[#6B7C99]">{unit}</span>}
      </div>

      {/* Sparkline + Delta Chip */}
      <div className="flex items-end justify-between gap-2">
        <div className="flex-1 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="monotone"
                dataKey="y"
                stroke={isPositive ? '#2E8B8B' : '#C55A11'}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Delta Chip */}
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
    </div>
  )
}
