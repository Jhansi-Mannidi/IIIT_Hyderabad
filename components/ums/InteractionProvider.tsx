'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X } from 'lucide-react'

type DashboardFilters = Record<string, unknown>

interface Toast {
  id: string
  title: string
  description?: string
  tone?: 'success' | 'info'
}

interface InteractionContextValue {
  searchQuery: string
  setSearchQuery: (query: string) => void
  aiInsightsOpen: boolean
  setAiInsightsOpen: (open: boolean) => void
  toggleAiInsights: () => void
  filtersByDashboard: Record<string, DashboardFilters>
  setDashboardFilters: (dashboard: string, filters: DashboardFilters) => void
  refreshDashboard: (dashboard: string) => void
  runAction: (title: string, description?: string) => void
}

const InteractionContext = createContext<InteractionContextValue | null>(null)

function getActiveFilterCount(filters: DashboardFilters) {
  return Object.values(filters).filter((value) => {
    if (value === undefined || value === null || value === '') return false
    if (typeof value === 'number') return value !== 0
    if (typeof value === 'string') {
      return !['All', 'All Programs', 'All Semesters', 'All Statuses', 'All Categories'].includes(value)
    }
    return true
  }).length
}

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [aiInsightsOpen, setAiInsightsOpen] = useState(false)
  const [filtersByDashboard, setFiltersByDashboard] = useState<Record<string, DashboardFilters>>({})
  const [toasts, setToasts] = useState<Toast[]>([])

  const pushToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { ...toast, id }].slice(-4))
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id))
    }, 3200)
  }, [])

  const setDashboardFilters = useCallback(
    (dashboard: string, filters: DashboardFilters) => {
      setFiltersByDashboard((current) => ({ ...current, [dashboard]: filters }))
      const count = getActiveFilterCount(filters)
      pushToast({
        title: count > 0 ? `${dashboard} filters applied` : `${dashboard} filters cleared`,
        description: count > 0 ? `${count} active filter${count === 1 ? '' : 's'} now shaping this dashboard.` : undefined,
      })
    },
    [pushToast],
  )

  const refreshDashboard = useCallback(
    (dashboard: string) => {
      pushToast({
        tone: 'success',
        title: `${dashboard} refreshed`,
        description: 'Latest dashboard calculations are visible in the current view.',
      })
    },
    [pushToast],
  )

  const runAction = useCallback(
    (title: string, description?: string) => {
      pushToast({ tone: 'success', title, description })
    },
    [pushToast],
  )

  const toggleAiInsights = useCallback(() => {
    setAiInsightsOpen((current) => {
      const next = !current
      pushToast({
        title: next ? 'AI Insights enabled' : 'AI Insights disabled',
        description: next
          ? 'The AI insights rail is now visible for the dashboard.'
          : 'The dashboard is now in focused mode without the AI rail.',
      })
      return next
    })
  }, [pushToast])

  const value = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      aiInsightsOpen,
      setAiInsightsOpen,
      toggleAiInsights,
      filtersByDashboard,
      setDashboardFilters,
      refreshDashboard,
      runAction,
    }),
    [
      aiInsightsOpen,
      filtersByDashboard,
      refreshDashboard,
      runAction,
      searchQuery,
      setDashboardFilters,
      toggleAiInsights,
    ],
  )

  return (
    <InteractionContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-16 z-[80] flex w-[320px] max-w-[calc(100vw-2rem)] flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 28, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 28, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              className="rounded-[12px] border border-[#D8E0EE] bg-white/95 p-3 shadow-[0_18px_45px_rgba(15,23,34,0.16)] backdrop-blur dark:border-[#263448] dark:bg-[#111827]/95"
            >
              <div className="flex items-start gap-2">
                {toast.tone === 'success' ? (
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[#2E8B8B]" />
                ) : (
                  <Info size={16} className="mt-0.5 flex-shrink-0 text-[#1F3864] dark:text-[#8FE0DE]" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-[700] text-[#0F1722]">{toast.title}</p>
                  {toast.description && (
                    <p className="mt-0.5 text-[12px] leading-4 text-[#5A6675]">{toast.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Dismiss notification"
                  onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
                  className="rounded-[6px] p-1 text-[#9AA6B4] hover:bg-[#EEF2F8] hover:text-[#5A6675]"
                >
                  <X size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </InteractionContext.Provider>
  )
}

export function useInteractions() {
  const context = useContext(InteractionContext)
  if (!context) {
    throw new Error('useInteractions must be used within InteractionProvider')
  }

  return context
}
