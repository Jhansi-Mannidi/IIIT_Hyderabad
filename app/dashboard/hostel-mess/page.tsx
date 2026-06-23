'use client'

import { UMSShell } from '@/components/ums/UMSShell'
import { HostelMessDashboard } from '@/components/ums/HostelMessDashboard'

export default function HostelMessPage() {
  return <UMSShell currentPage="hostel-mess" children={<HostelMessDashboard />} />
}
