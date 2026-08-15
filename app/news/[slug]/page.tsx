import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getArticleBySlug } from '@/lib/articles-db'
import { JsonLd } from '@/components/json-ld'
import { buildArticleJsonLd, buildArticleMetadata, buildBreadcrumbJsonLd } from '@/lib/seo'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug)
  return article ? buildArticleMetadata(article) : { title: 'Article Not Found' }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticleBySlug((await params).slug)
  if (!article) notFound()

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })
    : ''

  return (
    <main className="bg-gradient-mesh">
      <JsonLd data={[
        buildArticleJsonLd(article),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'News', path: '/news' },
          { name: article.title, path: `/news/${article.slug}` },
        ]),
      ]} />
      <header className="relative overflow-hidden border-b border-border/60 pt-16">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, oklch(0.62 0.12 220 / 0.14) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.62 0.12 220 / 0.14) 1px, transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(ellipse 60% 100% at 30% 0%, black, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav className="motion-enter mb-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/news" className="transition-colors hover:text-foreground">News</Link>
          </nav>
          <span className="motion-enter inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent" style={{ animationDelay: '80ms' }}>
            News &amp; Insights
          </span>
          <h1 className="motion-enter mt-4 text-wrap text-3xl font-bold leading-tight tracking-normal text-foreground sm:text-4xl lg:text-[2.75rem]" style={{ animationDelay: '150ms' }}>
            {article.title}
          </h1>
          <div className="motion-enter mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground" style={{ animationDelay: '220ms' }}>
            {publishedDate && <time dateTime={article.publishedAt ?? undefined}>{publishedDate}</time>}
            <span>Hengdi Electric</span>
          </div>
          {article.excerpt && (
            <p className="motion-enter mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg" style={{ animationDelay: '260ms' }}>
              {article.excerpt}
            </p>
          )}
        </div>
      </header>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {article.coverImage && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border border-border/70">
            <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
          </div>
        )}
        <div className="article-prose" dangerouslySetInnerHTML={{ __html: article.content }} />
        <Link href="/news" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          <ArrowLeft className="size-4" /> Back to news
        </Link>
      </article>
    </main>
  )
}