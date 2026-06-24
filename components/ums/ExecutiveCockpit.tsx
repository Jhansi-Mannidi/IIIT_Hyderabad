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
import { ChevronRight, Sparkles, PanelRightClose, RefreshCw } from 'lucide-react'
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
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

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

function formatProgramAxisLabel(value: unknown) {
  return String(value)
    .replaceAll('B.Tech', 'BTech')
    .replaceAll('M.Tech', 'MTech')
    .replaceAll('M.Sc', 'MSc')
    .replaceAll('Ph.D', 'PhD')
    .replace(/\s+(CSE|ECE|MTech|MBA|PhD|Math|IT)$/i, ' $1')
    .replace(/\s+/g, ' ')
    .trim()
}

function formatCompactProgramAxisLabel(value: unknown) {
  const label = formatProgramAxisLabel(value)
    .replace('BTech ', 'BT-')
    .replace('MTech ', 'MT-')
    .replace('MSc ', 'MSc-')
    .replace('Mechanical', 'Mech')

  return label.length > 8 ? `${label.slice(0, 8)}...` : label
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

function ExecutiveAnalyticsStrip({
  items,
}: {
  items: Array<{ label: string; value: string; detail?: string; tone?: string }>
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-3 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <p className="truncate text-[10px] font-[750] uppercase tracking-[0.07em] text-[#9AA6B4]">
            {item.label}
          </p>
          <p
            className="mt-1 truncate text-[13px] font-[850] tracking-[-0.02em] text-[#0F1722] tabular-nums"
            style={item.tone ? { color: item.tone } : undefined}
            title={item.value}
          >
            {item.value}
          </p>
          {item.detail && (
            <p className="mt-0.5 truncate text-[10.5px] font-[600] text-[#6B7C99]" title={item.detail}>
              {item.detail}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

type MobileMetricConfig = {
  key: string
  label: string
  color: string
  format: (value: number) => string
}

function MobileMetricBars({
  data,
  labelKey,
  metrics,
  limit = 6,
}: {
  data: Array<Record<string, any>>
  labelKey: string
  metrics: MobileMetricConfig[]
  limit?: number
}) {
  const rows = data.slice(-limit)
  const maxByMetric = metrics.reduce<Record<string, number>>((acc, metric) => {
    acc[metric.key] = Math.max(...rows.map((row) => Number(row[metric.key] ?? 0)), 1)
    return acc
  }, {})

  return (
    <div className="ums-mobile-native-analytics grid gap-3 md:hidden">
      {rows.map((row) => (
        <div key={String(row[labelKey])} className="rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
          <div className="mb-2 text-[12px] font-[850] text-[#0F1722]">{String(row[labelKey])}</div>
          <div className="space-y-2">
            {metrics.map((metric) => {
              const value = Number(row[metric.key] ?? 0)
              const width = Math.max(4, Math.round((value / maxByMetric[metric.key]) * 100))

              return (
                <div key={metric.key}>
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="text-[10.5px] font-[800] uppercase tracking-[0.06em] text-[#6B7C99]">{metric.label}</span>
                    <span className="text-[11px] font-[850] tabular-nums text-[#0F1722]">{metric.format(value)}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#E5ECEF]">
                    <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: metric.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function MobileDistributionBars({
  data,
  labelKey,
  valueKey,
  color,
  format,
  secondary,
  limit,
}: {
  data: Array<Record<string, any>>
  labelKey: string
  valueKey: string
  color: string
  format: (value: number) => string
  secondary?: (row: Record<string, any>) => string
  limit?: number
}) {
  const rows = typeof limit === 'number' ? data.slice(0, limit) : data
  const maxValue = Math.max(...rows.map((row) => Number(row[valueKey] ?? 0)), 1)

  return (
    <div className="ums-mobile-native-analytics grid gap-3 md:hidden">
      {rows.map((row) => {
        const value = Number(row[valueKey] ?? 0)
        const width = Math.max(4, Math.round((value / maxValue) * 100))

        return (
          <div key={String(row[labelKey])} className="rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-3">
            <div className="mb-2 flex items-start justify-between gap-3">
              <span className="min-w-0 text-[12px] font-[850] leading-4 text-[#0F1722]">{String(row[labelKey])}</span>
              <span className="shrink-0 text-[11px] font-[850] tabular-nums text-[#0F1722]">{format(value)}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#E5ECEF]">
              <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color }} />
            </div>
            {secondary && <div className="mt-1 text-[10px] font-[700] text-[#9AA6B4]">{secondary(row)}</div>}
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export function ExecutiveCockpit() {
  const { data, loading } = useExecutiveCockpitData()
  const [dismissedInsights, setDismissedInsights] = useState<string[]>([])
  const { aiInsightsOpen, globalFilters, refreshDashboard, searchQuery, setAiInsightsOpen } = useInteractions()
  const shouldReduceMotion = useReducedMotion()

  const visibleInsights = useMemo(
    () => (data?.aiInsights ?? []).filter((i) => !dismissedInsights.includes(i.id)),
    [data, dismissedInsights],
  )
  const filteredData = useMemo(
    () => (data ? applyDashboardFilters(data, globalFilters, searchQuery) : null),
    [data, globalFilters, searchQuery],
  )

  if (loading) return <SkeletonDashboard />
  if (!filteredData) return null

  const { kpis, trendSeries, domainHealth, placementFunnel, scholarshipDist, revenueBreakdown, programEnrollment, facultyLoad, lastUpdated } = filteredData
  const executiveKpis = kpis.filter((kpi) => !['pass-rate', 'research-pubs', 'faculty-student'].includes(kpi.id))

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

  const latestTrend = trendSeries[trendSeries.length - 1]
  const firstTrend = trendSeries[0]
  const trendCount = Math.max(trendSeries.length, 1)
  const revenueYtd = trendSeries.reduce((sum, point) => sum + point.revenue, 0)
  const expenditureYtd = trendSeries.reduce((sum, point) => sum + point.expenditure, 0)
  const avgAttendance = trendSeries.reduce((sum, point) => sum + point.attendance, 0) / trendCount
  const avgPassRate = trendSeries.reduce((sum, point) => sum + point.passRate, 0) / trendCount
  const attendanceRiskMonths = trendSeries.filter((point) => point.attendance < 85).length
  const totalCapacity = programEnrollment.reduce((sum, program) => sum + program.capacity, 0)
  const totalEnrolled = programEnrollment.reduce((sum, program) => sum + program.students, 0)
  const avgProgramFill = totalCapacity ? (totalEnrolled / totalCapacity) * 100 : 0
  const lowFillPrograms = enrollmentFill.filter((program) => program.fill < 80).length
  const scholarshipStudents = scholarshipDist.reduce((sum, item) => sum + item.students, 0)
  const scholarshipAmount = scholarshipDist.reduce((sum, item) => sum + item.amount, 0)
  const topScholarshipCategory = scholarshipDist.reduce(
    (top, item) => (item.amount > top.amount ? item : top),
    scholarshipDist[0] ?? { category: 'Sample Aid', students: 0, amount: 0, color: '#2E8B8B' },
  )
  const facultyLoadCount = Math.max(facultyLoad.length, 1)

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* ── Main content ── */}
      <motion.div
        className="executive-cockpit-dashboard flex-1 min-w-0 overflow-y-auto px-4 py-4 space-y-4"
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
        }}
      >

        {/* ── Section label ── */}
        <motion.div
          className="flex items-center justify-between"
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">Executive Cockpit</h1>
            <p className="mt-1 text-[13px] text-[#6B7C99]">
              AY 2024-25 · All Programs · Updated {lastUpdated}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refreshDashboard('Executive Cockpit')}
            className="flex items-center gap-2 rounded-[8px] border border-[#D1D8DF] bg-white px-4 py-2 text-[12px] font-[600] text-[#0F1722] transition-colors hover:bg-[#F8FAFD]"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </motion.div>

        {/* ── KPI strip ── */}
        <motion.section
          aria-label="Key performance indicators"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <div className="ums-exec-kpi-grid grid grid-cols-2 gap-3 lg:grid-cols-[repeat(auto-fit,minmax(156px,1fr))]">
            {executiveKpis.map((kpi) => (
              <KPITile key={kpi.id} metric={kpi} />
            ))}
          </div>
        </motion.section>

        {/* ── SIGNATURE: Institutional Health Ribbon + Department Heat-Strip ── */}
        <motion.section
          aria-label="Health ribbon and department strip"
          className="space-y-4"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <HealthRibbon data={filteredData.healthRibbon} />
          <DeptHealthStrip data={filteredData.deptHealthStrip} />
        </motion.section>

        {/* ── Top Movers Table ── */}
        <motion.section
          aria-label="Top movers"
          className="mt-4"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <MoversTable data={filteredData.movers} />
        </motion.section>

        {/* ── Trend + Revenue donut ── */}
        <section aria-label="Institutional trends" className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
          <ChartCard
            title="Enrollment & Financial Trend"
            subtitle="Monthly AY 2024-25 — Enrollment vs Revenue vs Expenditure"
            tooltip="Enrollment drawn from student_master. Revenue/Expenditure from budget_master monthly actuals."
            sourceTable="student_master · budget_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
            className="self-start lg:col-span-2"
          >
            <MobileMetricBars
              data={trendSeries}
              labelKey="month"
              metrics={[
                { key: 'enrollment', label: 'Enrollment', color: VIZ[0], format: (value) => value.toLocaleString('en-IN') },
                { key: 'revenue', label: 'Revenue', color: VIZ[1], format: formatLakh },
                { key: 'expenditure', label: 'Spend', color: VIZ[2], format: formatLakh },
              ]}
            />
            <div className="ums-analytics-chart-frame hidden h-[240px] min-w-0 md:block">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220} debounce={80}>
                <LineChart data={trendSeries} margin={{ top: 12, right: 12, bottom: 8, left: 0 }}>
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
            <ExecutiveAnalyticsStrip
              items={[
                {
                  label: 'Enrollment',
                  value: latestTrend.enrollment.toLocaleString('en-IN'),
                  detail: `${latestTrend.target.toLocaleString('en-IN')} target`,
                  tone: VIZ[0],
                },
                {
                  label: 'Revenue YTD',
                  value: formatLakh(revenueYtd),
                  detail: 'fee + allied income',
                  tone: VIZ[1],
                },
                {
                  label: 'Expense YTD',
                  value: formatLakh(expenditureYtd),
                  detail: `${((expenditureYtd / revenueYtd) * 100).toFixed(0)}% of revenue`,
                  tone: VIZ[2],
                },
                {
                  label: 'Net Position',
                  value: formatLakh(revenueYtd - expenditureYtd),
                  detail: `${(((revenueYtd - expenditureYtd) / revenueYtd) * 100).toFixed(1)}% margin`,
                  tone: '#2E8B8B',
                },
              ]}
            />
          </ChartCard>

          <ChartCard
            title="Revenue Mix"
            subtitle="Fee collection by source category"
            tooltip="Fee collection from fee_master grouped by fee category. Hostel from hostel_charges."
            sourceTable="fee_master · hostel_charges"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <div className="flex flex-col">
              <MobileDistributionBars
                data={revenueBreakdown}
                labelKey="source"
                valueKey="amount"
                color={VIZ[1]}
                format={formatLakh}
                secondary={(row) => `${Number(row.pct ?? 0).toFixed(0)}% of revenue mix`}
              />
              <div className="ums-analytics-chart-frame hidden h-[230px] min-w-0 md:block">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={210} debounce={80}>
                  <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                    <Pie
                      data={revenueBreakdown}
                      dataKey="amount"
                      nameKey="source"
                      cx="50%"
                      cy="50%"
                      innerRadius="50%"
                      outerRadius="88%"
                      paddingAngle={2}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={entry.source} fill={VIZ[index % VIZ.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={TOOLTIP_STYLE}
                      formatter={(value) => [formatLakh(Number(value ?? 0)), 'Amount']}
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
              <ExecutiveAnalyticsStrip
                items={[
                  {
                    label: 'Top Source',
                    value: revenueBreakdown[0]?.source ?? 'Fees',
                    detail: `${revenueBreakdown[0]?.pct.toFixed(0) ?? 0}% mix`,
                    tone: VIZ[0],
                  },
                  {
                    label: 'Categories',
                    value: `${revenueBreakdown.length}`,
                    detail: 'tracked streams',
                    tone: VIZ[1],
                  },
                  {
                    label: 'Revenue',
                    value: formatLakh(revenueBreakdown.reduce((sum, item) => sum + item.amount, 0)),
                    detail: 'current period',
                    tone: VIZ[2],
                  },
                  {
                    label: 'Diversity',
                    value: 'Balanced',
                    detail: 'multi-source mix',
                    tone: '#2E8B8B',
                  },
                ]}
              />
            </div>
          </ChartCard>
        </section>

        {/* ── Attendance + Pass Rate area ── */}
        <section aria-label="Academic health trends" className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          <ChartCard
            title="Attendance Trend"
            subtitle="Monthly average % across all departments"
            tooltip="Derived from attendance_master grouped by month. Policy minimum is 85%."
            sourceTable="attendance_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <MobileMetricBars
              data={trendSeries}
              labelKey="month"
              metrics={[
                { key: 'attendance', label: 'Attendance', color: VIZ[1], format: (value) => `${value.toFixed(1)}%` },
              ]}
            />
            <div className="ums-analytics-chart-frame hidden h-[220px] min-w-0 md:block">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200} debounce={80}>
                <AreaChart data={trendSeries} margin={{ top: 12, right: 8, bottom: 8, left: 0 }}>
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
            <ExecutiveAnalyticsStrip
              items={[
                {
                  label: 'Current',
                  value: `${latestTrend.attendance.toFixed(1)}%`,
                  detail: 'latest month',
                  tone: VIZ[1],
                },
                {
                  label: 'Average',
                  value: `${avgAttendance.toFixed(1)}%`,
                  detail: 'AY average',
                  tone: '#2E8B8B',
                },
                {
                  label: 'Policy Gap',
                  value: `${(latestTrend.attendance - 85).toFixed(1)} pts`,
                  detail: 'vs 85% minimum',
                  tone: latestTrend.attendance >= 85 ? '#2E8B8B' : '#C55A11',
                },
                {
                  label: 'Risk Months',
                  value: `${attendanceRiskMonths}`,
                  detail: 'below policy',
                  tone: attendanceRiskMonths ? '#C55A11' : '#2E8B8B',
                },
              ]}
            />
          </ChartCard>

          <ChartCard
            title="Pass Rate Trend"
            subtitle="Overall semester pass % — AY 2024-25"
            tooltip="Pass rate = students who cleared ≥75% of their subjects / total appeared. NAAC benchmark: 90%."
            sourceTable="examination_results · student_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <MobileMetricBars
              data={trendSeries}
              labelKey="month"
              metrics={[
                { key: 'passRate', label: 'Pass Rate', color: VIZ[0], format: (value) => `${value.toFixed(1)}%` },
              ]}
            />
            <div className="ums-analytics-chart-frame hidden h-[220px] min-w-0 md:block">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200} debounce={80}>
                <AreaChart data={trendSeries} margin={{ top: 12, right: 8, bottom: 8, left: 0 }}>
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
            <ExecutiveAnalyticsStrip
              items={[
                {
                  label: 'Current',
                  value: `${latestTrend.passRate.toFixed(1)}%`,
                  detail: 'latest semester',
                  tone: VIZ[0],
                },
                {
                  label: 'Average',
                  value: `${avgPassRate.toFixed(1)}%`,
                  detail: 'AY average',
                  tone: '#2E8B8B',
                },
                {
                  label: 'NAAC Gap',
                  value: `${(latestTrend.passRate - 90).toFixed(1)} pts`,
                  detail: 'vs 90% benchmark',
                  tone: latestTrend.passRate >= 90 ? '#2E8B8B' : '#C55A11',
                },
                {
                  label: 'Movement',
                  value: `${(latestTrend.passRate - firstTrend.passRate).toFixed(1)} pts`,
                  detail: 'from year start',
                  tone: latestTrend.passRate >= firstTrend.passRate ? '#2E8B8B' : '#C55A11',
                },
              ]}
            />
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
            <MobileDistributionBars
              data={placementFunnel}
              labelKey="stage"
              valueKey="count"
              color={VIZ[0]}
              format={(value) => value.toLocaleString('en-IN')}
              secondary={(row) => `${Number(row.rate ?? 0).toFixed(1)}% of eligible students`}
            />
            <div className="hidden h-52 md:block">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200} debounce={80}>
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
            <ExecutiveAnalyticsStrip
              items={[
                {
                  label: 'Eligible',
                  value: placementFunnel[0]?.count.toLocaleString('en-IN') ?? '0',
                  detail: 'final-year pool',
                  tone: VIZ[0],
                },
                {
                  label: 'Offers',
                  value: placementFunnel.find((item) => item.stage === 'Offered')?.count.toLocaleString('en-IN') ?? '0',
                  detail: 'released YTD',
                  tone: VIZ[1],
                },
                {
                  label: 'Joined',
                  value: placementFunnel[placementFunnel.length - 1]?.count.toLocaleString('en-IN') ?? '0',
                  detail: 'accepted outcomes',
                  tone: '#2E8B8B',
                },
                {
                  label: 'Conversion',
                  value: `${(placementFunnel[placementFunnel.length - 1]?.rate ?? 0).toFixed(1)}%`,
                  detail: 'eligible to joined',
                  tone: VIZ[2],
                },
              ]}
            />
          </ChartCard>

          <ChartCard
            title="Program Enrollment Fill Rate"
            subtitle="Students enrolled vs sanctioned capacity by program"
            tooltip="Derived from student_master grouped by program. Capacity from program_master."
            sourceTable="student_master · program_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <MobileDistributionBars
              data={enrollmentFill}
              labelKey="program"
              valueKey="fill"
              color={VIZ[0]}
              format={(value) => `${value.toFixed(1)}%`}
              secondary={(row) => `${Number(row.students ?? 0).toLocaleString('en-IN')} / ${Number(row.capacity ?? 0).toLocaleString('en-IN')} seats`}
            />
            <div className="hidden h-52 md:block">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200} debounce={80}>
                <BarChart
                  data={enrollmentFill}
                  layout="vertical"
                  margin={{ top: 8, right: 44, bottom: 8, left: 18 }}
                  barSize={12}
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
                    tick={{ fill: INK[500], fontSize: 10.5, fontWeight: 700 }}
                    tickFormatter={formatCompactProgramAxisLabel}
                    axisLine={false}
                    tickLine={false}
                    width={56}
                    interval={0}
                  />
                  <ReferenceLine x={80} stroke={VIZ[2]} strokeWidth={1} strokeDasharray="3 3" />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value) => [`${Number(value ?? 0).toFixed(1)}%`, 'Fill Rate']}
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
                      formatter={(value) => `${Number(value ?? 0).toFixed(0)}%`}
                      style={{ fill: INK[700], fontSize: 10, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <ExecutiveAnalyticsStrip
              items={[
                {
                  label: 'Filled Seats',
                  value: totalEnrolled.toLocaleString('en-IN'),
                  detail: `${totalCapacity.toLocaleString('en-IN')} capacity`,
                  tone: VIZ[0],
                },
                {
                  label: 'Avg Fill',
                  value: `${avgProgramFill.toFixed(1)}%`,
                  detail: 'all programs',
                  tone: avgProgramFill >= 85 ? '#2E8B8B' : '#C55A11',
                },
                {
                  label: 'Underfilled',
                  value: `${lowFillPrograms}`,
                  detail: 'below 80%',
                  tone: lowFillPrograms ? '#C55A11' : '#2E8B8B',
                },
                {
                  label: 'Threshold',
                  value: '80%',
                  detail: 'sanctioned fill line',
                  tone: VIZ[2],
                },
              ]}
            />
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
            <MobileMetricBars
              data={facultyData}
              labelKey="dept"
              metrics={[
                { key: 'Full-time', label: 'Full-Time', color: VIZ[0], format: (value) => value.toLocaleString('en-IN') },
                { key: 'Contractual', label: 'Contractual', color: VIZ[2], format: (value) => value.toLocaleString('en-IN') },
              ]}
            />
            <div className="hidden h-48 md:block">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={190} debounce={80}>
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
            <ExecutiveAnalyticsStrip
              items={[
                {
                  label: 'Full-Time',
                  value: facultyLoad.reduce((sum, item) => sum + item.fullTime, 0).toLocaleString('en-IN'),
                  detail: 'faculty base',
                  tone: VIZ[0],
                },
                {
                  label: 'Contractual',
                  value: facultyLoad.reduce((sum, item) => sum + item.contractual, 0).toLocaleString('en-IN'),
                  detail: 'support load',
                  tone: VIZ[2],
                },
                {
                  label: 'Avg Load',
                  value: `${(facultyLoad.reduce((sum, item) => sum + item.avgLoad, 0) / facultyLoadCount).toFixed(1)}h`,
                  detail: 'weekly teaching',
                  tone: '#2E8B8B',
                },
                {
                  label: 'Departments',
                  value: `${facultyLoad.length}`,
                  detail: 'tracked units',
                  tone: VIZ[1],
                },
              ]}
            />
          </ChartCard>

          <ChartCard
            title="Scholarship Distribution"
            subtitle="Aid by category — beneficiaries and ₹ disbursed"
            tooltip="From scholarship_master joined with student_master. Amount in lakhs."
            sourceTable="scholarship_master"
            updatedAt={lastUpdated}
            badge={<DerivedBadge />}
          >
            <MobileMetricBars
              data={scholarshipDist}
              labelKey="category"
              metrics={[
                { key: 'students', label: 'Students', color: VIZ[0], format: (value) => value.toLocaleString('en-IN') },
                { key: 'amount', label: 'Aid', color: VIZ[1], format: formatLakh },
              ]}
            />
            <div className="hidden h-48 md:block">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={190} debounce={80}>
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
            <ExecutiveAnalyticsStrip
              items={[
                {
                  label: 'Beneficiaries',
                  value: scholarshipStudents.toLocaleString('en-IN'),
                  detail: 'students covered',
                  tone: VIZ[0],
                },
                {
                  label: 'Amount',
                  value: formatLakh(scholarshipAmount),
                  detail: 'aid disbursed',
                  tone: VIZ[1],
                },
                {
                  label: 'Top Category',
                  value: topScholarshipCategory?.category ?? 'Merit',
                  detail: formatLakh(topScholarshipCategory?.amount ?? 0),
                  tone: VIZ[2],
                },
                {
                  label: 'Avg Aid',
                  value: formatLakh(scholarshipAmount / Math.max(scholarshipDist.length, 1)),
                  detail: 'per category',
                  tone: '#2E8B8B',
                },
              ]}
            />
          </ChartCard>
        </section>

        {/* Bottom spacing */}
        <div className="h-6" />
      </motion.div>

      {/* ── AI Insights Rail ── */}
      <motion.aside
        className={cn(
          'flex-shrink-0 border-l border-[#E4E8EF] bg-[#F6F8FB] transition-all duration-300 overflow-hidden flex flex-col',
          aiInsightsOpen ? 'w-72' : 'w-0 border-l-0',
        )}
        layout
        initial={false}
        animate={{ opacity: aiInsightsOpen ? 1 : 0.92 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        aria-label="AI Insights"
      >
        <AnimatePresence initial={false}>
          {aiInsightsOpen && (
          <motion.div
            className="flex min-h-0 flex-1 flex-col"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
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
                onClick={() => setAiInsightsOpen(false)}
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
              <AnimatePresence mode="popLayout">
                {visibleInsights.length === 0 ? (
                  <motion.div
                    key="empty-insights"
                    className="text-center py-10"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  >
                    <Sparkles size={24} className="mx-auto text-[#D8E0EE] mb-2" />
                    <p className="text-[12px] text-[#9AA6B4]">No active insights</p>
                  </motion.div>
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
              </AnimatePresence>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </div>
  )
}
