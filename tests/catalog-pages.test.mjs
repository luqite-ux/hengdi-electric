import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const read = (file) => fs.readFileSync(file, 'utf8')

test('public pages use catalog-derived imagery instead of generated showcase assets', () => {
  const pages = [read('app/page.tsx'), read('app/about/page.tsx'), read('components/hero.tsx')].join('\n')
  assert.doesNotMatch(pages, /\/products\/(cable-tray|busbar|switchgear)\.png/)
  assert.doesNotMatch(pages, /\/factory\.png/)
  assert.match(pages, /\/catalog\//)
})

test('products are grouped by verified category and detail pages render galleries', () => {
  assert.match(read('app/products/page.tsx'), /productCategories/)
  assert.match(read('app/products/page.tsx'), /p\.category/)
  assert.match(read('app/products/[slug]/page.tsx'), /product\.gallery/)
})

test('about discloses factory rendering and contact surfaces show full verified contact data', () => {
  assert.match(read('app/about/page.tsx'), /Factory planning rendering/)
  const contact = read('app/contact/page.tsx') + read('components/site-footer.tsx')
  assert.match(contact, /phoneSecondary/)
  assert.match(contact, /company\.zip/)
})
