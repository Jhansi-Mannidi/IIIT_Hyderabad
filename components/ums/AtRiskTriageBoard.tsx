'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, AlertTriangle, TrendingDown, Users } from 'lucide-react'
import { StudentPerformance } from '@/lib/useAcademicDashboardData'
import { cn } from '@/lib/utils'
import { useTheme } from './ThemeProvider'

interface AtRiskTriageBoardProps {
  students: StudentPerformance[]
  onStudentClick?: (student: StudentPerformance) => void
}

export function AtRiskTriageBoard({
  students,
  onStudentClick,
}: AtRiskTriageBoardProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [sortBy, setSortBy] = useState<'risk' | 'sgpa' | 'attendance'>('risk')
  const [filterStatus, setFilterStatus] = useState<'all' | 'critical' | 'warning' | 'at-risk'>(
    'all'
  )

  const getRiskColor = (status: string): string => {
    if (isDark) {
      switch (status) {
        case 'critical':
          return 'bg-[#2A111C] hover:bg-[#341624] border-l-4 border-[#B2566B]'
        case 'warning':
          return 'bg-[#271B0D] hover:bg-[#302210] border-l-4 border-[#C55A11]'
        case 'at-risk':
          return 'bg-[#251F0E] hover:bg-[#302811] border-l-4 border-[#C99A2E]'
        default:
          return 'bg-[#0B1728] hover:bg-[#102344] border-l-4 border-[#2E8B8B]'
      }
    }

    switch (status) {
      case 'critical':
        return 'bg-[#FFF0F0] border-l-4 border-[#B2566B]'
      case 'warning':
        return 'bg-[#FFF9E6] border-l-4 border-[#C55A11]'
      case 'at-risk':
        return 'bg-[#F5FBFA] border-l-4 border-[#C99A2E]'
      default:
        return 'bg-white border-l-4 border-[#2E8B8B]'
    }
  }

  const getRiskBadgeColor = (
    status: string
  ): { bg: string; text: string; icon: string } => {
    if (isDark) {
      switch (status) {
        case 'critical':
          return { bg: 'rgba(178, 86, 107, 0.22)', text: '#F2A7BA', icon: '●' }
        case 'warning':
          return { bg: 'rgba(197, 90, 17, 0.24)', text: '#F4A261', icon: '▲' }
        case 'at-risk':
          return { bg: 'rgba(201, 154, 46, 0.24)', text: '#F4D06F', icon: '◆' }
        default:
          return { bg: 'rgba(46, 139, 139, 0.22)', text: '#8FE0DE', icon: '✓' }
      }
    }

    switch (status) {
      case 'critical':
        return { bg: '#FFDDDD', text: '#8B3A3A', icon: '●' }
      case 'warning':
        return { bg: '#FFECC4', text: '#8B5F20', icon: '▲' }
      case 'at-risk':
        return { bg: '#FFF5D9', text: '#6B5A0F', icon: '◆' }
      default:
        return { bg: '#DDEFF0', text: '#2E5F5F', icon: '✓' }
    }
  }

  const sorted = [...students].sort((a, b) => {
    if (sortBy === 'risk') return b.riskScore - a.riskScore
    if (sortBy === 'sgpa') return b.sgpa - a.sgpa
    return b.attendancePercentage - a.attendancePercentage
  })

  const filtered = sorted.filter(
    (s) => filterStatus === 'all' || s.riskStatus === filterStatus
  )
  const displayStudents = filtered.length > 0 ? filtered : sorted
  const avgRisk =
    displayStudents.length > 0
      ? displayStudents.reduce((sum, s) => sum + s.riskScore, 0) / displayStudents.length
      : 0

  return (
    <div className="bg-white border border-[#E8EEF5] rounded-[12px] overflow-hidden">
      {/* Header */}
      <div
        className={cn(
          'border-b px-4 py-4 sm:px-6',
          isDark
            ? 'border-[#1F3864]/70 bg-gradient-to-r from-[#0F2038] to-[#1E6F72]'
            : 'border-[#E8EEF5] bg-gradient-to-r from-white via-[#F8FAFD] to-[#E8F5F5]',
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3
              className={cn(
                'flex items-center gap-2 text-base font-bold sm:text-lg',
                isDark ? 'text-white' : 'text-[#0F1722]',
              )}
            >
              <AlertTriangle size={20} className="text-[#FFB347]" />
              At-Risk Triage Board
            </h3>
            <p
              className={cn(
                'mt-1 text-xs leading-5 sm:text-sm',
                isDark ? 'text-[#B8D0E8]' : 'text-[#5A6675]',
              )}
            >
              Risk Score = 40% marks + 40% failed subjects + 20% attendance
            </p>
          </div>
          <div
            className={cn(
              'w-fit rounded-[12px] px-3 py-2 text-left sm:text-right',
              isDark ? 'bg-white/12 sm:bg-transparent sm:p-0' : 'border border-[#CFE7E7] bg-white/80 shadow-sm',
            )}
          >
            <div
              className={cn(
                'text-2xl font-bold leading-none sm:text-3xl',
                isDark ? 'text-white' : 'text-[#1F3864]',
              )}
            >
              {displayStudents.length}
            </div>
            <div className={cn('text-xs', isDark ? 'text-[#B8D0E8]' : 'text-[#5A6675]')}>students flagged</div>
          </div>
        </div>
      </div>

      {/* Filter + Sort Controls */}
      <div className="flex flex-col gap-3 border-b border-[#E8EEF5] bg-[#F5F8FB] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="w-full text-xs font-semibold text-[#6B7C99] sm:w-auto">Filter:</span>
          {(['all', 'critical', 'warning', 'at-risk'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-[#2E8B8B] text-white'
                  : isDark
                  ? 'bg-[#0B1728] border border-[#263448] text-[#A8B6C8] hover:border-[#2E8B8B] hover:bg-[#102344]'
                  : 'bg-white border border-[#E8EEF5] text-[#6B7C99] hover:border-[#2E8B8B]'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <span className="text-xs font-semibold text-[#6B7C99]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="min-w-0 flex-1 rounded-[8px] border border-[#E8EEF5] bg-white px-3 py-2 text-xs font-semibold text-[#1F3864] focus:border-[#2E8B8B] focus:outline-none sm:flex-none"
          >
            <option value="risk">Select Sort</option>
            <option value="sgpa">By SGPA</option>
            <option value="attendance">By Attendance</option>
          </select>
        </div>
      </div>

      {/* Student Rows */}
      <div className="divide-y divide-[#E8EEF5]">
        {displayStudents.map((student) => {
            const riskBadge = getRiskBadgeColor(student.riskStatus)
            const riskColor = getRiskColor(student.riskStatus)

            return (
              <button
                key={student.studentId}
                onClick={() => onStudentClick?.(student)}
                className={`w-full px-4 py-4 text-left transition-all sm:px-6 ${riskColor}`}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 sm:grid-cols-[52px_minmax(120px,1.3fr)_repeat(4,minmax(76px,1fr))_24px] sm:items-center sm:gap-4">
                  {/* Risk Badge */}
                  <div
                    className="rounded-[10px] px-2 py-1 text-center sm:rounded-[6px]"
                    style={{ backgroundColor: riskBadge.bg }}
                  >
                    <div style={{ color: riskBadge.text }} className="text-sm font-bold">
                      {riskBadge.icon}
                    </div>
                    <div
                      style={{ color: riskBadge.text }}
                      className="text-[10px] font-semibold"
                    >
                      {student.riskScore}
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="min-w-0">
                    <div className="text-[15px] font-bold leading-5 text-[#1F3864] sm:text-sm sm:font-semibold">{student.studentName}</div>
                    <div className="text-xs text-[#6B7C99]">{student.studentId}</div>
                    <div className="text-xs text-[#999] mt-0.5">{student.program}</div>
                  </div>

                  <div className="ums-mobile-two-col col-span-2 grid gap-3 rounded-[14px] bg-white/50 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] sm:contents sm:bg-transparent sm:p-0 sm:shadow-none">
                  {/* SGPA */}
                  <div className="min-w-0">
                    <div className="text-xs text-[#6B7C99] font-medium">SGPA</div>
                    <div className="text-lg font-bold text-[#1F3864]">{student.sgpa.toFixed(2)}</div>
                  </div>

                  {/* Credit Completion */}
                  <div className="min-w-0">
                    <div className="text-xs text-[#6B7C99] font-medium">Credits</div>
                    <div className="flex items-center gap-1">
                      <div className="flex-1 h-2 bg-[#E8EEF5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2E8B8B]"
                          style={{ width: `${student.creditCompletion}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#1F3864]">
                        {student.creditCompletion}%
                      </span>
                    </div>
                  </div>

                  {/* Failed Subjects */}
                  <div className="min-w-0">
                    <div className="text-xs text-[#6B7C99] font-medium">Failed / Passed</div>
                    <div className="text-sm font-bold">
                      <span className="text-[#B2566B]">{student.failedSubjects}</span>
                      <span className="text-[#999]"> / </span>
                      <span className="text-[#2E8B8B]">{student.passedSubjects}</span>
                    </div>
                  </div>

                  {/* Attendance */}
                  <div className="min-w-0">
                    <div className="text-xs text-[#6B7C99] font-medium">Attendance</div>
                    <div className="text-sm font-bold text-[#1F3864]">
                      {student.attendancePercentage.toFixed(1)}%
                    </div>
                  </div>
                  </div>

                  {/* Action Arrow */}
                  <div className="col-span-2 flex justify-end sm:col-span-1">
                    <ChevronRight size={18} className="text-[#C55A11]" />
                  </div>
                </div>
              </button>
            )
          })}
      </div>

      {/* Footer Stats */}
      <div className="ums-mobile-two-col grid gap-3 border-t border-[#E8EEF5] bg-[#F5F8FB] px-4 py-4 text-xs sm:grid-cols-4 sm:gap-4 sm:px-6">
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">Critical</div>
          <div className="text-lg font-bold text-[#B2566B]">
            {displayStudents.filter((s) => s.riskStatus === 'critical').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">Warning</div>
          <div className="text-lg font-bold text-[#C55A11]">
            {displayStudents.filter((s) => s.riskStatus === 'warning').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">At-Risk</div>
          <div className="text-lg font-bold text-[#C99A2E]">
            {displayStudents.filter((s) => s.riskStatus === 'at-risk').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">Avg Risk</div>
          <div className="text-lg font-bold text-[#1F3864]">
            {avgRisk.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  )
}
