'use client'

export interface WaterfallStep {
  label: string
  value: number
  cumulative: number
  color: string
}

export interface AgeingBucket {
  range: string
  label: string
  count: number
  amount: number
  percentage: number
  status: 'healthy' | 'warning' | 'critical'
  color: string
}

export interface FeeComponent {
  name: string
  tuition: number
  hostel: number
  library: number
  sports: number
  misc: number
}

export interface RefundTrend {
  month: string
  refunds: number
  avg: number
}

export interface PaymentChannel {
  channel: string
  count: number
  amount: number
  percentage: number
}

export interface EducationLoanMetric {
  category: string
  totalStudents: number
  loanBeneficiaries: number
  avgLoanAmount: number
  repaymentRate: number
}

export interface FinanceAIInsight {
  id: string
  severity: 'critical' | 'warning' | 'info'
  headline: string
  factors: string[]
  confidence: number
  action: string
  domain: string
}

export interface FinanceDashboardData {
  kpis: Array<{
    id: string
    label: string
    value: number
    target?: number
    delta: number
    sparkline: number[]
    isDerived: boolean
  }>
  waterfallSteps: WaterfallStep[]
  ageingBuckets: AgeingBucket[]
  feeComponents: FeeComponent[]
  refundTrends: RefundTrend[]
  paymentChannels: PaymentChannel[]
  educationLoans: EducationLoanMetric[]
  aiInsights: FinanceAIInsight[]
  lastUpdated: string
}

