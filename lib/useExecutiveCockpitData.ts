'use client'
import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface KPIMetric {
  id: string
  label: string
  value: string
  rawValue: number
  unit?: string
  delta: number          // % vs prior period (positive = up)
  deltaLabel: string
  sparkline: number[]    // 12 data points
  target?: number
  targetLabel?: string
  provenance: 'direct' | 'derived' | 'ddl-gap'
  breach?: boolean       // threshold breach
  breachLevel?: 'warning' | 'danger'
}

export interface ChartSeries {
  name: string
  data: { label: string; value: number }[]
  color: string
}

export interface TrendPoint {
  month: string
  enrollment: number
  target: number
  passRate: number
  revenue: number      // lakhs
  expenditure: number  // lakhs
  attendance: number   // %
}

export interface DomainSummary {
  domain: string
  status: 'healthy' | 'warning' | 'critical'
  score: number
  trend: 'up' | 'down' | 'flat'
  topIssue: string
}

export interface PlacementFunnel {
  stage: string
  count: number
  rate: number
}

export interface ScholarshipDistribution {
  category: string
  students: number
  amount: number  // lakhs
}

export interface FacultyLoad {
  department: string
  fullTime: number
  contractual: number
  avgLoad: number  // hrs/week
}

export interface AIInsight {
  id: string
  severity: 'info' | 'warning' | 'critical'
  headline: string
  factors: string[]
  confidence: number  // 0–100
  action: string
  domain: string
}

export interface HealthRibbonPoint {
  year: number
  enrollment: number
  feeCollection: number
  placementRate: number
  annotation?: string
}

export interface DeptHealthCell {
  dept: string
  score: number  // 0-100
  academic: number
  finance: number
  satisfaction: number
  status: 'healthy' | 'warning' | 'critical'
}

export interface Mover {
  entity: string
  metric: string
  change: number
  direction: 'up' | 'down'
  metric_id: string
}

export interface ExecutiveCockpitData {
  kpis: KPIMetric[]
  trendSeries: TrendPoint[]
  domainHealth: DomainSummary[]
  placementFunnel: PlacementFunnel[]
  scholarshipDist: ScholarshipDistribution[]
  facultyLoad: FacultyLoad[]
  aiInsights: AIInsight[]
  programEnrollment: { program: string; students: number; capacity: number }[]
  revenueBreakdown: { source: string; amount: number; pct: number }[]
  attendanceHeatmap: { dept: string; week: string; value: number }[]
  healthRibbon: HealthRibbonPoint[]
  deptHealthStrip: DeptHealthCell[]
  movers: Mover[]
  lastUpdated: string
}

// ─── Mock Data Generator ───────────────────────────────────────────────────────

function generateSparkline(base: number, variance: number): number[] {
  return Array.from({ length: 12 }, (_, i) =>
    Math.round(base + (Math.sin(i / 2) * variance) + (Math.random() - 0.5) * variance * 0.4)
  )
}

