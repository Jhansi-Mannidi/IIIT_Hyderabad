'use client'

export interface StudentShortfall {
  id: string
  name: string
  rollNumber: string
  course: string
  department: string
  currentAttendance: number
  totalClasses: number
  attendancePercent: number
  shortfallDays: number
  requiredClasses: number
  daysToAttend: number
  riskLevel: 'critical' | 'high' | 'medium'
  projectedEligibility: boolean
  trendSparkline: number[]
}

export interface EmployeePunch {
  day: string
  inTime?: string
  outTime?: string
  minutesLate: number
  status: 'ontime' | 'late' | 'absent'
}

export interface EmployeeBiometric {
  employeeId: string
  name: string
  department: string
  designation: string
  punctualityScore: number
  lateCount: number
  absentCount: number
  thisMonthPunches: EmployeePunch[]
}

export interface CourseAttendance {
  courseCode: string
  courseName: string
  instructor: string
  totalClasses: number
  avgAttendancePercent: number
  studentsAtRisk: number
  totalStudents: number
}

export interface DepartmentCompliance {
  department: string
  avgAttendance: number
  studentsAtRisk: number
  compliance: number
}

export interface AttendanceAIInsight {
  id: string
  severity: 'critical' | 'warning' | 'info'
  headline: string
  factors: string[]
  confidence: number
  action: string
  domain: string
}

export interface AttendanceData {
  kpis: Array<{
    id: string
    label: string
    value: number
    target?: number
    delta: number
    isDerived: boolean
  }>
  studentShortfalls: StudentShortfall[]
  employeeBiometrics: EmployeeBiometric[]
  courseAttendance: CourseAttendance[]
  departmentCompliance: DepartmentCompliance[]
  aiInsights: AttendanceAIInsight[]
  lastUpdated: string
}

