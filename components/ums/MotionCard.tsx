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
      className={cn('will-change-transform', className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-48px' }}
      whileHover={interactive && !shouldReduceMotion ? { y: -4, scale: 1.006 } : undefined}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
