import type { Metadata } from 'next'
import type { Article } from '@/lib/articles-db'
import type { Product } from '@/lib/site'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hengdi-electric.vercel.app'

const defaultImage = `${SITE_URL}/logo.png`

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title,
      description,
      url: path,
      images: [{ url: defaultImage, alt: 'Hengdi Electric' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultImage],
    },
  }
}

export function buildNoIndexMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
    alternates: null,
    openGraph: null,
    twitter: null,
  }
}

export function buildProductMetadata(product: Product): Metadata {
  const path = `/products/${product.slug}`
  const image = product.image || defaultImage
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: product.name,
      description: product.description,
      url: path,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [image],
    },
  }
}

export function buildArticleMetadata(article: Article): Metadata {
  const path = `/news/${article.slug}`
  const image = article.coverImage || defaultImage
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: path,
      images: [{ url: image, alt: article.title }],
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  }
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zhenjiang Hengdi Intelligent Electric Co., Ltd.',
    alternateName: 'Hengdi Electric',
    url: SITE_URL,
    logo: defaultImage,
    email: '641320694@qq.com',
    telephone: '+86 182 0528 3908',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 3-1, No. 1 Sanfeng Road, Sanmao Street',
      addressLocality: 'Yangzhong',
      addressRegion: 'Jiangsu',
      postalCode: '212200',
      addressCountry: 'CN',
    },
  }
}

export function buildProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: [product.image || defaultImage],
    category: 'Electrical Equipment',
    brand: { '@type': 'Brand', name: 'Hengdi Electric' },
    manufacturer: { '@type': 'Organization', name: 'Zhenjiang Hengdi Intelligent Electric Co., Ltd.' },
    url: `${SITE_URL}/products/${product.slug}`,
  }
}

export function buildArticleJsonLd(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage || defaultImage],
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || article.publishedAt || undefined,
    mainEntityOfPage: `${SITE_URL}/news/${article.slug}`,
    author: { '@type': 'Organization', name: 'Hengdi Electric' },
    publisher: { '@type': 'Organization', name: 'Hengdi Electric', logo: { '@type': 'ImageObject', url: defaultImage } },
  }
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
