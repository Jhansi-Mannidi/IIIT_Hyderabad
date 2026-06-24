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
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Award, ClipboardCheck, MessageSquareText, RefreshCw, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { ChartCard } from './ChartCard'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

const feedbackKpis = [
  { label: 'Overall Satisfaction', value: '4.42/5', delta: '+0.18', icon: Star, tone: '#2E8B8B' },
  { label: 'Responses Captured', value: '18,640', delta: '+12.4%', icon: MessageSquareText, tone: '#1F3864' },
  { label: 'NAAC Readiness', value: '87%', delta: '+6 pts', icon: Award, tone: '#C55A11' },
  { label: 'Action Closure', value: '79%', delta: '+9.1%', icon: ClipboardCheck, tone: '#2F6FB0' },
]

const sentimentTrend = [
  { month: 'Jan', students: 3.9, faculty: 4.1, alumni: 4.0 },
  { month: 'Feb', students: 4.0, faculty: 4.2, alumni: 4.1 },
  { month: 'Mar', students: 4.1, faculty: 4.2, alumni: 4.2 },
  { month: 'Apr', students: 4.2, faculty: 4.3, alumni: 4.2 },
  { month: 'May', students: 4.3, faculty: 4.4, alumni: 4.3 },
  { month: 'Jun', students: 4.4, faculty: 4.5, alumni: 4.4 },
]

const criteriaScore = [
  { criterion: 'Curricular', score: 88 },
  { criterion: 'Teaching', score: 91 },
  { criterion: 'Research', score: 82 },
  { criterion: 'Infrastructure', score: 86 },
  { criterion: 'Governance', score: 84 },
  { criterion: 'Innovation', score: 78 },
]

const actionBacklog = [
  { area: 'Academic Delivery', open: 18, closed: 64 },
  { area: 'Facilities', open: 24, closed: 58 },
  { area: 'Student Support', open: 11, closed: 71 },
  { area: 'Examination', open: 9, closed: 52 },
  { area: 'Placement Support', open: 14, closed: 47 },
]

const voiceMix = [
  { name: 'Students', value: 54, color: '#2E8B8B' },
  { name: 'Faculty', value: 22, color: '#1F3864' },
  { name: 'Alumni', value: 14, color: '#C55A11' },
  { name: 'Parents', value: 10, color: '#7A5CFA' },
]

const initiatives = [
  { title: 'Course Feedback Review', description: 'Route low-score courses to HoD review with faculty coaching notes.', status: 'In Progress' },
  { title: 'NAAC Evidence Library', description: 'Consolidate SSR proof files, audit trails, and MoM references.', status: 'Ready' },
  { title: 'Student Voice Sprint', description: 'Close high-frequency hostel, library, and exam grievances this month.', status: 'Priority' },
]

export function FeedbackIQACDashboard() {
  const shouldReduceMotion = useReducedMotion()
  const { aiInsightsOpen, globalFilters, refreshDashboard, runAction, searchQuery } = useInteractions()
  const lastUpdated = useMemo(() => new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }), [])
  const filteredData = useMemo(
    () =>
      applyDashboardFilters(
        { feedbackKpis, sentimentTrend, criteriaScore, actionBacklog, voiceMix, initiatives },
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
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[16px] bg-[#E8F5F5] text-[#2E8B8B]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[11px] font-[800] uppercase tracking-[0.12em] text-[#2E8B8B]">Quality Intelligence</p>
                <h1 className="mt-1 text-[24px] font-[850] tracking-[-0.03em] text-[#0F1722]">Feedback & IQAC Dashboard</h1>
                <p className="mt-1 max-w-3xl text-[13px] leading-5 text-[#6B7C99]">
                  Professional quality assurance cockpit for stakeholder feedback, NAAC criteria readiness, action closure, and institutional improvement loops.
                </p>
              </div>
            </div>
            <button
              onClick={() => refreshDashboard('Feedback & IQAC')}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border border-[#D1D8DF] bg-white px-4 text-[12px] font-[800] text-[#1F3864] transition-colors hover:bg-[#EEF2F8]"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </motion.div>

        <motion.section
          aria-label="Feedback KPIs"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
        >
          {filteredData.feedbackKpis.map(({ label, value, delta, icon: Icon, tone }) => (
            <motion.div
              key={label}
              className="rounded-[16px] border border-[#E5ECEF] bg-white p-4"
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-[800] uppercase tracking-[0.08em] text-[#6B7C99]">{label}</p>
                  <p className="mt-3 text-[28px] font-[850] tracking-[-0.04em] text-[#0F1722]">{value}</p>
                  <p className="mt-2 text-[12px] font-[800]" style={{ color: tone }}>{delta} vs last cycle</p>
                </div>
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px]" style={{ backgroundColor: `${tone}16`, color: tone }}>
                  <Icon size={19} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <section aria-label="Feedback charts" className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <ChartCard title="Stakeholder Sentiment Trend" subtitle="Average rating by stakeholder group" className="xl:col-span-2">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredData.sentimentTrend}>
                  <CartesianGrid stroke="#E5ECEF" vertical={false} />
                  <XAxis dataKey="month" fontSize={11} />
                  <YAxis domain={[3.5, 5]} fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="students" stroke="#2E8B8B" fill="#2E8B8B22" strokeWidth={2} />
                  <Area type="monotone" dataKey="faculty" stroke="#1F3864" fill="#1F386422" strokeWidth={2} />
                  <Area type="monotone" dataKey="alumni" stroke="#C55A11" fill="#C55A1122" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard title="Voice Mix" subtitle="Feedback sources by stakeholder">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={filteredData.voiceMix} dataKey="value" nameKey="name" innerRadius="52%" outerRadius="90%" paddingAngle={3} stroke="#FFFFFF" strokeWidth={2}>
                    {filteredData.voiceMix.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        <section aria-label="IQAC readiness" className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ChartCard title="NAAC Criteria Readiness" subtitle="Evidence maturity across core criteria">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={filteredData.criteriaScore}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="criterion" fontSize={11} />
                  <Radar dataKey="score" stroke="#2E8B8B" fill="#2E8B8B" fillOpacity={0.24} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
          <ChartCard title="Action Closure Backlog" subtitle="Open vs closed quality actions">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData.actionBacklog} layout="vertical" margin={{ left: 18 }}>
                  <CartesianGrid stroke="#E5ECEF" horizontal={false} />
                  <XAxis type="number" fontSize={11} />
                  <YAxis type="category" dataKey="area" fontSize={11} width={110} />
                  <Tooltip />
                  <Bar dataKey="closed" stackId="a" fill="#2E8B8B" radius={[0, 6, 6, 0]} />
                  <Bar dataKey="open" stackId="a" fill="#C55A11" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </section>

        {aiInsightsOpen && (
          <section aria-label="Feedback insights" className="rounded-[18px] border border-[#E5ECEF] bg-white p-5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#C55A11]" />
              <h2 className="text-[15px] font-[850] text-[#0F1722]">Professional Improvement Actions</h2>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-3">
              {filteredData.initiatives.map((item) => (
                <motion.button
                  key={item.title}
                  type="button"
                  onClick={() => runAction(item.title, item.description)}
                  className="rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-4 text-left"
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                >
                  <span className="rounded-full bg-white px-2 py-1 text-[10px] font-[800] uppercase tracking-[0.06em] text-[#2E8B8B]">{item.status}</span>
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
