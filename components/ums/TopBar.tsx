'use client'
import { useState } from 'react'
import {
  Search,
  Bell,
  ChevronDown,
  Calendar,
  Zap,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title: string
  subtitle?: string
}

const PERIODS = ['Today', 'This Week', 'This Month', 'This Semester', 'AY 2024-25', 'AY 2023-24']
const SCOPES = ['All Programs', 'B.Tech', 'M.Tech', 'MBA', 'Ph.D', 'M.Sc']

export function TopBar({ title, subtitle }: TopBarProps) {
  const [period, setPeriod] = useState('AY 2024-25')
  const [scope, setScope] = useState('All Programs')
  const [showPeriod, setShowPeriod] = useState(false)
  const [showScope, setShowScope] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [notifCount] = useState(4)

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#1F3864] flex items-center px-4 gap-3 shadow-[0_1px_0_rgba(255,255,255,0.08)]">
      {/* Brand */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 rounded-[6px] bg-[#C55A11] flex items-center justify-center">
          <Zap size={14} className="text-white" fill="white" />
        </div>
        <div className="hidden sm:flex flex-col leading-none">
          <span className="text-[12px] font-[800] tracking-[0.08em] text-white uppercase">
            VoltusWave
          </span>
          <span className="text-[9px] font-[500] text-[#6B83AD] uppercase tracking-[0.06em]">
            UMS
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-[#34507F] mx-1 flex-shrink-0" />

      {/* Dashboard title */}
      <div className="flex flex-col leading-none min-w-0">
        <span className="text-[14px] font-[700] text-white truncate">{title}</span>
        {subtitle && (
          <span className="text-[11px] text-[#6B83AD] truncate">{subtitle}</span>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Global filters */}
      <div className="hidden lg:flex items-center gap-2">
        {/* Scope picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setShowScope((v) => !v); setShowPeriod(false) }}
            className="flex items-center gap-1.5 h-7 px-2.5 rounded-[6px] bg-[#34507F] hover:bg-[#6B83AD] text-[12px] font-[500] text-white transition-colors"
            aria-expanded={showScope}
          >
            {scope}
            <ChevronDown size={12} />
          </button>
          {showScope && (
            <div className="absolute right-0 top-9 w-36 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1 z-50">
              {SCOPES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-[13px] transition-colors',
                    s === scope
                      ? 'bg-[#EEF2F8] text-[#1F3864] font-[600]'
                      : 'text-[#2B3645] hover:bg-[#F6F8FB]',
                  )}
                  onClick={() => { setScope(s); setShowScope(false) }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Period picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => { setShowPeriod((v) => !v); setShowScope(false) }}
            className="flex items-center gap-1.5 h-7 px-2.5 rounded-[6px] bg-[#34507F] hover:bg-[#6B83AD] text-[12px] font-[500] text-white transition-colors"
            aria-expanded={showPeriod}
          >
            <Calendar size={12} />
            {period}
            <ChevronDown size={12} />
          </button>
          {showPeriod && (
            <div className="absolute right-0 top-9 w-40 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1 z-50">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={cn(
                    'w-full text-left px-3 py-1.5 text-[13px] transition-colors',
                    p === period
                      ? 'bg-[#EEF2F8] text-[#1F3864] font-[600]'
                      : 'text-[#2B3645] hover:bg-[#F6F8FB]',
                  )}
                  onClick={() => { setPeriod(p); setShowPeriod(false) }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <button
        type="button"
        aria-label="Search (⌘K)"
        className="hidden sm:flex items-center gap-2 h-7 px-3 rounded-[6px] bg-[#34507F] hover:bg-[#6B83AD] text-[12px] text-[#D8E0EE] transition-colors"
      >
        <Search size={12} />
        <span className="hidden md:inline">Search</span>
        <kbd className="hidden md:inline text-[10px] px-1 py-0.5 rounded bg-[#1F3864] text-[#6B83AD]">
          ⌘K
        </kbd>
      </button>

      {/* Notifications */}
      <div className="relative flex-shrink-0">
        <button
          type="button"
          aria-label={`${notifCount} notifications`}
          className="flex items-center justify-center w-8 h-8 rounded-[6px] text-[#D8E0EE] hover:bg-[#34507F] transition-colors"
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
          onClick={() => setShowUser((v) => !v)}
          aria-label="User menu"
          className="flex items-center gap-2 h-8 px-2 rounded-[6px] hover:bg-[#34507F] transition-colors"
          aria-expanded={showUser}
        >
          <div className="w-6 h-6 rounded-full bg-[#2E8B8B] flex items-center justify-center">
            <span className="text-[10px] font-[700] text-white">DR</span>
          </div>
          <span className="hidden md:block text-[12px] font-[500] text-[#D8E0EE]">Director</span>
          <ChevronDown size={12} className="text-[#6B83AD]" />
        </button>
        {showUser && (
          <div className="absolute right-0 top-10 w-44 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1 z-50">
            <div className="px-3 py-2 border-b border-[#F6F8FB]">
              <p className="text-[13px] font-[600] text-[#0F1722]">Dr. R. Sharma</p>
              <p className="text-[11px] text-[#9AA6B4]">Director, IIIT</p>
            </div>
            {[
              { icon: Settings, label: 'Preferences' },
              { icon: User, label: 'Profile' },
              { icon: LogOut, label: 'Sign out' },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-[#2B3645] hover:bg-[#F6F8FB] transition-colors"
              >
                <Icon size={13} className="text-[#9AA6B4]" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
