'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MotionCardProps extends HTMLMotionProps<'div'> {
  interactive?: boolean
}

export function MotionCard({ className, interactive = true, children, ...props }: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn('ums-motion-card will-change-transform', className)}
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, y: 22, scale: 0.975, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.18, margin: '-56px' }}
      whileHover={interactive && !shouldReduceMotion ? { y: -6, scale: 1.012 } : undefined}
      transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
