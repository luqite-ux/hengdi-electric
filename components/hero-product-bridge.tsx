import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const productGroups = [
  { title: 'Cable Tray Systems', href: '/products/cable-tray-series', image: '/catalog/product-cards/cable-tray-series.webp' },
  { title: 'Busbar Trunking', href: '/products/busbar-trunking-series', image: '/catalog/product-cards/busbar-trunking-series.webp' },
  { title: 'Switchgear & Distribution', href: '/products/xl-low-voltage-switchgear', image: '/catalog/product-cards/xl-low-voltage-switchgear.webp' },
]

export function HeroProductBridge() {
  return (
    <div className="relative z-10 mx-auto -mt-12 hidden max-w-7xl grid-cols-3 gap-3 px-8 lg:grid">
      {productGroups.map((group, index) => (
        <Link key={group.title} href={group.href} className="motion-card motion-enter group flex min-h-32 items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_20px_55px_-30px_rgba(3,19,41,.55)] transition hover:-translate-y-1 hover:border-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500" style={{ animationDelay: `${650 + index * 110}ms` }}>
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-[#f3f6f8]">
            <Image src={group.image} alt={group.title} fill sizes="128px" className="motion-image object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">Product Series</p>
            <h2 className="mt-2 text-lg font-bold leading-tight text-slate-950">{group.title}</h2>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700">Explore <ArrowUpRight className="size-3.5" /></span>
          </div>
        </Link>
      ))}
    </div>
  )
}
