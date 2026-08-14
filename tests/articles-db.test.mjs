import assert from 'node:assert/strict'
import test from 'node:test'
import ts from 'typescript'
import { readFile } from 'node:fs/promises'

async function loadArticlesModule() {
  const source = await readFile(new URL('../lib/articles-db.ts', import.meta.url), 'utf8')
  const isolated = source.replace(/^import .*? from '@\/lib\/supabase'\r?\n/, '')
  const js = ts.transpileModule(isolated, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
  }).outputText

  return import(`data:text/javascript,${encodeURIComponent(js)}`)
}

test('maps published articles from multilingual JSONB fields', async () => {
  const { mapArticle } = await loadArticlesModule()

  const article = mapArticle({
    slug: 'cable-tray-selection',
    title: '',
    excerpt: null,
    content: null,
    title_i18n: { en: 'Cable Tray Selection Guide' },
    excerpt_i18n: { en: 'A practical engineering overview.' },
    content_i18n: { en: '<h2>Table of Contents</h2><p>Use the right tray type.</p>' },
    featured_image: 'https://example.com/article.png',
    published_at: '2026-08-11T08:19:00.000Z',
    updated_at: '2026-08-11T08:19:00.000Z',
  })

  assert.equal(article.title, 'Cable Tray Selection Guide')
  assert.equal(article.excerpt, 'A practical engineering overview.')
  assert.equal(article.content, '<h2>Table of Contents</h2><p>Use the right tray type.</p>')
})
