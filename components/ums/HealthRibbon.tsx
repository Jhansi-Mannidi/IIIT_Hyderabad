'use client'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Activity, ArrowUpRight, BadgeCheck, Sparkles, TrendingUp } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { HealthRibbonPoint } from '@/lib/useExecutiveCockpitData'
import { VIZ } from '@/lib/tokens'
import { cn } from '@/lib/utils'
import { useTheme } from './ThemeProvider'

const TOOLTIP_STYLE = {
  backgroundColor: '#14223D',
  border: 'none',
  borderRadius: 8,
  color: '#EEF2F8',
  fontSize: 12,
  boxShadow: '0 4px 16px rgba(15,23,34,0.18)',
}

function HealthTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={TOOLTIP_STYLE} className="px-3 py-2 min-w-[190px]">
      <p className="text-[11px] font-[600] text-[#D8E0EE] mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-6 text-[11px] mb-1">
          <span style={{ color: p.color }} className="font-[500]">{p.name}</span>
          <span className="tabular-nums font-[600] text-white">
            {p.dataKey === 'enrollment' ? `${Math.round(p.value).toLocaleString('en-IN')}` : `${p.value.toFixed(1)}%`}
          </span>
        </div>
      ))}
    </div>
  )
}

function clampPercent(value: number) {
  return Math.min(100, Math.max(0, value))
}

interface HealthRibbonProps {
  data: HealthRibbonPoint[]
}

