'use client'

import { CourseAttendance } from '@/lib/useAttendanceData'
import { MotionCard } from './MotionCard'

interface CourseAttendanceGaugesProps {
  data: CourseAttendance[]
  thresholdPercent?: number
}

export function CourseAttendanceGauges({ data, thresholdPercent = 75 }: CourseAttendanceGaugesProps) {
  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Course Attendance Gauges (75% Threshold)</h3>
      
      <div className="space-y-3">
        {data.map((course) => {
          const isBelowThreshold = course.avgAttendancePercent < thresholdPercent
          const fillColor = isBelowThreshold ? '#E74C3C' : course.avgAttendancePercent < 85 ? '#F39C12' : '#27AE60'

          return (
            <div key={course.courseCode} className="flex items-center gap-3">
              <div className="w-32">
                <p className="text-[11px] font-[600] text-[#0F1722]">{course.courseCode}</p>
                <p className="text-[9px] text-[#9AA6B4]">{course.courseName}</p>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] font-[600]" style={{ color: fillColor }}>
                    {course.avgAttendancePercent.toFixed(1)}%
                  </span>
                  <span className="text-[10px] text-[#9AA6B4]">{course.studentsAtRisk}/{course.totalStudents} at risk</span>
                </div>
                
                <div className="relative h-2 bg-[#F0F4F7] rounded-full overflow-hidden border-2" style={{ borderColor: '#D1D8DF' }}>
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${course.avgAttendancePercent}%`,
                      backgroundColor: fillColor,
                    }}
                  />
                  
                  {/* Threshold line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-red-600 opacity-50"
                    style={{
                      left: `${thresholdPercent}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </MotionCard>
  )
}
