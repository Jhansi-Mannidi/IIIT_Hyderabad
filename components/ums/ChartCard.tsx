'use client'
import { useRef, useState, type ReactNode } from 'react'
import { Info, MoreHorizontal, Download, Maximize2, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useInteractions } from './InteractionProvider'

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
  const cardRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { runAction } = useInteractions()

  const handleExport = (format: 'CSV' | 'PNG' | 'PDF') => {
    if (format === 'CSV') {
      const blob = new Blob(
        [
          [
            'Title',
            'Subtitle',
            'Source',
            'Updated At',
            'Exported At',
          ].join(','),
          [
            title,
            subtitle ?? '',
            sourceTable ?? '',
            updatedAt ?? '',
            new Date().toISOString(),
          ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','),
        ].join('\n'),
        { type: 'text/csv;charset=utf-8' },
      )
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'chart'}-export.csv`
      anchor.click()
      URL.revokeObjectURL(url)
    }

    runAction(`${format} export ready`, `${title} has been prepared for ${format} export.`)
    setShowMenu(false)
  }

  const handleFullscreen = async () => {
    if (!cardRef.current) return

    if (!document.fullscreenElement) {
      await cardRef.current.requestFullscreen()
      runAction('Fullscreen opened', `${title} is now in focused fullscreen mode.`)
    } else {
      await document.exitFullscreen()
      runAction('Fullscreen closed')
    }

    setShowMenu(false)
  }

  const handleRefresh = () => {
    runAction('Card refreshed', `${title} recalculated with the current filters.`)
    setShowMenu(false)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn('chart-card rounded-[12px] bg-white flex flex-col', className)}
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.006 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
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
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      role="tooltip"
                      className="absolute left-0 top-6 z-50 w-56 rounded-[8px] bg-[#14223D] px-3 py-2 text-[12px] text-white shadow-lg pointer-events-none"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: -4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {tooltip}
                    </motion.div>
                  )}
                </AnimatePresence>
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
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  className="absolute right-0 top-8 z-50 w-40 rounded-[8px] bg-white border border-[#E4E8EF] shadow-lg py-1"
                  onBlur={() => setShowMenu(false)}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  {[
                    { icon: Download, label: 'Export CSV', action: () => handleExport('CSV') },
                    { icon: Download, label: 'Export PNG', action: () => handleExport('PNG') },
                    { icon: Download, label: 'Export PDF', action: () => handleExport('PDF') },
                    { icon: Maximize2, label: 'Fullscreen', action: handleFullscreen },
                    { icon: RefreshCw, label: 'Refresh', action: handleRefresh },
                  ].map(({ icon: Icon, label, action }) => (
                    <motion.button
                      key={label}
                      type="button"
                      className="flex items-center gap-2 w-full px-3 py-1.5 text-[13px] text-[#2B3645] hover:bg-[#F6F8FB] transition-colors"
                      onClick={action}
                      whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <Icon size={13} className="text-[#9AA6B4]" />
                      {label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Chart body ── */}
      <div className={cn('ums-chart-card-body flex-1 min-h-0 min-w-0', flush ? '' : 'px-5 pt-4 pb-2')}>
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
    </motion.div>
  )
}
