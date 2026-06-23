import { useMemo } from 'react'

export interface FunnelStage {
  stage: 'Applied' | 'Ranked' | 'Allotted' | 'Reported' | 'Enrolled'
  count: number
  label: string
}

export interface SankeyNode {
  name: string
  label: string
}

export interface SankeyLink {
  source: number
  target: number
  value: number
  label?: string
}

export interface CategoryMetric {
  category: 'GEN' | 'OBC' | 'SC' | 'ST' | 'PwD'
  applied: number
  enrolled: number
  target: number
  conversionRate: number
}

export interface StateMetric {
  state: string
  applicants: number
  enrolled: number
  conversionRate: number
}

export interface PreferenceFlow {
  preference: number
  allotments: number
  reportedIn: number
  reportedElsewhere: number
  divergence: number // % that got different branch/campus
}

export interface RankBand {
  band: string
  count: number
  enrolled: number
}

export interface ChannelMetric {
  channel: string
  applied: number
  enrolled: number
  avgRank: number
}

export interface AdmissionsKPI {
  id: string
  label: string
  value: number | string
  delta?: number
  unit?: string
  derived?: boolean
}

export interface AdmissionsAIInsight {
  id: string
  severity: 'critical' | 'warning' | 'info'
  headline: string
  factors: string[]
  confidence: number
  action: string
  category: string
}

export interface AdmissionsDashboardData {
  funnel: FunnelStage[]
  kpis: AdmissionsKPI[]
  categoryMetrics: CategoryMetric[]
  stateMetrics: StateMetric[]
  preferenceFlows: PreferenceFlow[]
  rankBands: RankBand[]
  channelMetrics: ChannelMetric[]
  sankey: { nodes: SankeyNode[]; links: SankeyLink[] }
  aiInsights: AdmissionsAIInsight[]
  lastUpdated: string
}

