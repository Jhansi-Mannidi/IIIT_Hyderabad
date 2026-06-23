'use client'
import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Building2,
  UserCheck,
  Home,
  ClipboardCheck,
  FlaskConical,
  Briefcase,
  Star,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from './ThemeProvider'

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge?: string
  badgeType?: 'warning' | 'danger' | 'info'
}

const NAV_ITEMS: NavItem[] = [
  { id: 'd0', label: 'Executive Cockpit', icon: LayoutDashboard },
  { id: 'd1', label: 'Academic Performance', icon: BookOpen, badge: '!', badgeType: 'warning' },
  { id: 'd2', label: 'Admissions Funnel', icon: Users },
  { id: 'd3', label: 'Student Finance', icon: CreditCard, badge: '!', badgeType: 'danger' },
  { id: 'd4', label: 'Institutional Finance', icon: Building2 },
  { id: 'd5', label: 'HR & Workforce', icon: UserCheck, badge: '!', badgeType: 'warning' },
  { id: 'd6', label: 'Hostel & Mess', icon: Home },
  { id: 'd7', label: 'Attendance & Biometric', icon: ClipboardCheck, badge: '!', badgeType: 'warning' },
  { id: 'd8', label: 'Research & Publications', icon: FlaskConical },
  { id: 'd9', label: 'Placements', icon: Briefcase },
  { id: 'd10', label: 'Feedback & IQAC', icon: Star },
  { id: 'd11', label: 'Scholarships & Aid', icon: GraduationCap },
]

const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter((item) => !['d10', 'd11'].includes(item.id))

const BADGE_COLOR = {
  warning: 'bg-[#C55A11] text-white',
  danger:  'bg-[#C0392B] text-white',
  info:    'bg-[#2F6FB0] text-white',
}

interface SideNavProps {
  activeId?: string
  onNavigate?: (id: string) => void
  mobileOpen?: boolean
}

