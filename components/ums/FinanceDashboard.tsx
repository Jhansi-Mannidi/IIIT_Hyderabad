'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { useFinanceDashboardData } from '@/lib/useFinanceDashboardData'
import { FinanceKPITile } from './FinanceKPITile'
import { FinanceFilterBar } from './FinanceFilterBar'
import { DemandCollectionWaterfall } from './DemandCollectionWaterfall'
import { AgeingBucketsStrip } from './AgeingBucketsStrip'
import { FeeComponentsChart } from './FeeComponentsChart'
import { RefundTrendChart } from './RefundTrendChart'
import { PaymentChannelChart } from './PaymentChannelChart'
import { EducationLoanChart } from './EducationLoanChart'
import { FinanceAIInsightCard } from './FinanceAIInsightCard'

export function FinanceDashboard() {
  const data = useFinanceDashboardData()
  const [dismissedInsights, setDismissedInsights] = useState<Set<string>>(new Set())

  const visibleInsights = data.aiInsights.filter(i => !dismissedInsights.has(i.id))

  return (
    <div className="flex-1 overflow-y-auto bg-[#F6F8FB]">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-[700] text-[#0F1722]">Student Finance & Fee Realization</h1>
            <p className="text-[13px] text-[#9AA6B4] mt-1">Fee demand, collections, ageing, refunds, and instalment exposure</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-[8px] bg-white border border-[#D1D8DF] hover:bg-[#F6F8FB] transition-colors">
            <RefreshCw size={14} className="text-[#5A6B7A]" />
            <span className="text-[12px] font-[600] text-[#0F1722]">Refresh</span>
          </button>
        </div>

        {/* Filter Bar */}
        <FinanceFilterBar />

        {/* KPI Strip */}
        <section aria-label="Finance KPIs">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {data.kpis.map((kpi) => (
              <FinanceKPITile
                key={kpi.id}
                {...kpi}
                currency={kpi.id !== 'realization'}
                percentage={kpi.id === 'realization'}
              />
            ))}
          </div>
        </section>

        {/* Signature Elements - Waterfall + Ageing */}
        <section aria-label="Collections analysis" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DemandCollectionWaterfall steps={data.waterfallSteps} />
          <AgeingBucketsStrip buckets={data.ageingBuckets} />
        </section>

        {/* Supporting Charts Grid */}
        <section aria-label="Financial metrics" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FeeComponentsChart data={data.feeComponents} />
          <RefundTrendChart data={data.refundTrends} />
          <PaymentChannelChart data={data.paymentChannels} />
          <EducationLoanChart data={data.educationLoans} />
        </section>

        {/* AI Insights */}
        {visibleInsights.length > 0 && (
          <section aria-label="Finance insights" className="space-y-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
            <h3 className="text-[13px] font-[700] text-[#0F1722]">AI-Powered Insights & Actions</h3>
            <div className="space-y-2">
              {visibleInsights.map((insight) => (
                <FinanceAIInsightCard
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
