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

const BADGE_COLOR = {
  warning: 'bg-[#C55A11] text-white',
  danger:  'bg-[#C0392B] text-white',
  info:    'bg-[#2F6FB0] text-white',
}

interface SideNavProps {
  activeId?: string
  onNavigate?: (id: string) => void
}

export function SideNav({ activeId = 'd0', onNavigate }: SideNavProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex flex-col bg-[#14223D] border-r border-[#1F3864] transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-14' : 'w-56',
      )}
      aria-label="Domain navigation"
    >
      {/* Collapse toggle */}
      <div className="flex items-center justify-end px-2 py-2 border-b border-[#1F3864]">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          className="flex items-center justify-center w-7 h-7 rounded-[6px] text-[#6B83AD] hover:bg-[#1F3864] hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2" aria-label="Dashboards">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.id === activeId

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                'group relative flex items-center gap-3 w-full px-3 py-2 text-left transition-all duration-150',
                isActive
                  ? 'bg-[#1F3864] text-white'
                  : 'text-[#9AA6B4] hover:bg-[#1F3864] hover:text-white',
                collapsed ? 'justify-center px-0' : '',
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-[#2E8B8B]" />
              )}

              <Icon
                size={16}
                className={cn(
                  'flex-shrink-0',
                  isActive ? 'text-white' : 'text-[#6B83AD] group-hover:text-white',
                )}
              />

              {!collapsed && (
                <span className="text-[13px] font-[500] truncate flex-1 leading-5">
                  {item.label}
                </span>
              )}

              {/* Badge */}
              {item.badge && !collapsed && (
                <span
                  className={cn(
                    'text-[9px] font-[800] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0',
                    BADGE_COLOR[item.badgeType ?? 'info'],
                  )}
                  aria-label={`${item.badgeType} alert`}
                >
                  !
                </span>
              )}
              {item.badge && collapsed && (
                <span
                  className={cn(
                    'absolute top-1 right-1 w-2 h-2 rounded-full',
                    item.badgeType === 'danger' ? 'bg-[#C0392B]' : 'bg-[#C55A11]',
                  )}
                  aria-label={`${item.badgeType} alert`}
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-[#1F3864]">
          <p className="text-[10px] text-[#34507F] uppercase tracking-[0.06em]">
            VoltusWave UMS v1.0
          </p>
        </div>
      )}
    </aside>
  )
}
