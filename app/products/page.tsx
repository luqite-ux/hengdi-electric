import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { fetchProductsData } from '@/lib/products-db'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata = buildPageMetadata({ title: 'Product Series', description: 'Explore the six product series listed in the Hengdi Electric company catalog.', path: '/products' })

export default async function ProductsPage() {
  const products = await fetchProductsData()
  return (
    <main className="bg-gradient-mesh">
      <PageHeader eyebrow="Product Catalog" title="Six Core Product Series" description="The product structure follows the company catalog: cable trays, busbar trunking and four complete-switchgear or distribution-box series." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, index) => (
            <Reveal key={p.slug} delay={index * 70} as="article">
              <Link href={`/products/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/60 transition hover:-translate-y-1 hover:border-primary/60">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.035]" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">Product Series {String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-2 text-xl font-semibold text-foreground">{p.name}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">View details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
