'use client'

import { AlertTriangle, AlertCircle } from 'lucide-react'
import { AttritionRiskEmployee } from '@/lib/useHRPayrollData'

interface AttritionWatchlistTableProps {
  data: AttritionRiskEmployee[]
  onEmployeeClick?: (employee: AttritionRiskEmployee) => void
}

export function AttritionWatchlistTable({ data, onEmployeeClick }: AttritionWatchlistTableProps) {
  const getRiskIcon = (level: string) => {
    return level === 'critical' ? <AlertTriangle size={16} /> : <AlertCircle size={16} />
  }

  const getRiskColor = (level: string) => {
    if (level === 'critical') return '#E74C3C'
    if (level === 'high') return '#E67E22'
    return '#F39C12'
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Attrition Watchlist (Risk-Ranked)</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-[#E5ECEF]">
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Employee</th>
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Designation</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Tenure (Yr)</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Leave %</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Appraisal</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Risk Score</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, idx) => (
              <tr key={employee.id} className="border-b border-[#F0F4F7] hover:bg-[#F6F8FB]">
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(employee.riskLevel)}
                    <div>
                      <p className="font-[600] text-[#0F1722]">{employee.name}</p>
                      <p className="text-[#9AA6B4]">{employee.department}</p>
                    </div>
                  </div>
                </td>
                <td className="p-2 text-[#0F1722]">{employee.designation}</td>
                <td className="text-center p-2 font-[600] text-[#0F1722]">{employee.tenure}</td>
                <td className="text-center p-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] ${
                    employee.leaveUtilization > 80 ? 'bg-[#E74C3C]/20 text-[#E74C3C]' :
                    employee.leaveUtilization > 70 ? 'bg-[#F39C12]/20 text-[#F39C12]' :
                    'bg-[#27AE60]/20 text-[#27AE60]'
                  }`}>
                    {employee.leaveUtilization}%
                  </span>
                </td>
                <td className="text-center p-2 font-[600]">
                  <span className={employee.appraisalScore < 3.5 ? 'text-[#E74C3C]' : 'text-[#0F1722]'}>
                    {employee.appraisalScore.toFixed(1)}/5
                  </span>
                </td>
                <td className="text-center p-2 font-[600]" style={{ color: getRiskColor(employee.riskLevel) }}>
                  {employee.riskScore.toFixed(1)}
                </td>
                <td className="text-center p-2">
                  <button
                    onClick={() => onEmployeeClick?.(employee)}
                    className="px-2 py-1 rounded-[6px] text-[9px] font-[600] bg-[#2E8B8B]/20 text-[#2E8B8B] hover:bg-[#2E8B8B] hover:text-white transition-colors"
                  >
                    Flag
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
