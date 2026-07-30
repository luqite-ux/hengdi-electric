'use client'

import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { company } from '@/lib/site'

const trails = [
  { top: '20%', delay: 0, dur: 5.5, opacity: 0.9, w: '40%' },
  { top: '34%', delay: 1.2, dur: 7, opacity: 0.55, w: '55%' },
  { top: '48%', delay: 0.6, dur: 6, opacity: 0.8, w: '35%' },
  { top: '63%', delay: 2, dur: 8, opacity: 0.4, w: '60%' },
  { top: '78%', delay: 1.6, dur: 6.5, opacity: 0.65, w: '45%' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* animated grid */}
      <div
        aria-hidden
        className="animate-grid absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'linear-gradient(to right, oklch(0.62 0.12 220 / 0.14) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.62 0.12 220 / 0.14) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 35%, black, transparent 78%)',
        }}
      />
      {/* soft light sweeps */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {trails.map((t, i) => (
          <span
            key={i}
            className="animate-trail absolute h-px rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              top: t.top,
              width: t.w,
              opacity: t.opacity * 0.55,
              animationDuration: `${t.dur}s`,
              animationDelay: `${t.delay}s`,
              boxShadow: '0 0 10px 1px oklch(0.62 0.12 220 / 0.35)',
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="animate-pulse-glow absolute inline-flex size-full rounded-full bg-accent" />
            </span>
            CCC (3C) &amp; ISO 9001 Certified · OEM / ODM Welcome
          </div>

          <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Power Distribution,
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Engineered to Last.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {company.fullName} manufactures cable tray systems, busbar trunking and switchgear for
            industrial, commercial and civil projects. Busbar rated up to 6,300 A (copper dense
            series). Approximately 15-day lead time. Packaging, shipping and applicable taxes
            confirmed per order.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px] shadow-primary/80 transition-transform hover:scale-[1.03]"
            >
              Explore Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary"
            >
              Request a Quote
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" /> 1-Year Warranty
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="size-4 text-accent" /> 15-Day Lead Time
            </span>
            <span className="inline-flex items-center gap-2">
              <ArrowRight className="size-4 text-accent" /> OEM / ODM Welcome
            </span>
          </div>
        </div>

        {/* Floating visual */}
        <div className="relative lg:col-span-5">
          <div className="animate-float-slow relative mx-auto max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Live Capacity
                </span>
                <span className="relative flex size-2.5">
                  <span className="animate-pulse-glow absolute inline-flex size-full rounded-full bg-accent" />
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { k: '6300A', v: 'Max Rated Current' },
                  { k: 'IP66', v: 'Protection Grade' },
                  { k: '300t', v: 'Tray / Month' },
                  { k: '2000m', v: 'Busbar / Month' },
                ].map((m) => (
                  <div
                    key={m.v}
                    className="rounded-2xl border border-border/60 bg-secondary/40 p-4"
                  >
                    <div className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-2xl font-bold text-transparent">
                      {m.k}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{m.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="animate-pulse-glow h-full w-4/5 rounded-full bg-gradient-to-r from-primary to-accent" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                CCC &amp; ISO 9001 certified production
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