export function useAdmissionsDashboardData(): AdmissionsDashboardData {
  return useMemo(() => {
    const funnel: FunnelStage[] = [
      { stage: 'Applied', count: 9800, label: 'Applied' },
      { stage: 'Ranked', count: 3240, label: 'Ranked (JEE/DASA)' },
      { stage: 'Allotted', count: 1890, label: 'Allotted' },
      { stage: 'Reported', count: 1680, label: 'Reported In' },
      { stage: 'Enrolled', count: 1620, label: 'Enrolled (Final)' },
    ]

    const kpis: AdmissionsKPI[] = [
      {
        id: 'applied',
        label: 'Total Applied',
        value: '9.8K',
        delta: 12.3,
        unit: 'YoY growth',
      },
      {
        id: 'conversion-rate',
        label: 'Overall Conversion',
        value: '16.5%',
        delta: 2.1,
        derived: true,
      },
      {
        id: 'fill-rate',
        label: 'Seat Fill Rate',
        value: '94.2%',
        delta: -1.8,
        derived: true,
      },
      {
        id: 'category-compliance',
        label: 'Reservation Compliance',
        value: '98.7%',
        delta: 0.3,
        derived: true,
      },
      {
        id: 'avg-rank',
        label: 'Avg. JEE Rank',
        value: '4,842',
        delta: -156,
        unit: 'improved',
      },
    ]

    const categoryMetrics: CategoryMetric[] = [
      { category: 'GEN', applied: 5200, enrolled: 820, target: 840, conversionRate: 15.8 },
      { category: 'OBC', applied: 2100, enrolled: 420, target: 420, conversionRate: 20.0 },
      { category: 'SC', applied: 1200, enrolled: 240, target: 240, conversionRate: 20.0 },
      { category: 'ST', applied: 680, enrolled: 102, target: 100, conversionRate: 15.0 },
      { category: 'PwD', applied: 420, enrolled: 38, target: 40, conversionRate: 9.0 },
    ]

    const stateMetrics: StateMetric[] = [
      { state: 'Delhi', applicants: 1240, enrolled: 320, conversionRate: 25.8 },
      { state: 'Maharashtra', applicants: 980, enrolled: 240, conversionRate: 24.5 },
      { state: 'Karnataka', applicants: 890, enrolled: 210, conversionRate: 23.6 },
      { state: 'Tamil Nadu', applicants: 760, enrolled: 190, conversionRate: 25.0 },
      { state: 'Telangana', applicants: 650, enrolled: 165, conversionRate: 25.4 },
      { state: 'Uttar Pradesh', applicants: 1120, enrolled: 195, conversionRate: 17.4 },
      { state: 'West Bengal', applicants: 540, enrolled: 110, conversionRate: 20.4 },
      { state: 'Bihar', applicants: 720, enrolled: 90, conversionRate: 12.5 },
      { state: 'Gujarat', applicants: 820, enrolled: 100, conversionRate: 12.2 },
      { state: 'Others', applicants: 1090, enrolled: 200, conversionRate: 18.3 },
    ]

    const preferenceFlows: PreferenceFlow[] = [
      { preference: 1, allotments: 1680, reportedIn: 1620, reportedElsewhere: 60, divergence: 3.6 },
      { preference: 2, allotments: 120, reportedIn: 45, reportedElsewhere: 75, divergence: 62.5 },
      { preference: 3, allotments: 60, reportedIn: 12, reportedElsewhere: 48, divergence: 80.0 },
      { preference: 4, allotments: 20, reportedIn: 3, reportedElsewhere: 17, divergence: 85.0 },
    ]

    const rankBands: RankBand[] = [
      { band: '1-2000', count: 1020, enrolled: 340 },
      { band: '2001-5000', count: 1980, enrolled: 620 },
      { band: '5001-10000', count: 2840, enrolled: 520 },
      { band: '10001-20000', count: 2200, enrolled: 140 },
      { band: '20001+', count: 1760, enrolled: 0 },
    ]

    const channelMetrics: ChannelMetric[] = [
      { channel: 'JEE Mains', applied: 7200, enrolled: 1320, avgRank: 4120 },
      { channel: 'DASA', applied: 1840, enrolled: 220, avgRank: 5680 },
      { channel: 'Direct Admission', applied: 620, enrolled: 78, avgRank: 6420 },
      { channel: 'Sports Quota', applied: 140, enrolled: 2, avgRank: 8900 },
    ]

    // Sankey: Preference → Allotment → Reported
    const sankey = {
      nodes: [
        { name: 'pref1', label: 'Preference 1' },
        { name: 'pref2', label: 'Preference 2' },
        { name: 'pref3', label: 'Preference 3' },
        { name: 'allot', label: 'Allotted' },
        { name: 'reported', label: 'Reported In' },
        { name: 'reported_else', label: 'Reported Elsewhere' },
      ],
      links: [
        { source: 0, target: 3, value: 1680, label: 'Rank 1' },
        { source: 1, target: 3, value: 120, label: 'Rank 2' },
        { source: 2, target: 3, value: 90, label: 'Rank 3+' },
        { source: 3, target: 4, value: 1620, label: '96.4% reported' },
        { source: 3, target: 5, value: 60, label: '3.6% diverged' },
      ],
    }

    const aiInsights: AdmissionsAIInsight[] = [
      {
        id: 'ai-1',
        severity: 'info',
        headline: 'JEE Mains dominated 2024 cycle — 73% of applications, strong conversion at 18.3%',
        factors: [
          '7,200 JEE applicants vs 1,840 DASA and 620 direct admission',
          'Avg JEE rank improved to 4,120 (↓ from 4,800 prior year)',
          'DASA contribution rose 14% YoY due to international outreach',
        ],
        confidence: 94,
        action: 'Monitor JEE tiers for quality trends vs DASA/Direct for diversity',
        category: 'Channel Strategy',
      },
      {
        id: 'ai-2',
        severity: 'warning',
        headline: 'Preference divergence at 3.6% for Rank 1 — higher for lower preferences (62.5% for Rank 2)',
        factors: [
          '1,620 of 1,680 allotments reported at preferred choice',
          'But 120 Rank-2 allotments: only 45 reported in, 75 diverted elsewhere',
          'Indicates preference mismatch in branch/campus combinations',
        ],
        confidence: 88,
        action: 'Review preference form UI and branch-combo clarity in prospectus',
        category: 'Intake Quality',
      },
      {
        id: 'ai-3',
        severity: 'info',
        headline: 'Reservation targets achieved: SC/ST/OBC compliance at 100%, Gen category within 0.2%',
        factors: [
          'OBC intake: 420 vs target 420 (perfect match)',
          'SC intake: 240 vs target 240 (perfect match)',
          'Gen intake: 820 vs target 840 (97.6% fill)',
          'ST intake: 102 vs target 100 (overachieved by 2%)',
        ],
        confidence: 99,
        action: 'Maintain current admission pipeline for consistent category distribution',
        category: 'Regulatory Compliance',
      },
      {
        id: 'ai-4',
        severity: 'warning',
        headline: 'State-wise conversion gap — Delhi/TN at 25%, UP/Bihar at 12-17.5%',
        factors: [
          'Top states: Delhi (25.8%), TN (25%), Maha (24.5%), Telu (25.4%)',
          'Low states: Bihar (12.5%), Gujarat (12.2%), UP (17.4%)',
          'May indicate counselling awareness or competition from tier-1 institutes',
        ],
        confidence: 82,
        action: 'Targeted marketing in UP/Bihar; partner with counsellors in low-conversion zones',
        category: 'Regional Strategy',
      },
    ]

    return {
      funnel,
      kpis,
      categoryMetrics,
      stateMetrics,
      preferenceFlows,
      rankBands,
      channelMetrics,
      sankey,
      aiInsights,
      lastUpdated: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    }
  }, [])
}
