'use client'
import { useState, useMemo } from 'react'
import { ArrowUp, ArrowDown, Download, Filter } from 'lucide-react'
import { Mover } from '@/lib/useExecutiveCockpitData'

interface MoversTableProps {
  data: Mover[]
}

type SortField = 'entity' | 'metric' | 'change'
type SortOrder = 'asc' | 'desc'

export function MoversTable({ data }: MoversTableProps) {
  const [sortBy, setSortBy] = useState<SortField>('change')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [filterStatus, setFilterStatus] = useState<'all' | 'up' | 'down'>('all')

  const sorted = useMemo(() => {
    const filtered = filterStatus === 'all' ? data : data.filter(m => m.direction === filterStatus)
    const displayData = filtered.length > 0 ? filtered : data
    
    return [...displayData].sort((a, b) => {
      let aVal: any = a[sortBy]
      let bVal: any = b[sortBy]
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = (bVal as string).toLowerCase()
      }
      
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortOrder === 'asc' ? cmp : -cmp
    })
  }, [data, sortBy, sortOrder, filterStatus])

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="executive-plain-card w-full bg-white rounded-lg border border-[#E0E6F2] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#E0E6F2] bg-[#F5F7FB]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-[700] text-[#1A2D47] flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#EC4899] to-[#BE123C] rounded-full"></span>
              Top Movers — Most Changed Metrics
            </h3>
            <p className="text-[11px] text-[#617588] mt-1">
              Departments & metrics showing largest variance period-over-period
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Export CSV">
              <Download className="w-4 h-4 text-[#617588]" />
            </button>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mt-3">
          {(['all', 'up', 'down'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1 text-[11px] font-[600] rounded-full transition-colors ${
                filterStatus === status
                  ? status === 'up'
                    ? 'bg-[#D1F0E6] text-[#1C5A5A]'
                    : status === 'down'
                    ? 'bg-[#FFE8E6] text-[#C71C1C]'
                    : 'bg-[#E0E6F2] text-[#1A2D47]'
                  : 'bg-[#F0F2F7] text-[#617588] hover:bg-[#E0E6F2]'
              }`}
            >
              {status === 'all' ? '📊 All' : status === 'up' ? '↑ Rising' : '↓ Falling'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 p-3 md:hidden">
        {sorted.map((mover) => (
          <div key={`${mover.entity}-${mover.metric}-card`} className="rounded-[14px] border border-[#E0E6F2] bg-[#F8FAFD] p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[12px] font-[850] text-[#1A2D47]">{mover.entity}</p>
                <p className="mt-0.5 text-[11px] font-[700] text-[#617588]">{mover.metric}</p>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-[850] ${
                  mover.direction === 'up' ? 'bg-[#2E8B8B]/15 text-[#2E8B8B]' : 'bg-[#C0392B]/15 text-[#C0392B]'
                }`}
              >
                {mover.direction === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {mover.direction === 'up' ? '+' : '−'}{Math.abs(mover.change).toFixed(1)}%
              </span>
            </div>
            <button className="mt-3 w-full rounded-[10px] border border-[#D8E0EE] bg-white px-3 py-2 text-[11px] font-[800] text-[#2E8B8B]">
              Drill into metric
            </button>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E0E6F2] bg-[#F9FAFB]">
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('entity')}
                    className="text-[11px] font-[600] text-[#617588] hover:text-[#1A2D47] flex items-center gap-1 uppercase tracking-wider"
                  >
                    Entity
                    {sortBy === 'entity' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('metric')}
                    className="text-[11px] font-[600] text-[#617588] hover:text-[#1A2D47] flex items-center gap-1 uppercase tracking-wider"
                  >
                    Metric
                    {sortBy === 'metric' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right">
                  <button
                    onClick={() => handleSort('change')}
                    className="text-[11px] font-[600] text-[#617588] hover:text-[#1A2D47] flex items-center justify-end gap-1 uppercase tracking-wider ml-auto"
                  >
                    Change
                    {sortBy === 'change' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </button>
                </th>
                <th className="px-6 py-3 text-right text-[11px] font-[600] text-[#617588] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((mover, idx) => (
                <tr
                  key={`${mover.entity}-${mover.metric}`}
                  className={`border-b border-[#E0E6F2] hover:bg-[#F9FAFB] transition-colors ${
                    idx === sorted.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="text-[12px] font-[600] text-[#1A2D47]">{mover.entity}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[12px] text-[#617588]">{mover.metric}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={`text-[12px] font-[700] tabular-nums ${
                          mover.direction === 'up' ? 'text-[#22A65F]' : 'text-[#C71C1C]'
                        }`}
                      >
                        {mover.direction === 'up' ? '+' : '−'}{Math.abs(mover.change).toFixed(1)}%
                      </span>
                      {mover.direction === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-[#22A65F]" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-[#C71C1C]" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[11px] font-[600] text-[#2E8B8B] hover:text-[#1C5A5A] transition-colors">
                      Drill →
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
