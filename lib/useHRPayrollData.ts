'use client'

export interface PayrollComponent {
  category: string
  basic: number
  da: number
  hra: number
  allowances: number
  pf: number
  tax: number
  other: number
  total: number
}

export interface AttritionRiskEmployee {
  id: string
  name: string
  designation: string
  department: string
  tenure: number
  leaveUtilization: number
  appraisalScore: number
  riskScore: number
  riskLevel: 'critical' | 'high' | 'medium'
  factors: string[]
}

export interface HeadcountData {
  designation: string
  male: number
  female: number
  total: number
}

export interface LeaveBalance {
  department: string
  casual: number
  sick: number
  earned: number
  total: number
  utilized: number
  balance: number
}

export interface AppraisalProgress {
  cycle: string
  completed: number
  pending: number
  total: number
  percentComplete: number
}

export interface RecruitmentFunnel {
  stage: string
  count: number
  percentage: number
}

export interface PayrollMetric {
  month: string
  basicPayroll: number
  deductions: number
  netPayable: number
}

export interface HRFinanceData {
  kpis: Array<{
    id: string
    label: string
    value: number
    target?: number
    delta: number
    isDerived: boolean
  }>
  payrollComposition: PayrollComponent[]
  attritionRiskEmployees: AttritionRiskEmployee[]
  headcountByDesignation: HeadcountData[]
  leaveBalanceByDept: LeaveBalance[]
  appraisalProgress: AppraisalProgress[]
  recruitmentFunnel: RecruitmentFunnel[]
  payrollTrend: PayrollMetric[]
  aiInsights: Array<{
    id: string
    severity: 'critical' | 'warning' | 'info'
    headline: string
    factors: string[]
    confidence: number
    action: string
    domain: string
  }>
  lastUpdated: string
}

