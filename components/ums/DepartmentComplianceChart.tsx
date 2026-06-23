'use client'

import { DepartmentCompliance } from '@/lib/useAttendanceData'

interface DepartmentComplianceChartProps {
  data: DepartmentCompliance[]
}

export function DepartmentComplianceChart({ data }: DepartmentComplianceChartProps) {
  const sortedData = [...data].sort((a, b) => b.compliance - a.compliance)

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Department Compliance Ranking</h3>
      
      <div className="space-y-3">
        {sortedData.map((dept, idx) => {
          const complianceColor = dept.compliance > 75 ? '#27AE60' : dept.compliance > 70 ? '#F39C12' : '#E74C3C'

          return (
            <div key={dept.department} className="flex items-center gap-3">
              <div className="w-16 flex-shrink-0">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#EEF2F8] text-[#1F3864]">
                  <p className="text-[10px] font-[700]">#{idx + 1}</p>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <div>
                    <p className="text-[11px] font-[600] text-[#0F1722]">{dept.department}</p>
                    <p className="text-[9px] text-[#9AA6B4]">{dept.studentsAtRisk} at-risk students</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="h-2 bg-[#F0F4F7] rounded-full overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${dept.compliance}%`,
                          backgroundColor: complianceColor,
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="w-12 text-right">
                    <p className="text-[11px] font-['Courier'] font-[700]" style={{ color: complianceColor }}>
                      {dept.compliance.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
