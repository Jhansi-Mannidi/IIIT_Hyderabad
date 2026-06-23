'use client'

import { LeaveBalance } from '@/lib/useHRPayrollData'

interface LeaveBrokerHeatmapProps {
  data: LeaveBalance[]
}

export function LeaveBrokerHeatmap({ data }: LeaveBrokerHeatmapProps) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Leave Balance Heatmap by Department</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-[#E5ECEF]">
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Department</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Casual</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Sick</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Earned</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Utilized</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Balance</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Util %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dept) => {
              const utilPercent = (dept.utilized / dept.total) * 100
              const bgColor =
                utilPercent > 80 ? '#E74C3C' :
                utilPercent > 70 ? '#F39C12' :
                '#27AE60'

              return (
                <tr key={dept.department} className="border-b border-[#F0F4F7]">
                  <td className="p-2 font-[600] text-[#0F1722]">{dept.department}</td>
                  <td className="text-center p-2">{dept.casual}</td>
                  <td className="text-center p-2">{dept.sick}</td>
                  <td className="text-center p-2">{dept.earned}</td>
                  <td className="text-center p-2 font-[600]">{dept.utilized}</td>
                  <td className="text-center p-2 font-[600] text-[#2E8B8B]">{dept.balance}</td>
                  <td className="text-center p-2">
                    <span
                      className="px-2 py-1 rounded-[4px] text-[9px] font-[600] text-white"
                      style={{ backgroundColor: bgColor }}
                    >
                      {utilPercent.toFixed(0)}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
