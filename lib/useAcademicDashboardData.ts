'use client'

import { useMemo } from 'react'

export interface GradeDistribution {
  grade: string
  count: number
  percentage: number
  color: string
}

export interface StudentMarkEntry {
  studentId: string
  studentName: string
  program: string
  semester: number
  marks: number
  maxMarks: number
  gradePoint: number
  grade: string
  credits: number
  subjectCode: string
  subjectName: string
}

export interface StudentPerformance {
  studentId: string
  studentName: string
  program: string
  semester: number
  sgpa: number
  creditCompletion: number
  passedSubjects: number
  failedSubjects: number
  attemptedSubjects: number
  attendancePercentage: number
  riskScore: number
  riskStatus: 'critical' | 'warning' | 'at-risk' | 'healthy'
}

export interface PassRateHeatmapCell {
  subject: string
  semester: number
  passRate: number
  totalStudents: number
  failedCount: number
}

export interface SgpaTrend {
  semester: number
  program: string
  avgSgpa: number
  median: number
  q1: number
  q3: number
}

export interface EquityMetric {
  category: string
  avgSgpa: number
  count: number
  passRate: number
}

export interface AcademicAIInsight {
  id: string
  severity: 'critical' | 'warning' | 'info'
  headline: string
  factors: string[]
  confidence: number
  action: string
  domain: string
}

export interface AcademicDashboardData {
  kpis: {
    label: string
    value: string | number
    delta: number
    sparkline: number[]
    icon?: string
    unit?: string
    derived?: boolean
  }[]
  gradeDistribution: GradeDistribution[]
  passRateHeatmap: PassRateHeatmapCell[]
  sgpaTrend: SgpaTrend[]
  equityMetrics: EquityMetric[]
  atRiskStudents: StudentPerformance[]
  allStudents: StudentPerformance[]
  aiInsights: AcademicAIInsight[]
  lastUpdated: string
}

