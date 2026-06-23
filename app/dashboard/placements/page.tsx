'use client'

import { UMSShell } from '@/components/ums/UMSShell'
import { PlacementsDashboard } from '@/components/ums/PlacementsDashboard'

export default function PlacementsPage() {
  return <UMSShell currentPage="placements"><PlacementsDashboard /></UMSShell>
}
