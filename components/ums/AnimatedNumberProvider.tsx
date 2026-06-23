'use client'

import { useEffect } from 'react'

const NUMBER_SELECTOR = [
  '#main-content [data-metric]',
  '#main-content [data-value]',
  '#main-content .tabular-nums',
  '#main-content [class*="Courier"]',
].join(', ')

const EXCLUDED_SELECTOR = [
  '.recharts-wrapper',
  '.recharts-tooltip-wrapper',
  'svg',
  'canvas',
  'input',
  'select',
  'textarea',
].join(', ')

interface ParsedNumberText {
  prefix: string
  value: number
  suffix: string
  decimals: number
  useGrouping: boolean
}

function parseNumberText(text: string): ParsedNumberText | null {
  const valueText = text.trim()
  if (!valueText || valueText.length > 32) return null

  const match = valueText.match(/^([+\-−]?\s*₹?\s*)(\d[\d,]*(?:\.\d+)?)(.*)$/)
  if (!match) return null

  const [, prefix, rawNumber, suffix] = match
  const numericValue = Number(rawNumber.replaceAll(',', ''))
  if (!Number.isFinite(numericValue)) return null

  return {
    prefix,
    value: numericValue,
    suffix,
    decimals: rawNumber.includes('.') ? rawNumber.split('.')[1]?.length ?? 0 : 0,
    useGrouping: rawNumber.includes(','),
  }
}

function formatAnimatedValue(value: number, parsed: ParsedNumberText) {
  const formatted = parsed.useGrouping
    ? value.toLocaleString('en-IN', {
        minimumFractionDigits: parsed.decimals,
        maximumFractionDigits: parsed.decimals,
      })
    : value.toFixed(parsed.decimals)

  return `${parsed.prefix}${formatted}${parsed.suffix}`
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

export function AnimatedNumberProvider() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const animatedTargets = new WeakMap<Element, string>()
    const running = new WeakSet<Element>()
    let frameId = 0

    const animateElement = (element: Element, finalText: string, parsed: ParsedNumberText) => {
      if (running.has(element)) return

      running.add(element)
      animatedTargets.set(element, finalText)

      const start = performance.now()
      const duration = Math.min(1500, Math.max(850, 720 + parsed.value * 8))

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const nextValue = parsed.value * easeOutCubic(progress)
        element.textContent = formatAnimatedValue(nextValue, parsed)

        if (progress < 1) {
          requestAnimationFrame(tick)
          return
        }

        element.textContent = finalText
        running.delete(element)
      }

      element.textContent = formatAnimatedValue(0, parsed)
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const element = entry.target
          const finalText = element.textContent?.trim() ?? ''
          const parsed = parseNumberText(finalText)
          if (!parsed) return
          if (animatedTargets.get(element) === finalText) return

          animateElement(element, finalText, parsed)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.2 },
    )

    const scan = () => {
      frameId = 0
      document.querySelectorAll(NUMBER_SELECTOR).forEach((element) => {
        if (running.has(element)) return
        if (element.closest(EXCLUDED_SELECTOR)) return
        if (element.children.length > 0) return

        const finalText = element.textContent?.trim() ?? ''
        const parsed = parseNumberText(finalText)
        if (!parsed) return

        observer.observe(element)
      })
    }

    const scheduleScan = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(scan)
    }

    const mutationObserver = new MutationObserver(scheduleScan)
    mutationObserver.observe(document.body, { childList: true, subtree: true })
    scan()

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
