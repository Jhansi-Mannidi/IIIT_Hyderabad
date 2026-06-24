'use client'
import { useState, useMemo } from 'react'
import { RefreshCw } from 'lucide-react'
import { useAdmissionsDashboardData } from '@/lib/useAdmissionsDashboardData'
import { AdmissionsFilterBar, AdmissionsFilters } from './AdmissionsFilterBar'
import { AdmissionsKPITile } from './AdmissionsKPITile'
import { ConversionFunnel } from './ConversionFunnel'
import { PreferenceFlowSankey } from './PreferenceFlowSankey'
import { CategoryMetricsChart } from './CategoryMetricsChart'
import { RankBandChart } from './RankBandChart'
import { StateMetricsChart } from './StateMetricsChart'
import { ChannelBreakdownChart } from './ChannelBreakdownChart'
import { AdmissionsAIInsightCard } from './AdmissionsAIInsightCard'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

export function AdmissionsDashboard() {
  const rawData = useAdmissionsDashboardData()
  const [filters, setFilters] = useState<AdmissionsFilters>({})
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())
  const { aiInsightsOpen, globalFilters, searchQuery, setDashboardFilters, refreshDashboard } = useInteractions()
  const effectiveFilters = useMemo(() => ({ ...globalFilters, ...filters }), [globalFilters, filters])
  const data = useMemo(
    () => applyDashboardFilters(rawData, effectiveFilters, searchQuery),
    [rawData, effectiveFilters, searchQuery],
  )

  // Filter insights based on dismissed state
  const visibleInsights = useMemo(() => {
    return data.aiInsights.filter((i) => !dismissedInsights.has(i.id))
  }, [data.aiInsights, dismissedInsights])

  const handleDismissInsight = (id: string) => {
    setDismissedInsights((prev) => new Set([...prev, id]))
  }

  return (
    <div className="admissions-dashboard flex-1 min-w-0 overflow-auto px-4 py-4">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">Admissions & Enrollment Funnel</h1>
            <p className="mt-1 text-[13px] text-[#6B7C99]">Applicant journey, channel performance, reservation compliance</p>
          </div>
          <button
            onClick={() => refreshDashboard('Admissions')}
            className="flex items-center gap-2 rounded-[8px] border border-[#D1D8DF] bg-white px-4 py-2 text-[12px] font-[600] text-[#0F1722] transition-colors hover:bg-[#F8FAFD]"
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Filter Bar */}
        <AdmissionsFilterBar
          onFiltersChange={(nextFilters) => {
            setFilters(nextFilters)
            setDashboardFilters('Admissions', nextFilters)
          }}
        />
        {/* KPI Strip */}
        <div className="admissions-kpi-grid grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {data.kpis.map((kpi) => (
            <AdmissionsKPITile key={kpi.id} metric={kpi} />
          ))}
        </div>

        {/* Signature Elements: Funnel + Sankey */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ConversionFunnel data={data.funnel} />
          <PreferenceFlowSankey flows={data.preferenceFlows} />
        </div>

        {/* Supporting Charts Grid (2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CategoryMetricsChart data={data.categoryMetrics} />
          <RankBandChart data={data.rankBands} />
          <StateMetricsChart data={data.stateMetrics} />
          <ChannelBreakdownChart data={data.channelMetrics} />
        </div>

        {/* AI Insights Section */}
        {aiInsightsOpen && visibleInsights.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-[700] text-[#0F1722]">AI Insights & Recommendations</h3>
              <span className="text-[10px] font-[600] text-[#5A6B7A] bg-[#EEF2F8] px-2 py-1 rounded-[4px]">
                {visibleInsights.length} insights
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {visibleInsights.map((insight) => (
                <AdmissionsAIInsightCard
                  key={insight.id}
                  insight={insight}
                  onDismiss={handleDismissInsight}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-[11px] text-[#9AA6B4] text-center pt-4">
          Last updated: {data.lastUpdated}
        </div>
      </div>
    </div>
  )
}