export function useAcademicDashboardData(): AcademicDashboardData {
  return useMemo(() => {
    // ─── KPI Data ───
    const kpis = [
      {
        label: 'Avg. SGPA',
        value: '7.42',
        delta: -0.18,
        sparkline: [7.1, 7.15, 7.3, 7.42, 7.38],
        unit: '/ 10',
        derived: true,
      },
      {
        label: 'Pass Rate',
        value: '89.4%',
        delta: 2.3,
        sparkline: [84.2, 85.8, 87.1, 89.4],
      },
      {
        label: 'Credit Completion',
        value: '94.8%',
        delta: 1.2,
        sparkline: [92.1, 93.2, 94.1, 94.8],
        unit: '% of min',
        derived: true,
      },
      {
        label: 'At-Risk Students',
        value: '24',
        delta: -8,
        sparkline: [31, 28, 26, 24],
        unit: 'in cohort',
      },
      {
        label: 'Avg. Attendance',
        value: '88.7%',
        delta: 0.4,
        sparkline: [87.2, 88.1, 88.4, 88.7],
      },
    ]

    // ─── Grade Distribution ───
    const gradeDistribution: GradeDistribution[] = [
      { grade: 'A', count: 142, percentage: 24.8, color: '#2E8B8B' },
      { grade: 'B', count: 186, percentage: 32.4, color: '#4A9B7F' },
      { grade: 'C', count: 138, percentage: 24.1, color: '#C99A2E' },
      { grade: 'D', count: 82, percentage: 14.3, color: '#C55A11' },
      { grade: 'E', count: 38, percentage: 6.6, color: '#B2566B' },
      { grade: 'F', count: 28, percentage: 4.9, color: '#8B3A3A' },
    ]

    // ─── Pass Rate Heatmap ───
    const passRateHeatmap: PassRateHeatmapCell[] = [
      { subject: 'CS101', semester: 1, passRate: 94, totalStudents: 120, failedCount: 7 },
      { subject: 'MA101', semester: 1, passRate: 88, totalStudents: 120, failedCount: 14 },
      { subject: 'PH101', semester: 1, passRate: 91, totalStudents: 120, failedCount: 11 },
      { subject: 'EC101', semester: 1, passRate: 85, totalStudents: 120, failedCount: 18 },
      { subject: 'CS201', semester: 2, passRate: 92, totalStudents: 118, failedCount: 9 },
      { subject: 'MA201', semester: 2, passRate: 82, totalStudents: 118, failedCount: 21 },
      { subject: 'DB201', semester: 2, passRate: 89, totalStudents: 118, failedCount: 13 },
      { subject: 'OS301', semester: 3, passRate: 86, totalStudents: 116, failedCount: 16 },
      { subject: 'CN301', semester: 3, passRate: 84, totalStudents: 116, failedCount: 19 },
      { subject: 'DSA301', semester: 3, passRate: 91, totalStudents: 116, failedCount: 10 },
      { subject: 'AI401', semester: 4, passRate: 79, totalStudents: 115, failedCount: 24 },
      { subject: 'ML401', semester: 4, passRate: 76, totalStudents: 115, failedCount: 27 },
    ]

    // ─── SGPA Trend ───
    const sgpaTrend: SgpaTrend[] = [
      { semester: 1, program: 'CSE', avgSgpa: 6.8, median: 6.9, q1: 6.2, q3: 7.4 },
      { semester: 2, program: 'CSE', avgSgpa: 7.1, median: 7.2, q1: 6.5, q3: 7.7 },
      { semester: 3, program: 'CSE', avgSgpa: 7.3, median: 7.4, q1: 6.8, q3: 7.9 },
      { semester: 4, program: 'CSE', avgSgpa: 7.42, median: 7.5, q1: 6.9, q3: 8.0 },
    ]

    // ─── Equity Metrics ───
    const equityMetrics: EquityMetric[] = [
      { category: 'Gen', avgSgpa: 7.61, count: 286, passRate: 91.6 },
      { category: 'OBC', avgSgpa: 7.28, count: 156, passRate: 88.5 },
      { category: 'SC', avgSgpa: 6.94, count: 89, passRate: 84.3 },
      { category: 'ST', avgSgpa: 6.72, count: 33, passRate: 81.8 },
      { category: 'PwD', avgSgpa: 6.88, count: 12, passRate: 83.3 },
    ]

    // ─── At-Risk Students ───
    const atRiskStudents: StudentPerformance[] = [
      {
        studentId: 'CSE001',
        studentName: 'Arjun Singh',
        program: 'B.Tech CSE',
        semester: 4,
        sgpa: 5.2,
        creditCompletion: 82,
        passedSubjects: 9,
        failedSubjects: 3,
        attemptedSubjects: 12,
        attendancePercentage: 68.5,
        riskScore: 88,
        riskStatus: 'critical',
      },
      {
        studentId: 'CSE042',
        studentName: 'Priya Patel',
        program: 'B.Tech CSE',
        semester: 4,
        sgpa: 5.8,
        creditCompletion: 87,
        passedSubjects: 10,
        failedSubjects: 2,
        attemptedSubjects: 12,
        attendancePercentage: 71.2,
        riskScore: 72,
        riskStatus: 'warning',
      },
      {
        studentId: 'ECE018',
        studentName: 'Rahul Kumar',
        program: 'B.Tech ECE',
        semester: 3,
        sgpa: 5.9,
        creditCompletion: 89,
        passedSubjects: 5,
        failedSubjects: 1,
        attemptedSubjects: 6,
        attendancePercentage: 74.8,
        riskScore: 65,
        riskStatus: 'at-risk',
      },
      {
        studentId: 'CSE089',
        studentName: 'Ananya Desai',
        program: 'B.Tech CSE',
        semester: 4,
        sgpa: 6.1,
        creditCompletion: 91,
        passedSubjects: 11,
        failedSubjects: 1,
        attemptedSubjects: 12,
        attendancePercentage: 76.4,
        riskScore: 58,
        riskStatus: 'at-risk',
      },
      {
        studentId: 'ME055',
        studentName: 'Roshan Yadav',
        program: 'B.Tech Mech',
        semester: 3,
        sgpa: 6.3,
        creditCompletion: 92,
        passedSubjects: 5,
        failedSubjects: 1,
        attemptedSubjects: 6,
        attendancePercentage: 78.1,
        riskScore: 52,
        riskStatus: 'at-risk',
      },
      {
        studentId: 'CSE121',
        studentName: 'Divya Mishra',
        program: 'B.Tech CSE',
        semester: 4,
        sgpa: 5.4,
        creditCompletion: 84,
        passedSubjects: 9,
        failedSubjects: 3,
        attemptedSubjects: 12,
        attendancePercentage: 69.7,
        riskScore: 81,
        riskStatus: 'critical',
      },
    ]

    // ─── All Students (sample cohort) ───
    const allStudents: StudentPerformance[] = [
      ...atRiskStudents,
      {
        studentId: 'CSE002',
        studentName: 'Vikram Sharma',
        program: 'B.Tech CSE',
        semester: 4,
        sgpa: 7.9,
        creditCompletion: 98,
        passedSubjects: 12,
        failedSubjects: 0,
        attemptedSubjects: 12,
        attendancePercentage: 94.2,
        riskScore: 12,
        riskStatus: 'healthy',
      },
      {
        studentId: 'CSE003',
        studentName: 'Neha Gupta',
        program: 'B.Tech CSE',
        semester: 4,
        sgpa: 8.1,
        creditCompletion: 100,
        passedSubjects: 12,
        failedSubjects: 0,
        attemptedSubjects: 12,
        attendancePercentage: 96.8,
        riskScore: 8,
        riskStatus: 'healthy',
      },
      {
        studentId: 'ECE001',
        studentName: 'Aditya Nair',
        program: 'B.Tech ECE',
        semester: 3,
        sgpa: 7.6,
        creditCompletion: 97,
        passedSubjects: 6,
        failedSubjects: 0,
        attemptedSubjects: 6,
        attendancePercentage: 92.3,
        riskScore: 18,
        riskStatus: 'healthy',
      },
    ]

    // ─── AI Insights ───
    const aiInsights: AcademicAIInsight[] = [
      {
        id: 'ai-ac-1',
        severity: 'critical',
        headline: '6 students at critical risk of academic dismissal — MA201 & AI401 correlation',
        factors: [
          'MA201 (Discrete Math) post-requisite for 3 failed subjects in AI401',
          'Arjun Singh & Divya Mishra both failed both courses (90% co-failure rate)',
          'Support intervention in Sem 1 math foundation missed — cascading effect',
        ],
        confidence: 94,
        action: 'Trigger academic counseling + math remedial pathway before Sem 5',
        domain: 'Academic Risk',
      },
      {
        id: 'ai-ac-2',
        severity: 'warning',
        headline: 'Pass rate inequality: General category 91.6% vs ST 81.8% (9.8pp gap)',
        factors: [
          'ST cohort avg SGPA 6.72 vs Gen 7.61 (0.89 GPA gap)',
          'Resources: ST students lack peer mentoring access (67% vs 88% for Gen)',
          'Correlation: No difference in attendance, suggesting systemic support gap',
        ],
        confidence: 88,
        action: 'Allocate peer mentor budget for ST/SC cohort + coaching hours',
        domain: 'Equity & Access',
      },
      {
        id: 'ai-ac-3',
        severity: 'warning',
        headline: 'ML & AI courses (Sem 4) showing 76–79% pass rate — 12pp below institutional target',
        factors: [
          'AI401 & ML401 both below 80%, students entering with weak DSA foundation (Sem 3)',
          'DSA301 pass rate 91% but 27% of students repeat it or struggle in advanced courses',
          'Lab environment: Limited GPU access (10 slots for 115 students) likely bottleneck',
        ],
        confidence: 91,
        action: 'Allocate 2 additional GPU nodes + prerequisite assessment for Sem 4 electives',
        domain: 'Curriculum Design',
      },
      {
        id: 'ai-ac-4',
        severity: 'info',
        headline: 'SGPA trend improvement: +0.62pp from Sem 1→4 (6.8→7.42), above prior cohort',
        factors: [
          'Gen + OBC cohorts both showing improvement arc',
          'SC/ST cohorts also improving but at slower rate (need acceleration support)',
          'Semester 4 median 7.5 shows strong performance in advanced electives',
        ],
        confidence: 96,
        action: 'Publish success story + recommend to admissions for prior cohort comparison',
        domain: 'Student Success',
      },
    ]

    return {
      kpis,
      gradeDistribution,
      passRateHeatmap,
      sgpaTrend,
      equityMetrics,
      atRiskStudents: atRiskStudents.sort((a, b) => b.riskScore - a.riskScore),
      allStudents: allStudents.sort((a, b) => b.sgpa - a.sgpa),
      aiInsights,
      lastUpdated: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    }
  }, [])
}
