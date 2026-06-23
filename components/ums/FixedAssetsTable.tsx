'use client'

import { FixedAsset } from '@/lib/useInstitutionalFinanceData'
import { MotionCard } from './MotionCard'

interface FixedAssetsTableProps {
  data: FixedAsset[]
}

export function FixedAssetsTable({ data }: FixedAssetsTableProps) {
  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Fixed Asset Register</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-[#E5ECEF]">
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Asset</th>
              <th className="text-right p-2 font-[600] text-[#5A6B7A]">Book Value</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Warranty</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(asset => (
              <tr key={asset.assetId} className="border-b border-[#F0F4F7]">
                <td className="p-2 text-[#0F1722]">{asset.name}</td>
                <td className="text-right p-2 font-['Courier'] font-[600]">₹{(asset.bookValue / 100).toFixed(1)}L</td>
                <td className="text-center p-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] ${
                    asset.warranty.includes('Active') ? 'bg-[#27AE60]/20 text-[#27AE60]' : 'bg-[#E74C3C]/20 text-[#E74C3C]'
                  }`}>
                    {asset.warranty.includes('Active') ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td className="text-center p-2">
                  <span className="px-2 py-1 rounded-[4px] bg-[#2E8B8B]/20 text-[#2E8B8B] text-[9px] font-[600]">
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MotionCard>
  )
}