export function SideNav({ activeId = 'd0', onNavigate, mobileOpen = false }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon
    const isActive = item.id === activeId

    return (
      <motion.button
        key={item.id}
        type="button"
        onClick={() => onNavigate?.(item.id)}
        aria-current={isActive ? 'page' : undefined}
        title={collapsed ? item.label : undefined}
        className={cn(
          'group relative flex items-center gap-3 rounded-[14px] text-left transition-all duration-200',
          isActive
            ? isDark
              ? 'bg-gradient-to-r from-[#1F3864] to-[#16315B] text-white shadow-[0_14px_28px_rgba(31,56,100,0.34),inset_0_1px_0_rgba(255,255,255,0.10)]'
              : 'bg-gradient-to-r from-[#1F3864] to-[#2A4A7D] text-white shadow-[0_14px_30px_rgba(31,56,100,0.22)]'
            : isDark
            ? 'text-[#9AA6B4] hover:bg-[#102344] hover:text-white'
            : 'text-[#2B3645] hover:bg-[#EEF2F8] hover:text-[#1F3864]',
          collapsed
            ? 'mx-auto my-1 h-11 w-11 justify-center rounded-[14px] px-0'
            : 'mx-2 my-1 min-h-11 w-[calc(100%-1rem)] px-3.5 py-2',
        )}
        whileHover={shouldReduceMotion ? undefined : { x: collapsed ? 0 : 3 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.16 }}
      >
        {isActive && (
          <motion.span
            layoutId="side-nav-active-indicator"
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-r-full bg-[#2E8B8B]',
              collapsed ? '-left-2 h-6 w-1' : 'left-0 h-5 w-0.5',
            )}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        <span
          className={cn(
            'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[10px] transition-colors',
            isActive
              ? 'bg-white/14 text-white'
              : isDark
              ? 'bg-[#102344] text-[#8EA3C1] group-hover:bg-[#1F3864] group-hover:text-white'
              : 'bg-[#EEF2F8] text-[#6B83AD] group-hover:bg-white group-hover:text-[#1F3864]',
          )}
        >
          <Icon size={collapsed ? 18 : 15} />
        </span>

        {!collapsed && (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-[13px] font-[700] leading-5">
              {item.label}
            </span>
            {item.badge && (
              <span
                className={cn(
                  'ml-auto inline-flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full px-1 text-[9px] font-[800] shadow-[0_6px_14px_rgba(197,90,17,0.22)]',
                  BADGE_COLOR[item.badgeType ?? 'info'],
                )}
                aria-label={`${item.badgeType} alert`}
              >
                !
              </span>
            )}
          </span>
        )}
        {item.badge && collapsed && (
          <span
            className={cn(
              'absolute rounded-full ring-2',
              collapsed ? 'right-1.5 top-1.5 h-2.5 w-2.5' : 'right-1 top-1 h-2 w-2',
              isDark ? 'ring-[#07101D]' : 'ring-white',
              item.badgeType === 'danger' ? 'bg-[#C0392B]' : 'bg-[#C55A11]',
            )}
            aria-label={`${item.badgeType} alert`}
          />
        )}
      </motion.button>
    )
  }

  return (
    <aside
      className={cn(
        'fixed bottom-0 left-0 top-14 z-[60] flex flex-col transition-all duration-300 flex-shrink-0 backdrop-blur-xl sm:static sm:top-auto sm:bottom-auto sm:z-auto',
        isDark
          ? 'bg-[#07101D]/95 border-r border-[#1F3864]/70 shadow-[12px_0_32px_rgba(8,17,31,0.34)]'
          : 'bg-white/86 border-r border-[#D8E0EE] shadow-[12px_0_34px_rgba(31,56,100,0.10)]',
        collapsed ? 'w-20' : 'w-72 sm:w-64',
        mobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0',
      )}
      data-theme={theme}
      aria-label="Domain navigation"
    >
      {/* Collapse toggle */}
      <div
        className={cn(
          'flex min-h-11 items-center py-2',
          collapsed ? 'justify-center px-2' : 'px-3',
          isDark ? 'border-b border-[#1F3864]/70' : 'border-b border-[#D8E0EE]',
        )}
      >
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                'text-[10px] font-[800] uppercase tracking-[0.12em]',
                isDark ? 'text-[#6B83AD]' : 'text-[#6B83AD]',
              )}
            >
              Navigation
            </p>
            <p
              className={cn(
                'truncate text-[11px] font-[600]',
                isDark ? 'text-[#D8E0EE]' : 'text-[#1F3864]',
              )}
            >
              Dashboard Modules
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          className={cn(
            'flex items-center justify-center rounded-[10px] transition-all',
            collapsed ? 'h-9 w-9 shadow-[0_8px_18px_rgba(31,56,100,0.10)]' : 'h-7 w-7',
            isDark
              ? 'text-[#8EA3C1] hover:bg-[#1F3864] hover:text-white'
              : 'text-[#6B83AD] hover:bg-[#EEF2F8] hover:text-[#1F3864]',
          )}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Nav items */}
      <nav
        className={cn('flex-1 min-h-0 overflow-y-auto py-3', collapsed ? 'px-2' : 'px-1')}
        aria-label="Dashboards"
      >
        {PRIMARY_NAV_ITEMS.map(renderNavItem)}
      </nav>

      {/* Footer */}
      <div
        className={cn(
          collapsed ? 'px-2 pb-5 pt-3 sm:pb-3' : 'px-3 pb-5 pt-3 sm:pb-3',
          isDark ? 'border-t border-[#1F3864]/70' : 'border-t border-[#D8E0EE]',
        )}
      >
        <motion.div
          className={cn(
            'flex items-center rounded-[12px] transition-colors',
            collapsed ? 'mx-auto h-12 w-12 justify-center p-1.5' : 'gap-3 p-2.5',
            isDark
              ? 'bg-[#0B1728]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
              : 'bg-[#F6F8FB] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]',
          )}
        >
          <div
            className={cn(
              'relative flex flex-shrink-0 items-center justify-center rounded-full bg-[#2E8B8B] font-[800] text-white shadow-[0_8px_18px_rgba(46,139,139,0.26)]',
              collapsed ? 'h-9 w-9 text-[10px]' : 'h-8 w-8 text-[11px]',
            )}
          >
            DR
            <span
              className={cn(
                'absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2',
                isDark ? 'border-[#0B1728] bg-[#4A9B7F]' : 'border-[#F6F8FB] bg-[#4A9B7F]',
              )}
            />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p
                  className={cn(
                    'truncate text-[12px] font-[800] leading-4',
                    isDark ? 'text-white' : 'text-[#0F1722]',
                  )}
                >
                  Director
                </p>
                <span className="rounded-full bg-[#E7F2F2] px-1.5 py-0.5 text-[8px] font-[800] uppercase tracking-[0.06em] text-[#246B6B]">
                  Live
                </span>
              </div>
              <p
                className={cn(
                  'truncate text-[10.5px] font-[600] leading-4',
                  isDark ? 'text-[#8EA3C1]' : 'text-[#6B83AD]',
                )}
              >
                Executive Workspace
              </p>
            </div>
          )}
        </motion.div>
        {!collapsed && (
          <p
            className={cn(
              'mt-2 px-1 text-[10px] uppercase tracking-[0.06em]',
              isDark ? 'text-[#34507F]' : 'text-[#6B83AD]',
            )}
          >
            VoltusWave UMS v1.0
          </p>
        )}
      </div>
    </aside>
  )
}
