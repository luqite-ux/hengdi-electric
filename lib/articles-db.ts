import { getSupabaseClient, getTenantId } from '@/lib/supabase'

export type Article = {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  publishedAt: string | null
  updatedAt: string | null
}

type ArticleRow = {
  slug: string
  title: string | null
  excerpt: string | null
  content: string | null
  title_i18n: Record<string, string> | null
  excerpt_i18n: Record<string, string> | null
  content_i18n: Record<string, string> | null
  featured_image: string | null
  published_at: string | null
  updated_at: string | null
}

function pickLocalizedText(value: Record<string, string> | null, fallback: string | null): string {
  const preferred = value?.en?.trim() || value?.zh?.trim()
  if (preferred) return preferred

  const first = Object.values(value ?? {}).find((entry) => entry?.trim())
  return first?.trim() || fallback?.trim() || ''
}

export function mapArticle(row: ArticleRow): Article {
  return {
    slug: row.slug,
    title: pickLocalizedText(row.title_i18n, row.title),
    excerpt: pickLocalizedText(row.excerpt_i18n, row.excerpt),
    content: pickLocalizedText(row.content_i18n, row.content),
    coverImage: row.featured_image,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  }
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = getSupabaseClient()
  const tenantId = getTenantId()
  if (!supabase || !tenantId) return []

  const { data, error } = await supabase
    .from('articles')
    .select('slug,title,excerpt,content,title_i18n,excerpt_i18n,content_i18n,featured_image,published_at,updated_at')
    .eq('tenant_id', tenantId)
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error || !data) return []
  return (data as ArticleRow[]).map(mapArticle)
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getPublishedArticles()
  return articles.find((article) => article.slug === slug) || null
}
