'use client'

import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react'
import { GrievanceBucket } from '@/lib/usePlacementsData'

interface Props {
  data: GrievanceBucket[]
  onTileClick?: (status: GrievanceBucket['status']) => void
}

const CONFIG: Record<GrievanceBucket['status'], {
  icon: React.ComponentType<{ size: number; className?: string }>
  color: string
  bg: string
  border: string
  label: string
  note: string
}> = {
  'Open': {
    icon:   AlertCircle,
    color:  '#E74C3C',
    bg:     '#FEF0EE',
    border: '#F5B7B1',
    label:  'Open',
    note:   'Awaiting first response — SLA 15 days',
  },
  'In Progress': {
    icon:   Clock,
    color:  '#E67E22',
    bg:     '#FEF7ED',
    border: '#FAD7A0',
    label:  'In Progress',
    note:   'Under review by placement officer',
  },
  'Resolved': {
    icon:   CheckCircle2,
    color:  '#1B7A4A',
    bg:     '#E8F7EF',
    border: '#A9DFBF',
    label:  'Resolved',
    note:   'Closed — placements_grievances',
  },
}

export function GrievanceStatusTiles({ data, onTileClick }: Props) {
  const total = data.reduce((s, d) => s + d.n, 0)

  return (
    <div className="bg-white rounded-[12px] border border-[#E5ECEF] p-4">
      <div className="mb-4">
        <h3 className="text-[13px] font-[700] text-[#0F1722]">Grievance Status</h3>
        <p className="text-[11px] text-[#9AA6B4] mt-0.5">
          COUNT(placements_grievances) by status — click to view list
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {data.map(bucket => {
          const cfg  = CONFIG[bucket.status]
          const Icon = cfg.icon
          const pct  = Math.round((bucket.n / total) * 100)

          return (
            <button
              key={bucket.status}
              onClick={() => onTileClick?.(bucket.status)}
              className="flex flex-col items-center gap-2 p-4 rounded-[10px] border transition-all hover:shadow-md text-center"
              style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
            >
              <Icon size={22} className="" style={{ color: cfg.color } as React.CSSProperties} />

              <p
                className="text-[26px] font-[700] font-['Courier_New',_monospace] leading-none"
                style={{ color: cfg.color }}
              >
                {bucket.n}
              </p>

              <p className="text-[11px] font-[700] text-[#0F1722]">{cfg.label}</p>

              {/* Mini progress bar */}
              <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: cfg.color }}
                />
              </div>
              <p className="text-[10px] text-[#9AA6B4]">{pct}% of {total}</p>

              <p className="text-[9px] text-[#9AA6B4] italic leading-tight">{cfg.note}</p>
            </button>
          )
        })}
      </div>

      {data.find(d => d.status === 'Open' && d.n > 0) && (
        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-[8px] bg-[#FEF0EE] border border-[#F5B7B1]">
          <AlertCircle size={14} className="text-[#E74C3C] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#E74C3C] font-[600]">
            {data.find(d => d.status === 'Open')?.n} open grievances — review against 15-day SLA.
            Escalate any overdue cases to Dean.
          </p>
        </div>
      )}
    </div>
  )
}
