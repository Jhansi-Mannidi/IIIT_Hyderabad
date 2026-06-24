'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Banknote, GraduationCap, HandCoins, HeartHandshake, RefreshCw, ShieldAlert, Sparkles, UsersRound } from 'lucide-react'
import { ChartCard } from './ChartCard'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

const aidKpis = [
  { label: 'Aid Coverage', value: '41.8%', delta: '+5.6 pts', icon: HeartHandshake, tone: '#2E8B8B' },
  { label: 'Disbursed Amount', value: '₹9.7 Cr', delta: '+18.2%', icon: Banknote, tone: '#1F3864' },
  { label: 'Beneficiaries', value: '2,846', delta: '+312', icon: UsersRound, tone: '#2F6FB0' },
  { label: 'At-Risk Students', value: '184', delta: '-11.4%', icon: ShieldAlert, tone: '#C55A11' },
]

const disbursalTrend = [
  { month: 'Jan', sanctioned: 82, disbursed: 70 },
  { month: 'Feb', sanctioned: 95, disbursed: 83 },
  { month: 'Mar', sanctioned: 118, disbursed: 104 },
  { month: 'Apr', sanctioned: 142, disbursed: 126 },
  { month: 'May', sanctioned: 164, disbursed: 151 },
  { month: 'Jun', sanctioned: 188, disbursed: 172 },
]

const categoryMix = [
  { name: 'Merit', value: 28, color: '#2E8B8B' },
  { name: 'Need-based', value: 35, color: '#1F3864' },
  { name: 'Government', value: 24, color: '#C55A11' },
  { name: 'Donor / CSR', value: 13, color: '#7A5CFA' },
]

const programCoverage = [
  { program: 'B.Tech', applied: 980, approved: 742 },
  { program: 'M.Tech', applied: 312, approved: 246 },
  { program: 'MBA', applied: 226, approved: 171 },
  { program: 'M.Sc', applied: 184, approved: 149 },
  { program: 'Ph.D', applied: 156, approved: 128 },
]

const riskSegments = [
  { segment: 'Fee Due + Low Income', students: 74 },
  { segment: 'Merit Eligible', students: 126 },
  { segment: 'Document Pending', students: 98 },
  { segment: 'Renewal Needed', students: 142 },
  { segment: 'Dropout Risk', students: 38 },
]

const actions = [
  { title: 'Fast-track pending documents', description: 'Trigger a 7-day document completion sprint for high-priority aid applicants.', tag: 'Operations' },
  { title: 'Match donor funds to need clusters', description: 'Allocate donor corpus to fee-due students with high academic persistence signals.', tag: 'Donor Aid' },
  { title: 'Renewal risk review', description: 'Review renewals before the next semester fee cycle to avoid scholarship lapses.', tag: 'Risk Control' },
]

