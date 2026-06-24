'use client'
import { useMemo, useState } from 'react'
import {
  Search,
  Bell,
  ChevronDown,
  Calendar,
  Menu,
  Zap,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
  Sparkles,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useTheme } from './ThemeProvider'
import { useInteractions } from './InteractionProvider'

interface TopBarProps {
  onMenuClick?: () => void
}

const PERIODS = ['Today', 'This Week', 'This Month', 'This Semester', 'AY 2024-25', 'AY 2023-24']
const SCOPES = ['All Programs', 'B.Tech', 'M.Tech', 'MBA', 'Ph.D', 'M.Sc']
const DASHBOARD_SEARCH_ITEMS = [
  { title: 'Executive Cockpit', subtitle: 'Institutional overview and AI insights', href: '/', keywords: 'overview leadership kpi institutional' },
  { title: 'Academic Performance', subtitle: 'Courses, grades, pass rate, at-risk students', href: '/dashboard/academic', keywords: 'academic grades sgpa attendance students' },
  { title: 'Admissions Funnel', subtitle: 'Applications, conversions, rank bands', href: '/dashboard/admissions', keywords: 'admissions enrollment funnel category rank state' },
  { title: 'Student Finance', subtitle: 'Fees, dues, collections, refunds', href: '/dashboard/finance', keywords: 'finance fees payment ageing refund collection' },
  { title: 'Institutional Finance', subtitle: 'Budget, projects, vouchers, assets', href: '/dashboard/institutional-finance', keywords: 'budget bank reconciliation cost center assets' },
  { title: 'HR, Payroll & Workforce', subtitle: 'Headcount, payroll, leave, attrition', href: '/dashboard/hr-payroll', keywords: 'hr payroll workforce appraisal attrition leave' },
  { title: 'Hostel & Mess', subtitle: 'Occupancy, mess economics, utilities', href: '/dashboard/hostel-mess', keywords: 'hostel mess room occupancy utility quarters' },
  { title: 'Attendance & Biometric', subtitle: 'Shortfalls, compliance, punctuality', href: '/dashboard/attendance', keywords: 'attendance biometric detention compliance punctuality' },
  { title: 'Research & Publications', subtitle: 'Papers, impact, PhD pipeline', href: '/dashboard/research', keywords: 'research publication phd impact faculty' },
  { title: 'Placements', subtitle: 'Offers, packages, recruiters, outcomes', href: '/dashboard/placements', keywords: 'placements salary recruiter offers company branch' },
  { title: 'Feedback & IQAC', subtitle: 'Ratings, NAAC readiness, quality actions', href: '/dashboard/feedback', keywords: 'feedback iqac naac quality ratings audit improvement' },
  { title: 'Scholarships & Aid', subtitle: 'Aid coverage, disbursals, beneficiaries', href: '/dashboard/scholarships', keywords: 'scholarships aid beneficiaries disbursement donor support' },
]

