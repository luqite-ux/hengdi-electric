import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { products as fallbackProducts } from '@/lib/site'
import { fetchProductsData, getProductBySlug } from '@/lib/products-db'

export const revalidate = 60
export const dynamicParams = true

export function generateStaticParams() {
  return fallbackProducts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }
  return { title: product.name, description: product.description }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const products = await fetchProductsData()
  const others = products.filter((p) => p.slug !== slug)

  return (
    <main className="bg-gradient-mesh">
      <PageHeader
        eyebrow="Product Series"
        title={product.name}
        description={product.short}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="text-2xl font-bold text-foreground">Overview</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{product.description}</p>

            <h3 className="mt-8 text-lg font-semibold text-foreground">Key Highlights</h3>
            <ul className="mt-4 grid gap-2.5">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {h}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-foreground">Key Specifications</h3>
            <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-border/60 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="bg-card/50 p-4 backdrop-blur">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px] shadow-primary/70 transition-transform hover:scale-[1.03]"
              >
                Request a Quote
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <ArrowLeft className="size-4" />
                All Products
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Product families / series */}
        {product.families && product.families.length > 0 && (
          <Reveal className="mt-20">
            <h2 className="text-2xl font-bold text-foreground">Series &amp; Families</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {product.families.map((f) => (
                <div
                  key={f.name}
                  className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur"
                >
                  <h3 className="font-semibold text-foreground">{f.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                  {f.models && (
                    <p className="mt-3 text-xs text-accent/90">
                      <span className="font-semibold">Models: </span>
                      {f.models}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Specification table */}
        {product.specTable && (
          <Reveal className="mt-16">
            <h2 className="text-2xl font-bold text-foreground">Specification Table</h2>
            {product.specTable.caption && (
              <p className="mt-2 text-sm text-muted-foreground">{product.specTable.caption}</p>
            )}
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border/60">
              <table className="w-full min-w-[540px] text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-secondary/40">
                    {product.specTable.headers.map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-foreground"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.specTable.rows.map((row, ri) => (
                    <tr
                      key={ri}
                      className="border-b border-border/40 bg-card/40 transition-colors hover:bg-secondary/20"
                    >
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 text-foreground">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Data extracted from Hengdi Electric product catalog. Values may vary by configuration — contact us for project-specific sizing.
            </p>
          </Reveal>
        )}

        {/* Related */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-foreground">Other Product Series</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} as="article">
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex gap-5 rounded-3xl border border-border/70 bg-card/50 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-border/60">
                    <Image
                      src={p.image || '/placeholder.svg'}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.short}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      View details
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
