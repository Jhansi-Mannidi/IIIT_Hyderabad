'use client'

export interface BlockOccupancy {
  blockId: string
  blockName: string
  capacity: number
  occupied: number
  occupancyPercent: number
  status: 'healthy' | 'warning' | 'critical'
  gender: string
}

export interface MessData {
  date: string
  costPerStudent: number
  studentsServed: number
  totalCost: number
  veg: number
  nonVeg: number
}

export interface RoomStatus {
  status: string
  count: number
  percentage: number
}

export interface QuartersWaitlist {
  id: string
  name: string
  designation: string
  department: string
  requestDate: string
  priority: 'high' | 'medium' | 'low'
  allocationScore: number
  status: 'pending' | 'approved' | 'rejected'
}

export interface UtilityCost {
  utility: string
  budget: number
  actual: number
  variance: number
  month: string
}

export interface HostelAIInsight {
  id: string
  severity: 'critical' | 'warning' | 'info'
  headline: string
  factors: string[]
  confidence: number
  action: string
  domain: string
}

export interface HostelMessData {
  kpis: Array<{
    id: string
    label: string
    value: number
    target?: number
    delta: number
    isDerived: boolean
  }>
  blockOccupancy: BlockOccupancy[]
  messData: MessData[]
  roomStatus: RoomStatus[]
  quartersWaitlist: QuartersWaitlist[]
  utilityCosts: UtilityCost[]
  aiInsights: HostelAIInsight[]
  lastUpdated: string
}

