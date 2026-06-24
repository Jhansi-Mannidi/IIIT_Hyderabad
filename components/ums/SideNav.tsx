'use client'
import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Landmark,
  UserCheck,
  Home,
  ClipboardCheck,
  FlaskConical,
  Briefcase,
  HandCoins,
  MessageSquare,
  Filter,
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
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Executive',
    items: [{ id: 'd0', label: 'Executive Cockpit', icon: LayoutDashboard }],
  },
  {
    title: 'Academic',
    items: [
      { id: 'd1', label: 'Academic Performance', icon: BookOpen },
      { id: 'd2', label: 'Admissions Funnel', icon: Filter },
    ],
  },
  {
    title: 'Finance',
    items: [
      { id: 'd3', label: 'Fee Realization', icon: CreditCard },
      { id: 'd4', label: 'Finance & Budget', icon: Landmark },
      { id: 'd11', label: 'Scholarships & Aid', icon: HandCoins },
    ],
  },
  {
    title: 'People & Campus',
    items: [
      { id: 'd5', label: 'HR & Workforce', icon: UserCheck },
      { id: 'd6', label: 'Hostel & Mess', icon: Home },
      { id: 'd7', label: 'Attendance & Biometric', icon: ClipboardCheck },
    ],
  },
  {
    title: 'Outcomes & Quality',
    items: [
      { id: 'd8', label: 'Research', icon: FlaskConical },
      { id: 'd9', label: 'Placements', icon: Briefcase },
      { id: 'd10', label: 'Feedback & Quality', icon: MessageSquare },
    ],
  },
]

const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items)

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
          'group relative flex items-center gap-3 rounded-[10px] text-left transition-all duration-200',
          isActive
            ? isDark
              ? 'bg-[#1F3864] text-white shadow-[0_10px_24px_rgba(0,0,0,0.20)]'
              : 'bg-[#1F3864] text-white shadow-[0_10px_24px_rgba(31,56,100,0.18)]'
            : isDark
            ? 'text-[#A8B6C8] hover:bg-[#102344] hover:text-white'
            : 'text-[#3B4656] hover:bg-[#EEF2F8] hover:text-[#1F3864]',
          collapsed
            ? 'mx-auto my-1 h-11 w-11 justify-center px-0'
            : 'mx-2 my-0.5 min-h-10 w-[calc(100%-1rem)] px-3 py-2',
        )}
        whileHover={shouldReduceMotion ? undefined : { x: collapsed ? 0 : 3 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.16 }}
      >
        <span
          className={cn(
            'flex h-6 w-6 flex-shrink-0 items-center justify-center transition-colors',
            isActive
              ? 'text-white'
              : isDark
              ? 'text-[#8EA3C1] group-hover:text-white'
              : 'text-[#5A6675] group-hover:text-[#1F3864]',
          )}
        >
          <Icon size={collapsed ? 18 : 16} strokeWidth={1.9} />
        </span>

        {!collapsed && (
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-[14px] font-[650] leading-5">
              {item.label}
            </span>
          </span>
        )}
      </motion.button>
    )
  }

  return (
    <aside
      className={cn(
        'fixed bottom-0 left-0 top-14 z-[60] flex flex-col transition-all duration-300 flex-shrink-0 sm:static sm:top-auto sm:bottom-auto sm:z-auto',
        isDark
          ? 'bg-[#07101D] border-r border-[#263448]'
          : 'bg-white border-r border-[#D8E0EE]',
        collapsed ? 'w-20' : 'w-72 sm:w-72',
        mobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0',
      )}
      data-theme={theme}
      aria-label="Domain navigation"
    >
      {/* Collapse toggle */}
      <div
        className={cn(
          'flex min-h-8 items-center py-1',
          collapsed ? 'justify-center px-2' : 'justify-end px-2',
          isDark ? 'border-b border-[#263448]' : 'border-b border-[#EEF2F8]',
        )}
      >
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          className={cn(
            'flex items-center justify-center rounded-[10px] transition-all',
            collapsed ? 'h-9 w-9' : 'h-7 w-7',
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
        {collapsed
          ? NAV_ITEMS.map(renderNavItem)
          : NAV_GROUPS.map((group) => (
              <div key={group.title} className="mb-5 last:mb-2">
                <p
                  className={cn(
                    'mb-1 px-2 text-[11px] font-[800] uppercase tracking-[0.08em]',
                    isDark ? 'text-[#6B83AD]' : 'text-[#8A95A3]',
                  )}
                >
                  {group.title}
                </p>
                <div className="space-y-1">{group.items.map(renderNavItem)}</div>
              </div>
            ))}
      </nav>

      {/* Footer */}
      <div
        className={cn(
          collapsed ? 'px-2 pb-5 pt-3 sm:pb-3' : 'px-3 pb-5 pt-3 sm:pb-3',
          isDark ? 'border-t border-[#263448]' : 'border-t border-[#D8E0EE]',
        )}
      >
        {!collapsed && (
          <p
            className={cn(
              'px-1 text-[11px] font-[600]',
              isDark ? 'text-[#6B83AD]' : 'text-[#8A95A3]',
            )}
          >
            Analytics-first ERP · v1.0
          </p>
        )}
      </div>
    </aside>
  )
}
