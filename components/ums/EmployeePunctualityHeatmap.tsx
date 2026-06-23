'use client'

import { EmployeeBiometric } from '@/lib/useAttendanceData'
import { MotionCard } from './MotionCard'

interface EmployeePunctualityHeatmapProps {
  data: EmployeeBiometric[]
  onCellClick?: (employee: EmployeeBiometric, day: string) => void
}

export function EmployeePunctualityHeatmap({ data, onCellClick }: EmployeePunctualityHeatmapProps) {
  const getColorForStatus = (status: string) => {
    if (status === 'ontime') return { bg: '#D1F2F2', text: '#2E8B8B' }
    if (status === 'late') return { bg: '#FCE8D6', text: '#E67E22' }
    return { bg: '#FADBD8', text: '#E74C3C' }
  }

  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Employee Punctuality Heatmap (This Month)</h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="flex gap-1">
            <div className="w-40 flex-shrink-0">
              <p className="text-[11px] font-[600] text-[#5A6B7A] p-2">Employee</p>
            </div>
            <div className="flex gap-1">
              {data[0]?.thisMonthPunches.map((punch) => (
                <div key={punch.day} className="w-10 flex-shrink-0">
                  <p className="text-[10px] font-[600] text-[#5A6B7A] text-center p-1">{punch.day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Rows */}
          {data.map((employee) => {
            const colors = employee.lateCount > 3 ? '#E74C3C' : employee.lateCount > 1 ? '#F39C12' : '#2E8B8B'

            return (
              <div key={employee.employeeId} className="flex gap-1 border-t border-[#F0F4F7]">
                <div className="w-40 flex-shrink-0 p-2">
                  <p className="text-[11px] font-[600] text-[#0F1722]">{employee.name}</p>
                  <p className="text-[9px] text-[#9AA6B4]">{employee.designation}</p>
                </div>
                <div className="flex gap-1">
                  {employee.thisMonthPunches.map((punch, idx) => {
                    const statusColor = getColorForStatus(punch.status)

                    return (
                      <button
                        key={`${employee.employeeId}-${idx}`}
                        onClick={() => onCellClick?.(employee, punch.day)}
                        className="w-10 h-10 flex-shrink-0 rounded-[6px] flex items-center justify-center text-[9px] font-[600] hover:shadow-md transition-shadow"
                        style={{
                          backgroundColor: statusColor.bg,
                          color: statusColor.text,
                        }}
                        title={`${punch.day}: ${punch.status}${punch.minutesLate > 0 ? ` (+${punch.minutesLate}min)` : ''}`}
                      >
                        {punch.status === 'absent' ? '×' :
                         punch.status === 'late' ? punch.minutesLate :
                         '✓'}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px]" style={{ backgroundColor: '#D1F2F2', border: '1px solid #2E8B8B' }}></div>
          <span className="text-[10px] font-[600] text-[#0F1722]">On-Time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px]" style={{ backgroundColor: '#FCE8D6', border: '1px solid #E67E22' }}></div>
          <span className="text-[10px] font-[600] text-[#0F1722]">Late</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-[4px]" style={{ backgroundColor: '#FADBD8', border: '1px solid #E74C3C' }}></div>
          <span className="text-[10px] font-[600] text-[#0F1722]">Absent</span>
        </div>
      </div>
    </MotionCard>
  )
}