export function useHRPayrollData(): HRFinanceData {
  return {
    kpis: [
      {
        id: 'total-headcount',
        label: 'Total Headcount',
        value: 486,
        target: 500,
        delta: -2.8,
        isDerived: false,
      },
      {
        id: 'gender-diversity',
        label: 'Female %',
        value: 38.2,
        target: 40,
        delta: -1.8,
        isDerived: true,
      },
      {
        id: 'attrition-ytd',
        label: 'Attrition YTD %',
        value: 8.6,
        target: 6,
        delta: 2.6,
        isDerived: false,
      },
      {
        id: 'payroll-cost',
        label: 'Monthly Payroll',
        value: 4850,
        target: 4900,
        delta: -1,
        isDerived: false,
      },
      {
        id: 'leave-util',
        label: 'Leave Utilization %',
        value: 72.1,
        target: 70,
        delta: 2.1,
        isDerived: true,
      },
      {
        id: 'appraisal-progress',
        label: 'Appraisal Complete %',
        value: 64.2,
        target: 80,
        delta: -15.8,
        isDerived: true,
      },
    ],

    payrollComposition: [
      {
        category: 'Faculty',
        basic: 2400,
        da: 520,
        hra: 280,
        allowances: 150,
        pf: 288,
        tax: 320,
        other: 45,
        total: 3738,
      },
      {
        category: 'Admin',
        basic: 1200,
        da: 240,
        hra: 140,
        allowances: 85,
        pf: 144,
        tax: 150,
        other: 20,
        total: 1829,
      },
      {
        category: 'Support',
        basic: 800,
        da: 160,
        hra: 95,
        allowances: 60,
        pf: 96,
        tax: 85,
        other: 12,
        total: 1308,
      },
    ],

    attritionRiskEmployees: [
      {
        id: 'HR-001',
        name: 'Dr. Rajesh Kumar',
        designation: 'Professor (Economics)',
        department: 'Economics',
        tenure: 2,
        leaveUtilization: 95,
        appraisalScore: 2.8,
        riskScore: 8.6,
        riskLevel: 'critical',
        factors: ['High leave spikes (95%)', 'Low appraisal score (2.8/5)', 'Tenure <3 years'],
      },
      {
        id: 'HR-002',
        name: 'Priya Sharma',
        designation: 'Associate Professor (CSE)',
        department: 'Computer Science',
        tenure: 3,
        leaveUtilization: 88,
        appraisalScore: 3.1,
        riskScore: 7.4,
        riskLevel: 'high',
        factors: ['Elevated leave usage (88%)', 'Below-average appraisal (3.1)', 'Competing offers likely'],
      },
      {
        id: 'HR-003',
        name: 'Vikram Patel',
        designation: 'Associate Professor (Mechanical)',
        department: 'Mechanical Engg',
        tenure: 4,
        leaveUtilization: 72,
        appraisalScore: 3.4,
        riskScore: 6.2,
        riskLevel: 'high',
        factors: ['Tenure approaching review window', 'Moderate leave usage (72%)', 'Promotion not approved'],
      },
      {
        id: 'HR-004',
        name: 'Anjali Gupta',
        designation: 'Asst. Professor (Civil)',
        department: 'Civil Engg',
        tenure: 2,
        leaveUtilization: 65,
        appraisalScore: 4.1,
        riskScore: 4.8,
        riskLevel: 'medium',
        factors: ['Early-career turnover risk', 'Healthy metrics but low tenure', 'Research grant opportunity elsewhere'],
      },
      {
        id: 'HR-005',
        name: 'Sanjay Verma',
        designation: 'Admin Officer',
        department: 'Administration',
        tenure: 6,
        leaveUtilization: 58,
        appraisalScore: 4.5,
        riskScore: 3.2,
        riskLevel: 'medium',
        factors: ['Skills mismatch with new systems', 'Potential vertical moves within institution'],
      },
    ],

    headcountByDesignation: [
      { designation: 'Professor', male: 45, female: 12, total: 57 },
      { designation: 'Associate Prof', male: 68, female: 28, total: 96 },
      { designation: 'Asst. Professor', male: 94, female: 52, total: 146 },
      { designation: 'Lecturer', male: 38, female: 22, total: 60 },
      { designation: 'Admin/Support', male: 85, female: 42, total: 127 },
    ],

    leaveBalanceByDept: [
      {
        department: 'Computer Science',
        casual: 8,
        sick: 12,
        earned: 20,
        total: 40,
        utilized: 32,
        balance: 8,
      },
      {
        department: 'Mechanical Engg',
        casual: 7,
        sick: 11,
        earned: 18,
        total: 36,
        utilized: 28,
        balance: 8,
      },
      {
        department: 'Civil Engg',
        casual: 6,
        sick: 10,
        earned: 16,
        total: 32,
        utilized: 18,
        balance: 14,
      },
      {
        department: 'Economics',
        casual: 5,
        sick: 9,
        earned: 14,
        total: 28,
        utilized: 24,
        balance: 4,
      },
      {
        department: 'Administration',
        casual: 8,
        sick: 10,
        earned: 18,
        total: 36,
        utilized: 20,
        balance: 16,
      },
    ],

    appraisalProgress: [
      { cycle: 'FY24-25 Q1', completed: 142, pending: 78, total: 220, percentComplete: 64.5 },
      { cycle: 'FY24-25 Q2', completed: 78, pending: 142, total: 220, percentComplete: 35.5 },
      { cycle: 'FY23-24 Annual', completed: 218, pending: 2, total: 220, percentComplete: 99.1 },
    ],

    recruitmentFunnel: [
      { stage: 'Applied', count: 285, percentage: 100 },
      { stage: 'Shortlisted', count: 148, percentage: 51.9 },
      { stage: 'Interview', count: 64, percentage: 22.5 },
      { stage: 'Offered', count: 18, percentage: 6.3 },
      { stage: 'Joined', count: 12, percentage: 4.2 },
    ],

    payrollTrend: [
      { month: 'Apr', basicPayroll: 3240, deductions: 680, netPayable: 2560 },
      { month: 'May', basicPayroll: 3280, deductions: 710, netPayable: 2570 },
      { month: 'Jun', basicPayroll: 3200, deductions: 660, netPayable: 2540 },
      { month: 'Jul', basicPayroll: 3320, deductions: 720, netPayable: 2600 },
      { month: 'Aug', basicPayroll: 3380, deductions: 750, netPayable: 2630 },
      { month: 'Sep', basicPayroll: 4850, deductions: 1050, netPayable: 3800 },
    ],

    aiInsights: [
      {
        id: 'hr-1',
        severity: 'critical',
        headline: 'Attrition risk escalating — 5 key staff flagged for immediate retention action',
        factors: [
          'Prof. Rajesh Kumar (Economics): Critical risk — low appraisal (2.8/5), excessive leave (95%), 2yr tenure',
          'Priya Sharma (CSE): High risk — competing offers likely, appraisal 3.1/5',
          'Vikram Patel (Mechanical): High risk — 4yr tenure + stalled promotion creating flight risk',
        ],
        confidence: 94,
        action: 'Initiate retention meetings with 3 critical employees + expedite promotion reviews',
        domain: 'HR',
      },
      {
        id: 'hr-2',
        severity: 'warning',
        headline: 'Appraisal cycle at 64.2% completion — Q2 cycle at 35.5%, deadline at risk',
        factors: [
          'Q1 FY24-25 at 64.5% completion, but Q2 cycle lagging at 35.5%',
          '78 pending appraisals in Q2 with 22 days to deadline',
          'FY23-24 annual cycle at 99.1% but submission delays cascading',
        ],
        confidence: 87,
        action: 'Issue appraisal completion notice + incentivize Q2 submission by end-week',
        domain: 'HR',
      },
      {
        id: 'hr-3',
        severity: 'warning',
        headline: 'Leave utilization spiking to 72.1% — Economics dept at 85.7% (burnout risk)',
        factors: [
          'Economics dept leave utilization 85.7% (24/28 days used)',
          'CSE dept at 80% utilization (32/40 days used)',
          'Correlated with low appraisal scores in same depts — workload/burnout indicators',
        ],
        confidence: 82,
        action: 'Audit workload distribution in Economics/CSE + adjust load allocations for FY25',
        domain: 'HR',
      },
      {
        id: 'hr-4',
        severity: 'info',
        headline: 'Recruitment funnel healthy — 51.9% shortlisting rate, 4.2% final conversion',
        factors: [
          '285 applications received, 12 placed (4.2% conversion)',
          'Shortlisting rate 51.9% within target (50–55% benchmark)',
          'Interview-to-offer stage needs attention (3.5% conversion vs. 5% target)',
        ],
        confidence: 89,
        action: 'Review interview panel effectiveness + streamline offer process for faster turnaround',
        domain: 'Recruitment',
      },
    ],

    lastUpdated: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  }
}
