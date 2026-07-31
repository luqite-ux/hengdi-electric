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

test('homepage hero is product-led and uses only verified evidence', () => {
  const hero = read('components/hero.tsx')
  assert.match(hero, /\/catalog\/hero\/hengdi-product-hero\.webp/)
  assert.match(hero, /6300A/)
  assert.match(hero, /IP66/)
  assert.match(hero, /15 Days/)
  assert.match(hero, /Project-Based Quotation/)
  assert.doesNotMatch(hero, /Live Capacity|300t|2000m|animate-trail|animate-float-slow/)
})

test('products page renders the six verified series and detail pages render galleries', () => {
  const productsPage = read('app/products/page.tsx')
  assert.match(productsPage, /products\.map/)
  assert.doesNotMatch(productsPage, /productCategories/)
  assert.doesNotMatch(productsPage, /Product Series.*index|padStart/, 'cards must not show decorative series numbers')
  assert.match(read('app/products/[slug]/page.tsx'), /product\.gallery/)
})

test('about discloses factory rendering and contact surfaces show full verified contact data', () => {
  assert.match(read('app/about/page.tsx'), /Factory planning rendering/)
  const contact = read('app/contact/page.tsx') + read('components/site-footer.tsx')
  assert.match(contact, /phoneSecondary/)
  assert.match(contact, /company\.zip/)
})
