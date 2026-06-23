'use client'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PubTrendPoint {
  year: number
  total: number
  journal: number
  conference: number
  patent: number
}

export interface ImpactPoint {
  id: string
  title: string
  year: number
  impactFactor: number
  googleH5: number    // used as bubble size proxy
  center: string
  authors: string
  venue: string
  type: 'Journal' | 'Conference' | 'Patent'
  core: string        // A*, A, B, C, Unranked
  acceptanceRate: number | null
}

export interface TypeMixSlice {
  type: string
  n: number
  color: string
}

export interface CenterOutput {
  center: string
  pubs: number
  avgIF: number
  funding: number   // ₹ Lakhs
  rank: number
}

export interface PhDStage {
  stage: string
  n: number
  color: string
}

export interface FacultyProd {
  faculty: string
  department: string
  pubs: number
  avgIF: number
  isDerived: true
}

export interface ResearchKPI {
  id: string
  label: string
  value: number
  target?: number
  delta: number
  isDerived: boolean
  format: 'number' | 'decimal' | 'currency' | 'percentage'
}

export interface ResearchAIInsight {
  id: string
  severity: 'critical' | 'warning' | 'info'
  headline: string
  factors: string[]
  confidence: number
  action: string
  domain: string
}

export interface ResearchData {
  kpis: ResearchKPI[]
  pubTrend: PubTrendPoint[]
  impact: ImpactPoint[]
  typeMix: TypeMixSlice[]
  centerOutput: CenterOutput[]
  phdFunnel: PhDStage[]
  facultyProd: FacultyProd[]
  aiInsights: ResearchAIInsight[]
  lastUpdated: string
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useResearchData(): ResearchData {
  return {
    kpis: [
      {
        id: 'total-pubs',
        label: 'Total Publications',
        value: 312,
        target: 300,
        delta: 4.0,
        isDerived: false,
        format: 'number',
      },
      {
        id: 'avg-if',
        label: 'Avg Impact Factor',
        value: 3.82,
        target: 3.5,
        delta: 9.1,
        isDerived: false,
        format: 'decimal',
      },
      {
        id: 'patents',
        label: 'Patents Filed',
        value: 18,
        target: 20,
        delta: -10.0,
        isDerived: false,
        format: 'number',
      },
      {
        id: 'phd-active',
        label: 'Active PhD Scholars',
        value: 94,
        target: 100,
        delta: -6.0,
        isDerived: false,
        format: 'number',
      },
      {
        id: 'thesis-pipeline',
        label: 'Theses in Pipeline',
        value: 27,
        target: 30,
        delta: -10.0,
        isDerived: false,
        format: 'number',
      },
      {
        id: 'funding',
        label: 'Research Funding',
        value: 2480,
        target: 2000,
        delta: 24.0,
        isDerived: false,
        format: 'currency',
      },
    ],

    pubTrend: [
      { year: 2019, total: 178, journal: 110, conference: 52, patent: 16 },
      { year: 2020, total: 192, journal: 118, conference: 58, patent: 16 },
      { year: 2021, total: 214, journal: 134, conference: 62, patent: 18 },
      { year: 2022, total: 248, journal: 155, conference: 72, patent: 21 },
      { year: 2023, total: 285, journal: 178, conference: 82, patent: 25 },
      { year: 2024, total: 312, journal: 196, conference: 96, patent: 20 },
    ],

    impact: [
      // ECE cluster — high IF
      { id: 'p1',  title: 'Deep Learning-Based Fault Detection in Power Systems', year: 2024, impactFactor: 8.2, googleH5: 42, center: 'ECE', authors: 'Mehta R., Iyer S.', venue: 'IEEE Trans. Ind. Electron.', type: 'Journal', core: 'A*', acceptanceRate: 18 },
      { id: 'p2',  title: 'Quantum-Dot Solar Cell Efficiency Optimization', year: 2023, impactFactor: 7.4, googleH5: 38, center: 'ECE', authors: 'Sharma P., Nair A.', venue: 'Nature Energy', type: 'Journal', core: 'A*', acceptanceRate: 12 },
      { id: 'p3',  title: 'GaN HEMT Reliability Under Thermal Stress', year: 2024, impactFactor: 6.1, googleH5: 29, center: 'ECE', authors: 'Kumar V.', venue: 'IEEE EDL', type: 'Journal', core: 'A', acceptanceRate: 22 },
      { id: 'p4',  title: 'RF Energy Harvesting for IoT Nodes', year: 2023, impactFactor: 5.8, googleH5: 25, center: 'ECE', authors: 'Patel D., Mehta R.', venue: 'IEEE IoT J.', type: 'Journal', core: 'A', acceptanceRate: 28 },
      { id: 'p5',  title: 'Neuromorphic Computing Architectures Survey', year: 2022, impactFactor: 4.9, googleH5: 34, center: 'ECE', authors: 'Iyer S., Rao K.', venue: 'ACM Comp. Surv.', type: 'Journal', core: 'A*', acceptanceRate: 15 },
      // CSE cluster
      { id: 'p6',  title: 'Transformer Models for Code Generation', year: 2024, impactFactor: 6.7, googleH5: 51, center: 'CSE', authors: 'Desai N., Pillai R.', venue: 'NeurIPS', type: 'Conference', core: 'A*', acceptanceRate: 16 },
      { id: 'p7',  title: 'Federated Learning for Healthcare IoT', year: 2023, impactFactor: 5.9, googleH5: 44, center: 'CSE', authors: 'Joshi A.', venue: 'IEEE TIFS', type: 'Journal', core: 'A*', acceptanceRate: 19 },
      { id: 'p8',  title: 'Graph Neural Networks for Anomaly Detection', year: 2024, impactFactor: 5.2, googleH5: 36, center: 'CSE', authors: 'Pillai R., Menon S.', venue: 'ICML', type: 'Conference', core: 'A*', acceptanceRate: 21 },
      { id: 'p9',  title: 'Explainable AI in Clinical Decision Support', year: 2022, impactFactor: 4.7, googleH5: 30, center: 'CSE', authors: 'Desai N.', venue: 'Artif. Intell. Med.', type: 'Journal', core: 'A', acceptanceRate: 30 },
      { id: 'p10', title: 'Blockchain for Supply Chain Provenance', year: 2023, impactFactor: 3.8, googleH5: 22, center: 'CSE', authors: 'Nair R., Gupta M.', venue: 'IEEE Access', type: 'Journal', core: 'B', acceptanceRate: 40 },
      // Mechanical cluster
      { id: 'p11', title: 'Additive Manufacturing of Bio-inspired Structures', year: 2024, impactFactor: 5.4, googleH5: 28, center: 'Mechanical', authors: 'Verma S., Rao T.', venue: 'Additive Manuf.', type: 'Journal', core: 'A', acceptanceRate: 25 },
      { id: 'p12', title: 'Topology Optimization for Lattice Structures', year: 2023, impactFactor: 4.6, googleH5: 24, center: 'Mechanical', authors: 'Rao T.', venue: 'Int. J. Mech. Sci.', type: 'Journal', core: 'A', acceptanceRate: 32 },
      { id: 'p13', title: 'Phase-Change Material TES for Buildings', year: 2024, impactFactor: 4.1, googleH5: 19, center: 'Mechanical', authors: 'Singh K.', venue: 'Energy Build.', type: 'Journal', core: 'B', acceptanceRate: 35 },
      // Civil
      { id: 'p14', title: 'Self-Healing Concrete Mix Design', year: 2023, impactFactor: 3.9, googleH5: 18, center: 'Civil', authors: 'Mishra P., Dev A.', venue: 'Constr. Build. Mater.', type: 'Journal', core: 'A', acceptanceRate: 28 },
      { id: 'p15', title: 'Seismic Retrofit Using CFRP Wraps', year: 2022, impactFactor: 3.4, googleH5: 15, center: 'Civil', authors: 'Dev A.', venue: 'Eng. Struct.', type: 'Journal', core: 'B', acceptanceRate: 38 },
      // Management / Others
      { id: 'p16', title: 'Green Supply Chain Sustainability Index', year: 2024, impactFactor: 2.8, googleH5: 14, center: 'Management', authors: 'Kaur H.', venue: 'J. Clean. Prod.', type: 'Journal', core: 'B', acceptanceRate: 42 },
      { id: 'p17', title: 'Fintech Adoption in SMEs Post-COVID', year: 2023, impactFactor: 2.4, googleH5: 11, center: 'Management', authors: 'Reddy B., Kaur H.', venue: 'Int. J. Fin. Econ.', type: 'Journal', core: 'C', acceptanceRate: 50 },
      { id: 'p18', title: 'VLSI Low-Power Design for Wearables [Patent]', year: 2024, impactFactor: 0, googleH5: 0, center: 'ECE', authors: 'Mehta R.', venue: 'IPO Patent', type: 'Patent', core: 'Unranked', acceptanceRate: null },
      { id: 'p19', title: 'Smart Irrigation Controller [Patent]', year: 2023, impactFactor: 0, googleH5: 0, center: 'Mechanical', authors: 'Verma S.', venue: 'IPO Patent', type: 'Patent', core: 'Unranked', acceptanceRate: null },
    ],

    typeMix: [
      { type: 'Journal',    n: 196, color: '#2E8B8B' },
      { type: 'Conference', n: 96,  color: '#1F3864' },
      { type: 'Patent',     n: 20,  color: '#C55A11' },
    ],

    centerOutput: [
      { center: 'ECE',        pubs: 86, avgIF: 6.48, funding: 780, rank: 1 },
      { center: 'CSE',        pubs: 74, avgIF: 5.26, funding: 640, rank: 2 },
      { center: 'Mechanical', pubs: 62, avgIF: 4.70, funding: 520, rank: 3 },
      { center: 'Civil',      pubs: 48, avgIF: 3.65, funding: 310, rank: 4 },
      { center: 'Management', pubs: 30, avgIF: 2.60, funding: 150, rank: 5 },
      { center: 'Physics',    pubs: 12, avgIF: 3.10, funding:  80, rank: 6 },
    ],

    phdFunnel: [
      { stage: 'Registered',       n: 94,  color: '#2E8B8B' },
      { stage: 'Coursework Done',  n: 71,  color: '#1F5C5C' },
      { stage: 'Synopsis Approved',n: 52,  color: '#C55A11' },
      { stage: 'Thesis Submitted', n: 27,  color: '#E67E22' },
      { stage: 'Defended',         n: 18,  color: '#27AE60' },
    ],

    facultyProd: [
      { faculty: 'Mehta R.',   department: 'ECE',        pubs: 22, avgIF: 6.8, isDerived: true },
      { faculty: 'Desai N.',   department: 'CSE',        pubs: 18, avgIF: 6.2, isDerived: true },
      { faculty: 'Iyer S.',    department: 'ECE',        pubs: 16, avgIF: 5.5, isDerived: true },
      { faculty: 'Pillai R.',  department: 'CSE',        pubs: 14, avgIF: 5.9, isDerived: true },
      { faculty: 'Verma S.',   department: 'Mechanical', pubs: 12, avgIF: 4.9, isDerived: true },
      { faculty: 'Rao T.',     department: 'Mechanical', pubs: 10, avgIF: 4.6, isDerived: true },
      { faculty: 'Mishra P.',  department: 'Civil',      pubs:  9, avgIF: 3.9, isDerived: true },
      { faculty: 'Joshi A.',   department: 'CSE',        pubs:  8, avgIF: 5.9, isDerived: true },
    ],

    aiInsights: [
      {
        id: 'r-1',
        severity: 'info',
        headline: 'ECE center IF up 18% YoY — 2 faculty (Mehta, Iyer) drive 40% of high-IF output',
        factors: [
          'ECE avg IF rose from 5.49 (2023) to 6.48 (2024) — best cross-center performance',
          'Mehta R. and Iyer S. together account for 38 publications, avg IF 6.15',
          'ECE holds 3 of the top-5 publications by impact factor institution-wide',
          'ECE research funding ₹780L — highest of all 6 centers',
        ],
        confidence: 96,
        action: 'Spotlight ECE center in Annual Research Report + nominate Mehta R. and Iyer S. for Research Excellence Award',
        domain: 'Recognition',
      },
      {
        id: 'r-2',
        severity: 'warning',
        headline: 'PhD thesis pipeline thinning — only 27 submissions vs 52 approved synopses (48% conversion)',
        factors: [
          '52 scholars have approved synopses but only 27 have submitted theses (48% conversion rate)',
          'Average time from synopsis approval to submission: 2.8 years (target: 2 years)',
          '18 scholars in final defense stage — graduation output healthy this cycle',
          '94 registered vs 71 with completed coursework — 23 scholars at risk of extension',
        ],
        confidence: 88,
        action: 'Initiate 6-monthly progress reviews for all post-synopsis scholars + set submission deadlines with advisor accountability',
        domain: 'PhD',
      },
      {
        id: 'r-3',
        severity: 'warning',
        headline: 'Patents filed (18) below target (20) — strong IP pipeline but conversion gap',
        factors: [
          '18 patents filed vs target of 20 (-10%)',
          'ECE and Mechanical account for 83% of patent filings',
          'Management and Civil centers have zero patents in 2024 — missed IP diversification goal',
          '3 provisional applications pending conversion to full filings (risk of lapse)',
        ],
        confidence: 82,
        action: 'Run IP awareness workshop for Management/Civil faculty + fast-track 3 provisional patent conversions before Dec deadline',
        domain: 'IP',
      },
      {
        id: 'r-4',
        severity: 'info',
        headline: 'Research funding surpassed target by 24% — ECE and CSE capture 57% of total grants',
        factors: [
          'Total research funding ₹2,480L vs target ₹2,000L (+24%)',
          'ECE: ₹780L | CSE: ₹640L — together 57.3% of institutional funding',
          'Mechanical funding ₹520L up 12% YoY — new DST grant received',
          'Management and Physics centers underfunded vs peer institutions',
        ],
        confidence: 91,
        action: 'Allocate seed grants to Management/Physics for proposal development + submit 2 cross-center collaborative proposals for SERB/DST calls',
        domain: 'Funding',
      },
    ],

    lastUpdated: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  }
}
