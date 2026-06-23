'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, AlertTriangle, TrendingDown, Users } from 'lucide-react'
import { StudentPerformance } from '@/lib/useAcademicDashboardData'

interface AtRiskTriageBoardProps {
  students: StudentPerformance[]
  onStudentClick?: (student: StudentPerformance) => void
}

export function AtRiskTriageBoard({
  students,
  onStudentClick,
}: AtRiskTriageBoardProps) {
  const [sortBy, setSortBy] = useState<'risk' | 'sgpa' | 'attendance'>('risk')
  const [filterStatus, setFilterStatus] = useState<'all' | 'critical' | 'warning' | 'at-risk'>(
    'all'
  )

  const getRiskColor = (status: string): string => {
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

  return (
    <div className="bg-white border border-[#E8EEF5] rounded-[12px] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1F3864] to-[#2E8B8B] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle size={20} className="text-[#FFB347]" />
              At-Risk Triage Board
            </h3>
            <p className="text-sm text-[#B8D0E8] mt-1">
              Risk Score = 40% marks + 40% failed subjects + 20% attendance
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{filtered.length}</div>
            <div className="text-xs text-[#B8D0E8]">students flagged</div>
          </div>
        </div>
      </div>

      {/* Filter + Sort Controls */}
      <div className="px-6 py-4 bg-[#F5F8FB] border-b border-[#E8EEF5] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#6B7C99]">Filter:</span>
          {(['all', 'critical', 'warning', 'at-risk'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-[#2E8B8B] text-white'
                  : 'bg-white border border-[#E8EEF5] text-[#6B7C99] hover:border-[#2E8B8B]'
              }`}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#6B7C99]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-[6px] text-xs font-semibold border border-[#E8EEF5] bg-white text-[#1F3864] focus:outline-none focus:border-[#2E8B8B]"
          >
            <option value="risk">By Risk Score</option>
            <option value="sgpa">By SGPA</option>
            <option value="attendance">By Attendance</option>
          </select>
        </div>
      </div>

      {/* Student Rows */}
      <div className="divide-y divide-[#E8EEF5]">
        {filtered.length > 0 ? (
          filtered.map((student) => {
            const riskBadge = getRiskBadgeColor(student.riskStatus)
            const riskColor = getRiskColor(student.riskStatus)

            return (
              <button
                key={student.studentId}
                onClick={() => onStudentClick?.(student)}
                className={`w-full px-6 py-4 text-left hover:bg-opacity-75 transition-all ${riskColor}`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Risk Badge */}
                  <div
                    className="col-span-1 px-2 py-1 rounded-[6px] text-center"
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
                  <div className="col-span-3">
                    <div className="font-semibold text-[#1F3864]">{student.studentName}</div>
                    <div className="text-xs text-[#6B7C99]">{student.studentId}</div>
                    <div className="text-xs text-[#999] mt-0.5">{student.program}</div>
                  </div>

                  {/* SGPA */}
                  <div className="col-span-2">
                    <div className="text-xs text-[#6B7C99] font-medium">SGPA</div>
                    <div className="text-lg font-bold text-[#1F3864]">{student.sgpa.toFixed(2)}</div>
                  </div>

                  {/* Credit Completion */}
                  <div className="col-span-2">
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
                  <div className="col-span-2">
                    <div className="text-xs text-[#6B7C99] font-medium">Failed / Passed</div>
                    <div className="text-sm font-bold">
                      <span className="text-[#B2566B]">{student.failedSubjects}</span>
                      <span className="text-[#999]"> / </span>
                      <span className="text-[#2E8B8B]">{student.passedSubjects}</span>
                    </div>
                  </div>

                  {/* Attendance */}
                  <div className="col-span-2">
                    <div className="text-xs text-[#6B7C99] font-medium">Attendance</div>
                    <div className="text-sm font-bold text-[#1F3864]">
                      {student.attendancePercentage.toFixed(1)}%
                    </div>
                  </div>

                  {/* Action Arrow */}
                  <div className="col-span-1 text-right">
                    <ChevronRight size={18} className="text-[#C55A11]" />
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="px-6 py-8 text-center text-[#6B7C99]">
            <Users size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No students match the selected criteria.</p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#E8EEF5] grid grid-cols-4 gap-4 text-xs">
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">Critical</div>
          <div className="text-lg font-bold text-[#B2566B]">
            {filtered.filter((s) => s.riskStatus === 'critical').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">Warning</div>
          <div className="text-lg font-bold text-[#C55A11]">
            {filtered.filter((s) => s.riskStatus === 'warning').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">At-Risk</div>
          <div className="text-lg font-bold text-[#C99A2E]">
            {filtered.filter((s) => s.riskStatus === 'at-risk').length}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[#6B7C99] font-semibold mb-1">Avg Risk</div>
          <div className="text-lg font-bold text-[#1F3864]">
            {(filtered.reduce((sum, s) => sum + s.riskScore, 0) / filtered.length).toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  )
}
