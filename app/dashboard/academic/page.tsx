import { AcademicDashboard } from '@/components/ums/AcademicDashboard'
import { UMSShell } from '@/components/ums/UMSShell'

export const metadata = {
  title: 'Academic Performance - VoltusWave UMS',
  description: 'Outcomes, grade distributions, credit progression, and early at-risk detection',
}

export default function AcademicPage() {
  return (
    <UMSShell currentPage="academic">
      <AcademicDashboard />
    </UMSShell>
  )
}
