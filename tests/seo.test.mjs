import assert from 'node:assert/strict'
import test from 'node:test'

const seoModule = await import('../lib/seo.ts').catch(() => ({}))

test('product metadata uses the product canonical URL and image', () => {
  assert.equal(typeof seoModule.buildProductMetadata, 'function')
  const metadata = seoModule.buildProductMetadata({
    slug: 'busbar',
    name: 'Busbar Trunking Systems',
    short: 'Dense and fire-resistant busway systems',
    description: 'Industrial busbar systems.',
    image: 'https://pub-example.r2.dev/busbar.png',
    highlights: [],
    specs: [],
  })
  assert.equal(metadata.alternates.canonical, '/products/busbar')
  assert.equal(metadata.openGraph.url, '/products/busbar')
  assert.equal(metadata.openGraph.images[0].url, 'https://pub-example.r2.dev/busbar.png')
  assert.equal(metadata.twitter.card, 'summary_large_image')
})

test('article metadata uses the article canonical URL and public image', () => {
  assert.equal(typeof seoModule.buildArticleMetadata, 'function')
  const metadata = seoModule.buildArticleMetadata({
    slug: 'welcome',
    title: 'Welcome to Hengdi Electric',
    excerpt: 'Company and product update.',
    content: '<p>News</p>',
    coverImage: 'https://pub-example.r2.dev/news.png',
    publishedAt: '2026-07-30T00:00:00.000Z',
    updatedAt: '2026-07-31T00:00:00.000Z',
  })
  assert.equal(metadata.alternates.canonical, '/news/welcome')
  assert.equal(metadata.openGraph.type, 'article')
  assert.equal(metadata.openGraph.modifiedTime, '2026-07-31T00:00:00.000Z')
})

test('structured data includes organization, product, article and breadcrumbs', () => {
  assert.equal(typeof seoModule.buildOrganizationJsonLd, 'function')
  assert.equal(typeof seoModule.buildProductJsonLd, 'function')
  assert.equal(typeof seoModule.buildArticleJsonLd, 'function')
  assert.equal(typeof seoModule.buildBreadcrumbJsonLd, 'function')
  assert.equal(seoModule.buildOrganizationJsonLd()['@type'], 'Organization')
  assert.equal(seoModule.buildProductJsonLd({ slug: 'busbar', name: 'Busbar', description: 'Busbar systems', image: 'https://example.com/busbar.png', short: '', highlights: [], specs: [] })['@type'], 'Product')
  assert.equal(seoModule.buildArticleJsonLd({ slug: 'welcome', title: 'Welcome', excerpt: 'News', content: '', coverImage: null, publishedAt: null, updatedAt: null })['@type'], 'NewsArticle')
  assert.equal(seoModule.buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }])['@type'], 'BreadcrumbList')
})

test('static page metadata uses its own canonical and social URL', () => {
  assert.equal(typeof seoModule.buildPageMetadata, 'function')
  const metadata = seoModule.buildPageMetadata({
    title: 'About Hengdi Electric',
    description: 'Company profile and quality system.',
    path: '/about',
  })
  assert.equal(metadata.alternates.canonical, '/about')
  assert.equal(metadata.openGraph.url, '/about')
  assert.equal(metadata.twitter.card, 'summary_large_image')
})
