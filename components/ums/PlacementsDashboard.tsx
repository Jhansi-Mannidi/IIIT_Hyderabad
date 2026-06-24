'use client'

import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { usePlacementsData } from '@/lib/usePlacementsData'
import { PlacementsKPITile }      from './PlacementsKPITile'
import { PlacementsFilterBar }    from './PlacementsFilterBar'
import { PlacementsAICard }       from './PlacementsAICard'
import { BranchOutcomeStrip }     from './BranchOutcomeStrip'
import { PlacementGauge }         from './PlacementGauge'
import { SalaryBoxPlot }          from './SalaryBoxPlot'
import { RecruiterTrendLine }     from './RecruiterTrendLine'
import { OffersVsStudentsFunnel } from './OffersVsStudentsFunnel'
import { GrievanceStatusTiles }   from './GrievanceStatusTiles'
import { ActiveFilterSummary } from './ActiveFilterSummary'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

const PLACEMENT_TARGET = 90   // institutional target %

export function PlacementsDashboard() {
  const rawData = usePlacementsData()

  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<Record<string, unknown>>({})
  const { aiInsightsOpen, globalFilters, searchQuery, setDashboardFilters, refreshDashboard, runAction } = useInteractions()
  const effectiveFilters = useMemo(() => ({ ...globalFilters, ...filters }), [globalFilters, filters])
  const data = useMemo(
    () => applyDashboardFilters(rawData, effectiveFilters, searchQuery),
    [rawData, effectiveFilters, searchQuery],
  )

  const dismiss = (id: string) =>
    setDismissedInsights(prev => new Set(prev).add(id))

  const visibleInsights = data.aiInsights.filter(i => !dismissedInsights.has(i.id))
  const current         = data.yearlyTrend[data.yearlyTrend.length - 1]

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F8FB]">
      <div className="w-full max-w-[1800px] mx-auto px-3 py-4 space-y-4 sm:px-5 sm:py-5">

        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-[22px] font-[850] leading-tight tracking-[-0.03em] text-[#0F1722] sm:text-[20px]">Placements & Career Outcomes</h1>
            <p className="mt-1 max-w-[36rem] text-[12px] leading-5 text-[#9AA6B4] sm:text-[13px]">
              Placement rates, salary distribution, recruiter engagement, branch-wise outcomes
            </p>
          </div>
          <button
            onClick={() => refreshDashboard('Placements')}
            className="inline-flex h-10 w-fit items-center gap-2 rounded-[10px] border border-[#D1D8DF] bg-white px-4 hover:bg-[#F6F8FB]"
          >
            <RefreshCw size={14} className="text-[#5A6B7A]" />
            <span className="text-[12px] font-[600] text-[#0F1722]">Refresh</span>
          </button>
        </div>

        {/* 1. Sticky filter bar */}
        <PlacementsFilterBar
          onFiltersChange={(nextFilters) => {
            setFilters(nextFilters)
            setDashboardFilters('Placements', nextFilters)
          }}
        />
        <ActiveFilterSummary dashboard="Placements" filters={effectiveFilters} searchQuery={searchQuery} />

        {/* 2. KPI strip */}
        <section aria-label="Placement KPIs">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.kpis.map(kpi => (
              <PlacementsKPITile key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </section>

        {/* 3. Signature: Branch Outcome Strip + Placement Gauge */}
        <section aria-label="Branch outcomes and gauge" className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4 items-start">
          <BranchOutcomeStrip
            data={data.branchSalary}
            onBranchClick={(branch) => runAction('Branch outcome opened', `${branch.branch} placement outcome is selected.`)}
          />
          <PlacementGauge current={current} target={PLACEMENT_TARGET} />
        </section>

        {/* 4. Chart grid */}
        <section aria-label="Salary, recruiters, funnel, grievances">
          {/* Top row: salary box-plot (wider) + recruiter trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <SalaryBoxPlot data={data.branchSalary} />
            <RecruiterTrendLine
              data={data.recruiterTrend}
              onPointClick={(point) => runAction('Recruiter trend point selected', `${point.year} recruiter activity is selected.`)}
            />
          </div>

          {/* Bottom row: funnel + grievances */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <OffersVsStudentsFunnel current={current} />
            <GrievanceStatusTiles
              data={data.grievances}
              onTileClick={(status) => runAction('Grievance status opened', `${status} grievances are selected.`)}
            />
          </div>
        </section>

        {/* 5. Right-rail AI insights */}
        {aiInsightsOpen && visibleInsights.length > 0 && (
          <section aria-label="Placement AI insights">
            <div className="bg-white rounded-[12px] border border-[#E5ECEF] p-4">
              <h3 className="text-[13px] font-[700] text-[#0F1722] mb-3">
                AI-Powered Placement Insights
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {visibleInsights.map(insight => (
                  <PlacementsAICard
                    key={insight.id}
                    insight={insight}
                    onDismiss={() => dismiss(insight.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="text-center pb-4">
          <p className="text-[11px] text-[#9AA6B4]">Last updated: {data.lastUpdated}</p>
        </div>
      </div>
    </div>
  )
}
