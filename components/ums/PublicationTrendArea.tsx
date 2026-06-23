'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { PubTrendPoint } from '@/lib/useResearchData'

interface PublicationTrendAreaProps {
  data: PubTrendPoint[]
}

export function PublicationTrendArea({ data }: PublicationTrendAreaProps) {
  const latest  = data[data.length - 1]
  const prev    = data[data.length - 2]
  const yoyPct  = prev ? (((latest.total - prev.total) / prev.total) * 100).toFixed(1) : null

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[13px] font-[700] text-[#0F1722]">Publication Volume Trend</h3>
          <p className="text-[11px] text-[#9AA6B4] mt-0.5">Stacked area by type (Journal / Conference / Patent)</p>
        </div>
        {yoyPct && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#D1F2F2] rounded-[6px] shrink-0">
            <span className="text-[10px] font-[600] text-[#2E8B8B]">YoY</span>
            <span className="text-[11px] font-[700] font-['Courier_New',monospace] text-[#2E8B8B]">+{yoyPct}%</span>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <defs>
            <linearGradient id="gJournal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#2E8B8B" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#2E8B8B" stopOpacity={0.08} />
            </linearGradient>
            <linearGradient id="gConf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#1F3864" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#1F3864" stopOpacity={0.08} />
            </linearGradient>
            <linearGradient id="gPatent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#C55A11" stopOpacity={0.55} />
              <stop offset="95%" stopColor="#C55A11" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis dataKey="year" fontSize={11} stroke="#9AA6B4" />
          <YAxis fontSize={11} stroke="#9AA6B4" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
              fontSize: '11px',
              color: '#fff',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="journal"
            name="Journal"
            stackId="1"
            stroke="#2E8B8B"
            fill="url(#gJournal)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="conference"
            name="Conference"
            stackId="1"
            stroke="#1F3864"
            fill="url(#gConf)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="patent"
            name="Patent"
            stackId="1"
            stroke="#C55A11"
            fill="url(#gPatent)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Summary footer */}
      <div className="flex flex-wrap gap-4 p-3 bg-[#F6F8FB] rounded-[8px]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-0.5">Total (2024)</p>
          <p className="font-['Courier_New',monospace] text-[13px] font-[700] text-[#0F1722]">{latest.total}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-0.5">Journals</p>
          <p className="font-['Courier_New',monospace] text-[13px] font-[700] text-[#2E8B8B]">{latest.journal}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-0.5">Conferences</p>
          <p className="font-['Courier_New',monospace] text-[13px] font-[700] text-[#1F3864]">{latest.conference}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-0.5">Patents</p>
          <p className="font-['Courier_New',monospace] text-[13px] font-[700] text-[#C55A11]">{latest.patent}</p>
        </div>
      </div>
    </div>
  )
}
