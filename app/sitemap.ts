import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/articles-db'
import { fetchProductsData } from '@/lib/products-db'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://hengdi-electric.vercel.app'
  const [products, articles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
  const routes = ['', '/products', '/news', '/about', '/faq', '/contact']
  return [
    ...routes.map((route) => ({ url: `${base}${route}` })),
    ...products.map((product) => ({
      url: `${base}/products/${product.slug}`,
      lastModified: product.updatedAt ? new Date(product.updatedAt) : undefined,
    })),
    ...articles.map((article) => ({
      url: `${base}/news/${article.slug}`,
      lastModified: article.updatedAt
        ? new Date(article.updatedAt)
        : article.publishedAt
          ? new Date(article.publishedAt)
          : undefined,
    })),
  ]
}
