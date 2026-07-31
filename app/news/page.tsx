import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { getPublishedArticles } from '@/lib/articles-db'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 60

export const metadata = buildPageMetadata({
  title: 'News',
  description: 'Company news, product updates and technical insights from Hengdi Electric.',
  path: '/news',
})

export default async function NewsPage() {
  const articles = await getPublishedArticles()
  return (
    <main className="bg-gradient-mesh">
      <PageHeader
        eyebrow="News & Insights"
        title="Latest from Hengdi Electric"
        description="Company updates, product information and practical electrical engineering insights."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <div className="rounded-3xl border border-border/70 bg-card/70 p-12 text-center">
            <Newspaper className="mx-auto size-10 text-accent" />
            <h2 className="mt-4 text-xl font-semibold">No articles published yet</h2>
            <p className="mt-2 text-muted-foreground">Please check back soon for company and product updates.</p>
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 80} as="article">
                <Link href={`/news/${article.slug}`} className="group block overflow-hidden rounded-3xl border border-border/70 bg-card/70">
                  {article.coverImage && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image src={article.coverImage} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'Hengdi Electric'}
                    </p>
                    <h2 className="mt-3 text-xl font-semibold text-foreground">{article.title}</h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