export function HealthRibbon({ data }: HealthRibbonProps) {
  const shouldReduceMotion = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const first = data[0]
  const latest = data[data.length - 1]
  const enrollmentGrowth = first ? ((latest.enrollment - first.enrollment) / first.enrollment) * 100 : 0
  const feeGain = first ? latest.feeCollection - first.feeCollection : 0
  const placementGain = first ? latest.placementRate - first.placementRate : 0
  const healthScore = Math.round((latest.feeCollection + latest.placementRate + Math.min(100, (latest.enrollment / 5000) * 100)) / 3)
  const scoreDash = `${clampPercent(healthScore) * 2.64} ${264 - clampPercent(healthScore) * 2.64}`
  const normalizedData = data.map((point) => ({
    ...point,
    enrollmentIndex: Math.min(100, (point.enrollment / 5000) * 100),
  }))
  const mobileChart = {
    width: 320,
    height: 170,
    left: 28,
    right: 14,
    top: 18,
    bottom: 28,
  }
  const mobilePlotWidth = mobileChart.width - mobileChart.left - mobileChart.right
  const mobilePlotHeight = mobileChart.height - mobileChart.top - mobileChart.bottom
  const getMobilePoint = (value: number, index: number) => {
    const x =
      mobileChart.left +
      (normalizedData.length > 1 ? (index / (normalizedData.length - 1)) * mobilePlotWidth : mobilePlotWidth / 2)
    const y = mobileChart.top + ((100 - clampPercent(value)) / 40) * mobilePlotHeight
    return `${x},${y}`
  }
  const mobileSeries = {
    enrollment: normalizedData.map((point, index) => getMobilePoint(point.enrollmentIndex, index)).join(' '),
    fee: normalizedData.map((point, index) => getMobilePoint(point.feeCollection, index)).join(' '),
    placement: normalizedData.map((point, index) => getMobilePoint(point.placementRate, index)).join(' '),
  }
  const summary = [
    {
      label: 'Enrollment',
      value: `+${enrollmentGrowth.toFixed(1)}%`,
      detail: `${latest.enrollment.toLocaleString('en-IN')} students`,
      color: VIZ.teal,
      progress: Math.min(100, (latest.enrollment / 5000) * 100),
    },
    {
      label: 'Fee Collection',
      value: `${latest.feeCollection.toFixed(1)}%`,
      detail: `+${feeGain.toFixed(1)} pts over baseline`,
      color: VIZ.orange,
      progress: latest.feeCollection,
    },
    {
      label: 'Placements',
      value: `${latest.placementRate.toFixed(1)}%`,
      detail: `+${placementGain.toFixed(1)} pts trajectory`,
      color: VIZ.coral,
      progress: latest.placementRate,
    },
  ]

  return (
    <motion.div
      className="executive-plain-card relative w-full overflow-hidden rounded-[24px] border border-[#D8E0EE] bg-white p-5 shadow-[0_24px_70px_rgba(31,56,100,0.11)]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(46,139,139,0.14),transparent_20rem),radial-gradient(circle_at_92%_10%,rgba(197,90,17,0.10),transparent_18rem),linear-gradient(135deg,rgba(31,56,100,0.055),transparent_46%)]" />

      <div className="relative mb-4 flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[15px] bg-[#E8F5F5] text-[#2E8B8B] shadow-[0_12px_24px_rgba(46,139,139,0.16)]">
          <Activity size={21} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-[850] tracking-[-0.03em] text-[#0F1722]">
              Institutional Health Intelligence
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#C55A11]/20 bg-[#FFF4ED] px-2 py-0.5 text-[10px] font-[850] uppercase tracking-[0.06em] text-[#C55A11]">
              <Sparkles size={11} />
              Executive View
            </span>
          </div>
          <p className="mt-1 max-w-3xl text-[12px] font-[550] leading-5 text-[#617588]">
            A clean score-led view of enrollment momentum, fee discipline, and placement outcomes.
          </p>
        </div>
      </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D8E0EE] bg-white/80 px-3 py-1.5 text-[11px] font-[850] text-[#1F3864] shadow-[0_12px_26px_rgba(31,56,100,0.08)]">
          <BadgeCheck size={13} className="text-[#2E8B8B]" />
          {data[0]?.year} - {latest.year}
        </div>
      </div>

      <div className="relative grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div
          className={cn(
            'relative overflow-hidden rounded-[20px] border p-4 shadow-[0_18px_45px_rgba(31,56,100,0.18)]',
            isDark
              ? 'border-[#1F3864]/70 bg-[#0F2038] text-white'
              : 'border-[#D8E0EE] bg-gradient-to-br from-white via-[#F7FBFB] to-[#EEF7F7] text-[#0F1722]',
          )}
        >
          <div
            className={cn(
              'pointer-events-none absolute inset-0',
              isDark
                ? 'bg-[radial-gradient(circle_at_20%_10%,rgba(127,189,189,0.36),transparent_12rem),linear-gradient(145deg,rgba(255,255,255,0.10),transparent_44%)]'
                : 'bg-[radial-gradient(circle_at_20%_10%,rgba(46,139,139,0.18),transparent_12rem),linear-gradient(145deg,rgba(255,255,255,0.72),transparent_44%)]',
            )}
          />
          <div className="relative flex items-center justify-between">
            <span
              className={cn(
                'text-[10px] font-[850] uppercase tracking-[0.12em]',
                isDark ? 'text-[#BFD7D7]' : 'text-[#547A83]',
              )}
            >
              Composite Health
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-[850]',
                isDark ? 'bg-white/10 text-[#DFF5F5]' : 'bg-[#E8F5F5] text-[#1F6F6F]',
              )}
            >
              <ArrowUpRight size={11} />
              Strong
            </span>
          </div>
          <div className="relative mt-4 flex items-center justify-center">
            <svg viewBox="0 0 112 112" className="h-36 w-36 -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="42"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.16)' : 'rgba(46,139,139,0.15)'}
                strokeWidth="10"
              />
              <motion.circle
                cx="56"
                cy="56"
                r="42"
                fill="none"
                stroke={isDark ? '#7FBDBD' : '#2E8B8B'}
                strokeLinecap="round"
                strokeWidth="10"
                strokeDasharray={scoreDash}
                initial={shouldReduceMotion ? false : { strokeDasharray: `0 264` }}
                whileInView={{ strokeDasharray: scoreDash }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-[34px] font-[950] tracking-[-0.08em] tabular-nums">{healthScore}</p>
              <p
                className={cn(
                  'text-[10px] font-[800] uppercase tracking-[0.12em]',
                  isDark ? 'text-[#BFD7D7]' : 'text-[#547A83]',
                )}
              >
                / 100
              </p>
            </div>
          </div>
          <p
            className={cn(
              'relative mt-2 text-center text-[11px] font-[650] leading-5',
              isDark ? 'text-[#D8E8EE]' : 'text-[#50697A]',
            )}
          >
            Momentum is above the policy baseline with balanced growth across key operating signals.
          </p>
        </div>

        <div className="min-w-0 rounded-[20px] border border-[#E5ECEF] bg-gradient-to-b from-white to-[#F7FAFD] p-3">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2 px-1">
            <p className="text-[11px] font-[850] uppercase tracking-[0.08em] text-[#6B7C99]">5-Year Performance Index</p>
            <div className="flex flex-wrap gap-2 text-[10px] font-[800] text-[#617588]">
              <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#2E8B8B]" />Enrollment index</span>
              <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#C55A11]" />Fee</span>
              <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-[#B85C7A]" />Placement</span>
            </div>
          </div>
          <div className="md:hidden">
            <svg viewBox={`0 0 ${mobileChart.width} ${mobileChart.height}`} className="h-52 w-full overflow-visible">
              {[60, 70, 80, 90, 100].map((tick) => {
                const y = mobileChart.top + ((100 - tick) / 40) * mobilePlotHeight

                return (
                  <g key={tick}>
                    <line
                      x1={mobileChart.left}
                      x2={mobileChart.width - mobileChart.right}
                      y1={y}
                      y2={y}
                      stroke="#D9E1ED"
                      strokeDasharray="4 8"
                    />
                    <text x={mobileChart.left - 8} y={y + 4} textAnchor="end" className="fill-[#9AA6B4] text-[10px] font-[700]">
                      {tick}
                    </text>
                  </g>
                )
              })}
              <polyline points={mobileSeries.enrollment} fill="none" stroke={VIZ.teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points={mobileSeries.fee} fill="none" stroke={VIZ.orange} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points={mobileSeries.placement} fill="none" stroke={VIZ.coral} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {normalizedData.map((point, index) => {
                const x =
                  mobileChart.left +
                  (normalizedData.length > 1 ? (index / (normalizedData.length - 1)) * mobilePlotWidth : mobilePlotWidth / 2)

                return (
                  <g key={point.year}>
                    <text
                      x={x}
                      y={mobileChart.height - 8}
                      textAnchor="middle"
                      className="fill-[#9AA6B4] text-[10px] font-[700]"
                    >
                      {point.year}
                    </text>
                    {[
                      { value: point.enrollmentIndex, color: VIZ.teal },
                      { value: point.feeCollection, color: VIZ.orange },
                      { value: point.placementRate, color: VIZ.coral },
                    ].map((dot) => {
                      const y = mobileChart.top + ((100 - clampPercent(dot.value)) / 40) * mobilePlotHeight

                      return <circle key={`${point.year}-${dot.color}`} cx={x} cy={y} r="3.5" fill={dot.color} stroke="white" strokeWidth="2" />
                    })}
                  </g>
                )
              })}
            </svg>
          </div>
          <div className="ums-analytics-chart-frame hidden h-[258px] min-w-0 md:block">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={240} debounce={80}>
            <AreaChart data={normalizedData} margin={{ top: 10, right: 12, left: -20, bottom: 4 }}>
              <defs>
                <linearGradient id="healthEnrollment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={VIZ.teal} stopOpacity={0.26} />
                  <stop offset="100%" stopColor={VIZ.teal} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="healthFee" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={VIZ.orange} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={VIZ.orange} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="healthPlacement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={VIZ.coral} stopOpacity={0.20} />
                  <stop offset="100%" stopColor={VIZ.coral} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 8" stroke="#D9E1ED" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: '#9AA6B4', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fill: '#9AA6B4', fontSize: 11 }} axisLine={false} tickLine={false} width={42} />
              <Tooltip content={<HealthTooltip />} />
              <Area
                type="monotone"
                dataKey="enrollmentIndex"
                name="Enrollment"
                stroke={VIZ.teal}
                fill="url(#healthEnrollment)"
                strokeWidth={3}
                dot={{ fill: VIZ.teal, r: 3.8, strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF' }}
              />
              <Area
                type="monotone"
                dataKey="feeCollection"
                name="Fee Collection %"
                stroke={VIZ.orange}
                fill="url(#healthFee)"
                strokeWidth={3}
                dot={{ fill: VIZ.orange, r: 3.8, strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF' }}
              />
              <Area
                type="monotone"
                dataKey="placementRate"
                name="Placement Rate %"
                stroke={VIZ.coral}
                fill="url(#healthPlacement)"
                strokeWidth={3}
                dot={{ fill: VIZ.coral, r: 3.8, strokeWidth: 2, stroke: '#FFFFFF' }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#FFFFFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="relative mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {summary.map((item) => (
          <div key={item.label} className="min-w-0 rounded-[16px] border border-[#E5ECEF] bg-[#F8FAFD]/90 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[9.5px] font-[850] uppercase tracking-[0.07em] text-[#9AA6B4]">{item.label}</p>
                <p className="mt-1 truncate text-[16px] font-[950] tracking-[-0.04em] tabular-nums" style={{ color: item.color }}>
                  {item.value}
                </p>
              </div>
              <TrendingUp size={16} style={{ color: item.color }} />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5ECEF]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={shouldReduceMotion ? false : { width: 0 }}
                whileInView={{ width: `${clampPercent(item.progress)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="mt-2 truncate text-[10.5px] font-[650] text-[#6B7C99]">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2 text-[11px]">
        {data.map((point) => point.annotation ? (
          <div key={point.year} className="inline-flex items-center gap-2 rounded-full border border-[#D9E1ED] bg-white px-3 py-1.5 text-[#1A2D47] shadow-[0_8px_22px_rgba(31,56,100,0.06)]">
            <TrendingUp size={12} className="text-[#2E8B8B]" />
            <span className="font-[800]">{point.annotation}</span>
          </div>
        ) : null)}
      </div>
    </motion.div>
  )
}
