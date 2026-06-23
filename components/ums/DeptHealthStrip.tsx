'use client'
import { useState } from 'react'
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { DeptHealthCell } from '@/lib/useExecutiveCockpitData'

function getDrivenColor(score: number) {
  if (score >= 80) return '#D1E8E6'  // Healthy teal
  if (score >= 70) return '#FFF4E6'  // Warning orange
  return '#FFE8E6'                    // Critical red
}

function getTextColor(score: number) {
  if (score >= 80) return '#1C5A5A'
  if (score >= 70) return '#A35C00'
  return '#C71C1C'
}

function getStatusIcon(score: number) {
  if (score >= 80) return '◆'
  if (score >= 70) return '▲'
  return '●'
}

interface DeptHealthStripProps {
  data: DeptHealthCell[]
  onCellClick?: (dept: DeptHealthCell) => void
}

export function DeptHealthStrip({ data, onCellClick }: DeptHealthStripProps) {
  const [expandedDept, setExpandedDept] = useState<string | null>(null)

  const handleCellClick = (cell: DeptHealthCell) => {
    setExpandedDept(expandedDept === cell.dept ? null : cell.dept)
    onCellClick?.(cell)
  }

  return (
    <div className="w-full bg-white rounded-lg border border-[#E0E6F2] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#E0E6F2] bg-[#F5F7FB]">
        <h3 className="text-sm font-[700] text-[#1A2D47] flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-[#F97316] to-[#EA580C] rounded-full"></span>
          Department Health Heat-Strip
        </h3>
        <p className="text-[11px] text-[#617588] mt-1">
          Blended score (Academic + Finance + Satisfaction). ◆ = Healthy (80+) | ▲ = Warning (70–79) | ● = Critical (&lt;70)
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-2 p-4 min-w-min">
          {data.map((cell) => (
            <div key={cell.dept} className="flex-shrink-0">
              <button
                onClick={() => handleCellClick(cell)}
                className="group relative"
              >
                <div
                  style={{ backgroundColor: getDrivenColor(cell.score) }}
                  className="px-3 py-2 rounded-lg border border-[#D9E1ED] transition-all cursor-pointer hover:shadow-md hover:scale-105 min-w-[120px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      style={{ color: getTextColor(cell.score) }}
                      className="text-[10px] font-[700] uppercase tracking-wider"
                    >
                      {getStatusIcon(cell.score)} {cell.dept}
                    </span>
                  </div>
                  <div className="text-right">
                    <p
                      style={{ color: getTextColor(cell.score) }}
                      className="text-[18px] font-[700] tabular-nums leading-none"
                    >
                      {Math.round(cell.score)}
                    </p>
                    <p className="text-[10px] text-[#9AA6B4] mt-1">of 100</p>
                  </div>
                </div>

                {/* Hover detail card */}
                <div className="absolute -top-[140px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10 w-[140px] bg-white rounded-lg shadow-lg border border-[#D9E1ED] p-2.5">
                  <p className="text-[10px] font-[600] text-[#1A2D47] mb-1.5">Score breakdown:</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-[#617588]">Academic:</span>
                      <span className="font-[600] text-[#1A2D47]">{cell.academic}</span>
                    </div>
                    <div className="flex justify-between text-[9px]">
                      <span className="text-[#617588]">Finance:</span>
                      <span className="font-[600] text-[#1A2D47]">{cell.finance}</span>
                    </div>
                    <div className="flex justify-between text-[9px]">
                      <span className="text-[#617588]">Satisfaction:</span>
                      <span className="font-[600] text-[#1A2D47]">{cell.satisfaction}</span>
                    </div>
                  </div>
                  <p className="text-[8px] text-[#9AA6B4] mt-2 pt-1.5 border-t border-[#E0E6F2]">Click to drill down</p>
                </div>
              </button>

              {/* Expanded detail when clicked */}
              {expandedDept === cell.dept && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E0E6F2] rounded-lg p-4 shadow-lg z-20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-sm font-[700] text-[#1A2D47]">{cell.dept} Department</h4>
                      <p className="text-[11px] text-[#617588] mt-0.5">Detailed metrics breakdown</p>
                    </div>
                    <button
                      onClick={() => setExpandedDept(null)}
                      className="text-[#9AA6B4] hover:text-[#1A2D47]"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[10px] text-[#9AA6B4] font-[600] mb-1">Academic Score</p>
                      <p className="text-[20px] font-[700] text-[#2E8B8B]">{cell.academic}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#9AA6B4] font-[600] mb-1">Financial Health</p>
                      <p className="text-[20px] font-[700] text-[#F97316]">{cell.finance}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#9AA6B4] font-[600] mb-1">Satisfaction</p>
                      <p className="text-[20px] font-[700] text-[#8B5CF6]">{cell.satisfaction}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#E0E6F2]">
                    <button className="text-[11px] font-[600] text-[#2E8B8B] hover:text-[#1C5A5A] flex items-center gap-1">
                      View full department dashboard <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
