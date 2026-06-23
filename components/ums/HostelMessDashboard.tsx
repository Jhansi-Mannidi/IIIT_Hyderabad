'use client'

import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useHostelMessData } from '@/lib/useHostelMessData'
import { HostelKPITile } from './HostelKPITile'
import { HostelFilterBar } from './HostelFilterBar'
import { BlockOccupancyWall } from './BlockOccupancyWall'
import { MessEconomicsTrend } from './MessEconomicsTrend'
import { RoomStatusChart } from './RoomStatusChart'
import { QuartersWaitlistTable } from './QuartersWaitlistTable'
import { UtilityCostVariance } from './UtilityCostVariance'
import { HostelMessAICard } from './HostelMessAICard'
import { ActiveFilterSummary } from './ActiveFilterSummary'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

export function HostelMessDashboard() {
  const rawData = useHostelMessData()
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<Record<string, unknown>>({})
  const { searchQuery, setDashboardFilters, refreshDashboard, runAction } = useInteractions()
  const data = useMemo(
    () => applyDashboardFilters(rawData, filters, searchQuery),
    [rawData, filters, searchQuery],
  )

  const visibleInsights = data.aiInsights.filter(i => !dismissedInsights.has(i.id))

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F8FB]">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">Hostel, Mess & Quarters</h1>
            <p className="text-[13px] text-[#9AA6B4] mt-1">Residential occupancy, mess economics, staff quarters allocation, utility cost variance</p>
          </div>
          <button
            onClick={() => refreshDashboard('Hostel & Mess')}
            className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-[#D1D8DF] hover:bg-[#F6F8FB]"
          >
            <RefreshCw size={14} className="text-[#5A6B7A]" />
            <span className="text-[12px] font-[600] text-[#0F1722]">Refresh</span>
          </button>
        </div>

        {/* Filters */}
        <HostelFilterBar
          onFiltersChange={(nextFilters) => {
            setFilters(nextFilters)
            setDashboardFilters('Hostel & Mess', nextFilters)
          }}
        />
        <ActiveFilterSummary dashboard="Hostel & Mess" filters={filters} searchQuery={searchQuery} />

        {/* KPI Strip */}
        <section aria-label="Hostel KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.kpis.map((kpi) => (
              <HostelKPITile
                key={kpi.id}
                {...kpi}
                percentage={kpi.id.includes('occupancy') || kpi.id.includes('utilization') || kpi.id.includes('cost-variance')}
              />
            ))}
          </div>
        </section>

        {/* Signature Elements */}
        <section aria-label="Occupancy and mess" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BlockOccupancyWall data={data.blockOccupancy} />
          <MessEconomicsTrend data={data.messData} />
        </section>

        {/* Room & Quarters Management */}
        <section aria-label="Room and quarters" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RoomStatusChart data={data.roomStatus} />
          <QuartersWaitlistTable data={data.quartersWaitlist} />
        </section>

        {/* Utilities */}
        <section aria-label="Utilities">
          <UtilityCostVariance data={data.utilityCosts} />
        </section>

        {/* AI Insights */}
        {visibleInsights.length > 0 && (
          <section aria-label="Hostel insights" className="space-y-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
            <h3 className="text-[13px] font-[700] text-[#0F1722]">AI-Powered Hostel Insights</h3>
            <div className="space-y-2">
              {visibleInsights.map((insight) => (
                <HostelMessAICard
                  key={insight.id}
                  insight={insight}
                  onDismiss={() => setDismissedInsights(prev => new Set(prev).add(insight.id))}
                  onAction={() => runAction('Hostel action started', insight.action)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-[11px] text-[#9AA6B4]">Last updated: {data.lastUpdated}</p>
        </div>
      </div>
    </div>
  )
}
