import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.slug}>
              <Link href={`/products/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_45px_-28px_rgba(15,72,143,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-border/70 bg-[#f3f6f8]">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                </div>
                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h2 className="min-h-14 text-xl font-semibold leading-snug text-foreground">{p.name}</h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">{p.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-t border-border/70 pt-4 text-sm font-semibold text-accent">View details <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
