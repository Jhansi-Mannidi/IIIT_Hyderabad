'use client'

import { UMSShell } from '@/components/ums/UMSShell'
import { HRPayrollDashboard } from '@/components/ums/HRPayrollDashboard'

export default function HRPayrollPage() {
  return <UMSShell currentPage="hr-payroll" children={<HRPayrollDashboard />} />
}
