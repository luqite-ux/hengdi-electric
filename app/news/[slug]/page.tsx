import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { getArticleBySlug } from '@/lib/articles-db'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug)
  return article ? { title: article.title, description: article.excerpt } : { title: 'Article Not Found' }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticleBySlug((await params).slug)
  if (!article) notFound()

  return (
    <main className="bg-gradient-mesh">
      <PageHeader
        eyebrow="News & Insights"
        title={article.title}
        description={article.excerpt}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: article.title }]}
      />
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {article.coverImage && (
          <div className="relative mb-10 aspect-video overflow-hidden rounded-3xl border border-border/70">
            <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
          </div>
        )}
        <p className="mb-8 text-sm font-medium text-muted-foreground">
          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' }) : ''}
        </p>
        <div className="article-prose" dangerouslySetInnerHTML={{ __html: article.content }} />
        <Link href="/news" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          <ArrowLeft className="size-4" /> Back to news
        </Link>
      </article>
    </main>
  )
}
