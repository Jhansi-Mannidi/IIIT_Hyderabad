'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
import { Activity, Sparkles, TrendingUp } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { HealthRibbonPoint } from '@/lib/useExecutiveCockpitData'
import { VIZ } from '@/lib/tokens'

const TOOLTIP_STYLE = {
  backgroundColor: '#14223D',
  border: 'none',
  borderRadius: 8,
  color: '#EEF2F8',
  fontSize: 12,
  boxShadow: '0 4px 16px rgba(15,23,34,0.18)',
}

function RibbonTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={TOOLTIP_STYLE} className="px-3 py-2 min-w-[200px]">
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

interface HealthRibbonProps {
  data: HealthRibbonPoint[]
}

export function HealthRibbon({ data }: HealthRibbonProps) {
  const shouldReduceMotion = useReducedMotion()
  const first = data[0]
  const latest = data[data.length - 1]
  const enrollmentGrowth = first ? ((latest.enrollment - first.enrollment) / first.enrollment) * 100 : 0
  const feeGain = first ? latest.feeCollection - first.feeCollection : 0
  const placementGain = first ? latest.placementRate - first.placementRate : 0
  const healthScore = Math.round((latest.feeCollection + latest.placementRate + Math.min(100, (latest.enrollment / 5000) * 100)) / 3)
  const summary = [
    {
      label: 'Composite Health',
      value: `${healthScore}/100`,
      detail: 'executive score',
      color: '#1F3864',
    },
    {
      label: 'Enrollment Growth',
      value: `+${enrollmentGrowth.toFixed(1)}%`,
      detail: `${latest.enrollment.toLocaleString('en-IN')} students`,
      color: VIZ.teal,
    },
    {
      label: 'Fee Collection',
      value: `${latest.feeCollection.toFixed(1)}%`,
      detail: `+${feeGain.toFixed(1)} pts in 5 years`,
      color: VIZ.orange,
    },
    {
      label: 'Placement Rate',
      value: `${latest.placementRate.toFixed(1)}%`,
      detail: `+${placementGain.toFixed(1)} pts trajectory`,
      color: VIZ.coral,
    },
  ]

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-[22px] border border-[#D8E0EE] bg-white p-5 shadow-[0_22px_60px_rgba(31,56,100,0.10)]"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(46,139,139,0.13),transparent_18rem),linear-gradient(135deg,rgba(31,56,100,0.045),transparent_45%)]" />

      <div className="relative mb-4 flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[15px] bg-[#E8F5F5] text-[#2E8B8B] shadow-[0_12px_24px_rgba(46,139,139,0.16)]">
          <Activity size={21} />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-[16px] font-[850] tracking-[-0.03em] text-[#0F1722]">
              Institutional Health Command Ribbon
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#C55A11]/20 bg-[#FFF4ED] px-2 py-0.5 text-[10px] font-[850] uppercase tracking-[0.06em] text-[#C55A11]">
              <Sparkles size={11} />
              5-Year Signal
            </span>
          </div>
          <p className="mt-1 max-w-3xl text-[12px] font-[550] leading-5 text-[#617588]">
            Enrollment scale, fee discipline, and placement outcomes in one executive trend view.
            Hover the ribbon to inspect inflection points and policy thresholds.
          </p>
        </div>
      </div>

      <div className="relative rounded-[18px] border border-[#E5ECEF] bg-gradient-to-b from-white to-[#F7FAFD] px-3 py-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 14, right: 24, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="4 6" stroke="#D9E1ED" vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fill: '#9AA6B4', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: '#9AA6B4', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[3500, 5000]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: '#9AA6B4', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[60, 95]}
          />
          <Tooltip content={<RibbonTooltip />} />
          
          {/* Enrollment (left axis, teal) */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="enrollment"
            stroke={VIZ.teal}
            strokeWidth={3.2}
            dot={{ fill: VIZ.teal, r: 4.5, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 7, strokeWidth: 2, stroke: '#FFFFFF' }}
            name="Enrollment"
            isAnimationActive={false}
          />

          {/* Fee Collection % (right axis, orange) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="feeCollection"
            stroke={VIZ.orange}
            strokeWidth={3.2}
            dot={{ fill: VIZ.orange, r: 4.5, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 7, strokeWidth: 2, stroke: '#FFFFFF' }}
            name="Fee Collection %"
            isAnimationActive={false}
          />

          {/* Placement Rate % (right axis, coral) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="placementRate"
            stroke={VIZ.coral}
            strokeWidth={3.2}
            dot={{ fill: VIZ.coral, r: 4.5, strokeWidth: 2, stroke: '#FFFFFF' }}
            activeDot={{ r: 7, strokeWidth: 2, stroke: '#FFFFFF' }}
            name="Placement Rate %"
            isAnimationActive={false}
          />

          {/* Reference lines for targets/policy minimums */}
          <ReferenceLine yAxisId="right" y={85} stroke="#D9E1ED" strokeDasharray="3" label={{ value: '85% policy min', position: 'right', fill: '#9AA6B4', fontSize: 10 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>

      <div className="relative mt-3 grid grid-cols-2 gap-2 rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD]/90 p-3 sm:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="min-w-0 border-l-2 pl-2.5" style={{ borderColor: item.color }}>
            <p className="truncate text-[9.5px] font-[850] uppercase tracking-[0.07em] text-[#9AA6B4]">{item.label}</p>
            <p className="mt-1 truncate text-[14px] font-[900] tracking-[-0.03em] tabular-nums" style={{ color: item.color }}>
              {item.value}
            </p>
            <p className="mt-0.5 truncate text-[10px] font-[650] text-[#6B7C99]">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Annotations for inflection points */}
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
