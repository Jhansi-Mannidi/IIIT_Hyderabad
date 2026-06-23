'use client'
import { Sankey, Tooltip, YAxis, XAxis, Node, ResponsiveContainer } from 'recharts'
import { Info } from 'lucide-react'
import { SankeyNode, SankeyLink } from '@/lib/useAdmissionsDashboardData'
import { MotionCard } from './MotionCard'

interface PreferenceFlowSankeyProps {
  nodes: SankeyNode[]
  links: SankeyLink[]
}

export function PreferenceFlowSankey({ nodes, links }: PreferenceFlowSankeyProps) {
  const data = {
    nodes: nodes.map((n, idx) => ({ name: n.name, label: n.label })),
    links: links.map((l) => ({
      source: l.source,
      target: l.target,
      value: l.value,
      label: l.label,
    })),
  }

  return (
    <MotionCard className="flex flex-col gap-3 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-[700] text-[#0F1722]">Preference → Allotment Flow</h3>
          <p className="text-[12px] text-[#5A6B7A] mt-0.5">Candidate preferences vs. actual allotments (divergence analysis)</p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-[600] text-[#5A6B7A] bg-[#EEF2F8] px-2 py-1 rounded-[6px]">
          <Info size={12} />
          Intent vs. Outcome
        </div>
      </div>

      {/* Sankey Chart */}
      <div className="w-full h-64 -mx-5 px-5">
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={data}
            node={{ fill: '#2E8B8B', fillOpacity: 1, stroke: '#1F3864', strokeWidth: 1 }}
            link={{ stroke: '#C55A11', strokeOpacity: 0.3 }}
            nodePadding={80}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F1722',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#2E8B8B', fontSize: '12px', fontWeight: '600' }}
              formatter={(value: any) => [
                `${value.toLocaleString()} students`,
                'Flow',
              ]}
            />
          </Sankey>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#DFE7EF]">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Rank 1 Reported</span>
          <span className="text-[14px] font-[700] text-[#2E8B8B] tabular-nums">1,620</span>
          <span className="text-[10px] text-[#9AA6B4]">96.4% conversion</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Rank 2+ Divergence</span>
          <span className="text-[14px] font-[700] text-[#B2566B] tabular-nums">62.5%</span>
          <span className="text-[10px] text-[#9AA6B4]">Different choice</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Total Diverged</span>
          <span className="text-[14px] font-[700] text-[#1F3864] tabular-nums">135</span>
          <span className="text-[10px] text-[#9AA6B4]">7.1% of allotments</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#5A6B7A]">Insight</span>
          <span className="text-[14px] font-[700] text-[#C99A2E] tabular-nums">Strong</span>
          <span className="text-[10px] text-[#9AA6B4]">Rank 1 preference</span>
        </div>
      </div>

      {/* Info Box */}
      <div className="px-3 py-2 rounded-[6px] bg-[#E8F5F5] border border-[#2E8B8B] border-opacity-20">
        <p className="text-[11px] text-[#1F3864]">
          <strong>Divergence:</strong> When a student receives an allotment in a lower preference but opts to join at that choice instead of waiting for a higher preference. Monitor divergence for preference form clarity improvements.
        </p>
      </div>
    </MotionCard>
  )
}
