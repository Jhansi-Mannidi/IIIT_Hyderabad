'use client'

// ─────────────────────────────────────────────────────────────────────────────
// D9 — Placements & Career Outcomes  mock-data hook
// Maps to: placements_data (aggregate grain via recordtype), placements_reg,
//          placements, recuriter_login, placements_grievances
// GROUNDING: placements_data mixes aggregate + per-student rows; `recordtype`
// separates them.  Salary is summary-only (high/avg/low LPA) — offer-level
// distribution is unavailable without offer-level data.
// ─────────────────────────────────────────────────────────────────────────────

export interface PlacementYear {
  year: number
  registered: number   // placements_reg.registered
  placed: number       // placements_data.studentsplaced  [aggregate grain]
  notPlaced: number    // placements_data.studentsnotplaced
  placementRate: number // [Derived] placed / registered * 100
}

export interface BranchSalary {
  branch: string
  stream: string
  placed: number
  registered: number
  placementRate: number   // [Derived]
  target: number          // institutional target %
  highLPA: number         // placements_data.highstsalarylpa
  avgLPA: number          // placements_data.avgsalarylpa
  lowLPA: number          // placements_data.lowestsalarylpa
}

export interface RecruiterPoint {
  year: number
  count: number   // COUNT(recuriter_login) for that year
}

export interface GrievanceBucket {
  status: 'Open' | 'In Progress' | 'Resolved'
  n: number
}

export interface PlacementsKPI {
  id: string
  label: string
  value: number | string
  sub?: string
  delta?: number
  isDerived: boolean
  format: 'percent' | 'count' | 'lpa' | 'text'
}

export interface PlacementsAIInsight {
  id: string
  severity: 'critical' | 'warning' | 'info'
  headline: string
  factors: string[]
  confidence: number
  action: string
}

export interface PlacementsData {
  currentYear: number
  yearlyTrend: PlacementYear[]
  branchSalary: BranchSalary[]
  recruiterTrend: RecruiterPoint[]
  grievances: GrievanceBucket[]
  kpis: PlacementsKPI[]
  aiInsights: PlacementsAIInsight[]
  lastUpdated: string
}

