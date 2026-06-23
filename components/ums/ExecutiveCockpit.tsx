'use client'
import { useState, useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell,
  PieChart,
  Pie,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts'
import { ChevronRight, Sparkles, PanelRightClose, PanelRightOpen, RefreshCw } from 'lucide-react'
import { useExecutiveCockpitData } from '@/lib/useExecutiveCockpitData'
import { KPITile } from './KPITile'
import { ChartCard } from './ChartCard'
import { AIInsightCard } from './AIInsightCard'
import { DomainHealthGrid } from './DomainHealthGrid'
import { SkeletonDashboard } from './SkeletonDashboard'
import { HealthRibbon } from './HealthRibbon'
import { DeptHealthStrip } from './DeptHealthStrip'
import { MoversTable } from './MoversTable'
import { VIZ, INK, SURFACE } from '@/lib/tokens'
import { cn } from '@/lib/utils'

// ── Tooltip style ─────────────────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  backgroundColor: '#14223D',
  border: 'none',
  borderRadius: 8,
  color: '#EEF2F8',
  fontSize: 12,
  boxShadow: '0 4px 16px rgba(15,23,34,0.18)',
}

const TICK_STYLE = { fill: '#9AA6B4', fontSize: 11 }

function formatLakh(v: number) {
  if (v >= 100) return `₹${(v / 100).toFixed(1)}Cr`
  return `₹${v.toFixed(0)}L`
}

// ── Custom tooltip for trend chart ───────────────────────────────────────────
function TrendTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={TOOLTIP_STYLE} className="px-3 py-2 min-w-[140px]">
      <p className="text-[11px] font-[600] text-[#D8E0EE] mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 text-[11px]">
          <span style={{ color: p.color }}>{p.name}</span>
          <span className="tabular-nums font-[500] text-white">
            {p.dataKey === 'revenue' || p.dataKey === 'expenditure'
              ? formatLakh(p.value)
              : p.dataKey === 'passRate' || p.dataKey === 'attendance'
              ? `${p.value.toFixed(1)}%`
              : p.value.toLocaleString('en-IN')}
          </span>
        </div>
      ))}
    </div>
  )
}

function FunnelTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div style={TOOLTIP_STYLE} className="px-3 py-2">
      <p className="text-[12px] font-[600] text-white">{d.stage}</p>
      <p className="text-[11px] text-[#D8E0EE] tabular-nums">{d.count} students</p>
      <p className="text-[11px] text-[#7FBDBD] tabular-nums">{d.rate.toFixed(1)}% of eligible</p>
    </div>
  )
}

