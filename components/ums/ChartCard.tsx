'use client'
import { useState, type ReactNode } from 'react'
import { Info, MoreHorizontal, Download, Maximize2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChartCardProps {
  title: string
  subtitle?: string
  tooltip?: string
  sourceTable?: string
  updatedAt?: string
  badge?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
  /** Full-bleed chart (removes internal padding) */
  flush?: boolean
}

export function ChartCard({
  title,
  subtitle,
  tooltip,
  sourceTable,
  updatedAt,
  badge,
  actions,
  children,
  className,
  flush = false,
}: ChartCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className={cn('chart-card rounded-[12px] bg-white flex flex-col', className)}>
      {/* ── Card header ── */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-[600] text-[#0F1722] leading-5 text-balance">
              {title}
            </h3>
            {badge}
            {tooltip && (
              <div className="relative">
                <button
                  type="button"
                  aria-label="More information"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                  className="text-[#9AA6B4] hover:text-[#5A6675] transition-colors"
                >
                  <Info size={14} />
                </button>
                {showTooltip && (
                  <div
                    role="tooltip"
                    className="absolute left-0 top-6 z-50 w-56 rounded-[8px] bg-[#14223D] px-3 py-2 text-[12px] text-white shadow-lg pointer-events-none"
                  >
                    {tooltip}
                  </div>
                )}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 text-[12px] text-[#9AA6B4] leading-4">{subtitle}</p>
          )}
        </div>

        {/* Actions slot + overflow menu */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {actions}
          <div className="relative">
            <button
              type="button"
              aria-label="Chart options"
              onClick={() => setShowMenu((v) => !v)}
              className="flex items-center justify-center w-7 h-7 rounded-[6px] text-[#9AA6B4] hover:bg-[#F6F8FB] hover:text-[#5A6675] transition-colors"
            >
              <MoreHorizontal size={15} />
            </button>
            {showMenu && (
              <div
                className="absolute right-0 top-8 z-50 w-40 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1"
                onBlur={() => setShowMenu(false)}
              >
                {[
                  { icon: Download, label: 'Export CSV' },
                  { icon: Download, label: 'Export PNG' },
                  { icon: Download, label: 'Export PDF' },
                  { icon: Maximize2, label: 'Fullscreen' },
                  { icon: RefreshCw, label: 'Refresh' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-[#2B3645] hover:bg-[#F6F8FB] transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    <Icon size={13} className="text-[#9AA6B4]" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Chart body ── */}
      <div className={cn('flex-1 min-h-0', flush ? '' : 'px-5 pt-4 pb-2')}>
        {children}
      </div>

      {/* ── Footer ── */}
      {(sourceTable || updatedAt) && (
        <div className="flex items-center justify-between px-5 pb-3 pt-1 gap-2 border-t border-[#F6F8FB] mt-1">
          {sourceTable && (
            <span className="text-[10.5px] text-[#9AA6B4] truncate">
              Source: {sourceTable}
            </span>
          )}
          {updatedAt && (
            <span className="text-[10.5px] text-[#9AA6B4] flex-shrink-0 ml-auto">
              Updated {updatedAt}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