export function usePlacementsData(): PlacementsData {
  const yearlyTrend: PlacementYear[] = [
    { year: 2021, registered: 980,  placed: 756,  notPlaced: 224, placementRate: 77.1 },
    { year: 2022, registered: 1020, placed: 821,  notPlaced: 199, placementRate: 80.5 },
    { year: 2023, registered: 1080, placed: 896,  notPlaced: 184, placementRate: 83.0 },
    { year: 2024, registered: 1120, placed: 941,  notPlaced: 179, placementRate: 84.0 },
    { year: 2025, registered: 1145, placed: 968,  notPlaced: 177, placementRate: 84.5 },
  ]

  const branchSalary: BranchSalary[] = [
    { branch: 'CSE',         stream: 'Engineering', placed: 248, registered: 260, placementRate: 95.4, target: 90, highLPA: 42.0, avgLPA: 14.2, lowLPA: 5.5  },
    { branch: 'ECE',         stream: 'Engineering', placed: 172, registered: 210, placementRate: 81.9, target: 90, highLPA: 28.0, avgLPA: 9.8,  lowLPA: 4.2  },
    { branch: 'Mechanical',  stream: 'Engineering', placed: 148, registered: 190, placementRate: 77.9, target: 85, highLPA: 18.0, avgLPA: 7.4,  lowLPA: 3.5  },
    { branch: 'Civil',       stream: 'Engineering', placed: 102, registered: 150, placementRate: 68.0, target: 80, highLPA: 12.0, avgLPA: 5.8,  lowLPA: 3.0  },
    { branch: 'Electrical',  stream: 'Engineering', placed: 118, registered: 155, placementRate: 76.1, target: 85, highLPA: 16.5, avgLPA: 7.1,  lowLPA: 3.2  },
    { branch: 'MBA',         stream: 'Management',  placed: 88,  registered: 95,  placementRate: 92.6, target: 90, highLPA: 22.0, avgLPA: 10.5, lowLPA: 5.0  },
    { branch: 'MCA',         stream: 'Computer',    placed: 62,  registered: 70,  placementRate: 88.6, target: 85, highLPA: 18.0, avgLPA: 9.2,  lowLPA: 4.0  },
  ]

  const recruiterTrend: RecruiterPoint[] = [
    { year: 2021, count: 82  },
    { year: 2022, count: 96  },
    { year: 2023, count: 118 },
    { year: 2024, count: 134 },
    { year: 2025, count: 147 },
  ]

  const grievances: GrievanceBucket[] = [
    { status: 'Open',        n: 8  },
    { status: 'In Progress', n: 14 },
    { status: 'Resolved',    n: 63 },
  ]

  const current = yearlyTrend[yearlyTrend.length - 1]

  const kpis: PlacementsKPI[] = [
    { id: 'placement-rate',     label: 'Placement Rate',     value: current.placementRate, sub: 'Target 90%', delta: current.placementRate - 90, isDerived: true,  format: 'percent' },
    { id: 'students-placed',    label: 'Students Placed',    value: current.placed,        sub: `of ${current.registered} registered`,           delta: 0,          isDerived: false, format: 'count'   },
    { id: 'students-not-placed',label: 'Not Yet Placed',     value: current.notPlaced,     sub: 'Active pipeline',                               delta: 0,          isDerived: false, format: 'count'   },
    { id: 'highest-lpa',        label: 'Highest Package',    value: 42.0,                  sub: 'LPA (CSE)',                                     delta: 0,          isDerived: false, format: 'lpa'     },
    { id: 'average-lpa',        label: 'Average Package',    value: 10.8,                  sub: 'LPA across all branches',                      delta: 0,          isDerived: false, format: 'lpa'     },
    { id: 'active-recruiters',  label: 'Active Recruiters',  value: 147,                   sub: '+13 vs last year',                             delta: 0,          isDerived: false, format: 'count'   },
  ]

  const aiInsights: PlacementsAIInsight[] = [
    {
      id: 'p1',
      severity: 'warning',
      headline: 'ECE placement rate is 13.5pp below CSE — 3 key ECE recruiters disengaged this cycle',
      factors: [
        'CSE placement rate: 95.4% vs ECE: 81.9% — widest branch gap in 3 years',
        'Infosys, Accenture, and Wipro recruited ECE heavily in 2023 but have not registered for 2025',
        'ECE avg package (9.8 LPA) also trails CSE (14.2 LPA) by 4.4 LPA',
        '38 ECE students remain unplaced vs 12 in CSE (3x disparity by count)',
      ],
      confidence: 93,
      action: 'Initiate targeted recruiter outreach to the 3 lapsed ECE companies; offer tailored campus event slot',
    },
    {
      id: 'p2',
      severity: 'warning',
      headline: 'Civil Engineering placement rate (68%) is furthest from its 80% target — 18pp gap',
      factors: [
        'Only 102 of 150 registered Civil students placed; 48 still in pipeline',
        'Civil avg LPA (5.8) is lowest across all branches — core sector hiring slowdown',
        'No new infrastructure companies onboarded this year vs 4 new tech companies for CSE',
        'Govt PSU intake down 22% YoY — historically Civil\'s largest hiring channel',
      ],
      confidence: 88,
      action: 'Expand Civil outreach to L&T, NHAI, and infrastructure consulting firms; schedule domain-specific placement drive',
    },
    {
      id: 'p3',
      severity: 'critical',
      headline: '8 open grievances unresolved beyond 15-day SLA — escalation risk',
      factors: [
        '8 grievances in "Open" status; standard resolution SLA is 15 days',
        '14 more in "In Progress" — resolution pipeline healthy but open queue needs urgent triage',
        'Unresolved grievances correlate with student satisfaction drop in exit surveys',
      ],
      confidence: 100,
      action: 'Assign placement cell officer to triage all 8 open grievances by EOD; escalate to Dean if not resolved in 48h',
    },
    {
      id: 'p4',
      severity: 'info',
      headline: 'Recruiter base grew 9.7% YoY to 147 companies — MBA and MCA sectors leading new registrations',
      factors: [
        '13 net new recruiters registered for 2025 cycle vs 134 in 2024',
        'MBA placement rate at 92.6% — 2.6pp above target, highest non-CSE branch',
        'FMCG and consulting sectors newly added for MBA; FinTech for MCA',
      ],
      confidence: 100,
      action: 'Leverage MBA/MCA recruiter momentum to cross-introduce CSE + ECE candidates for hybrid roles',
    },
  ]

  return {
    currentYear: 2025,
    yearlyTrend,
    branchSalary,
    recruiterTrend,
    grievances,
    kpis,
    aiInsights,
    lastUpdated: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
  }
}
