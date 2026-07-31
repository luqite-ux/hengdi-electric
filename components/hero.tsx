import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  FileCheck2,
  Gauge,
  Settings2,
  ShieldCheck,
} from 'lucide-react'
import { company } from '@/lib/site'

const evidence = [
  { value: '6300A', label: 'Busbar rated current', icon: Gauge },
  { value: 'IP66', label: 'Available protection grade', icon: ShieldCheck },
  { value: '15 Days', label: 'Approx. lead time', icon: Clock3 },
]

const capabilities = [
  { label: '1-Year Warranty', icon: ShieldCheck },
  { label: 'CCC & ISO 9001', icon: BadgeCheck },
  { label: 'OEM / ODM Welcome', icon: Settings2 },
  { label: 'Project-Based Quotation', icon: FileCheck2 },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/70 bg-[#f4f8fb] pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 80% 36%, rgba(19, 183, 214, 0.17), transparent 28%), radial-gradient(circle at 12% 14%, rgba(30, 113, 190, 0.08), transparent 27%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-16 h-[68%] w-[56%] opacity-45"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(20, 99, 151, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 99, 151, 0.09) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to left, black 35%, transparent 100%)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-12 sm:gap-10 sm:px-6 sm:pt-16 lg:min-h-[660px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8 lg:pb-8 lg:pt-12">
        <div className="lg:col-span-6 lg:pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur">
            <BadgeCheck className="size-4" />
            CCC (3C) &amp; ISO 9001 Certified
          </div>

          <h1 className="mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.5rem]">
            Power Distribution,
            <span className="mt-1 block text-primary">Engineered to Last.</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
            {company.fullName} manufactures cable tray systems, busbar trunking and low-voltage
            switchgear for industrial, commercial and civil projects.
          </p>

          <div className="mt-7 flex flex-nowrap items-center gap-2 sm:mt-8 sm:gap-3">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground shadow-[0_14px_35px_-18px_rgba(0,144,190,0.9)] transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Explore Products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 py-3 text-xs font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/45 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Request a Quote
            </Link>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground sm:mt-5 sm:text-sm">
            <span className="h-px w-8 bg-primary/60" />
            Cable management · Power transmission · Distribution control
          </p>
        </div>

        <div className="relative lg:col-span-6 lg:min-h-[560px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-3 bottom-12 top-3 rotate-[-3deg] rounded-[2.25rem] bg-[#071f42] shadow-[0_28px_80px_-42px_rgba(4,30,68,0.9)] lg:-right-8 lg:left-10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 top-8 size-52 rounded-full border border-cyan-300/30 lg:size-72"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 top-14 size-36 rounded-full border border-cyan-300/20 lg:size-56"
          />

          <div className="relative mx-auto max-w-[680px] overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#f3f6f8] shadow-[0_30px_70px_-38px_rgba(2,31,70,0.75)] lg:absolute lg:inset-x-0 lg:top-8">
            <div className="relative aspect-[3/2]">
              <Image
                src="/catalog/hero/hengdi-product-hero.webp"
                alt="Hengdi cable tray, busbar trunking and low-voltage switchgear"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#f3f6f8] to-transparent"
              />
            </div>
          </div>

          <div className="relative mt-4 grid grid-cols-3 gap-2 lg:absolute lg:bottom-4 lg:left-0 lg:right-0 lg:mt-0">
            {evidence.map((item) => (
              <div
                key={item.value}
                className="group rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-[0_16px_35px_-26px_rgba(2,31,70,0.85)] backdrop-blur transition-transform hover:-translate-y-1 sm:p-4"
              >
                <item.icon className="size-4 text-primary sm:size-5" />
                <p className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-2xl">
                  {item.value}
                </p>
                <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground sm:text-xs">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-[#061a37] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {capabilities.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 border-white/10 px-2 py-4 odd:border-r sm:px-5 lg:border-r lg:py-5 lg:last:border-r-0"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cyan-400/12 text-cyan-300">
                <item.icon className="size-4" />
              </span>
              <span className="text-xs font-semibold text-white sm:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