export function TopBar({ onMenuClick }: TopBarProps) {
  const router = useRouter()
  const [showPeriod, setShowPeriod] = useState(false)
  const [showScope, setShowScope] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifCount] = useState(4)
  const { theme, toggleTheme } = useTheme()
  const { aiInsightsOpen, globalFilters, setGlobalFilters, searchQuery, setSearchQuery, toggleAiInsights, runAction } = useInteractions()
  const period = String(globalFilters.period ?? 'AY 2024-25')
  const scope = String(globalFilters.scope ?? 'All Programs')
  const isDark = theme === 'dark'
  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return DASHBOARD_SEARCH_ITEMS

    return DASHBOARD_SEARCH_ITEMS.filter((item) =>
      `${item.title} ${item.subtitle} ${item.keywords}`.toLowerCase().includes(query),
    )
  }, [searchQuery])

  const openResult = (href: string) => {
    router.push(href)
    setSearchOpen(false)
    runAction('Search result opened', 'Navigated to the selected dashboard.')
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-14 items-center gap-3 px-4 backdrop-blur transition-colors duration-300',
        isDark
          ? 'bg-[#1F3864]/95 shadow-[0_1px_0_rgba(255,255,255,0.08),0_14px_32px_rgba(8,17,31,0.18)]'
          : 'border-b border-[#D8E0EE] bg-gradient-to-r from-white via-[#FBFCFF] to-white shadow-[0_10px_28px_rgba(31,56,100,0.12)]',
      )}
    >
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-[8px] transition-colors sm:hidden',
          isDark ? 'text-[#D8E0EE] hover:bg-[#34507F]' : 'text-[#1F3864] hover:bg-[#EEF2F8]',
        )}
      >
        <Menu size={17} />
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#C55A11] shadow-[0_8px_18px_rgba(197,90,17,0.24)]">
          <Zap size={15} className="text-white" fill="white" />
        </div>
        <div className="hidden sm:flex flex-col leading-none">
          <span className={cn('text-[13px] font-[900] tracking-[0.08em] uppercase', isDark ? 'text-white' : 'text-[#1F3864]')}>
            VoltusWave
          </span>
          <span className="mt-0.5 text-[9.5px] font-[700] text-[#6B83AD] uppercase tracking-[0.08em]">
            UMS
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className={cn('mx-1 h-5 w-px flex-shrink-0', isDark ? 'bg-[#34507F]' : 'bg-[#D8E0EE]')} />

      <div className="flex-1" />

      {/* Global filters */}
      <div className="hidden lg:flex items-center gap-2">
        {/* Scope picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setShowScope((v) => !v); setShowPeriod(false); setShowUser(false) }}
            className={cn(
              'flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-[750] transition-colors',
              isDark
                ? 'bg-[#34507F] text-white hover:bg-[#6B83AD]'
                : 'border border-[#D8E0EE] bg-[#F8FAFD] text-[#1F3864] hover:bg-[#EEF2F8]',
            )}
            aria-expanded={showScope}
          >
            {scope}
            <ChevronDown size={12} />
          </button>
          <AnimatePresence>
            {showScope && (
            <motion.div
              className="absolute right-0 top-9 w-36 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1 z-50"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {SCOPES.map((s) => (
                <motion.button
                  key={s}
                  type="button"
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-[13px] transition-colors',
                    s === scope
                      ? 'bg-[#EEF2F8] text-[#1F3864] font-[600]'
                      : 'text-[#2B3645] hover:bg-[#F6F8FB]',
                  )}
                  onClick={() => {
                    setGlobalFilters({ ...globalFilters, scope: s })
                    setShowScope(false)
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Period picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setShowPeriod((v) => !v); setShowScope(false); setShowUser(false) }}
            className={cn(
              'flex h-8 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-[750] transition-colors',
              isDark
                ? 'bg-[#34507F] text-white hover:bg-[#6B83AD]'
                : 'border border-[#D8E0EE] bg-[#F8FAFD] text-[#1F3864] hover:bg-[#EEF2F8]',
            )}
            aria-expanded={showPeriod}
          >
            <Calendar size={12} />
            {period}
            <ChevronDown size={12} />
          </button>
          <AnimatePresence>
            {showPeriod && (
            <motion.div
              className="absolute right-0 top-9 w-40 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1 z-50"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {PERIODS.map((p) => (
                <motion.button
                  key={p}
                  type="button"
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-[13px] transition-colors',
                    p === period
                      ? 'bg-[#EEF2F8] text-[#1F3864] font-[600]'
                      : 'text-[#2B3645] hover:bg-[#F6F8FB]',
                  )}
                  onClick={() => {
                    setGlobalFilters({ ...globalFilters, period: p })
                    setShowPeriod(false)
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {p}
                </motion.button>
              ))}
            </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search */}
      <div
        role="search"
        aria-label="Dashboard search"
        className={cn(
          'hidden h-9 w-[220px] items-center gap-2 rounded-[10px] px-3 text-[12px] transition-colors focus-within:border-[#2E8B8B]/50 focus-within:ring-2 focus-within:ring-[#2E8B8B]/18 sm:flex md:w-[280px] xl:w-[340px]',
          isDark
            ? 'bg-[#34507F] text-[#D8E0EE] hover:bg-[#6B83AD]'
            : 'border border-[#D8E0EE] bg-[#F8FAFD] text-[#5A6675] hover:bg-[#EEF2F8] hover:text-[#1F3864]',
        )}
      >
        <Search size={12} />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search dashboards, KPIs..."
          className={cn(
            'min-w-0 flex-1 appearance-none border-0 bg-transparent text-[12px] font-[650] outline-none ring-0 placeholder:text-[#9AA6B4] focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-0 focus-visible:outline-none focus-visible:ring-0',
            isDark ? 'text-white' : 'text-[#0F1722]',
          )}
          style={{ outline: 'none', boxShadow: 'none' }}
        />
      </div>
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        aria-label="Open dashboard search"
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-[9px] transition-colors sm:hidden',
          isDark ? 'text-[#D8E0EE] hover:bg-[#34507F]' : 'border border-[#D8E0EE] bg-[#F8FAFD] text-[#1F3864] hover:bg-[#EEF2F8]',
        )}
      >
        <Search size={15} />
      </button>
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-[#08111F]/55 px-3 pt-[9vh] backdrop-blur-md sm:px-6 sm:pt-[11vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setSearchOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Global search"
              className="w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/70 bg-white/95 shadow-[0_28px_90px_rgba(8,17,31,0.34)] backdrop-blur-xl dark:border-[#263448] dark:bg-[#0B1728]/96"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="border-b border-[#E4E8EF] bg-gradient-to-r from-[#F8FAFD] to-white px-4 py-4 dark:border-[#263448] dark:from-[#0F1B2E] dark:to-[#0B1728] sm:px-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-[900] uppercase tracking-[0.14em] text-[#2E8B8B]">Command Center</p>
                    <h2 className="mt-0.5 text-[16px] font-[850] tracking-[-0.03em] text-[#0F1722] dark:text-white">
                      Search dashboards and insights
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="rounded-[10px] border border-[#D8E0EE] bg-white px-2.5 py-1.5 text-[11px] font-[800] text-[#5A6675] shadow-sm transition-colors hover:bg-[#EEF2F8] dark:border-[#263448] dark:bg-[#111827] dark:text-[#A8B6C8]"
                  >
                    ESC
                  </button>
                </div>
                <div className="flex h-12 items-center gap-3 rounded-[16px] border border-[#D8E0EE] bg-white px-4 shadow-[0_12px_30px_rgba(31,56,100,0.08)] dark:border-[#263448] dark:bg-[#111827]">
                  <Search size={18} className="flex-shrink-0 text-[#2E8B8B]" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search dashboards, KPIs, insights, filters..."
                    className="h-full flex-1 border-0 bg-transparent text-[15px] font-[650] text-[#0F1722] outline-none ring-0 placeholder:text-[#9AA6B4] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 dark:text-white"
                    style={{ outline: 'none', boxShadow: 'none' }}
                  />
                  <kbd className="hidden rounded-[8px] bg-[#EEF2F8] px-2 py-1 text-[10px] font-[800] text-[#6B83AD] sm:inline-flex dark:bg-[#0B1728]">
                    ⌘K
                  </kbd>
                </div>
              </div>
              <div className="max-h-[min(520px,58vh)] overflow-y-auto p-3 sm:p-4">
                <div className="mb-2 flex items-center justify-between px-1">
                  <p className="text-[11px] font-[850] uppercase tracking-[0.09em] text-[#6B7C99] dark:text-[#8EA3C1]">
                    {filteredSearchItems.length} results
                  </p>
                  <p className="hidden text-[11px] font-[650] text-[#9AA6B4] sm:block">
                    Press any result to navigate
                  </p>
                </div>
                {filteredSearchItems.length === 0 ? (
                  <div className="rounded-[18px] border border-dashed border-[#D8E0EE] px-4 py-12 text-center dark:border-[#263448]">
                    <p className="text-[14px] font-[800] text-[#0F1722] dark:text-white">No matching dashboard found</p>
                    <p className="mt-1 text-[12px] text-[#9AA6B4]">Try finance, attendance, research, placements, scholarships, or admissions.</p>
                  </div>
                ) : (
                  filteredSearchItems.map((item) => (
                    <motion.button
                      key={item.href}
                      type="button"
                      onClick={() => openResult(item.href)}
                      className="group mb-1.5 flex w-full items-center justify-between gap-4 rounded-[16px] border border-transparent px-3 py-3 text-left transition-all hover:border-[#D8E0EE] hover:bg-[#F8FAFD] hover:shadow-[0_10px_28px_rgba(31,56,100,0.08)] dark:hover:border-[#263448] dark:hover:bg-[#111827]"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[13px] bg-[#E8F5F5] text-[#2E8B8B]">
                          <Search size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-[850] text-[#0F1722] dark:text-white">{item.title}</span>
                          <span className="mt-0.5 block truncate text-[12px] font-[550] text-[#5A6675] dark:text-[#A8B6C8]">{item.subtitle}</span>
                        </span>
                      </span>
                      <span className="flex-shrink-0 rounded-full bg-[#EEF2F8] px-2.5 py-1 text-[11px] font-[850] text-[#2E8B8B] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-[#0B1728]">
                        Open
                      </span>
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Insights */}
      <button
        type="button"
        onClick={toggleAiInsights}
        aria-pressed={aiInsightsOpen}
        aria-label={aiInsightsOpen ? 'Disable AI insights' : 'Enable AI insights'}
        title={aiInsightsOpen ? 'Disable AI insights' : 'Enable AI insights'}
        className={cn(
          'flex h-9 w-9 items-center justify-center gap-1.5 rounded-[9px] px-0 text-[12px] font-[800] transition-all md:w-auto md:px-3',
          aiInsightsOpen
            ? 'bg-[#2E8B8B] text-white shadow-[0_8px_20px_rgba(46,139,139,0.24)]'
            : isDark
            ? 'bg-[#34507F] text-[#D8E0EE] hover:bg-[#6B83AD] hover:text-white'
            : 'border border-[#D8E0EE] bg-[#F8FAFD] text-[#1F3864] hover:bg-[#EEF2F8]',
        )}
      >
        <Sparkles size={13} />
        <span className="hidden md:inline">AI Insights</span>
      </button>

      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-[9px] transition-colors',
          isDark ? 'text-[#D8E0EE] hover:bg-[#34507F]' : 'border border-[#D8E0EE] bg-[#F8FAFD] text-[#1F3864] hover:bg-[#EEF2F8]',
        )}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Notifications */}
      <div className="relative flex-shrink-0">
        <button
          type="button"
          aria-label={`${notifCount} notifications`}
          onClick={() => runAction('Notifications opened', `${notifCount} priority alerts are ready for review.`)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[9px] transition-colors',
            isDark ? 'text-[#D8E0EE] hover:bg-[#34507F]' : 'border border-[#D8E0EE] bg-[#F8FAFD] text-[#1F3864] hover:bg-[#EEF2F8]',
          )}
        >
          <Bell size={16} />
        </button>
        {notifCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C55A11] flex items-center justify-center text-[9px] font-[800] text-white pointer-events-none">
            {notifCount}
          </span>
        )}
      </div>

      {/* User menu */}
      <div className="relative flex-shrink-0">
        <button
          type="button"
          onClick={() => { setShowUser((v) => !v); setShowPeriod(false); setShowScope(false) }}
          aria-label="User menu"
          className={cn(
            'flex h-9 items-center gap-2 rounded-[9px] px-2 transition-colors',
            isDark ? 'hover:bg-[#34507F]' : 'border border-[#D8E0EE] bg-[#F8FAFD] hover:bg-[#EEF2F8]',
          )}
          aria-expanded={showUser}
        >
          <div className="w-6 h-6 rounded-full bg-[#2E8B8B] flex items-center justify-center">
            <span className="text-[10px] font-[700] text-white">DR</span>
          </div>
          <span className={cn('hidden text-[12px] font-[650] md:block', isDark ? 'text-[#D8E0EE]' : 'text-[#1F3864]')}>Director</span>
          <ChevronDown size={12} className="text-[#6B83AD]" />
        </button>
        <AnimatePresence>
          {showUser && (
          <motion.div
            className="absolute right-0 top-10 w-44 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1 z-50"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-3 py-2 border-b border-[#F6F8FB]">
              <p className="text-[13px] font-[600] text-[#0F1722]">Dr. R. Sharma</p>
              <p className="text-[11px] text-[#9AA6B4]">Director, IIIT</p>
            </div>
            {[
              { icon: Settings, label: 'Preferences' },
              { icon: User, label: 'Profile' },
              { icon: LogOut, label: 'Sign out' },
            ].map(({ icon: Icon, label }) => (
              <motion.button
                key={label}
                type="button"
                onClick={() => {
                  setShowUser(false)
                  runAction(`${label} opened`, `${label} action is now active in this prototype.`)
                }}
                className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-[#2B3645] hover:bg-[#F6F8FB] transition-colors"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={13} className="text-[#9AA6B4]" />
                {label}
              </motion.button>
            ))}
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
