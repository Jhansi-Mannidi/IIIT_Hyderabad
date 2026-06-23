'use client'

import { UMSShell } from '@/components/ums/UMSShell'
import { FinanceDashboard } from '@/components/ums/FinanceDashboard'

export default function FinancePage() {
  return <UMSShell currentPage="finance" children={<FinanceDashboard />} />
}
