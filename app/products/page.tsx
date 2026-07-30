import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { products } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore Hengdi Electric products: cable tray systems, busbar trunking and switchgear for industrial, commercial and civil power distribution.',
}

export default function ProductsPage() {
  return (
    <main className="bg-gradient-mesh">
      <PageHeader
        eyebrow="Product Catalog"
        title="Engineered Power Transmission Solutions"
        description="A complete portfolio of cable management and power distribution products, manufactured under controlled quality processes. Standards and certifications vary by product series — contact us for documentation."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-20 sm:px-6 lg:px-8">
        {products.map((p, i) => (
          <Reveal key={p.slug} as="article" delay={i * 80}>
            <div
              className={`grid items-center gap-8 rounded-3xl border border-border/70 bg-card/50 p-6 backdrop-blur sm:p-8 lg:grid-cols-2 lg:gap-12 ${
                i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border/60">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, '0')} · Series
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                  {p.name}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${p.slug}`}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px] shadow-primary/70 transition-transform hover:scale-[1.03]"
                >
                  View specifications
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </section>
    </main>
  )
}
