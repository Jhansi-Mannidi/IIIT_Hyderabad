'use client'

import { useState } from 'react'
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

interface AcademicDashboardProps {
  isLoading?: boolean
}

export function AcademicDashboard({ isLoading: initialLoading = false }: AcademicDashboardProps) {
  const data = useAcademicDashboardData()
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

  // Filter at-risk students based on applied filters
  const filteredAtRiskStudents = data.atRiskStudents.filter((student) => {
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

  if (isLoading) {
    return <SkeletonDashboard />
  }

  const visibleInsights = data.aiInsights.filter((i) => !dismissedInsights.has(i.id))

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Transcript Drawer */}
      <TranscriptDrawer
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1F3864]">Academic Performance & Records</h1>
            <p className="text-sm text-[#6B7C99] mt-1">
              Outcomes, grade distributions, credit progression, and early at-risk detection
            </p>
          </div>
          <button className="px-4 py-2 rounded-[8px] border border-[#E8EEF5] bg-white text-[#1F3864] hover:bg-[#F5F8FB] transition-colors text-sm font-semibold flex items-center gap-2">
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
        <section aria-label="Filters">
          <AcademicFilterBar onFiltersChange={setFilters} />
        </section>

        {/* Charts Grid */}
        <section aria-label="Performance charts" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        {visibleInsights.length > 0 && (
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
        <div className="text-xs text-[#6B7C99] text-right">
          Last updated: {data.lastUpdated}
        </div>
      </div>
    </div>
  )
}
