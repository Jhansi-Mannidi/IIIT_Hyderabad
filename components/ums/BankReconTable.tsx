'use client'

import { BankReconItem } from '@/lib/useInstitutionalFinanceData'
import { MotionCard } from './MotionCard'

interface BankReconTableProps {
  data: BankReconItem[]
}

export function BankReconTable({ data }: BankReconTableProps) {
  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Bank Reconciliation Status</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="border-b border-[#E5ECEF]">
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Date</th>
              <th className="text-left p-2 font-[600] text-[#5A6B7A]">Description</th>
              <th className="text-right p-2 font-[600] text-[#5A6B7A]">Amount</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Status</th>
              <th className="text-center p-2 font-[600] text-[#5A6B7A]">Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b border-[#F0F4F7]">
                <td className="p-2 text-[#0F1722]">{item.date}</td>
                <td className="p-2 text-[#0F1722]">{item.description}</td>
                <td className="text-right p-2 font-['Courier'] font-[600]">₹{(item.amount / 100).toFixed(1)}L</td>
                <td className="text-center p-2">
                  <span className={`px-2 py-1 rounded-[4px] text-[9px] font-[600] ${
                    item.status === 'cleared' ? 'bg-[#27AE60]/20 text-[#27AE60]' :
                    item.status === 'pending' ? 'bg-[#F39C12]/20 text-[#F39C12]' :
                    'bg-[#E74C3C]/20 text-[#E74C3C]'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="text-center p-2 text-[#5A6B7A]">{item.days}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MotionCard>
  )
}
