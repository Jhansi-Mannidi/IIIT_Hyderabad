'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useTheme } from './ThemeProvider'

type DashboardFilters = Record<string, unknown>
type ToastTone = 'success' | 'info'

const DEFAULT_GLOBAL_FILTERS: DashboardFilters = {
  scope: 'All Programs',
  period: 'AY 2024-25',
}

interface InteractionContextValue {
  searchQuery: string
  setSearchQuery: (query: string) => void
  aiInsightsOpen: boolean
  setAiInsightsOpen: (open: boolean) => void
  toggleAiInsights: () => void
  globalFilters: DashboardFilters
  setGlobalFilters: (filters: DashboardFilters) => void
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
  const [globalFilters, setGlobalFiltersState] = useState<DashboardFilters>(DEFAULT_GLOBAL_FILTERS)
  const [filtersByDashboard, setFiltersByDashboard] = useState<Record<string, DashboardFilters>>({})
  const { theme } = useTheme()

  const pushToast = useCallback((title: string, description?: string, tone: ToastTone = 'info') => {
    const message = (
      <div>
        <p className="text-[13px] font-[800]">{title}</p>
        {description && <p className="mt-0.5 text-[12px] leading-4 opacity-80">{description}</p>}
      </div>
    )
    const options = {
      autoClose: 3200,
      position: 'bottom-right' as const,
    }

    if (tone === 'success') {
      toast.success(message, options)
      return
    }

    toast.info(message, options)
  }, [])

  const setDashboardFilters = useCallback(
    (dashboard: string, filters: DashboardFilters) => {
      setFiltersByDashboard((current) => ({ ...current, [dashboard]: filters }))
      const count = getActiveFilterCount(filters)
      pushToast(
        count > 0 ? `${dashboard} filters applied` : `${dashboard} filters cleared`,
        count > 0 ? `${count} active filter${count === 1 ? '' : 's'} now shaping this dashboard.` : undefined,
      )
    },
    [pushToast],
  )

  const setGlobalFilters = useCallback(
    (filters: DashboardFilters) => {
      setGlobalFiltersState(filters)
      const count = getActiveFilterCount(filters)
      pushToast('Global filters applied', `${count} global filter${count === 1 ? '' : 's'} now shaping every dashboard.`)
    },
    [pushToast],
  )

  const refreshDashboard = useCallback(
    (dashboard: string) => {
      pushToast(`${dashboard} refreshed`, 'Latest dashboard calculations are visible in the current view.', 'success')
    },
    [pushToast],
  )

  const runAction = useCallback(
    (title: string, description?: string) => {
      pushToast(title, description, 'success')
    },
    [pushToast],
  )

  const toggleAiInsights = useCallback(() => {
    setAiInsightsOpen((current) => {
      const next = !current
      pushToast(
        next ? 'AI Insights enabled' : 'AI Insights disabled',
        next
          ? 'The AI insights rail is now visible for the dashboard.'
          : 'The dashboard is now in focused mode without the AI rail.',
      )
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
      globalFilters,
      setGlobalFilters,
      filtersByDashboard,
      setDashboardFilters,
      refreshDashboard,
      runAction,
    }),
    [
      aiInsightsOpen,
      filtersByDashboard,
      globalFilters,
      refreshDashboard,
      runAction,
      searchQuery,
      setDashboardFilters,
      setGlobalFilters,
      toggleAiInsights,
    ],
  )

  return (
    <InteractionContext.Provider value={value}>
      {children}
      <ToastContainer
        closeButton
        autoClose={3200}
        closeOnClick
        draggable
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        position="bottom-right"
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
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
