import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Clock3, FileCheck2, Layers3, ShieldCheck } from 'lucide-react'
import { company } from '@/lib/site'

const proofPoints = ['CCC Certified', 'ISO 9001 Quality System', 'OEM / ODM Available']

const trustPoints = [
  { label: '6 Core Product Series', icon: Layers3 },
  { label: '1-Year Warranty', icon: ShieldCheck },
  { label: 'Approx. 15-Day Lead Time', icon: Clock3 },
  { label: 'Project-Based Quotation', icon: FileCheck2 },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#031329] pt-16 text-white">
      <Image
        src="/catalog/hero/hengdi-immersive-hero.webp"
        alt="Hengdi cable tray, busbar trunking and low-voltage switchgear"
        fill
        priority
        sizes="100vw"
        className="motion-scene object-cover object-[64%_center] sm:object-[58%_center] lg:object-center"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,19,41,0.99)_0%,rgba(3,19,41,0.94)_32%,rgba(3,19,41,0.52)_58%,rgba(3,19,41,0.08)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,19,41,0.1)_55%,rgba(3,19,41,0.96)_100%)]" />
      <div aria-hidden className="hero-ambient-light pointer-events-none absolute -right-[8%] top-[8%] hidden h-[76%] w-[72%] lg:block" />
      <div aria-hidden className="hero-floor-glow pointer-events-none absolute bottom-[11%] right-[1%] hidden h-28 w-[68%] lg:block" />
      <span aria-hidden className="hero-energy-marker pointer-events-none absolute right-[43%] top-[52%] hidden lg:block" />
      <span aria-hidden className="hero-energy-marker pointer-events-none absolute right-[18%] top-[31%] hidden lg:block [animation-delay:0.8s]" />
      <span aria-hidden className="hero-energy-marker pointer-events-none absolute bottom-[23%] right-[31%] hidden lg:block [animation-delay:1.6s]" />
      <div
        aria-hidden
        className="animate-grid pointer-events-none absolute inset-y-16 left-0 w-[48%] opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(90,210,238,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,210,238,.14) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to right, black, transparent)',
        }}
      />

      <div className="relative mx-auto flex min-h-[740px] max-w-7xl flex-col px-4 pb-32 pt-14 sm:px-6 sm:pt-20 lg:min-h-[780px] lg:px-8 lg:pb-40 lg:pt-24">
        <div className="max-w-[650px]">
          <div className="flex flex-wrap gap-2">
            {proofPoints.map((point, index) => (
              <span key={point} className="motion-enter inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white backdrop-blur-md sm:text-xs" style={{ animationDelay: `${index * 90}ms` }}>
                <BadgeCheck className="size-3.5 text-cyan-300" />
                {point}
              </span>
            ))}
          </div>

          <p className="motion-enter mt-8 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300" style={{ animationDelay: '260ms' }}>Intelligent Electric Systems</p>
          <h1 className="motion-enter mt-4 max-w-2xl text-balance text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5rem]" style={{ animationDelay: '340ms' }}>
            Power Distribution,
            <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">Engineered to Last.</span>
          </h1>
          <p className="motion-enter mt-6 max-w-xl text-pretty text-base leading-7 text-white/75 sm:text-lg sm:leading-8" style={{ animationDelay: '440ms' }}>
            {company.fullName} manufactures cable tray systems, busbar trunking and low-voltage switchgear for industrial, commercial and civil projects.
          </p>

          <div className="motion-enter mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '540ms' }}>
            <Link href="/products" className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-bold text-[#031329] shadow-[0_16px_40px_-18px_rgba(34,211,238,.9)] transition hover:-translate-y-0.5 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#031329]">
              Explore Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Request a Quote
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              Six Product Series <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <Link href="/products/cable-tray-series" className="motion-float group mt-auto hidden w-[340px] self-end rounded-2xl border border-white/20 bg-[#061a37]/80 p-3 text-white shadow-2xl backdrop-blur-xl transition hover:border-cyan-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 lg:flex lg:items-center lg:gap-4">
          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-white">
            <Image src="/catalog/product-cards/cable-tray-series.webp" alt="Cable Tray Series" fill sizes="112px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold">Cable Tray Series</p>
            <p className="mt-1 text-xs leading-5 text-white/70">Cable management for power and control routing</p>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-cyan-300">View series <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span>
          </div>
        </Link>
      </div>

      <div className="relative border-t border-white/10 bg-[#031329]/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustPoints.map((item) => (
            <div key={item.label} className="flex min-h-20 items-center gap-3 border-white/10 px-2 py-4 odd:border-r sm:px-4 lg:border-r lg:px-5 lg:last:border-r-0">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan-300/10 text-cyan-300"><item.icon className="size-4" /></span>
              <span className="text-xs font-semibold text-white sm:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
