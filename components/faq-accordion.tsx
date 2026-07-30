'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[]
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/30"
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium text-foreground">{item.q}</span>
              <Plus
                className={cn(
                  'size-5 shrink-0 text-accent transition-transform duration-300',
                  isOpen && 'rotate-45',
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