export function useHostelMessData(): HostelMessData {
  return {
    kpis: [
      {
        id: 'total-occupancy',
        label: 'Total Occupancy %',
        value: 84.3,
        target: 85,
        delta: -0.7,
        isDerived: true,
      },
      {
        id: 'avg-cost-per-student',
        label: 'Avg Mess Cost/Student',
        value: 285,
        target: 280,
        delta: 1.8,
        isDerived: true,
      },
      {
        id: 'room-utilization',
        label: 'Room Utilization %',
        value: 91.2,
        target: 90,
        delta: 1.2,
        isDerived: true,
      },
      {
        id: 'quarterly-alloc',
        label: 'Quarters Allocated',
        value: 48,
        target: 50,
        delta: -4,
        isDerived: false,
      },
      {
        id: 'waitlist-length',
        label: 'Waitlist Length',
        value: 12,
        target: 5,
        delta: 140,
        isDerived: false,
      },
      {
        id: 'utility-variance',
        label: 'Utility Cost Variance',
        value: -12.5,
        target: -8,
        delta: 4.5,
        isDerived: true,
      },
    ],

    blockOccupancy: [
      {
        blockId: 'BLK-01',
        blockName: 'Boys Block A',
        capacity: 240,
        occupied: 215,
        occupancyPercent: 89.6,
        status: 'healthy',
        gender: 'Male',
      },
      {
        blockId: 'BLK-02',
        blockName: 'Boys Block B',
        capacity: 200,
        occupied: 160,
        occupancyPercent: 80.0,
        status: 'healthy',
        gender: 'Male',
      },
      {
        blockId: 'BLK-03',
        blockName: 'Girls Block',
        capacity: 180,
        occupied: 168,
        occupancyPercent: 93.3,
        status: 'warning',
        gender: 'Female',
      },
      {
        blockId: 'BLK-04',
        blockName: 'PG Block',
        capacity: 120,
        occupied: 97,
        occupancyPercent: 80.8,
        status: 'healthy',
        gender: 'Mixed',
      },
    ],

    messData: [
      { date: 'Mon', costPerStudent: 280, studentsServed: 520, totalCost: 145600, veg: 260, nonVeg: 260 },
      { date: 'Tue', costPerStudent: 285, studentsServed: 530, totalCost: 151050, veg: 280, nonVeg: 250 },
      { date: 'Wed', costPerStudent: 290, studentsServed: 540, totalCost: 156600, veg: 270, nonVeg: 270 },
      { date: 'Thu', costPerStudent: 288, studentsServed: 535, totalCost: 154080, veg: 290, nonVeg: 245 },
      { date: 'Fri', costPerStudent: 295, studentsServed: 550, totalCost: 162250, veg: 310, nonVeg: 240 },
      { date: 'Sat', costPerStudent: 310, studentsServed: 480, totalCost: 148800, veg: 200, nonVeg: 280 },
    ],

    roomStatus: [
      { status: 'Occupied', count: 640, percentage: 91.2 },
      { status: 'Vacant', count: 42, percentage: 6.0 },
      { status: 'Maintenance', count: 20, percentage: 2.8 },
    ],

    quartersWaitlist: [
      {
        id: 'Q-001',
        name: 'Dr. Arun Verma',
        designation: 'Professor',
        department: 'CSE',
        requestDate: '2024-08-15',
        priority: 'high',
        allocationScore: 8.6,
        status: 'pending',
      },
      {
        id: 'Q-002',
        name: 'Dr. Priya Sharma',
        designation: 'Associate Professor',
        department: 'Mechanical',
        requestDate: '2024-09-02',
        priority: 'high',
        allocationScore: 8.2,
        status: 'pending',
      },
      {
        id: 'Q-003',
        name: 'Mr. Rajesh Kumar',
        designation: 'Asst. Professor',
        department: 'Civil',
        requestDate: '2024-09-10',
        priority: 'medium',
        allocationScore: 7.1,
        status: 'pending',
      },
      {
        id: 'Q-004',
        name: 'Ms. Anjali Singh',
        designation: 'Lecturer',
        department: 'Economics',
        requestDate: '2024-09-15',
        priority: 'medium',
        allocationScore: 6.8,
        status: 'approved',
      },
      {
        id: 'Q-005',
        name: 'Dr. Vikram Patel',
        designation: 'Associate Professor',
        department: 'CSE',
        requestDate: '2024-09-20',
        priority: 'low',
        allocationScore: 5.4,
        status: 'pending',
      },
    ],

    utilityCosts: [
      { utility: 'Electricity', budget: 280, actual: 305, variance: -25, month: 'Sep' },
      { utility: 'Water', budget: 85, actual: 72, variance: 13, month: 'Sep' },
      { utility: 'Gas', budget: 120, actual: 128, variance: -8, month: 'Sep' },
      { utility: 'Maintenance', budget: 150, actual: 145, variance: 5, month: 'Sep' },
    ],

    aiInsights: [
      {
        id: 'h-1',
        severity: 'warning',
        headline: 'Girls Block at 93.3% occupancy — overcrowding risk, maintenance backlog building',
        factors: [
          'Girls Block occupancy 93.3% (168/180 capacity)',
          'Only 12 vacant beds across all blocks',
          'Maintenance queue at 20 rooms (2.8% of inventory)',
          'Peak season demand (Oct-Nov) will exceed capacity',
        ],
        confidence: 92,
        action: 'Accelerate room repairs + implement dynamic room-sharing policy to absorb peak demand',
        domain: 'Facilities',
      },
      {
        id: 'h-2',
        severity: 'warning',
        headline: 'Mess cost per student spiking 5.4% above budget — ingredient inflation likely',
        factors: [
          'Average cost ₹285/student vs. budget ₹280 (1.8% over-run)',
          'Friday costs highest at ₹310/student (+11% above weekly avg)',
          'Veg meal cost trending higher than non-veg',
          'Student count stable (520-550) so price-driven, not volume',
        ],
        confidence: 85,
        action: 'Renegotiate supplier contracts + shift menu mix toward cost-optimized items for 4% reduction',
        domain: 'Operations',
      },
      {
        id: 'h-3',
        severity: 'critical',
        headline: 'Quarters waitlist at 12 (140% above target) — staff retention risk escalating',
        factors: [
          'Quarters allocated: 48/50 (96% occupancy)',
          'Waitlist: 12 pending, 2 approved (can accommodate 2 of 12)',
          '2 high-priority faculty (Prof. Verma, Assoc. Prof. Sharma) waiting >45 days',
          'Faculty engagement surveys cite housing unavailability as #2 attrition factor',
        ],
        confidence: 94,
        action: 'Fast-track 2 high-priority allocations + identify temporary housing options for medium-priority queue',
        domain: 'HR',
      },
      {
        id: 'h-4',
        severity: 'warning',
        headline: 'Electricity cost variance -₹25L (9% over-budget) — cooling season peak impact',
        factors: [
          'Electricity: Budget ₹280L, Actual ₹305L (-₹25L variance)',
          'Water usage under budget (₹72L vs. ₹85L) = good management',
          'Gas +₹8L over-budget, likely heating/cooking demand',
          'Peak demand coinciding with 84.3% occupancy levels',
        ],
        confidence: 88,
        action: 'Audit AC usage + implement occupancy-based HVAC scheduling to reduce Sept-Nov spike by 8%',
        domain: 'Facilities',
      },
    ],

    lastUpdated: new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  }
}
