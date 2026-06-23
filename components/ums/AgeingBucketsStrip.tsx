'use client'

import { AlertTriangle, AlertCircle } from 'lucide-react'
import { AgeingBucket } from '@/lib/useFinanceDashboardData'

interface AgeingBucketsStripProps {
  buckets: AgeingBucket[]
  onBucketClick?: (bucket: AgeingBucket) => void
}

export function AgeingBucketsStrip({ buckets, onBucketClick }: AgeingBucketsStripProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <div className="flex items-center justify-between">
        <h3 className="text-[13px] font-[700] text-[#0F1722] flex items-center gap-2">
          Outstanding Dues — Ageing Analysis
          <AlertTriangle size={16} className="text-[#E74C3C]" />
        </h3>
        <span className="text-[11px] text-[#9AA6B4]">Click bucket to view details</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {buckets.map((bucket) => (
          <button
            key={bucket.range}
            onClick={() => onBucketClick?.(bucket)}
            className="flex flex-col gap-3 p-4 rounded-[10px] border-2 transition-all hover:shadow-md cursor-pointer"
            style={{
              borderColor: bucket.color,
              backgroundColor: bucket.color + '08',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-[600] text-[#5A6B7A] uppercase">{bucket.label}</p>
                <p className="font-['Courier'] text-[16px] font-[700] text-[#0F1722] mt-1">
                  ₹{(bucket.amount / 100).toFixed(1)}L
                </p>
              </div>
              {bucket.status === 'critical' && <AlertCircle size={16} className="text-[#E74C3C]" />}
            </div>

            {/* Metrics */}
            <div className="flex justify-between text-[10px]">
              <div>
                <p className="text-[#9AA6B4]">Students</p>
                <p className="font-['Courier'] font-[600] text-[#1F3864]">{bucket.count}</p>
              </div>
              <div className="text-right">
                <p className="text-[#9AA6B4]">Share</p>
                <p className="font-['Courier'] font-[600] text-[#1F3864]">{bucket.percentage.toFixed(1)}%</p>
              </div>
            </div>

            {/* Status Bar */}
            <div className="w-full h-2 bg-[#F0F4F7] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${bucket.percentage}%`,
                  backgroundColor: bucket.color,
                }}
              />
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-[6px] w-fit" style={{ backgroundColor: bucket.color + '20' }}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: bucket.color }}
              />
              <span className="text-[9px] font-[600] capitalize" style={{ color: bucket.color }}>
                {bucket.status}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="flex flex-wrap gap-4 p-3 bg-[#F6F8FB] rounded-[8px] border border-[#E5ECEF]">
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Total Outstanding</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#1F3864]">
            ₹{(buckets.reduce((sum, b) => sum + b.amount, 0) / 100).toFixed(1)}L
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Ageing {'>'} 90 Days</p>
          <p className="font-['Courier'] text-[14px] font-[700] text-[#E74C3C]">
            ₹{(((buckets.find(b => b.range === '90+')?.amount) || 0) / 100).toFixed(1)}L
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[#9AA6B4] mb-1">Critical Cases</p>
          <p className="font-['Courier'] text-[14px] font-[700]">{buckets.find(b => b.status === 'critical')?.count || 0}</p>
        </div>
      </div>
    </div>
  )
}