const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export function useExecutiveCockpitData(): { data: ExecutiveCockpitData | null; loading: boolean } {
  const [data, setData] = useState<ExecutiveCockpitData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate async fetch
    const timer = setTimeout(() => {
      setData(buildMockData())
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return { data, loading }
}

function buildMockData(): ExecutiveCockpitData {
  return {
    kpis: [
      {
        id: 'total-students',
        label: 'Active Students',
        value: '4,812',
        rawValue: 4812,
        delta: 3.4,
        deltaLabel: 'vs prior year',
        sparkline: generateSparkline(4600, 120),
        target: 5000,
        targetLabel: 'AY target',
        provenance: 'direct',
      },
      {
        id: 'pass-rate',
        label: 'Overall Pass Rate',
        value: '87.3%',
        rawValue: 87.3,
        unit: '%',
        delta: -1.2,
        deltaLabel: 'vs prior sem',
        sparkline: generateSparkline(87, 3),
        target: 90,
        targetLabel: 'Benchmark',
        provenance: 'derived',
        breach: true,
        breachLevel: 'warning',
      },
      {
        id: 'revenue',
        label: 'Fee Revenue',
        value: '₹18.4 Cr',
        rawValue: 1840,
        unit: 'lakhs',
        delta: 6.1,
        deltaLabel: 'vs prior AY',
        sparkline: generateSparkline(1700, 80),
        target: 2000,
        targetLabel: 'Annual budget',
        provenance: 'derived',
      },
      {
        id: 'attendance',
        label: 'Avg Attendance',
        value: '81.6%',
        rawValue: 81.6,
        unit: '%',
        delta: -2.8,
        deltaLabel: 'vs prior month',
        sparkline: generateSparkline(82, 4),
        target: 85,
        targetLabel: 'Policy minimum',
        provenance: 'derived',
        breach: true,
        breachLevel: 'warning',
      },
      {
        id: 'placements',
        label: 'Placements (YTD)',
        value: '342',
        rawValue: 342,
        delta: 11.7,
        deltaLabel: 'vs prior batch',
        sparkline: generateSparkline(300, 30),
        target: 400,
        targetLabel: 'Batch target',
        provenance: 'direct',
      },
      {
        id: 'faculty-student',
        label: 'Faculty:Student Ratio',
        value: '1 : 18.2',
        rawValue: 18.2,
        delta: 1.4,
        deltaLabel: 'ratio widened',
        sparkline: generateSparkline(17, 1.5),
        target: 16,
        targetLabel: 'NAAC norm',
        provenance: 'derived',
        breach: true,
        breachLevel: 'warning',
      },
      {
        id: 'outstanding-dues',
        label: 'Outstanding Dues',
        value: '₹2.1 Cr',
        rawValue: 210,
        unit: 'lakhs',
        delta: 18.4,
        deltaLabel: 'vs prior month',
        sparkline: generateSparkline(180, 20),
        provenance: 'derived',
        breach: true,
        breachLevel: 'danger',
      },
      {
        id: 'research-pubs',
        label: 'Publications (AY)',
        value: '127',
        rawValue: 127,
        delta: 9.5,
        deltaLabel: 'vs prior AY',
        sparkline: generateSparkline(110, 12),
        target: 150,
        targetLabel: 'KRA target',
        provenance: 'direct',
      },
    ],

    trendSeries: MONTHS.map((month, i) => ({
      month,
      enrollment: 4500 + Math.round(i * 28 + Math.sin(i) * 40),
      target: 4700 + i * 25,
      passRate: 86 + Math.sin(i / 2) * 3,
      revenue: 140 + i * 8 + Math.random() * 15,
      expenditure: 120 + i * 7 + Math.random() * 12,
      attendance: 83 - Math.abs(Math.sin(i / 2)) * 4,
    })),

    domainHealth: [
      { domain: 'Academic', status: 'warning', score: 74, trend: 'down', topIssue: 'Pass rate below 90% benchmark' },
      { domain: 'Admissions', status: 'healthy', score: 88, trend: 'up', topIssue: 'All programs at >80% fill' },
      { domain: 'Student Finance', status: 'critical', score: 52, trend: 'down', topIssue: '₹2.1 Cr dues outstanding' },
      { domain: 'Inst. Finance', status: 'healthy', score: 82, trend: 'flat', topIssue: 'Capex 3% under budget' },
      { domain: 'HR & Workforce', status: 'warning', score: 67, trend: 'down', topIssue: 'F:S ratio above NAAC norm' },
      { domain: 'Hostel & Mess', status: 'healthy', score: 79, trend: 'up', topIssue: 'Occupancy at 94%' },
      { domain: 'Attendance', status: 'warning', score: 71, trend: 'down', topIssue: '18 students <75% critical' },
      { domain: 'Research', status: 'healthy', score: 85, trend: 'up', topIssue: 'Q1 journal count +22% YoY' },
      { domain: 'Placements', status: 'healthy', score: 86, trend: 'up', topIssue: 'Avg package ₹8.4 LPA' },
      { domain: 'Feedback/IQAC', status: 'warning', score: 70, trend: 'flat', topIssue: '3 courses rated <3.5/5' },
      { domain: 'Scholarships', status: 'healthy', score: 81, trend: 'flat', topIssue: '96% disbursals on time' },
    ],

    placementFunnel: [
      { stage: 'Eligible', count: 520, rate: 100 },
      { stage: 'Registered', count: 486, rate: 93.5 },
      { stage: 'Applied', count: 441, rate: 84.8 },
      { stage: 'Shortlisted', count: 389, rate: 74.8 },
      { stage: 'Offered', count: 342, rate: 65.8 },
      { stage: 'Accepted', count: 318, rate: 61.2 },
    ],

    scholarshipDist: [
      { category: 'Merit', students: 182, amount: 54.6 },
      { category: 'SC/ST', students: 148, amount: 88.8 },
      { category: 'OBC', students: 94, amount: 42.3 },
      { category: 'EWS', students: 76, amount: 38.0 },
      { category: 'Sports', students: 24, amount: 9.6 },
      { category: 'Disability', students: 18, amount: 10.8 },
    ],

    facultyLoad: [
      { department: 'CSE', fullTime: 28, contractual: 6, avgLoad: 16.4 },
      { department: 'ECE', fullTime: 22, contractual: 4, avgLoad: 17.1 },
      { department: 'Mathematics', fullTime: 14, contractual: 3, avgLoad: 18.8 },
      { department: 'Physics', fullTime: 10, contractual: 2, avgLoad: 19.2 },
      { department: 'HSS', fullTime: 8, contractual: 5, avgLoad: 21.4 },
      { department: 'Management', fullTime: 6, contractual: 3, avgLoad: 22.0 },
    ],

    programEnrollment: [
      { program: 'B.Tech CSE', students: 1240, capacity: 1440 },
      { program: 'B.Tech ECE', students: 960, capacity: 1080 },
      { program: 'M.Tech CSE', students: 480, capacity: 540 },
      { program: 'M.Tech ECE', students: 320, capacity: 360 },
      { program: 'MBA', students: 240, capacity: 270 },
      { program: 'Ph.D', students: 186, capacity: 210 },
      { program: 'M.Sc Math', students: 160, capacity: 180 },
      { program: 'B.Tech IT', students: 226, capacity: 270 },
    ],

    revenueBreakdown: [
      { source: 'Tuition Fees', amount: 1240, pct: 67.4 },
      { source: 'Hostel & Mess', amount: 284, pct: 15.4 },
      { source: 'Research Grants', amount: 172, pct: 9.3 },
      { source: 'Exam Fees', amount: 86, pct: 4.7 },
      { source: 'Other Income', amount: 58, pct: 3.2 },
    ],

    attendanceHeatmap: [
      'CSE', 'ECE', 'Math', 'Physics', 'HSS', 'Mgmt',
    ].flatMap((dept) =>
      ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((week) => ({
        dept,
        week,
        value: Math.round(70 + Math.random() * 22),
      }))
    ),

    aiInsights: [
      {
        id: 'ai-1',
        severity: 'critical',
        headline: 'Outstanding dues surged 18.4% — 63 students at risk of deregistration',
        factors: [
          '₹2.1 Cr fees uncollected across 63 students',
          'HSS & Management depts have highest default rates',
          'Correlates with 3rd instalment deadline window',
        ],
        confidence: 91,
        action: 'Send automated dues reminder + waiver eligibility check',
        domain: 'Student Finance',
      },
      {
        id: 'ai-2',
        severity: 'warning',
        headline: 'Pass rate decline in 7 courses warrants early intervention',
        factors: [
          'CS304, EC402, MA201 all below 75% pass',
          'Mid-sem attendance below 70% for same cohort',
          'Faculty:Student ratio in ECE above 1:20',
        ],
        confidence: 84,
        action: 'Schedule academic intervention review for flagged courses',
        domain: 'Academic',
      },
      {
        id: 'ai-3',
        severity: 'warning',
        headline: 'Faculty:Student ratio at 1:18.2, approaching NAAC threshold',
        factors: [
          '3 senior faculty positions vacant since July',
          'HSS & Management depts overloaded (>21 hrs/week avg)',
          'Contractual ratio growing: now 22% of total teaching staff',
        ],
        confidence: 88,
        action: 'Fast-track 3 pending faculty recruitment approvals',
        domain: 'HR & Workforce',
      },
      {
        id: 'ai-4',
        severity: 'info',
        headline: 'Placement season momentum above prior batch by 11.7%',
        factors: [
          '342 offers YTD vs 306 same period last year',
          'New recruiters: 12 MNCs added this cycle',
          'Avg package ₹8.4 LPA (+9% YoY)',
        ],
        confidence: 95,
        action: 'Publish mid-season placement statistics for stakeholders',
        domain: 'Placements',
      },
    ],

    healthRibbon: [
      { year: 2020, enrollment: 3800, feeCollection: 72.4, placementRate: 68.2 },
      { year: 2021, enrollment: 4100, feeCollection: 78.6, placementRate: 72.1, annotation: '2021: Gateway switch +6pp' },
      { year: 2022, enrollment: 4400, feeCollection: 84.3, placementRate: 78.5 },
      { year: 2023, enrollment: 4620, feeCollection: 88.9, placementRate: 82.6, annotation: '2023: MNC surge +12pp' },
      { year: 2024, enrollment: 4812, feeCollection: 93.4, placementRate: 87.2 },
    ],

    deptHealthStrip: [
      { dept: 'CSE', score: 91, academic: 94, finance: 89, satisfaction: 88, status: 'healthy' },
      { dept: 'CSE-PG', score: 85, academic: 88, finance: 84, satisfaction: 81, status: 'healthy' },
      { dept: 'ECE', score: 78, academic: 76, finance: 82, satisfaction: 75, status: 'warning' },
      { dept: 'ECE-PG', score: 72, academic: 71, finance: 68, satisfaction: 76, status: 'warning' },
      { dept: 'Mathematics', score: 82, academic: 86, finance: 79, satisfaction: 80, status: 'healthy' },
      { dept: 'Physics', score: 79, academic: 82, finance: 76, satisfaction: 78, status: 'healthy' },
      { dept: 'HSS', score: 64, academic: 68, finance: 58, satisfaction: 66, status: 'critical' },
      { dept: 'Management', score: 71, academic: 74, finance: 62, satisfaction: 77, status: 'warning' },
      { dept: 'Admissions', score: 88, academic: 86, finance: 91, satisfaction: 87, status: 'healthy' },
      { dept: 'Finance', score: 82, academic: 80, finance: 88, satisfaction: 78, status: 'healthy' },
      { dept: 'HR', score: 67, academic: 72, finance: 58, satisfaction: 71, status: 'warning' },
    ],

    movers: [
      { entity: 'CSE-PG', metric: 'Fee Collection', change: -4.2, direction: 'down', metric_id: 'revenue' },
      { entity: 'HSS', metric: 'Pass Rate', change: -8.1, direction: 'down', metric_id: 'pass-rate' },
      { entity: 'ECE', metric: 'Outstanding Dues', change: 22.8, direction: 'up', metric_id: 'outstanding-dues' },
      { entity: 'CSE', metric: 'Placements', change: 14.3, direction: 'up', metric_id: 'placements' },
      { entity: 'Management', metric: 'Faculty:Student', change: 5.6, direction: 'up', metric_id: 'faculty-student' },
      { entity: 'Admissions', metric: 'Fill Rate', change: 6.8, direction: 'up', metric_id: 'total-students' },
    ],

    lastUpdated: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  }
}
