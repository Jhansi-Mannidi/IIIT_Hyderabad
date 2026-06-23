'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useHRPayrollData } from '@/lib/useHRPayrollData'
import { HRPayrollKPITile } from './HRPayrollKPITile'
import { HRFilterBar } from './HRFilterBar'
import { PayrollCompositionChart } from './PayrollCompositionChart'
import { AttritionWatchlistTable } from './AttritionWatchlistTable'
import { HeadcountPyramidChart } from './HeadcountPyramidChart'
import { LeaveBrokerHeatmap } from './LeaveBrokerHeatmap'
import { AppraisalProgressChart } from './AppraisalProgressChart'
import { RecruitmentFunnelChart } from './RecruitmentFunnelChart'
import { HRPayrollAICard } from './HRPayrollAICard'

export function HRPayrollDashboard() {
  const data = useHRPayrollData()
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())

  const visibleInsights = data.aiInsights.filter(i => !dismissedInsights.has(i.id))

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F8FB]">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">HR, Payroll & Workforce</h1>
            <p className="text-[13px] text-[#9AA6B4] mt-1">Workforce composition, leave patterns, appraisals, payroll structure, attrition signals</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-[#D1D8DF] hover:bg-[#F6F8FB]">
            <RefreshCw size={14} className="text-[#5A6B7A]" />
            <span className="text-[12px] font-[600] text-[#0F1722]">Refresh</span>
          </button>
        </div>

        {/* Filters */}
        <HRFilterBar />

        {/* KPI Strip */}
        <section aria-label="HR KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.kpis.map((kpi) => (
              <HRPayrollKPITile
                key={kpi.id}
                {...kpi}
                format={
                  kpi.id === 'gender-diversity' || kpi.id === 'leave-util' || kpi.id === 'appraisal-progress'
                    ? 'percentage'
                    : kpi.id === 'payroll-cost'
                    ? 'currency'
                    : 'number'
                }
              />
            ))}
          </div>
        </section>

        {/* Signature Elements */}
        <section aria-label="Payroll and attrition" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PayrollCompositionChart data={data.payrollComposition} />
          <AttritionWatchlistTable data={data.attritionRiskEmployees} />
        </section>

        {/* Workforce Analytics */}
        <section aria-label="Workforce analytics" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HeadcountPyramidChart data={data.headcountByDesignation} />
          <LeaveBrokerHeatmap data={data.leaveBalanceByDept} />
        </section>

        {/* Appraisal & Recruitment */}
        <section aria-label="Appraisal and recruitment" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AppraisalProgressChart data={data.appraisalProgress} />
          <RecruitmentFunnelChart data={data.recruitmentFunnel} />
        </section>

        {/* AI Insights */}
        {visibleInsights.length > 0 && (
          <section aria-label="HR insights" className="space-y-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
            <h3 className="text-[13px] font-[700] text-[#0F1722]">AI-Powered HR Insights</h3>
            <div className="space-y-2">
              {visibleInsights.map((insight) => (
                <HRPayrollAICard
                  key={insight.id}
                  insight={insight}
                  onDismiss={() => setDismissedInsights(prev => new Set(prev).add(insight.id))}
                  onAction={() => console.log(`Action: ${insight.action}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-[11px] text-[#9AA6B4]">Last updated: {data.lastUpdated}</p>
        </div>
      </div>
    </div>
  )
}
