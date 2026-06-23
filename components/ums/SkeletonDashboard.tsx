import { cn } from '@/lib/utils'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn('skeleton-shimmer rounded-[8px]', className)}
      aria-hidden="true"
    />
  )
}

export function SkeletonDashboard() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6" aria-label="Loading dashboard" aria-busy="true">
      {/* KPI strip skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-28 rounded-[12px]" />
        ))}
      </div>

      {/* Chart row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SkeletonBlock className="h-56 rounded-[12px] lg:col-span-2" />
        <SkeletonBlock className="h-56 rounded-[12px]" />
      </div>

      {/* Domain health skeleton */}
      <SkeletonBlock className="h-40 rounded-[12px]" />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SkeletonBlock className="h-48 rounded-[12px]" />
        <SkeletonBlock className="h-48 rounded-[12px]" />
        <SkeletonBlock className="h-48 rounded-[12px]" />
      </div>
    </div>
  )
}
