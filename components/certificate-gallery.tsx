'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { Certificate } from '@/lib/certifications'

export function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  const [selected, setSelected] = useState<Certificate | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!selected) return
    closeRef.current?.focus()
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [selected])

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <button key={certificate.image} type="button" onClick={() => setSelected(certificate)} className="overflow-hidden rounded-3xl border border-border/70 bg-card/60 text-left transition hover:-translate-y-1 hover:border-primary/60">
            <div className="relative aspect-[4/5] bg-white"><Image src={certificate.image} alt={certificate.title} fill className="object-contain p-4" /></div>
            <div className="p-5"><h3 className="font-semibold text-foreground">{certificate.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{certificate.scope}</p></div>
          </button>
        ))}
      </div>
      {selected && (
        <div role="dialog" aria-modal="true" aria-label={selected.title} className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <div className="relative h-[88vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white">
            <Image src={selected.image} alt={selected.title} fill className="object-contain p-6" />
            <button ref={closeRef} type="button" onClick={() => setSelected(null)} aria-label="Close certificate preview" className="absolute right-3 top-3 rounded-full bg-slate-950 p-2 text-white"><X className="size-5" /></button>
          </div>
        </div>
      )}
    </>
  )
}
