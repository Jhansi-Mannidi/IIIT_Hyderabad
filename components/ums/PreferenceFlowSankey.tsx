'use client'
import { ArrowRight, CheckCircle2, GitBranch, Info, TrendingDown } from 'lucide-react'
import { PreferenceFlow } from '@/lib/useAdmissionsDashboardData'
import { MotionCard } from './MotionCard'

interface PreferenceFlowSankeyProps {
  flows: PreferenceFlow[]
}

export function PreferenceFlowSankey({ flows }: PreferenceFlowSankeyProps) {
  const totalAllotments = flows.reduce((sum, flow) => sum + flow.allotments, 0)
  const totalReportedIn = flows.reduce((sum, flow) => sum + flow.reportedIn, 0)
  const totalDiverged = flows.reduce((sum, flow) => sum + flow.reportedElsewhere, 0)
  const bestFlow = flows.reduce((best, flow) => (flow.divergence < best.divergence ? flow : best), flows[0])
  const highestDivergence = flows.reduce((worst, flow) => (flow.divergence > worst.divergence ? flow : worst), flows[0])

  return (
    <MotionCard className="flex flex-col gap-4 px-5 py-4 bg-white rounded-[10px] border border-[#DFE7EF]">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[14px] font-[800] text-[#0F1722]">Preference Outcome Intelligence</h3>
          <p className="text-[12px] text-[#5A6B7A] mt-0.5">Rank-wise reporting strength, divergence risk, and allotment quality</p>
        </div>
        <div className="flex w-fit items-center gap-1 rounded-[999px] bg-[#EEF2F8] px-2.5 py-1 text-[11px] font-[700] text-[#5A6B7A]">
          <Info size={12} />
          Decision Quality
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[0.9fr_1.4fr]">
        <div className="rounded-[14px] border border-[#DFE7EF] bg-[#F8FBFD] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-[800] uppercase tracking-[0.08em] text-[#6B7C99]">Reported In</p>
              <p className="admissions-chart-metric-large mt-1 text-[18px] font-[700] leading-none tracking-[-0.02em] text-[#1F3864] tabular-nums">
                {((totalReportedIn / totalAllotments) * 100).toFixed(1)}%
              </p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#E8F5F5] text-[#2E8B8B]">
              <CheckCircle2 size={21} />
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-[#E4EAF2]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2E8B8B] to-[#1F3864]"
                style={{ width: `${(totalReportedIn / totalAllotments) * 100}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-[10px] bg-white p-2">
                <p className="font-[700] text-[#6B7C99]">Allotments</p>
                <p className="admissions-chart-metric mt-0.5 text-[13px] font-[650] text-[#0F1722] tabular-nums">{totalAllotments.toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-[10px] bg-white p-2">
                <p className="font-[700] text-[#6B7C99]">Diverged</p>
                <p className="admissions-chart-metric mt-0.5 text-[13px] font-[650] text-[#B2566B] tabular-nums">{totalDiverged.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {flows.map((flow) => {
            const reportedPct = (flow.reportedIn / flow.allotments) * 100
            const riskTone = flow.divergence <= 10 ? '#2E8B8B' : flow.divergence <= 65 ? '#C55A11' : '#B2566B'

            return (
              <div
                key={flow.preference}
                className="rounded-[13px] border border-[#DFE7EF] bg-[#F8FBFD] px-3 py-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-white text-[12px] font-[850] text-[#1F3864] shadow-sm">
                      R{flow.preference}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-[800] text-[#0F1722]">
                        Rank {flow.preference} Preference
                      </p>
                      <p className="text-[10.5px] font-[650] text-[#6B7C99]">
                        {flow.reportedIn.toLocaleString('en-IN')} joined · {flow.reportedElsewhere.toLocaleString('en-IN')} shifted
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="admissions-chart-metric text-[13px] font-[650] tabular-nums" style={{ color: riskTone }}>
                      {flow.divergence.toFixed(1)}%
                    </p>
                    <p className="text-[9.5px] font-[700] text-[#9AA6B4]">divergence</p>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[9.5px] font-[700] text-[#6B7C99]">
                      <span>Reported In</span>
                      <span>{reportedPct.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#E4EAF2]">
                      <div className="h-full rounded-full bg-[#2E8B8B]" style={{ width: `${reportedPct}%` }} />
                    </div>
                  </div>
                  <ArrowRight size={14} className="mt-4 text-[#9AA6B4]" />
                  <div>
                    <div className="mb-1 flex items-center justify-between text-[9.5px] font-[700] text-[#6B7C99]">
                      <span>Different Choice</span>
                      <span>{flow.divergence.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#E4EAF2]">
                      <div className="h-full rounded-full" style={{ width: `${flow.divergence}%`, backgroundColor: riskTone }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 border-t border-[#DFE7EF] pt-3 sm:grid-cols-3">
        {[
          {
            icon: CheckCircle2,
            label: 'Best Preference Fit',
            value: `Rank ${bestFlow.preference}`,
            detail: `${bestFlow.divergence.toFixed(1)}% divergence`,
            tone: '#2E8B8B',
          },
          {
            icon: TrendingDown,
            label: 'Highest Mismatch',
            value: `Rank ${highestDivergence.preference}`,
            detail: `${highestDivergence.reportedElsewhere} shifted elsewhere`,
            tone: '#B2566B',
          },
          {
            icon: GitBranch,
            label: 'Total Divergence',
            value: `${((totalDiverged / totalAllotments) * 100).toFixed(1)}%`,
            detail: `${totalDiverged} of ${totalAllotments} allotments`,
            tone: '#C55A11',
          },
        ].map(({ icon: Icon, label, value, detail, tone }) => (
          <div key={label} className="flex items-center gap-3 rounded-[12px] bg-[#F8FBFD] p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-[12px]" style={{ backgroundColor: `${tone}18`, color: tone }}>
              <Icon size={17} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-[800] uppercase tracking-[0.07em] text-[#6B7C99]">{label}</p>
              <p className="admissions-chart-metric mt-0.5 truncate text-[13px] font-[650] text-[#0F1722] tabular-nums" style={{ color: tone }}>
                {value}
              </p>
              <p className="truncate text-[10.5px] font-[650] text-[#9AA6B4]">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[10px] border border-[#2E8B8B]/20 bg-[#E8F5F5] px-3 py-2">
        <p className="text-[11px] font-[650] leading-5 text-[#1F3864]">
          <strong>Actionable read:</strong> Rank 1 intent is strong, while lower preference ranks show higher mismatch. Improve branch-combo clarity and choice-lock confirmation before counseling.
        </p>
      </div>
    </MotionCard>
  )
}
