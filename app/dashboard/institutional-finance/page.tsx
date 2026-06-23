'use client'

import { UMSShell } from '@/components/ums/UMSShell'
import { InstitutionalFinanceDashboard } from '@/components/ums/InstitutionalFinanceDashboard'

export default function InstitutionalFinancePage() {
  return <UMSShell currentPage="institutional-finance" children={<InstitutionalFinanceDashboard />} />
}
