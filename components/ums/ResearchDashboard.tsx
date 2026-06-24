'use client'

import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useResearchData } from '@/lib/useResearchData'
import { ResearchKPITile } from './ResearchKPITile'
import { ResearchFilterBar } from './ResearchFilterBar'
import { ImpactConstellation } from './ImpactConstellation'
import { PublicationTrendArea } from './PublicationTrendArea'
import { PubTypeMixDonut } from './PubTypeMixDonut'
import { CenterLeaderboard } from './CenterLeaderboard'
import { PhDPipelineFunnel } from './PhDPipelineFunnel'
import { FacultyProductivityChart } from './FacultyProductivityChart'
import { ResearchAICard } from './ResearchAICard'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

export function ResearchDashboard() {
  const rawData = useResearchData()
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<Record<string, unknown>>({})
  const { aiInsightsOpen, globalFilters, searchQuery, setDashboardFilters, refreshDashboard, runAction } = useInteractions()
  const effectiveFilters = useMemo(() => ({ ...globalFilters, ...filters }), [globalFilters, filters])
  const data = useMemo(
    () => applyDashboardFilters(rawData, effectiveFilters, searchQuery),
    [rawData, effectiveFilters, searchQuery],
  )

  const visibleInsights = data.aiInsights.filter(i => !dismissed.has(i.id))

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F8FB]">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-4 space-y-4">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">Research & Publications</h1>
            <p className="text-[13px] text-[#9AA6B4] mt-1">
              Research output, publication impact, PhD progression, thesis pipeline, research funding
            </p>
          </div>
          <button
            onClick={() => refreshDashboard('Research')}
            className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-[#D1D8DF] hover:bg-[#F6F8FB] shrink-0"
          >
            <RefreshCw size={14} className="text-[#5A6B7A]" />
            <span className="text-[12px] font-[600] text-[#0F1722]">Refresh</span>
          </button>
        </div>

        {/* ── Filters ─────────────────────────────────────────────────── */}
        <ResearchFilterBar
          onFiltersChange={(nextFilters) => {
            setFilters(nextFilters)
            setDashboardFilters('Research', nextFilters)
          }}
        />
        {/* ── KPI Tiles ───────────────────────────────────────────────── */}
        <section aria-label="Research KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.kpis.map(kpi => (
              <ResearchKPITile key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </section>

        {/* ── Signature Elements ──────────────────────────────────────── */}
        <section aria-label="Impact constellation and publication trend" className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ImpactConstellation data={data.impact} />
          <PublicationTrendArea data={data.pubTrend} />
        </section>

        {/* ── Chart Grid ──────────────────────────────────────────────── */}
        <section aria-label="Publication mix and center output" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <PubTypeMixDonut data={data.typeMix} />
          <div className="xl:col-span-2">
            <CenterLeaderboard data={data.centerOutput} />
          </div>
        </section>

        <section aria-label="PhD pipeline and faculty productivity" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PhDPipelineFunnel data={data.phdFunnel} />
          <FacultyProductivityChart data={data.facultyProd} />
        </section>

        {/* ── AI Insights ─────────────────────────────────────────────── */}
        {aiInsightsOpen && visibleInsights.length > 0 && (
          <section aria-label="Research insights" className="p-4 bg-white rounded-[12px] border border-[#E5ECEF] space-y-3">
            <h3 className="text-[13px] font-[700] text-[#0F1722]">AI-Powered Research Insights</h3>
            <div className="space-y-2">
              {visibleInsights.map(insight => (
                <ResearchAICard
                  key={insight.id}
                  insight={insight}
                  onDismiss={() => setDismissed(prev => new Set(prev).add(insight.id))}
                  onAction={() => runAction('Research action started', insight.action)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <p className="text-center text-[11px] text-[#9AA6B4] py-4">
          Last updated: {data.lastUpdated}
        </p>
      </div>
    </div>
  )
}
