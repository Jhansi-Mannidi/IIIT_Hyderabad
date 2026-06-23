'use client'

export interface BudgetMonthData {
  month: string
  budget: number
  actual: number
  variance: number
  status: 'under' | 'over' | 'ontrack'
}

export interface CostCenter {
  id: string
  name: string
  budget: number
  actual: number
  utilization: number
  status: 'healthy' | 'warning' | 'critical'
  leads: string[]
}

export interface ProjectBurndown {
  project: string
  budgeted: number
  spent: number
  remaining: number
  completion: number
  timeline: 'ontrack' | 'atrisk' | 'delayed'
}

export interface VoucherFlow {
  date: string
  vouchers: number
  amount: number
  glPostings: number
  reconciled: boolean
}

export interface FixedAsset {
  assetId: string
  name: string
  category: string
  acquiredDate: string
  originalValue: number
  depreciation: number
  bookValue: number
  warranty: string
  status: 'active' | 'inactive' | 'depr'
}

export interface BankReconItem {
  date: string
  description: string
  amount: number
  status: 'cleared' | 'pending' | 'unmatched'
  days: number
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

export interface InstitutionalFinanceData {
  kpis: Array<{
    id: string
    label: string
    value: number
    target?: number
    delta: number
    isDerived: boolean
  }>
  budgetVariance: BudgetMonthData[]
  costCenters: CostCenter[]
  projects: ProjectBurndown[]
  voucherFlow: VoucherFlow[]
  fixedAssets: FixedAsset[]
  bankReconItems: BankReconItem[]
  aiInsights: FinanceAIInsight[]
  lastUpdated: string
}

export function useInstitutionalFinanceData(): InstitutionalFinanceData {
  return {
    kpis: [
      {
        id: 'total-budget',
        label: 'Total Budget',
        value: 48500,
        target: 48500,
        delta: 0,
        isDerived: false,
      },
      {
        id: 'total-spent',
        label: 'Total Spent',
        value: 34120,
        target: 36375,
        delta: -6.2,
        isDerived: false,
      },
      {
        id: 'budget-utilization',
        label: 'Budget Utilization %',
        value: 70.3,
        target: 75,
        delta: -4.7,
        isDerived: true,
      },
      {
        id: 'variance-pct',
        label: 'Budget Variance %',
        value: -5.9,
        target: -2,
        delta: 3.9,
        isDerived: true,
      },
      {
        id: 'committed',
        label: 'Committed Spend',
        value: 8240,
        target: 7500,
        delta: 9.9,
        isDerived: false,
      },
      {
        id: 'unreconciled',
        label: 'Unreconciled',
        value: 1240,
        target: 500,
        delta: 148,
        isDerived: false,
      },
    ],

    budgetVariance: [
      { month: 'Apr', budget: 4000, actual: 3850, variance: 150, status: 'under' },
      { month: 'May', budget: 4200, actual: 4150, variance: 50, status: 'under' },
      { month: 'Jun', budget: 4100, actual: 4280, variance: -180, status: 'over' },
      { month: 'Jul', budget: 4300, actual: 4120, variance: 180, status: 'under' },
      { month: 'Aug', budget: 4150, actual: 4560, variance: -410, status: 'over' },
      { month: 'Sep', budget: 4050, actual: 3920, variance: 130, status: 'under' },
      { month: 'Oct', budget: 4200, actual: 4240, variance: -40, status: 'over' },
      { month: 'Nov', budget: 4300, actual: 4000, variance: 300, status: 'under' },
    ],

    costCenters: [
      {
        id: 'cc-001',
        name: 'Administration',
        budget: 8500,
        actual: 6240,
        utilization: 73.4,
        status: 'healthy',
        leads: ['CFO', 'Bursar'],
      },
      {
        id: 'cc-002',
        name: 'Academics',
        budget: 12400,
        actual: 10280,
        utilization: 82.9,
        status: 'healthy',
        leads: ['Registrar', 'Dean'],
      },
      {
        id: 'cc-003',
        name: 'Infrastructure',
        budget: 9800,
        actual: 8950,
        utilization: 91.3,
        status: 'warning',
        leads: ['Director-Facilities'],
      },
      {
        id: 'cc-004',
        name: 'Research & Development',
        budget: 6200,
        actual: 4850,
        utilization: 78.2,
        status: 'healthy',
        leads: ['Research Head'],
      },
      {
        id: 'cc-005',
        name: 'Student Services',
        budget: 5600,
        actual: 2580,
        utilization: 46.1,
        status: 'healthy',
        leads: ['Dean-Students'],
      },
      {
        id: 'cc-006',
        name: 'IT & Systems',
        budget: 5000,
        actual: 5220,
        utilization: 104.4,
        status: 'critical',
        leads: ['IT Director'],
      },
    ],

    projects: [
      {
        project: 'Campus Renovation',
        budgeted: 8500,
        spent: 6240,
        remaining: 2260,
        completion: 73,
        timeline: 'ontrack',
      },
      {
        project: 'Library Expansion',
        budgeted: 4200,
        spent: 3980,
        remaining: 220,
        completion: 95,
        timeline: 'ontrack',
      },
      {
        project: 'Lab Equipment',
        budgeted: 3600,
        spent: 2840,
        remaining: 760,
        completion: 79,
        timeline: 'atrisk',
      },
      {
        project: 'Network Upgrade',
        budgeted: 2800,
        spent: 3060,
        remaining: -260,
        completion: 85,
        timeline: 'delayed',
      },
    ],

    voucherFlow: [
      { date: 'Mon', vouchers: 45, amount: 2840, glPostings: 48, reconciled: true },
      { date: 'Tue', vouchers: 38, amount: 2120, glPostings: 40, reconciled: true },
      { date: 'Wed', vouchers: 52, amount: 3240, glPostings: 54, reconciled: true },
      { date: 'Thu', vouchers: 41, amount: 2680, glPostings: 42, reconciled: false },
      { date: 'Fri', vouchers: 48, amount: 3100, glPostings: 50, reconciled: false },
    ],

    fixedAssets: [
      {
        assetId: 'FA-001',
        name: 'Lecture Hall Projectors',
        category: 'Equipment',
        acquiredDate: '2020-06-15',
        originalValue: 450000,
        depreciation: 180000,
        bookValue: 270000,
        warranty: 'Active till 2025-06-15',
        status: 'active',
      },
      {
        assetId: 'FA-002',
        name: 'Campus WiFi Infrastructure',
        category: 'IT',
        acquiredDate: '2019-03-20',
        originalValue: 1200000,
        depreciation: 600000,
        bookValue: 600000,
        warranty: 'Expired 2024-03-20',
        status: 'active',
      },
      {
        assetId: 'FA-003',
        name: 'Lab Microscopes',
        category: 'Equipment',
        acquiredDate: '2021-09-10',
        originalValue: 680000,
        depreciation: 170000,
        bookValue: 510000,
        warranty: 'Active till 2026-09-10',
        status: 'active',
      },
      {
        assetId: 'FA-004',
        name: 'Central AC System',
        category: 'Infrastructure',
        acquiredDate: '2015-11-05',
        originalValue: 950000,
        depreciation: 760000,
        bookValue: 190000,
        warranty: 'Expired 2022-11-05',
        status: 'active',
      },
    ],

    bankReconItems: [
      { date: '2024-11-15', description: 'Tuition Deposit', amount: 450000, status: 'cleared', days: 0 },
      { date: '2024-11-14', description: 'Vendor Payment', amount: 125000, status: 'cleared', days: 1 },
      { date: '2024-11-12', description: 'Grant Received', amount: 200000, status: 'pending', days: 3 },
      { date: '2024-11-10', description: 'Salary Disbursement', amount: 680000, status: 'pending', days: 5 },
      { date: '2024-11-08', description: 'Utility Payment', amount: 45000, status: 'unmatched', days: 7 },
    ],

    aiInsights: [
      {
        id: 'ai-1',
        severity: 'critical',
        headline: 'IT & Systems cost-center at 104.4% utilization — overrun ₹2.2L',
        factors: [
          'Network upgrade project exceeded budget by ₹2.6L',
          'Unplanned emergency server replacement ₹1.8L',
          'Software license renewal higher than budgeted',
        ],
        confidence: 96,
        action: 'Request emergency supplementary budget approval',
        domain: 'Budget',
      },
      {
        id: 'ai-2',
        severity: 'warning',
        headline: 'Unreconciled items aged >7 days total ₹12.4L — variance risk',
        factors: [
          '5 items pending GL posting >7 days old',
          'Utility payment ₹45K unmatched vs. invoice',
          'Salary disbursement pending bank confirmation',
        ],
        confidence: 88,
        action: 'Accelerate bank recon cycle — daily close instead of weekly',
        domain: 'Finance',
      },
      {
        id: 'ai-3',
        severity: 'warning',
        headline: 'Lab Equipment project at-risk — only 79% complete, 32% budget consumed',
        factors: [
          'Procurement delays due to vendor lead times',
          'Installation bottleneck — lab access constraints',
          'Current burn rate suggests 15% budget overrun at completion',
        ],
        confidence: 82,
        action: 'Escalate to Project Manager — expedite vendor & schedule 24-hr access window',
        domain: 'Projects',
      },
      {
        id: 'ai-4',
        severity: 'info',
        headline: 'Campus WiFi infrastructure warranty expiring — renewal needed within 30 days',
        factors: [
          'WiFi asset warranty expired 2024-03-20',
          'Extended warranty available at 15% of original value',
          'No coverage for emergency repairs post-expiry',
        ],
        confidence: 94,
        action: 'Renew WiFi warranty or risk unbudgeted repair costs',
        domain: 'Operations',
      },
    ],

    lastUpdated: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  }
}
