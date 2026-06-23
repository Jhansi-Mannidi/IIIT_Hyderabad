'use client'

import { UMSShell } from '@/components/ums/UMSShell'
import { AttendanceDashboard } from '@/components/ums/AttendanceDashboard'

export default function AttendancePage() {
  return <UMSShell currentPage="attendance" children={<AttendanceDashboard />} />
}
