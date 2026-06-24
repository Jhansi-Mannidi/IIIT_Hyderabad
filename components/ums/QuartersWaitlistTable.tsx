'use client'

import { QuartersWaitlist } from '@/lib/useHostelMessData'

interface QuartersWaitlistTableProps {
  data: QuartersWaitlist[]
  onRowClick?: (row: QuartersWaitlist) => void
}

export function QuartersWaitlistTable({ data, onRowClick }: QuartersWaitlistTableProps) {
  const sortedData = [...data].sort((a, b) => b.allocationScore - a.allocationScore)

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Staff Quarters Waitlist (Score-Ranked)</h3>
      
      <div className="grid gap-3 md:hidden">
        {sortedData.map((row) => (
          <button
            key={row.id}
            type="button"
            onClick={() => onRowClick?.(row)}
            className="rounded-[14px] border border-[#E5ECEF] bg-[#F8FAFD] p-3 text-left"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] font-[850] text-[#0F1722]">{row.name}</p>
                <p className="mt-0.5 text-[11px] font-[700] text-[#5A6B7A]">{row.designation}</p>
                <p className="text-[10px] text-[#9AA6B4]">{row.department}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-[10px] font-[850] ${
                row.priority === 'high' ? 'bg-[#E74C3C]/15 text-[#E74C3C]' :
                row.priority === 'medium' ? 'bg-[#F39C12]/15 text-[#F39C12]' :
                'bg-[#9AA6B4]/15 text-[#5A6B7A]'
              }`}>
                {row.priority}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#E5ECEF] pt-3 text-center">
              <div>
                <p className="text-[10px] font-[700] text-[#9AA6B4]">Requested</p>
                <p className="text-[11px] font-[850] text-[#0F1722]">{row.requestDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-[700] text-[#9AA6B4]">Score</p>
                <p className="text-[12px] font-[850] text-[#0F1722]">{row.allocationScore.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-[10px] font-[700] text-[#9AA6B4]">Status</p>
                <p className="text-[11px] font-[850] text-[#0F1722]">{row.status}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-[#E5ECEF]">
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Name</th>
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Designation</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Request Date</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Priority</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Score</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-b border-[#F0F4F7] hover:bg-[#F6F8FB] cursor-pointer">
                <td className="p-2">
                  <p className="font-[600] text-[#0F1722]">{row.name}</p>
                  <p className="text-[9px] text-[#9AA6B4]">{row.department}</p>
                </td>
                <td className="p-2 text-[#0F1722]">{row.designation}</td>
                <td className="text-center p-2 text-[#5A6B7A]">{row.requestDate}</td>
                <td className="text-center p-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] ${
                    row.priority === 'high' ? 'bg-[#E74C3C]/20 text-[#E74C3C]' :
                    row.priority === 'medium' ? 'bg-[#F39C12]/20 text-[#F39C12]' :
                    'bg-[#9AA6B4]/20 text-[#9AA6B4]'
                  }`}>
                    {row.priority}
                  </span>
                </td>
                <td className="text-center p-2 font-['Courier'] font-[600]">{row.allocationScore.toFixed(1)}</td>
                <td className="text-center p-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] ${
                    row.status === 'approved' ? 'bg-[#27AE60]/20 text-[#27AE60]' :
                    row.status === 'rejected' ? 'bg-[#E74C3C]/20 text-[#E74C3C]' :
                    'bg-[#F39C12]/20 text-[#F39C12]'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
