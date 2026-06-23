'use client'

import { AlertTriangle, TrendingDown } from 'lucide-react'
import { StudentShortfall } from '@/lib/useAttendanceData'

interface DetentionRiskShortfallListProps {
  data: StudentShortfall[]
  onRowClick?: (student: StudentShortfall) => void
}

export function DetentionRiskShortfallList({ data, onRowClick }: DetentionRiskShortfallListProps) {
  const sortedData = [...data].sort((a, b) => a.attendancePercent - b.attendancePercent)

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Detention-Risk Shortfall List (Eligibility At Risk)</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-[#E5ECEF]">
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Student</th>
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Course</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Attendance %</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Shortfall Days</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">To Attend</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Eligible?</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Trend</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((student) => (
              <tr key={student.id} className="border-b border-[#F0F4F7] hover:bg-[#F6F8FB] cursor-pointer">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className={
                      student.riskLevel === 'critical' ? 'text-[#E74C3C]' : 'text-[#F39C12]'
                    } />
                    <div>
                      <p className="font-[600] text-[#0F1722]">{student.name}</p>
                      <p className="text-[9px] text-[#9AA6B4]">{student.rollNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <p className="font-[600] text-[#0F1722]">{student.course}</p>
                  <p className="text-[9px] text-[#9AA6B4]">{student.department}</p>
                </td>
                <td className="text-center p-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] ${
                    student.attendancePercent < 65 ? 'bg-[#E74C3C]/20 text-[#E74C3C]' :
                    student.attendancePercent < 75 ? 'bg-[#F39C12]/20 text-[#F39C12]' :
                    'bg-[#27AE60]/20 text-[#27AE60]'
                  }`}>
                    {student.attendancePercent.toFixed(1)}%
                  </span>
                </td>
                <td className="text-center p-2 font-['Courier'] font-[600]">{student.shortfallDays}</td>
                <td className="text-center p-2 font-['Courier'] font-[600]">{student.daysToAttend}</td>
                <td className="text-center p-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] ${
                    student.projectedEligibility ? 'bg-[#27AE60]/20 text-[#27AE60]' : 'bg-[#E74C3C]/20 text-[#E74C3C]'
                  }`}>
                    {student.projectedEligibility ? 'Eligible' : 'At Risk'}
                  </span>
                </td>
                <td className="text-center p-2">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingDown size={12} className="text-[#E74C3C]" />
                    <span className="text-[9px] text-[#9AA6B4]">-{(student.trendSparkline[0] - student.trendSparkline[student.trendSparkline.length - 1]).toFixed(1)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
