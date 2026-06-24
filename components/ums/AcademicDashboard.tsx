'use client'

import { useMemo, useState } from 'react'
import { SkeletonDashboard } from './SkeletonDashboard'
import { useAcademicDashboardData, StudentPerformance } from '@/lib/useAcademicDashboardData'
import { AcademicKPITile } from './AcademicKPITile'
import { AcademicFilterBar, AcademicFilters } from './AcademicFilterBar'
import { GradeDistributionHistogram } from './GradeDistributionHistogram'
import { PassRateHeatmap } from './PassRateHeatmap'
import { SGPATrendChart } from './SGPATrendChart'
import { EquityMetricsChart } from './EquityMetricsChart'
import { AtRiskTriageBoard } from './AtRiskTriageBoard'
import { TranscriptDrawer } from './TranscriptDrawer'
import { AcademicAIInsightCard } from './AcademicAIInsightCard'
import { RefreshCw } from 'lucide-react'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

interface AcademicDashboardProps {
  isLoading?: boolean
}

export function AcademicDashboard({ isLoading: initialLoading = false }: AcademicDashboardProps) {
  const rawData = useAcademicDashboardData()
  const [isLoading] = useState(initialLoading)
  const [selectedStudent, setSelectedStudent] = useState<StudentPerformance | null>(null)
  const [filters, setFilters] = useState<AcademicFilters>({
    program: 'All Programs',
    semester: null,
    riskStatus: 'All Statuses',
    category: 'All Categories',
    attendanceMin: 0,
    sgpaMin: 0,
  })
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())
  const { aiInsightsOpen, globalFilters, searchQuery, setDashboardFilters, refreshDashboard } = useInteractions()
  const effectiveFilters = useMemo(() => ({ ...globalFilters, ...filters }), [globalFilters, filters])
  const data = useMemo(
    () => applyDashboardFilters(rawData, effectiveFilters, searchQuery),
    [rawData, effectiveFilters, searchQuery],
  )

  // Filter at-risk students based on applied filters
  const matchingAtRiskStudents = data.atRiskStudents.filter((student) => {
    if (
      filters.program !== 'All Programs' &&
      !student.program.includes(filters.program.split(' ')[filters.program.split(' ').length - 1])
    )
      return false
    if (filters.semester !== null && student.semester !== filters.semester) return false
    if (filters.riskStatus !== 'All Statuses' && student.riskStatus !== filters.riskStatus.toLowerCase())
      return false
    if (filters.attendanceMin > 0 && student.attendancePercentage < filters.attendanceMin)
      return false
    if (filters.sgpaMin > 0 && student.sgpa < filters.sgpaMin) return false
    return true
  })
  const filteredAtRiskStudents = matchingAtRiskStudents.length > 0 ? matchingAtRiskStudents : data.atRiskStudents

  if (isLoading) {
    return <SkeletonDashboard />
  }

  const visibleInsights = data.aiInsights.filter((i) => !dismissedInsights.has(i.id))

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-[#F8FAFB]">
      {/* Transcript Drawer */}
      <TranscriptDrawer
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      {/* Main Content */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-5 py-5 space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-[24px] font-[850] tracking-[-0.03em] text-[#1F3864]">Academic Performance & Records</h1>
            <p className="text-sm text-[#6B7C99] mt-1">
              Outcomes, grade distributions, credit progression, and early at-risk detection
            </p>
          </div>
          <button
            onClick={() => refreshDashboard('Academic')}
            className="inline-flex h-10 w-fit items-center gap-2 rounded-[10px] border border-[#E8EEF5] bg-white px-4 text-sm font-semibold text-[#1F3864] transition-colors hover:bg-[#F5F8FB]"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* KPI Strip */}
        <section aria-label="Key academic metrics">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {data.kpis.map((kpi, i) => (
              <AcademicKPITile key={i} {...kpi} />
            ))}
          </div>
        </section>

        {/* Filter Bar */}
        <section aria-label="Filters" className="relative z-30">
          <AcademicFilterBar
            onFiltersChange={(nextFilters) => {
              setFilters(nextFilters)
              setDashboardFilters('Academic', nextFilters)
            }}
          />
        </section>

        {/* Charts Grid */}
        <section aria-label="Performance charts" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <GradeDistributionHistogram data={data.gradeDistribution} />
          <PassRateHeatmap data={data.passRateHeatmap} />
          <SGPATrendChart data={data.sgpaTrend} />
          <EquityMetricsChart data={data.equityMetrics} />
        </section>

        {/* At-Risk Triage Board */}
        <section aria-label="At-risk students">
          <AtRiskTriageBoard
            students={filteredAtRiskStudents}
            onStudentClick={setSelectedStudent}
          />
        </section>

        {/* AI Insights Section */}
        {aiInsightsOpen && visibleInsights.length > 0 && (
          <section aria-label="Academic insights" className="space-y-3">
            <h2 className="text-lg font-bold text-[#1F3864]">Academic Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {visibleInsights.map((insight) => (
                <AcademicAIInsightCard
                  key={insight.id}
                  insight={insight}
                  onDismiss={() => {
                    setDismissedInsights((prev) => new Set([...prev, insight.id]))
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Last Updated */}
        <div className="pb-4 text-xs text-[#6B7C99] text-right">
          Last updated: {data.lastUpdated}
        </div>
      </div>
    </div>
  )
}
