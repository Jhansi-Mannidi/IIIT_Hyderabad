'use client'
import { UMSShell } from '@/components/ums/UMSShell'
import { AdmissionsDashboard } from '@/components/ums/AdmissionsDashboard'

export default function AdmissionsPage() {
  return (
    <UMSShell currentPage="admissions">
      <AdmissionsDashboard />
    </UMSShell>
  )
}
