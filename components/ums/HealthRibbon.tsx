'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
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
  return (
    <div className="w-full bg-gradient-to-b from-[#F5F7FB] to-[#EAEEF6] rounded-lg p-6 border border-[#E0E6F2]">
      <div className="mb-4">
        <h3 className="text-sm font-[700] text-[#1A2D47] flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-[#2E8B8B] to-[#1C5A5A] rounded-full"></span>
          Institutional Health — 5-Year Trend
        </h3>
        <p className="text-[11px] text-[#617588] mt-1">
          Enrollment (left), Fee Collection % (center), Placement Rate % (right) — hover to see inflection points
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 12, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="4" stroke="#D9E1ED" vertical={false} />
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
            strokeWidth={3}
            dot={{ fill: VIZ.teal, r: 4 }}
            activeDot={{ r: 6 }}
            name="Enrollment"
            isAnimationActive={false}
          />

          {/* Fee Collection % (right axis, orange) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="feeCollection"
            stroke={VIZ.orange}
            strokeWidth={3}
            dot={{ fill: VIZ.orange, r: 4 }}
            activeDot={{ r: 6 }}
            name="Fee Collection %"
            isAnimationActive={false}
          />

          {/* Placement Rate % (right axis, coral) */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="placementRate"
            stroke={VIZ.coral}
            strokeWidth={3}
            dot={{ fill: VIZ.coral, r: 4 }}
            activeDot={{ r: 6 }}
            name="Placement Rate %"
            isAnimationActive={false}
          />

          {/* Reference lines for targets/policy minimums */}
          <ReferenceLine yAxisId="right" y={85} stroke="#D9E1ED" strokeDasharray="3" label={{ value: '85% policy min', position: 'right', fill: '#9AA6B4', fontSize: 10 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* Annotations for inflection points */}
      <div className="mt-4 flex gap-4 text-[11px]">
        {data.map((point) => point.annotation ? (
          <div key={point.year} className="px-2.5 py-1.5 bg-white border border-[#D9E1ED] rounded flex items-center gap-1.5 text-[#1A2D47]">
            <span className="font-[600]">{point.annotation}</span>
          </div>
        ) : null)}
      </div>
    </div>
  )
}