export function ScholarshipsAidDashboard() {
  const shouldReduceMotion = useReducedMotion()
  const { aiInsightsOpen, globalFilters, refreshDashboard, runAction, searchQuery } = useInteractions()
  const lastUpdated = useMemo(() => new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }), [])
  const filteredData = useMemo(
    () =>
      applyDashboardFilters(
        { aidKpis, disbursalTrend, categoryMix, programCoverage, riskSegments, actions },
        globalFilters,
        searchQuery,
      ),
    [globalFilters, searchQuery],
  )

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F8FB]">
      <motion.div
        className="w-full max-w-[1800px] mx-auto px-4 sm:px-5 py-5 space-y-5"
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <motion.div
          className="rounded-[22px] border border-[#D8E0EE] bg-white p-5 sm:p-6 shadow-[0_18px_48px_rgba(31,56,100,0.10)]"
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[16px] bg-[#FFF4ED] text-[#C55A11]">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-[11px] font-[800] uppercase tracking-[0.12em] text-[#C55A11]">Student Support Intelligence</p>
                <h1 className="mt-1 text-[24px] font-[850] tracking-[-0.03em] text-[#0F1722]">Scholarships & Aid Dashboard</h1>
                <p className="mt-1 max-w-3xl text-[13px] leading-5 text-[#6B7C99]">
                  Professional aid management screen for scholarship eligibility, disbursal progress, coverage gaps, donor funds, and at-risk student support.
                </p>
              </div>
            </div>
            <button
              onClick={() => refreshDashboard('Scholarships & Aid')}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-[#D1D8DF] bg-white px-4 text-[12px] font-[800] text-[#1F3864] transition-colors hover:bg-[#EEF2F8]"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </motion.div>

        <motion.section
          aria-label="Scholarship KPIs"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
        >
          {filteredData.aidKpis.map(({ label, value, delta, icon: Icon, tone }) => (
            <motion.div
              key={label}
              className="rounded-[16px] border border-[#E5ECEF] bg-white p-4"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-[800] uppercase tracking-[0.08em] text-[#6B7C99]">{label}</p>
                  <p className="mt-3 text-[28px] font-[850] tracking-[-0.04em] text-[#0F1722]">{value}</p>
                  <p className="mt-2 text-[12px] font-[800]" style={{ color: tone }}>{delta} vs prior cycle</p>
                </div>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px]" style={{ backgroundColor: `${tone}16`, color: tone }}>
                  <Icon size={19} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <section aria-label="Scholarship visual analytics" className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <ChartCard title="Sanction vs Disbursal Trend" subtitle="Amount in ₹ lakhs" className="xl:col-span-2">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData.disbursalTrend}>
                  <CartesianGrid stroke="#E5ECEF" vertical={false} />
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="sanctioned" stroke="#1F3864" fill="#1F386422" strokeWidth={2} />
                  <Area type="monotone" dataKey="disbursed" stroke="#2E8B8B" fill="#2E8B8B22" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard title="Aid Category Mix" subtitle="Distribution by scholarship source">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={filteredData.categoryMix} dataKey="value" nameKey="name" innerRadius="52%" outerRadius="90%" paddingAngle={3} stroke="#FFFFFF" strokeWidth={2}>
                    {filteredData.categoryMix.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        <section aria-label="Aid program analysis" className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ChartCard title="Program Coverage Pipeline" subtitle="Applications approved by program">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData.programCoverage}>
                  <CartesianGrid stroke="#E5ECEF" vertical={false} />
                  <XAxis dataKey="program" fontSize={11} />
                  <YAxis fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="applied" fill="#D8E0EE" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="approved" fill="#2E8B8B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard title="Aid Risk Segments" subtitle="Students needing intervention">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData.riskSegments} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid stroke="#E5ECEF" horizontal={false} />
                  <XAxis type="number" fontSize={11} />
                  <YAxis type="category" dataKey="segment" fontSize={11} width={130} />
                  <Tooltip />
                  <Bar dataKey="students" fill="#C55A11" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {aiInsightsOpen && (
          <section aria-label="Scholarship insights" className="rounded-[18px] border border-[#E5ECEF] bg-white p-5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C55A11]" />
              <h2 className="text-[15px] font-[850] text-[#0F1722]">Aid Intervention Playbook</h2>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
              {filteredData.actions.map((item) => (
                <motion.button
                  key={item.title}
                  type="button"
                  onClick={() => runAction(item.title, item.description)}
                  className="rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-4 text-left"
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-[800] uppercase tracking-[0.06em] text-[#C55A11]">
                    <HandCoins size={11} />
                    {item.tag}
                  </span>
                  <h3 className="mt-3 text-[13px] font-[850] text-[#0F1722]">{item.title}</h3>
                  <p className="mt-1 text-[12px] leading-5 text-[#6B7C99]">{item.description}</p>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        <p className="pb-4 text-center text-[11px] text-[#9AA6B4]">Last updated: {lastUpdated}</p>
      </motion.div>
    </div>
  )
}
