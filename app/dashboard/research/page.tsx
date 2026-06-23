'use client'

import { UMSShell } from '@/components/ums/UMSShell'
import { ResearchDashboard } from '@/components/ums/ResearchDashboard'

export default function ResearchPage() {
  return <UMSShell currentPage="research" children={<ResearchDashboard />} />
}