// ── Derived badge ─────────────────────────────────────────────────────────────
function DerivedBadge() {
  return (
    <span className="text-[9.5px] font-[600] px-1.5 py-0.5 rounded-full border border-[#2E8B8B]/30 text-[#246B6B] bg-[#E7F2F2]">
      Derived
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function ExecutiveCockpit() {
  const { data, loading } = useExecutiveCockpitData()
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([])
  const [railOpen, setRailOpen] = useState(true)

  const visibleInsights = useMemo(
    () => (data?.aiInsights ?? []).filter((i) => !dismissedInsights.includes(i.id)),
    [data, dismissedInsights],
  )

  if (loading) return <SkeletonDashboard />
  if (!data) return null

  const { kpis, trendSeries, domainHealth, placementFunnel, scholarshipDist, revenueBreakdown, programEnrollment, facultyLoad, lastUpdated } = data

  // Enrollment fill% for bar chart
  const enrollmentFill = programEnrollment.map((p) => ({
    ...p,
    fill: (p.students / p.capacity) * 100,
  }))

  // Faculty data for stacked bar
  const facultyData = facultyLoad.map((f) => ({
    dept: f.department,
    'Full-time': f.fullTime,
    Contractual: f.contractual,
    'Avg Load (hrs)': f.avgLoad,
  }))

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 min-w-0">

        {/* ── Section label ── */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-[700] text-[#0F1722]">Executive Cockpit</h2>
            <p className="text-[12px] text-[#9AA6B4] mt-0.5">
              AY 2024-25 · All Programs · Updated {lastUpdated}
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 text-[12px] text-[#5A6675] hover:text-[#1F3864] transition-colors"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>

        {/* ── KPI strip ── */}
        <section aria-label="Key performance indicators">
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
            {kpis.map((kpi) => (
              <KPITile key={kpi.id} metric={kpi} />
            ))}
          </div>
        </section>

        {/* ── SIGNATURE: Institutional Health Ribbon + Department Heat-Strip ── */}
        <section aria-label="Health ribbon and department strip" className="space-y-4">
          <HealthRibbon data={data.healthRibbon} />
          <DeptHealthStrip data={data.deptHealthStrip} />
        </section>

        {/* ── Top Movers Table ── */}
        <section aria-label="Top movers" className="mt-4">
          <MoversTable data={data.movers} />
        </section>

        {/* ── Trend + Revenue donut ── */}
        <section aria-label="Institutional trends" className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard
            title="Enrollment & Financial Trend"
            subtitle="Monthly AY 2024-25 — Enrollment vs Revenue vs Expenditure"
            tooltip="Enrollment drawn from student_master. Revenue/Expenditure from budget_master monthly actuals."
            sourceTable="student_master · budget_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
            className="lg:col-span-2"
          >
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendSeries} margin={{ top: 6, right: 12, bottom: 0, left: 0 }}>
                  <CartesianGrid stroke={SURFACE.line} strokeWidth={0.6} vertical={false} />
                  <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    yAxisId="students"
                    tick={TICK_STYLE}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
                    width={38}
                  />
                  <YAxis
                    yAxisId="money"
                    orientation="right"
                    tick={TICK_STYLE}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v}L`}
                    width={46}
                  />
                  <Tooltip content={<TrendTooltip />} cursor={{ stroke: '#D8E0EE', strokeWidth: 1 }} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11, color: INK[500] }}
                  />
                  <Line
                    yAxisId="students"
                    type="monotone"
                    dataKey="enrollment"
                    name="Enrollment"
                    stroke={VIZ[0]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    yAxisId="students"
                    type="monotone"
                    dataKey="target"
                    name="Enroll. Target"
                    stroke={VIZ[0]}
                    strokeWidth={1.2}
                    strokeDasharray="4 3"
                    dot={false}
                    opacity={0.45}
                  />
                  <Line
                    yAxisId="money"
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue (₹L)"
                    stroke={VIZ[1]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    yAxisId="money"
                    type="monotone"
                    dataKey="expenditure"
                    name="Expenditure (₹L)"
                    stroke={VIZ[2]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Revenue Mix"
            subtitle="Fee collection by source category"
            tooltip="Fee collection from fee_master grouped by fee category. Hostel from hostel_charges."
            sourceTable="fee_master · hostel_charges"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <div className="h-52 flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      dataKey="amount"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      innerRadius="52%"
                      outerRadius="75%"
                      paddingAngle={2}
                      strokeWidth={0}
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={entry.source} fill={VIZ[index % VIZ.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(v: number) => [formatLakh(v), 'Amount']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 pb-1">
                {revenueBreakdown.map((r, i) => (
                  <div key={r.source} className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: VIZ[i % VIZ.length] }}
                    />
                    <span className="text-[10.5px] text-[#5A6675]">{r.source}</span>
                    <span className="text-[10.5px] font-[600] tabular-nums text-[#0F1722]">
                      {r.pct.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </section>

        {/* ── Attendance + Pass Rate area ── */}
        <section aria-label="Academic health trends" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard
            title="Attendance Trend"
            subtitle="Monthly average % across all departments"
            tooltip="Derived from attendance_master grouped by month. Policy minimum is 85%."
            sourceTable="attendance_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendSeries} margin={{ top: 6, right: 8, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={VIZ[1]} stopOpacity={0.22} />
                      <stop offset="100%" stopColor={VIZ[1]} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={SURFACE.line} strokeWidth={0.6} vertical={false} />
                  <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={TICK_STYLE}
                    domain={[72, 92]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    width={36}
                  />
                  <ReferenceLine
                    y={85}
                    stroke={VIZ[2]}
                    strokeWidth={1}
                    strokeDasharray="4 3"
                    label={{ value: 'Policy 85%', position: 'insideTopRight', fontSize: 10, fill: VIZ[2] }}
                  />
                  <Tooltip content={<TrendTooltip />} cursor={{ stroke: '#D8E0EE', strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    name="Attendance"
                    stroke={VIZ[1]}
                    strokeWidth={2}
                    fill="url(#attendGrad)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Pass Rate Trend"
            subtitle="Overall semester pass % — AY 2024-25"
            tooltip="Pass rate = students who cleared ≥75% of their subjects / total appeared. NAAC benchmark: 90%."
            sourceTable="examination_results · student_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendSeries} margin={{ top: 6, right: 8, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={VIZ[0]} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={VIZ[0]} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={SURFACE.line} strokeWidth={0.6} vertical={false} />
                  <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={TICK_STYLE}
                    domain={[78, 95]}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    width={36}
                  />
                  <ReferenceLine
                    y={90}
                    stroke={VIZ[2]}
                    strokeWidth={1}
                    strokeDasharray="4 3"
                    label={{ value: 'NAAC 90%', position: 'insideTopRight', fontSize: 10, fill: VIZ[2] }}
                  />
                  <Tooltip content={<TrendTooltip />} cursor={{ stroke: '#D8E0EE', strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="passRate"
                    name="Pass Rate"
                    stroke={VIZ[0]}
                    strokeWidth={2}
                    fill="url(#passGrad)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* ── Domain Health ── */}
        <section aria-labelledby="domain-health-heading">
          <div className="flex items-center gap-2 mb-3">
            <h3 id="domain-health-heading" className="text-[13px] font-[700] text-[#0F1722] uppercase tracking-[0.04em]">
              Domain Health Overview
            </h3>
            <div className="flex items-center gap-2 ml-2">
              {[
                { label: 'Healthy', color: '#2E8B8B' },
                { label: 'Attention', color: '#C55A11' },
                { label: 'Critical', color: '#C0392B' },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-1 text-[10.5px] text-[#9AA6B4]">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
          <DomainHealthGrid domains={domainHealth} />
        </section>

        {/* ── Placement Funnel + Program Enrollment ── */}
        <section aria-label="Placements and enrollment" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard
            title="Placement Funnel"
            subtitle="Current batch: eligible → accepted offer"
            tooltip="Funnel drawn from placement_register table. Eligible = final-year students. Rate vs eligible."
            sourceTable="placement_register"
            updatedAt={lastUpdated}
          >
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={placementFunnel}
                  layout="vertical"
                  margin={{ top: 4, right: 48, bottom: 4, left: 72 }}
                  barSize={14}
                >
                  <CartesianGrid stroke={SURFACE.line} strokeWidth={0.6} horizontal={false} />
                  <XAxis type="number" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="stage"
                    tick={{ fill: INK[500], fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={68}
                  />
                  <Tooltip content={<FunnelTooltip />} cursor={{ fill: 'rgba(31,56,100,0.04)' }} />
                  <Bar dataKey="count" name="Students" radius={[0, 4, 4, 0]}>
                    {placementFunnel.map((entry, index) => (
                      <Cell
                        key={entry.stage}
                        fill={VIZ[0]}
                        opacity={1 - index * 0.1}
                      />
                    ))}
                    <LabelList
                      dataKey="count"
                      position="right"
                      style={{ fill: INK[700], fontSize: 11, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Program Enrollment Fill Rate"
            subtitle="Students enrolled vs sanctioned capacity by program"
            tooltip="Derived from student_master grouped by program. Capacity from program_master."
            sourceTable="student_master · program_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={enrollmentFill}
                  layout="vertical"
                  margin={{ top: 4, right: 40, bottom: 4, left: 72 }}
                  barSize={10}
                >
                  <CartesianGrid stroke={SURFACE.line} strokeWidth={0.6} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={TICK_STYLE}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    domain={[0, 100]}
                  />
                  <YAxis
                    type="category"
                    dataKey="program"
                    tick={{ fill: INK[500], fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={68}
                  />
                  <ReferenceLine x={80} stroke={VIZ[2]} strokeWidth={1} strokeDasharray="3 3" />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v: number) => [`${v.toFixed(1)}%`, 'Fill Rate']}
                  />
                  <Bar dataKey="fill" name="Fill Rate %" radius={[0, 4, 4, 0]}>
                    {enrollmentFill.map((entry) => (
                      <Cell
                        key={entry.program}
                        fill={
                          entry.fill >= 90 ? VIZ[1] : entry.fill >= 75 ? VIZ[0] : VIZ[2]
                        }
                      />
                    ))}
                    <LabelList
                      dataKey="fill"
                      position="right"
                      formatter={(v: number) => `${v.toFixed(0)}%`}
                      style={{ fill: INK[700], fontSize: 10, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* ── Faculty Load + Scholarship ── */}
        <section aria-label="Faculty and scholarships" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard
            title="Faculty Composition by Department"
            subtitle="Full-time vs contractual staff headcount"
            tooltip="From faculty_master grouped by department and employment type."
            sourceTable="faculty_master"
            updatedAt={lastUpdated}
          >
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={facultyData}
                  margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
                  barSize={16}
                  barGap={2}
                >
                  <CartesianGrid stroke={SURFACE.line} strokeWidth={0.6} vertical={false} />
                  <XAxis dataKey="dept" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis tick={TICK_STYLE} axisLine={false} tickLine={false} width={28} />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ fill: 'rgba(31,56,100,0.04)' }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11, color: INK[500] }}
                  />
                  <Bar dataKey="Full-time" stackId="a" fill={VIZ[0]} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Contractual" stackId="a" fill={VIZ[2]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard
            title="Scholarship Distribution"
            subtitle="Aid by category — beneficiaries and ₹ disbursed"
            tooltip="From scholarship_master joined with student_master. Amount in lakhs."
            sourceTable="scholarship_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={scholarshipDist}
                  margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
                  barSize={20}
                >
                  <CartesianGrid stroke={SURFACE.line} strokeWidth={0.6} vertical={false} />
                  <XAxis dataKey="category" tick={TICK_STYLE} axisLine={false} tickLine={false} />
                  <YAxis
                    yAxisId="students"
                    tick={TICK_STYLE}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <YAxis
                    yAxisId="amount"
                    orientation="right"
                    tick={TICK_STYLE}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v}L`}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    cursor={{ fill: 'rgba(31,56,100,0.04)' }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11, color: INK[500] }}
                  />
                  <Bar
                    yAxisId="students"
                    dataKey="students"
                    name="Beneficiaries"
                    fill={VIZ[0]}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    yAxisId="amount"
                    dataKey="amount"
                    name="Amount (₹L)"
                    fill={VIZ[1]}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {/* Bottom spacing */}
        <div className="h-6" />
      </div>

      {/* ── AI Insights Rail ── */}
      <aside
        className={cn(
          'flex-shrink-0 border-l border-[#E4E8EF] bg-[#F6F8FB] transition-all duration-300 overflow-hidden flex flex-col',
          railOpen ? 'w-72' : 'w-0 border-l-0',
        )}
        aria-label="AI Insights"
      >
        {railOpen && (
          <>
            {/* Rail header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E4E8EF] bg-white">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#1F3864]" />
                <span className="text-[13px] font-[700] text-[#0F1722]">AI Insights</span>
                {visibleInsights.length > 0 && (
                  <span className="text-[10px] font-[700] w-5 h-5 rounded-full bg-[#C55A11] text-white flex items-center justify-center">
                    {visibleInsights.length}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setRailOpen(false)}
                aria-label="Close AI insights rail"
                className="text-[#9AA6B4] hover:text-[#5A6675] transition-colors"
              >
                <PanelRightClose size={15} />
              </button>
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2 bg-[#EEF2F8] border-b border-[#E4E8EF]">
              <p className="text-[10.5px] text-[#5A6675] leading-relaxed">
                AI advises — you decide. Each insight shows the factors driving it. No actions execute automatically.
              </p>
            </div>

            {/* Insight cards */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {visibleInsights.length === 0 ? (
                <div className="text-center py-10">
                  <Sparkles size={24} className="mx-auto text-[#D8E0EE] mb-2" />
                  <p className="text-[12px] text-[#9AA6B4]">No active insights</p>
                </div>
              ) : (
                visibleInsights.map((insight) => (
                  <AIInsightCard
                    key={insight.id}
                    insight={insight}
                    onDismiss={(id) =>
                      setDismissedInsights((prev) => [...prev, id])
                    }
                  />
                ))
              )}
            </div>
          </>
        )}
      </aside>

      {/* Rail toggle when closed */}
      {!railOpen && (
        <button
          type="button"
          onClick={() => setRailOpen(true)}
          aria-label="Open AI insights rail"
          className="fixed right-4 bottom-6 flex items-center gap-2 px-3 py-2 rounded-[8px] bg-[#1F3864] text-white text-[12px] font-[600] shadow-lg hover:bg-[#34507F] transition-colors z-30"
        >
          <Sparkles size={13} />
          AI Insights
          {visibleInsights.length > 0 && (
            <span className="text-[10px] font-[800] w-4 h-4 rounded-full bg-[#C55A11] text-white flex items-center justify-center">
              {visibleInsights.length}
            </span>
          )}
          <PanelRightOpen size={13} />
        </button>
      )}
    </div>
  )
}
