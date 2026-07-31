import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

test('certification archive groups verified documents with scoped claims', () => {
  const data = fs.readFileSync('lib/certifications.ts', 'utf8')
  assert.match(data, /Business Qualifications/)
  assert.match(data, /Management Systems/)
  assert.match(data, /Product Certification & Testing/)
  assert.match(data, /scope:/)
  const images = [...data.matchAll(/image:\s*'([^']+)'/g)].map((match) => match[1])
  assert.ok(images.length >= 8)
  assert.equal(new Set(images).size, images.length)
})

test('certifications route has metadata, canonical builder, and sitemap coverage', () => {
  const page = fs.readFileSync('app/certifications/page.tsx', 'utf8')
  assert.match(page, /buildPageMetadata/)
  assert.match(page, /path:\s*'\/certifications'/)
  assert.match(fs.readFileSync('app/sitemap.ts', 'utf8'), /\/certifications/)
})
