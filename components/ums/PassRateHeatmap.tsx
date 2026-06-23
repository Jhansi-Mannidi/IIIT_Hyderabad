'use client'

import { ChartCard } from './ChartCard'
import { PassRateHeatmapCell } from '@/lib/useAcademicDashboardData'

interface PassRateHeatmapProps {
  data: PassRateHeatmapCell[]
  onCellClick?: (cell: PassRateHeatmapCell) => void
}

export function PassRateHeatmap({ data, onCellClick }: PassRateHeatmapProps) {
  // Group by semester
  const semesters = [...new Set(data.map((d) => d.semester))].sort((a, b) => a - b)
  const subjects = [...new Set(data.map((d) => d.subject))].sort()

  // Get color for pass rate
  const getColor = (passRate: number): string => {
    if (passRate >= 90) return '#2E8B8B' // Teal
    if (passRate >= 85) return '#4A9B7F' // Green
    if (passRate >= 80) return '#C99A2E' // Gold
    if (passRate >= 75) return '#C55A11' // Orange
    return '#B2566B' // Red
  }

  return (
    <ChartCard
      title="Subject-wise Pass Rates"
      subtitle="Semester-aggregated performance by course"
      info="Heat intensity indicates pass rate: darker green (90%+) to red (<75%). Click cell to see detailed breakdown."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left px-2 py-2 text-[#6B7C99] font-semibold border-b border-[#E8EEF5]">
                Subject
              </th>
              {semesters.map((sem) => (
                <th
                  key={sem}
                  className="text-center px-2 py-2 text-[#6B7C99] font-semibold border-b border-[#E8EEF5]"
                >
                  Sem {sem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject} className="hover:bg-[#F5F8FB]">
                <td className="px-2 py-2 text-[#1F3864] font-medium border-b border-[#E8EEF5]">
                  {subject}
                </td>
                {semesters.map((sem) => {
                  const cell = data.find((d) => d.subject === subject && d.semester === sem)
                  return (
                    <td
                      key={`${subject}-${sem}`}
                      className="text-center px-2 py-2 border-b border-[#E8EEF5]"
                    >
                      {cell ? (
                        <button
                          onClick={() => onCellClick?.(cell)}
                          className="w-10 h-10 rounded-[6px] font-semibold text-white transition-all hover:scale-105 cursor-pointer"
                          style={{ backgroundColor: getColor(cell.passRate) }}
                          title={`${cell.passRate}% pass rate (${cell.totalStudents - cell.failedCount}/${cell.totalStudents})`}
                        >
                          {cell.passRate}%
                        </button>
                      ) : (
                        <span className="text-[#D5DFE8]">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-[#6B7C99]">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-sm bg-[#2E8B8B]" />
          <span>90%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-sm bg-[#4A9B7F]" />
          <span>85–90%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-sm bg-[#C99A2E]" />
          <span>80–85%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-sm bg-[#C55A11]" />
          <span>75–80%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-sm bg-[#B2566B]" />
          <span>&lt;75%</span>
        </div>
      </div>
    </ChartCard>
  )
}