export function useFinanceDashboardData(): FinanceDashboardData {
  return {
    kpis: [
      {
        id: 'demand',
        label: 'Total Fee Demand',
        value: 24150,
        target: 23000,
        delta: 5.2,
        sparkline: [23800, 23200, 24150, 23950, 24050, 24150],
        isDerived: false,
      },
      {
        id: 'collected',
        label: 'Total Collected',
        value: 22860,
        target: 23000,
        delta: -0.6,
        sparkline: [21800, 22100, 22450, 22680, 22760, 22860],
        isDerived: false,
      },
      {
        id: 'realization',
        label: 'Fee Realization %',
        value: 94.6,
        target: 95,
        delta: 2.3,
        sparkline: [91.2, 92.1, 92.8, 93.5, 94.2, 94.6],
        isDerived: true,
      },
      {
        id: 'outstanding',
        label: 'Outstanding Dues',
        value: 1290,
        target: 1000,
        delta: -8.4,
        sparkline: [1520, 1450, 1380, 1350, 1320, 1290],
        isDerived: false,
      },
      {
        id: 'ageing90',
        label: '>90 Days Ageing',
        value: 245,
        target: 150,
        delta: 12.1,
        sparkline: [198, 205, 218, 225, 235, 245],
        isDerived: false,
      },
      {
        id: 'refunds',
        label: 'Total Refunds',
        value: 156,
        target: 120,
        delta: 4.7,
        sparkline: [128, 135, 140, 145, 150, 156],
        isDerived: false,
      },
    ],

    waterfallSteps: [
      {
        label: 'Demand',
        value: 24150,
        cumulative: 24150,
        color: '#2E8B8B',
      },
      {
        label: 'Collections',
        value: 22860,
        cumulative: 22860,
        color: '#2E8B8B',
      },
      {
        label: 'Refunds',
        value: -156,
        cumulative: 22704,
        color: '#C99A2E',
      },
      {
        label: 'Penalties',
        value: 384,
        cumulative: 23088,
        color: '#C55A11',
      },
      {
        label: 'Outstanding',
        value: -1290,
        cumulative: 21798,
        color: '#B2566B',
      },
      {
        label: 'Net Realized',
        value: 21798,
        cumulative: 21798,
        color: '#1F3864',
      },
    ],

    ageingBuckets: [
      {
        range: '0-30',
        label: '0–30 Days',
        count: 342,
        amount: 648,
        percentage: 50.2,
        status: 'healthy',
        color: '#2E8B8B',
      },
      {
        range: '30-60',
        label: '30–60 Days',
        count: 156,
        amount: 285,
        percentage: 22.1,
        status: 'healthy',
        color: '#C99A2E',
      },
      {
        range: '60-90',
        label: '60–90 Days',
        count: 87,
        amount: 172,
        percentage: 13.3,
        status: 'warning',
        color: '#F39C12',
      },
      {
        range: '90+',
        label: '>90 Days',
        count: 245,
        amount: 485,
        percentage: 37.6,
        status: 'critical',
        color: '#E74C3C',
      },
    ],

    feeComponents: [
      {
        name: 'Tuition',
        tuition: 12500,
        hostel: 3200,
        library: 450,
        sports: 300,
        misc: 700,
      },
      {
        name: 'Term 1',
        tuition: 12300,
        hostel: 3100,
        library: 420,
        sports: 280,
        misc: 650,
      },
      {
        name: 'Term 2',
        tuition: 12400,
        hostel: 3150,
        library: 440,
        sports: 290,
        misc: 680,
      },
      {
        name: 'Term 3',
        tuition: 12450,
        hostel: 3200,
        library: 460,
        sports: 310,
        misc: 720,
      },
      {
        name: 'Current',
        tuition: 12550,
        hostel: 3250,
        library: 480,
        sports: 320,
        misc: 750,
      },
    ],

    refundTrends: [
      { month: 'Jun', refunds: 32, avg: 28 },
      { month: 'Jul', refunds: 45, avg: 35 },
      { month: 'Aug', refunds: 38, avg: 38 },
      { month: 'Sep', refunds: 52, avg: 42 },
      { month: 'Oct', refunds: 48, avg: 43 },
      { month: 'Nov', refunds: 41, avg: 44 },
      { month: 'Dec', refunds: 156, avg: 58 },
    ],

    paymentChannels: [
      {
        channel: 'Net Banking',
        count: 8240,
        amount: 12648,
        percentage: 55.3,
      },
      {
        channel: 'UPI',
        count: 4580,
        amount: 6284,
        percentage: 27.5,
      },
      {
        channel: 'Cheque',
        count: 1120,
        amount: 2156,
        percentage: 9.4,
      },
      {
        channel: 'DD',
        count: 680,
        amount: 1456,
        percentage: 6.4,
      },
      {
        channel: 'Cash',
        count: 240,
        amount: 316,
        percentage: 1.4,
      },
    ],

    educationLoans: [
      {
        category: 'General',
        totalStudents: 2840,
        loanBeneficiaries: 1456,
        avgLoanAmount: 285000,
        repaymentRate: 94.2,
      },
      {
        category: 'OBC',
        totalStudents: 1640,
        loanBeneficiaries: 945,
        avgLoanAmount: 265000,
        repaymentRate: 92.8,
      },
      {
        category: 'SC',
        totalStudents: 980,
        loanBeneficiaries: 756,
        avgLoanAmount: 245000,
        repaymentRate: 95.6,
      },
      {
        category: 'ST',
        totalStudents: 540,
        loanBeneficiaries: 412,
        avgLoanAmount: 255000,
        repaymentRate: 93.2,
      },
      {
        category: 'PwD',
        totalStudents: 125,
        loanBeneficiaries: 92,
        avgLoanAmount: 225000,
        repaymentRate: 96.8,
      },
    ],

    aiInsights: [
      {
        id: 'ai-1',
        severity: 'critical',
        headline: 'Outstanding dues aged >90 days surged 12.1% — immediate recovery action needed',
        factors: [
          '245 students with dues >90 days (₹48.5 L)',
          'Top 10% account for 61.2% of ageing dues',
          '18% of >90 dues students have low-rate education loans available',
        ],
        confidence: 94,
        action: 'Launch targeted recovery campaign with 5% waiver incentive',
        domain: 'Collections',
      },
      {
        id: 'ai-2',
        severity: 'warning',
        headline: 'Fee realization at 94.6% — approaching minimum acceptable threshold (95%)',
        factors: [
          'Collections lagging demand by ₹1.29 Cr (5.4%)',
          'Instalment defaults up 3.2% vs. prior term',
          'Net Banking downtime in Nov caused 8% collection slip',
        ],
        confidence: 88,
        action: 'Implement automated instalment reminders + SMS alerts',
        domain: 'Finance',
      },
      {
        id: 'ai-3',
        severity: 'info',
        headline: 'Refund processing efficiency improved — avg. refund time now 14 days (from 21)',
        factors: [
          '156 refunds processed this term (avg ₹1.04 L per refund)',
          'December refunds = ₹1.62 Cr (semester-end rush)',
          'Zero refund disputes filed this cycle',
        ],
        confidence: 92,
        action: 'Document new refund process as best practice',
        domain: 'Operations',
      },
      {
        id: 'ai-4',
        severity: 'info',
        headline: 'Education loan uptake strong — 51.8% of students utilizing institutional schemes',
        factors: [
          '3.66K students benefiting from institution loans',
          'Avg. loan ₹2.74 L, repayment rate at 94.6%',
          'SC/ST categories showing highest repayment discipline (95.6%/93.2%)',
        ],
        confidence: 89,
        action: 'Scale education loan scheme to SC/ST cohorts',
        domain: 'Finance',
      },
    ],

    lastUpdated: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  }
}
