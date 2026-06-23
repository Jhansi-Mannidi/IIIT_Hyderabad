'use client'

import { FacultyProd } from '@/lib/useResearchData'

const DEPT_COLORS: Record<string, string> = {
  ECE:        '#2E8B8B',
  CSE:        '#1F3864',
  Mechanical: '#C55A11',
  Civil:      '#E67E22',
  Management: '#9B59B6',
}

interface FacultyProductivityChartProps {
  data: FacultyProd[]
}

export function FacultyProductivityChart({ data }: FacultyProductivityChartProps) {
  const maxPubs = Math.max(...data.map(d => d.pubs))

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center gap-3">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Faculty Productivity</h3>
        <span className="px-1.5 py-0.5 rounded-[4px] bg-[#EEF2F8] text-[9px] font-[600] text-[#1F3864]">
          [Derived]
        </span>
      </div>
      <p className="text-[10px] text-[#9AA6B4] -mt-2">
        Publications per faculty — multi-author strings parsed to allocate output. Shared-author pubs counted once per faculty.
      </p>

      <div className="space-y-2.5">
        {data.map((f, idx) => {
          const color  = DEPT_COLORS[f.department] ?? '#9AA6B4'
          const barW   = (f.pubs / maxPubs) * 100

          return (
            <div key={f.faculty} className="flex items-center gap-2">
              <span className="text-[10px] font-[700] text-[#9AA6B4] w-3 text-right">{idx + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1 gap-2">
                  <span className="text-[11px] font-[600] text-[#0F1722]">{f.faculty}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-[600] px-1.5 py-0.5 rounded-[4px]"
                      style={{ backgroundColor: `${color}20`, color }}
                    >
                      {f.department}
                    </span>
                    <span className="font-['Courier_New',monospace] text-[11px] font-[700] text-[#0F1722]">{f.pubs} pubs</span>
                    <span className="text-[10px] text-[#9AA6B4]">IF {f.avgIF.toFixed(1)}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#F0F4F7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${barW}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
