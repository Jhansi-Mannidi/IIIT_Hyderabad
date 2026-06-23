'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useInstitutionalFinanceData } from '@/lib/useInstitutionalFinanceData'
import { InstitutionalFinanceKPITile } from './InstitutionalFinanceKPITile'
import { InstitutionalFinanceFilterBar } from './InstitutionalFinanceFilterBar'
import { BudgetVarianceWall } from './BudgetVarianceWall'
import { CostCenterTreemap } from './CostCenterTreemap'
import { ProjectBurndownChart } from './ProjectBurndownChart'
import { VoucherFlowChart } from './VoucherFlowChart'
import { FixedAssetsTable } from './FixedAssetsTable'
import { BankReconTable } from './BankReconTable'
import { InstitutionalFinanceAICard } from './InstitutionalFinanceAICard'

export function InstitutionalFinanceDashboard() {
  const data = useInstitutionalFinanceData()
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())

  const visibleInsights = data.aiInsights.filter(i => !dismissedInsights.has(i.id))

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F8FB]">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">Institutional Finance & Budget</h1>
            <p className="text-[13px] text-[#9AA6B4] mt-1">Budget control, cost-center spend, projects, vouchers, assets & bank reconciliation</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-[#D1D8DF] hover:bg-[#F6F8FB]">
            <RefreshCw size={14} className="text-[#5A6B7A]" />
            <span className="text-[12px] font-[600] text-[#0F1722]">Refresh</span>
          </button>
        </div>

        {/* Filters */}
        <InstitutionalFinanceFilterBar />

        {/* KPI Strip */}
        <section aria-label="Finance KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.kpis.map((kpi) => (
              <InstitutionalFinanceKPITile
                key={kpi.id}
                {...kpi}
                currency={kpi.id !== 'budget-utilization' && kpi.id !== 'variance-pct'}
                percentage={kpi.id === 'budget-utilization' || kpi.id === 'variance-pct'}
              />
            ))}
          </div>
        </section>

        {/* Signature Elements */}
        <section aria-label="Budget analysis" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BudgetVarianceWall data={data.budgetVariance} />
          <CostCenterTreemap data={data.costCenters} />
        </section>

        {/* Project & Voucher Charts */}
        <section aria-label="Operations" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ProjectBurndownChart data={data.projects} />
          <VoucherFlowChart data={data.voucherFlow} />
        </section>

        {/* Assets & Recon */}
        <section aria-label="Assets and reconciliation" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FixedAssetsTable data={data.fixedAssets} />
          <BankReconTable data={data.bankReconItems} />
        </section>

        {/* AI Insights */}
        {visibleInsights.length > 0 && (
          <section aria-label="Finance insights" className="space-y-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
            <h3 className="text-[13px] font-[700] text-[#0F1722]">AI-Powered Finance Insights</h3>
            <div className="space-y-2">
              {visibleInsights.map((insight) => (
                <InstitutionalFinanceAICard
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
