'use client'

import { useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useAttendanceData } from '@/lib/useAttendanceData'
import { AttendanceKPITile } from './AttendanceKPITile'
import { AttendanceFilterBar } from './AttendanceFilterBar'
import { DetentionRiskShortfallList } from './DetentionRiskShortfallList'
import { EmployeePunctualityHeatmap } from './EmployeePunctualityHeatmap'
import { CourseAttendanceGauges } from './CourseAttendanceGauges'
import { DepartmentComplianceChart } from './DepartmentComplianceChart'
import { AttendanceAICard } from './AttendanceAICard'
import { useInteractions } from './InteractionProvider'
import { applyDashboardFilters } from '@/lib/dashboardFiltering'

export function AttendanceDashboard() {
  const rawData = useAttendanceData()
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<Record<string, unknown>>({})
  const { aiInsightsOpen, globalFilters, searchQuery, setDashboardFilters, refreshDashboard, runAction } = useInteractions()
  const effectiveFilters = useMemo(() => ({ ...globalFilters, ...filters }), [globalFilters, filters])
  const data = useMemo(
    () => applyDashboardFilters(rawData, effectiveFilters, searchQuery),
    [rawData, effectiveFilters, searchQuery],
  )

  const visibleInsights = data.aiInsights.filter(i => !dismissedInsights.has(i.id))

  return (
    <div className="attendance-dashboard flex-1 overflow-y-auto bg-[#F6F8FB]">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">Attendance & Biometric</h1>
            <p className="text-[13px] text-[#9AA6B4] mt-1">Student attendance compliance & shortfall detection; employee attendance/punctuality</p>
          </div>
          <button
            onClick={() => refreshDashboard('Attendance')}
            className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-[#D1D8DF] hover:bg-[#F6F8FB]"
          >
            <RefreshCw size={14} className="text-[#5A6B7A]" />
            <span className="text-[12px] font-[600] text-[#0F1722]">Refresh</span>
          </button>
        </div>

        {/* Sticky Filters */}
        <AttendanceFilterBar
          onFiltersChange={(nextFilters) => {
            setFilters(nextFilters)
            setDashboardFilters('Attendance', nextFilters)
          }}
        />
        {/* KPI Strip */}
        <section aria-label="Attendance KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.kpis.map((kpi) => (
              <AttendanceKPITile
                key={kpi.id}
                {...kpi}
                percentage={kpi.id.includes('attendance') || kpi.id.includes('punctuality') || kpi.id.includes('compliance')}
              />
            ))}
          </div>
        </section>

        {/* Signature Elements */}
        <section aria-label="Detention and punctuality" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DetentionRiskShortfallList data={data.studentShortfalls} />
          <EmployeePunctualityHeatmap data={data.employeeBiometrics} />
        </section>

        {/* Course & Department Analytics */}
        <section aria-label="Course and department" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CourseAttendanceGauges data={data.courseAttendance} />
          <DepartmentComplianceChart data={data.departmentCompliance} />
        </section>

        {/* AI Insights */}
        {aiInsightsOpen && visibleInsights.length > 0 && (
          <section aria-label="Attendance insights" className="space-y-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
            <h3 className="text-[13px] font-[700] text-[#0F1722]">AI-Powered Attendance Insights</h3>
            <div className="space-y-2">
              {visibleInsights.map((insight) => (
                <AttendanceAICard
                  key={insight.id}
                  insight={insight}
                  onDismiss={() => setDismissedInsights(prev => new Set(prev).add(insight.id))}
                  onAction={() => runAction('Attendance action started', insight.action)}
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
