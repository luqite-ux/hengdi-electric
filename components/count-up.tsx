'use client'

import { useEffect, useRef, useState } from 'react'

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const target = Number(value.replace(/\D/g, ''))
    const prefix = value.match(/^\D*/)?.[0] ?? ''
    const suffix = value.match(/\D*$/)?.[0] ?? ''
    const grouped = value.includes(',')

    const show = (number: number) => {
      const formatted = grouped ? Math.round(number).toLocaleString('en-US') : String(Math.round(number))
      setDisplay(`${prefix}${formatted}${suffix}`)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show(target)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        show(0)
        const started = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - started) / 1100, 1)
          show(target * (1 - Math.pow(1 - progress, 3)))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={ref} aria-label={value}>{display}</span>
}
