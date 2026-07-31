import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { fetchProductsData } from '@/lib/products-db'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata = buildPageMetadata({
  title: 'Product Catalog',
  description: 'Explore verified Hengdi Electric cable tray, busbar trunking, switchgear and distribution product series.',
  path: '/products',
})

export const productCategories = ['Cable Tray Systems', 'Busbar Trunking Systems', 'Switchgear & Distribution'] as const

export default async function ProductsPage() {
  const products = await fetchProductsData()
  return (
    <main className="bg-gradient-mesh">
      <PageHeader eyebrow="Product Catalog" title="Products from the Hengdi Catalog" description="Browse product series, model families and technical information taken from Hengdi Electric company materials." breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Products' }]} />
      <section className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {productCategories.map((category) => {
          const categoryProducts = products.filter((p) => p.category === category)
          if (!categoryProducts.length) return null
          return (
            <section key={category} id={category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Verified product family</p>
                <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">{category}</h2>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((p, index) => (
                  <Reveal key={p.slug} delay={index * 60} as="article">
                    <Link href={`/products/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/60 transition hover:-translate-y-1 hover:border-primary/60">
                      <div className="relative aspect-[4/3] overflow-hidden bg-white">
                        <Image src={p.image} alt={p.name} fill className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.025]" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{p.subcategory}</p>
                        <h3 className="mt-2 text-xl font-semibold text-foreground">{p.name}</h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">View series <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )
        })}
      </section>
    </main>
  )
}
