'use client'

import { useState } from 'react'
import { X, Download, AlertCircle, TrendingUp } from 'lucide-react'
import { StudentPerformance } from '@/lib/useAcademicDashboardData'

interface TranscriptDrawerProps {
  student: StudentPerformance | null
  onClose: () => void
}

// Mock transcript data — in production, would fetch from API
const mockTranscript = (student: StudentPerformance) => [
  {
    semester: 1,
    courses: [
      { code: 'CS101', name: 'Prog Fundamentals', credits: 4, grade: 'A', gp: 9, marks: 88 },
      { code: 'MA101', name: 'Calculus I', credits: 4, grade: 'B', gp: 8, marks: 78 },
      { code: 'PH101', name: 'Physics I', credits: 3, grade: 'B+', gp: 8.5, marks: 81 },
      { code: 'EC101', name: 'Engineering Chem', credits: 3, grade: 'C', gp: 7, marks: 72 },
    ],
  },
  {
    semester: 2,
    courses: [
      { code: 'CS201', name: 'DSA', credits: 4, grade: 'A', gp: 9, marks: 85 },
      { code: 'MA201', name: 'Linear Algebra', credits: 4, grade: 'C', gp: 7, marks: 68 },
      { code: 'DB201', name: 'Database Design', credits: 3, grade: 'B', gp: 8, marks: 79 },
    ],
  },
  {
    semester: 3,
    courses: [
      { code: 'OS301', name: 'Operating Systems', credits: 4, grade: 'B+', gp: 8.5, marks: 82 },
      { code: 'CN301', name: 'Computer Networks', credits: 4, grade: 'C', gp: 7, marks: 71 },
      { code: 'DSA301', name: 'Adv DSA', credits: 3, grade: 'A', gp: 9, marks: 87 },
    ],
  },
  {
    semester: 4,
    courses: [
      { code: 'AI401', name: 'Artificial Intelligence', credits: 4, grade: 'F', gp: 0, marks: 42 },
      { code: 'ML401', name: 'Machine Learning', credits: 4, grade: 'F', gp: 0, marks: 38 },
      { code: 'SE401', name: 'Software Engineering', credits: 3, grade: 'B', gp: 8, marks: 76 },
    ],
  },
]

export function TranscriptDrawer({ student, onClose }: TranscriptDrawerProps) {
  if (!student) return null

  const transcript = mockTranscript(student)
  const [expandedSem, setExpandedSem] = useState<number | null>(4) // Expand latest semester by default

  const getGradeColor = (grade: string): string => {
    if (grade.includes('A')) return '#2E8B8B'
    if (grade.includes('B')) return '#4A9B7F'
    if (grade.includes('C')) return '#C99A2E'
    if (grade.includes('D')) return '#C55A11'
    if (grade.includes('E')) return '#B2566B'
    return '#8B3A3A'
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center sm:justify-end">
      <div className="bg-white w-full sm:w-[600px] h-screen sm:h-auto sm:max-h-[90vh] rounded-t-[12px] sm:rounded-[12px] shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1F3864] to-[#2E8B8B] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{student.studentName}</h2>
            <p className="text-sm text-[#B8D0E8]">{student.studentId} • {student.program}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Quick Stats */}
          <div className="px-6 py-4 bg-[#F5F8FB] border-b border-[#E8EEF5] grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-xs text-[#6B7C99] font-semibold mb-1">Cumulative SGPA</div>
              <div className="text-2xl font-bold text-[#1F3864]">{student.sgpa.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[#6B7C99] font-semibold mb-1">Credits Completed</div>
              <div className="text-2xl font-bold text-[#1F3864]">{student.creditCompletion}%</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[#6B7C99] font-semibold mb-1">Passed / Failed</div>
              <div className="text-lg font-bold">
                <span className="text-[#2E8B8B]">{student.passedSubjects}</span>
                <span className="text-[#999]">/</span>
                <span className="text-[#B2566B]">{student.failedSubjects}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-[#6B7C99] font-semibold mb-1">Attendance</div>
              <div className="text-2xl font-bold text-[#1F3864]">
                {student.attendancePercentage.toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Risk Alert */}
          {student.riskStatus !== 'healthy' && (
            <div className="mx-6 mt-4 p-4 bg-[#FFF4ED] border border-[#FFE5CC] rounded-[8px] flex gap-3">
              <AlertCircle size={20} className="text-[#C55A11] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[#6B7C99]">
                <strong className="text-[#8B5F20]">Risk Status: {student.riskStatus}</strong>
                <p className="mt-1">
                  This student requires academic intervention. Consider counseling,
                  tutoring, or modified course load.
                </p>
              </div>
            </div>
          )}

          {/* Transcript by Semester */}
          <div className="px-6 py-4 space-y-3">
            {transcript.map((sem) => (
              <div
                key={sem.semester}
                className="border border-[#E8EEF5] rounded-[8px] overflow-hidden"
              >
                {/* Semester Header */}
                <button
                  onClick={() =>
                    setExpandedSem(expandedSem === sem.semester ? null : sem.semester)
                  }
                  className="w-full px-4 py-3 bg-[#F5F8FB] hover:bg-[#EEF2F7] flex items-center justify-between transition-colors"
                >
                  <div className="text-left">
                    <div className="font-semibold text-[#1F3864]">Semester {sem.semester}</div>
                    <div className="text-xs text-[#6B7C99]">{sem.courses.length} courses</div>
                  </div>
                  <div
                    className={`transition-transform ${
                      expandedSem === sem.semester ? 'rotate-180' : ''
                    }`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-[#6B7C99]"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>

                {/* Semester Courses */}
                {expandedSem === sem.semester && (
                  <div className="divide-y divide-[#E8EEF5]">
                    {sem.courses.map((course) => (
                      <div key={course.code} className="px-4 py-3 text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <div className="font-semibold text-[#1F3864]">{course.name}</div>
                            <div className="text-xs text-[#6B7C99]">{course.code}</div>
                          </div>
                          <div
                            className="px-2 py-1 rounded-[4px] text-xs font-bold text-white"
                            style={{ backgroundColor: getGradeColor(course.grade) }}
                          >
                            {course.grade}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-[#6B7C99] mt-2">
                          <div>
                            Credits: <strong>{course.credits}</strong>
                          </div>
                          <div>
                            GP: <strong>{course.gp}</strong>
                          </div>
                          <div>
                            Marks: <strong>{course.marks}/100</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F5F8FB] border-t border-[#E8EEF5] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-[6px] border border-[#E8EEF5] bg-white text-[#1F3864] font-semibold hover:bg-[#F5F8FB] transition-colors text-sm"
          >
            Close
          </button>
          <button className="flex-1 px-4 py-2 rounded-[6px] bg-[#2E8B8B] text-white font-semibold hover:bg-[#1F5F5F] transition-colors text-sm flex items-center justify-center gap-2">
            <Download size={16} />
            Download Transcript
          </button>
        </div>
      </div>
    </div>
  )
}