export function useAttendanceData(): AttendanceData {
  return {
    kpis: [
      {
        id: 'avg-student-attendance',
        label: 'Avg Student Attendance %',
        value: 77.2,
        target: 80,
        delta: -2.8,
        isDerived: true,
      },
      {
        id: 'students-at-risk',
        label: 'Students At Risk (<75%)',
        value: 142,
        target: 50,
        delta: 184,
        isDerived: false,
      },
      {
        id: 'avg-employee-attendance',
        label: 'Avg Employee Attendance %',
        value: 94.6,
        target: 95,
        delta: -0.4,
        isDerived: true,
      },
      {
        id: 'employee-punctuality',
        label: 'On-Time Punctuality %',
        value: 89.2,
        target: 92,
        delta: -2.8,
        isDerived: true,
      },
      {
        id: 'detention-eligible',
        label: 'Detention at Risk',
        value: 28,
        target: 10,
        delta: 180,
        isDerived: true,
      },
      {
        id: 'course-compliance',
        label: 'Courses with Compliance',
        value: 18,
        target: 22,
        delta: -18.2,
        isDerived: true,
      },
    ],

    studentShortfalls: [
      {
        id: 'STU-001',
        name: 'Akshay Singh',
        rollNumber: 'CSE-2022-001',
        course: 'Data Structures (CS-201)',
        department: 'Computer Science',
        currentAttendance: 34,
        totalClasses: 48,
        attendancePercent: 70.8,
        shortfallDays: 6,
        requiredClasses: 36,
        daysToAttend: 10,
        riskLevel: 'critical',
        projectedEligibility: false,
        trendSparkline: [85, 82, 75, 72, 70, 69, 70, 71],
      },
      {
        id: 'STU-002',
        name: 'Priya Patel',
        rollNumber: 'ME-2022-015',
        course: 'Thermodynamics (ME-301)',
        department: 'Mechanical',
        currentAttendance: 36,
        totalClasses: 48,
        attendancePercent: 75.0,
        shortfallDays: 3,
        requiredClasses: 36,
        daysToAttend: 7,
        riskLevel: 'high',
        projectedEligibility: true,
        trendSparkline: [78, 76, 77, 76, 75, 75, 75, 75],
      },
      {
        id: 'STU-003',
        name: 'Rohan Verma',
        rollNumber: 'CIVIL-2022-008',
        course: 'Structural Analysis (CE-251)',
        department: 'Civil',
        currentAttendance: 33,
        totalClasses: 46,
        attendancePercent: 71.7,
        shortfallDays: 7,
        requiredClasses: 34,
        daysToAttend: 9,
        riskLevel: 'critical',
        projectedEligibility: false,
        trendSparkline: [80, 78, 74, 72, 71, 71, 72, 72],
      },
      {
        id: 'STU-004',
        name: 'Shreya Desai',
        rollNumber: 'ECE-2022-022',
        course: 'Signals & Systems (EC-301)',
        department: 'Electronics',
        currentAttendance: 35,
        totalClasses: 47,
        attendancePercent: 74.5,
        shortfallDays: 4,
        requiredClasses: 35,
        daysToAttend: 8,
        riskLevel: 'high',
        projectedEligibility: true,
        trendSparkline: [77, 76, 75, 74, 75, 74, 74, 75],
      },
      {
        id: 'STU-005',
        name: 'Amit Kumar',
        rollNumber: 'CSE-2022-028',
        course: 'Database Systems (CS-301)',
        department: 'Computer Science',
        currentAttendance: 32,
        totalClasses: 50,
        attendancePercent: 64.0,
        shortfallDays: 12,
        requiredClasses: 37,
        daysToAttend: 15,
        riskLevel: 'critical',
        projectedEligibility: false,
        trendSparkline: [82, 78, 72, 68, 65, 64, 64, 64],
      },
    ],

    employeeBiometrics: [
      {
        employeeId: 'EMP-001',
        name: 'Dr. Rajesh Kumar',
        department: 'Computer Science',
        designation: 'Professor',
        punctualityScore: 92.5,
        lateCount: 3,
        absentCount: 1,
        thisMonthPunches: [
          { day: 'Mon', inTime: '08:55', outTime: '17:15', minutesLate: 0, status: 'ontime' },
          { day: 'Tue', inTime: '09:12', outTime: '17:30', minutesLate: 12, status: 'late' },
          { day: 'Wed', inTime: '08:45', outTime: '17:00', minutesLate: 0, status: 'ontime' },
          { day: 'Thu', inTime: '09:08', outTime: '17:20', minutesLate: 8, status: 'late' },
          { day: 'Fri', inTime: '08:50', outTime: '16:45', minutesLate: 0, status: 'ontime' },
          { day: 'Mon', inTime: null, outTime: null, minutesLate: 0, status: 'absent' },
          { day: 'Tue', inTime: '08:48', outTime: '17:10', minutesLate: 0, status: 'ontime' },
          { day: 'Wed', inTime: '09:15', outTime: '17:25', minutesLate: 15, status: 'late' },
        ],
      },
      {
        employeeId: 'EMP-002',
        name: 'Ms. Priya Sharma',
        department: 'Mechanical',
        designation: 'Associate Professor',
        punctualityScore: 87.3,
        lateCount: 6,
        absentCount: 2,
        thisMonthPunches: [
          { day: 'Mon', inTime: '09:22', outTime: '17:40', minutesLate: 22, status: 'late' },
          { day: 'Tue', inTime: '09:05', outTime: '17:15', minutesLate: 5, status: 'late' },
          { day: 'Wed', inTime: null, outTime: null, minutesLate: 0, status: 'absent' },
          { day: 'Thu', inTime: '08:55', outTime: '17:00', minutesLate: 0, status: 'ontime' },
          { day: 'Fri', inTime: '09:18', outTime: '17:30', minutesLate: 18, status: 'late' },
          { day: 'Mon', inTime: '09:10', outTime: '17:20', minutesLate: 10, status: 'late' },
          { day: 'Tue', inTime: null, outTime: null, minutesLate: 0, status: 'absent' },
          { day: 'Wed', inTime: '08:52', outTime: '17:05', minutesLate: 0, status: 'ontime' },
        ],
      },
      {
        employeeId: 'EMP-003',
        name: 'Mr. Vikram Patel',
        department: 'Civil',
        designation: 'Lecturer',
        punctualityScore: 95.8,
        lateCount: 1,
        absentCount: 0,
        thisMonthPunches: [
          { day: 'Mon', inTime: '08:48', outTime: '17:00', minutesLate: 0, status: 'ontime' },
          { day: 'Tue', inTime: '08:50', outTime: '17:10', minutesLate: 0, status: 'ontime' },
          { day: 'Wed', inTime: '08:52', outTime: '17:05', minutesLate: 0, status: 'ontime' },
          { day: 'Thu', inTime: '09:08', outTime: '17:15', minutesLate: 8, status: 'late' },
          { day: 'Fri', inTime: '08:46', outTime: '16:50', minutesLate: 0, status: 'ontime' },
          { day: 'Mon', inTime: '08:49', outTime: '17:05', minutesLate: 0, status: 'ontime' },
          { day: 'Tue', inTime: '08:51', outTime: '17:12', minutesLate: 0, status: 'ontime' },
          { day: 'Wed', inTime: '08:48', outTime: '17:00', minutesLate: 0, status: 'ontime' },
        ],
      },
    ],

    courseAttendance: [
      {
        courseCode: 'CS-201',
        courseName: 'Data Structures',
        instructor: 'Dr. Arun Verma',
        totalClasses: 48,
        avgAttendancePercent: 76.3,
        studentsAtRisk: 8,
        totalStudents: 52,
      },
      {
        courseCode: 'CS-301',
        courseName: 'Database Systems',
        instructor: 'Prof. Rajesh Kumar',
        totalClasses: 50,
        avgAttendancePercent: 74.1,
        studentsAtRisk: 12,
        totalStudents: 48,
      },
      {
        courseCode: 'ME-301',
        courseName: 'Thermodynamics',
        instructor: 'Dr. Priya Sharma',
        totalClasses: 48,
        avgAttendancePercent: 78.5,
        studentsAtRisk: 6,
        totalStudents: 50,
      },
      {
        courseCode: 'CE-251',
        courseName: 'Structural Analysis',
        instructor: 'Dr. Vikram Patel',
        totalClasses: 46,
        avgAttendancePercent: 79.2,
        studentsAtRisk: 5,
        totalStudents: 44,
      },
      {
        courseCode: 'EC-301',
        courseName: 'Signals & Systems',
        instructor: 'Ms. Anjali Singh',
        totalClasses: 47,
        avgAttendancePercent: 77.8,
        studentsAtRisk: 7,
        totalStudents: 46,
      },
    ],

    departmentCompliance: [
      { department: 'Computer Science', avgAttendance: 75.2, studentsAtRisk: 18, compliance: 65.4 },
      { department: 'Mechanical', avgAttendance: 78.1, studentsAtRisk: 12, compliance: 72.3 },
      { department: 'Civil', avgAttendance: 79.4, studentsAtRisk: 8, compliance: 76.8 },
      { department: 'Electronics', avgAttendance: 77.6, studentsAtRisk: 14, compliance: 71.2 },
      { department: 'Electrical', avgAttendance: 76.8, studentsAtRisk: 16, compliance: 69.1 },
    ],

    aiInsights: [
      {
        id: 'att-1',
        severity: 'critical',
        headline: 'Detention eligibility at risk for 28 students — 5 critical cases with <65% attendance',
        factors: [
          'Akshay Singh (CSE-2022-001): 70.8% attendance, 6 days shortfall, critical trajectory',
          'Amit Kumar (CSE-2022-028): 64% attendance, 12 days shortfall, likely ineligible by month-end',
          'Rohan Verma (CIVIL-2022-008): 71.7% attendance, declining trend from 80% baseline',
          'Computer Science dept has highest at-risk count (18 students) and lowest avg compliance (65.4%)',
        ],
        confidence: 96,
        action: 'Initiate early warning letters + mandatory attendance counseling for 5 critical cases + course instructors',
        domain: 'Academic',
      },
      {
        id: 'att-2',
        severity: 'warning',
        headline: 'Employee punctuality slipping to 89.2% (below 92% target) — 6 staff with >5 late arrivals',
        factors: [
          'Ms. Priya Sharma (Mechanical): 87.3% score, 6 late arrivals + 2 absences in 8 days = concerning pattern',
          'Dr. Rajesh Kumar (CSE): 92.5% score but 3 lates + 1 absence showing uptick from prior month',
          'Late arrivals concentrated Mon-Tue (shift from routine?), not isolated incidents',
        ],
        confidence: 88,
        action: 'Review employee shift schedules + send individual punctuality reminders + investigate underlying causes',
        domain: 'HR',
      },
      {
        id: 'att-3',
        severity: 'warning',
        headline: 'Student attendance declining course-by-course — CS-301 (Database Systems) critical at 74.1% avg',
        factors: [
          'CS-301 avg attendance 74.1% (below 75% threshold), 12 students at risk (25% of class)',
          'CS-201 (Data Structures) 76.3% but trending downward — mid-semester dropout risk',
          'Civil & Mechanical depts maintaining compliance (78-79% avg), CSE dept underperforming',
          'Pattern suggests course load/difficulty spike in upper-level CS courses',
        ],
        confidence: 91,
        action: 'Audit CS-301 course structure + review instructor engagement + escalate to Department Head + plan catchup sessions',
        domain: 'Academic',
      },
      {
        id: 'att-4',
        severity: 'info',
        headline: 'Employee punctuality star performer identified — Mr. Vikram Patel (Civil Lecturer) 95.8% on-time score',
        factors: [
          'Mr. Vikram Patel: 95.8% punctuality (8 days, 7 on-time + 1 minor late 8 min), 0 absences',
          'Consistent early arrival pattern (08:46-08:52 range vs 09:00 target)',
          'Could serve as peer mentor for punctuality improvement program',
        ],
        confidence: 100,
        action: 'Recognize punctuality excellence + nominate for faculty recognition program + leverage as mentor for under-performers',
        domain: 'HR',
      },
    ],

    lastUpdated: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  }
}
