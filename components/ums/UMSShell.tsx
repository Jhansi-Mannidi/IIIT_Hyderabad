'use client'
import { useState } from 'react'
import { TopBar } from './TopBar'
import { SideNav } from './SideNav'
import { ExecutiveCockpit } from './ExecutiveCockpit'
import { AcademicDashboard } from './AcademicDashboard'
import { AdmissionsDashboard } from './AdmissionsDashboard'
import { FinanceDashboard } from './FinanceDashboard'
import { InstitutionalFinanceDashboard } from './InstitutionalFinanceDashboard'
import { HRPayrollDashboard } from './HRPayrollDashboard'
import { HostelMessDashboard } from './HostelMessDashboard'
import { AttendanceDashboard } from './AttendanceDashboard'
import { ResearchDashboard }    from './ResearchDashboard'
import { PlacementsDashboard }  from './PlacementsDashboard'
import { FeedbackIQACDashboard } from './FeedbackIQACDashboard'
import { ScholarshipsAidDashboard } from './ScholarshipsAidDashboard'
import { useRouter, usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

const DASHBOARD_TITLES: Record<string, { title: string; subtitle: string }> = {
  d0:  { title: 'Executive Cockpit', subtitle: 'Institutional overview — all domains' },
  d1:  { title: 'Academic Performance', subtitle: 'Courses · Grades · Outcomes' },
  d2:  { title: 'Admissions Funnel', subtitle: 'Applications · Conversions · Enrollments' },
  d3:  { title: 'Student Finance', subtitle: 'Fees · Dues · Collections' },
  d4:  { title: 'Institutional Finance', subtitle: 'Budget · Cost Centers · Projects' },
  d5:  { title: 'HR, Payroll & Workforce', subtitle: 'Leave · Appraisals · Attrition' },
  d6:  { title: 'Hostel & Mess', subtitle: 'Occupancy · Billing · Complaints' },
  d7:  { title: 'Attendance & Biometric', subtitle: 'Attendance · Defaulters · Compliance' },
  d8:  { title: 'Research & Publications', subtitle: 'Projects · Papers · Grants' },
  d9:  { title: 'Placements', subtitle: 'Offers · Packages · Recruiters' },
  d10: { title: 'Feedback & IQAC', subtitle: 'Ratings · NAAC · Improvement areas' },
  d11: { title: 'Scholarships & Aid', subtitle: 'Categories · Disbursals · Coverage' },
}

const ROUTE_MAP: Record<string, string> = {
  d0: '/',
  d1: '/dashboard/academic',
  d2: '/dashboard/admissions',
  d3: '/dashboard/finance',
  d4: '/dashboard/institutional-finance',
  d5: '/dashboard/hr-payroll',
  d6: '/dashboard/hostel-mess',
  d7: '/dashboard/attendance',
  d8: '/dashboard/research',
  d9: '/dashboard/placements',
  d10: '/dashboard/feedback',
  d11: '/dashboard/scholarships',
}

function ComingSoon({ id }: { id: string }) {
  const meta = DASHBOARD_TITLES[id]
  return (
    <div className="flex-1 flex items-center justify-center text-center px-8">
      <div>
        <div className="w-12 h-12 rounded-[12px] bg-[#EEF2F8] flex items-center justify-center mx-auto mb-4">
          <span className="text-[20px] font-[800] text-[#1F3864]">D{id.slice(1)}</span>
        </div>
        <h2 className="text-[20px] font-[700] text-[#0F1722]">{meta?.title}</h2>
        <p className="text-[14px] text-[#9AA6B4] mt-1 mb-6">{meta?.subtitle}</p>
        <span className="inline-block px-4 py-2 rounded-[8px] bg-[#EEF2F8] text-[13px] font-[600] text-[#1F3864]">
          Coming in Part 2 — D{id.slice(1)} Dashboard Prompt
        </span>
      </div>
    </div>
  )
}

interface UMSShellProps {
  currentPage?: string
  children?: React.ReactNode
}

export function UMSShell({ currentPage, children }: UMSShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  
  // Determine active ID from route or prop
  let activeId = 'd0'
  if (currentPage) {
    if (currentPage === 'academic') activeId = 'd1'
    else if (currentPage === 'admissions') activeId = 'd2'
    else if (currentPage === 'finance') activeId = 'd3'
    else if (currentPage === 'institutional-finance') activeId = 'd4'
    else if (currentPage === 'hr-payroll') activeId = 'd5'
    else if (currentPage === 'hostel-mess') activeId = 'd6'
    else if (currentPage === 'attendance') activeId = 'd7'
    else if (currentPage === 'research')    activeId = 'd8'
    else if (currentPage === 'placements')  activeId = 'd9'
    else if (currentPage === 'feedback') activeId = 'd10'
    else if (currentPage === 'scholarships') activeId = 'd11'
  } else if (pathname?.includes('academic')) {
    activeId = 'd1'
  } else if (pathname?.includes('admissions')) {
    activeId = 'd2'
  } else if (pathname?.includes('institutional-finance')) {
    activeId = 'd4'
  } else if (pathname?.includes('hr-payroll')) {
    activeId = 'd5'
  } else if (pathname?.includes('hostel-mess')) {
    activeId = 'd6'
  } else if (pathname?.includes('attendance')) {
    activeId = 'd7'
  } else if (pathname?.includes('research')) {
    activeId = 'd8'
  } else if (pathname?.includes('placements')) {
    activeId = 'd9'
  } else if (pathname?.includes('feedback')) {
    activeId = 'd10'
  } else if (pathname?.includes('scholarships')) {
    activeId = 'd11'
  } else if (pathname?.includes('finance')) {
    activeId = 'd3'
  }

  const meta = DASHBOARD_TITLES[activeId]
  const dashboardContent = children ? (
    children
  ) : activeId === 'd0' ? (
    <ExecutiveCockpit />
  ) : activeId === 'd1' ? (
    <AcademicDashboard />
  ) : activeId === 'd2' ? (
    <AdmissionsDashboard />
  ) : activeId === 'd3' ? (
    <FinanceDashboard />
  ) : activeId === 'd4' ? (
    <InstitutionalFinanceDashboard />
  ) : activeId === 'd5' ? (
    <HRPayrollDashboard />
  ) : activeId === 'd6' ? (
    <HostelMessDashboard />
  ) : activeId === 'd7' ? (
    <AttendanceDashboard />
  ) : activeId === 'd8' ? (
    <ResearchDashboard />
  ) : activeId === 'd9' ? (
    <PlacementsDashboard />
  ) : activeId === 'd10' ? (
    <FeedbackIQACDashboard />
  ) : activeId === 'd11' ? (
    <ScholarshipsAidDashboard />
  ) : (
    <ComingSoon id={activeId} />
  )

  const handleNavigate = (id: string) => {
    const route = ROUTE_MAP[id]
    setMobileNavOpen(false)
    router.push(route || '/')
  }

  return (
    <div
      className="ums-app-shell flex flex-col h-screen overflow-hidden bg-[#F6F8FB] transition-colors duration-300"
      data-theme={theme}
    >
      {/* Top bar */}
      <TopBar onMenuClick={() => setMobileNavOpen(true)} />

      {/* Body */}
      <div className="ums-mobile-scroll-stage flex flex-1 min-h-0 overflow-hidden sm:overflow-hidden">
        {mobileNavOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-x-0 bottom-0 top-14 z-[55] bg-[#08111F]/45 backdrop-blur-[2px] sm:hidden"
          />
        )}

        {/* Side nav */}
        <SideNav
          activeId={activeId}
          onNavigate={handleNavigate}
          mobileOpen={mobileNavOpen}
        />

        {/* Dashboard content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={pathname ?? activeId}
            className="flex min-w-0 flex-1 min-h-0 overflow-auto sm:overflow-hidden"
            id="main-content"
            initial={false}
            animate={{ opacity: 1, x: 0, filter: 'none' }}
            exit={{ opacity: 1, x: 0, filter: 'none' }}
            transition={{ duration: 0 }}
          >
            {dashboardContent}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  )
}
