'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { VoucherFlow } from '@/lib/useInstitutionalFinanceData'
import { MotionCard } from './MotionCard'

interface VoucherFlowChartProps {
  data: VoucherFlow[]
}

export function VoucherFlowChart({ data }: VoucherFlowChartProps) {
  return (
    <MotionCard className="flex flex-col gap-3 p-4 bg-white rounded-[12px] border border-[#E5ECEF]">
      <h3 className="text-[13px] font-[700] text-[#0F1722]">Voucher & GL Posting Flow</h3>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5ECEF" vertical={false} />
          <XAxis dataKey="date" fontSize={11} fill="#5A6B7A" />
          <YAxis fontSize={11} fill="#5A6B7A" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F1722',
              border: 'none',
              borderRadius: '8px',
            }}
          />
          <Area type="monotone" dataKey="vouchers" fill="#2E8B8B" stroke="#2E8B8B" />
          <Area type="monotone" dataKey="glPostings" fill="#C55A11" stroke="#C55A11" />
        </AreaChart>
      </ResponsiveContainer>
    </MotionCard>
  )
}
