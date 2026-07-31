import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const catalog = fs.readFileSync('lib/catalog-products.ts', 'utf8')
const site = fs.readFileSync('lib/site.ts', 'utf8')

test('verified catalog exposes three categories and sixteen product groups', () => {
  const slugs = [...catalog.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])
  assert.equal(slugs.length, 16)
  assert.equal(new Set(slugs).size, 16)
  assert.match(catalog, /category:\s*'Cable Tray Systems'/)
  assert.match(catalog, /category:\s*'Busbar Trunking Systems'/)
  assert.match(catalog, /category:\s*'Switchgear & Distribution'/)
})

test('every catalog product uses a processed customer-material image', () => {
  const images = [...catalog.matchAll(/image:\s*'([^']+)'/g)].map((match) => match[1])
  assert.equal(images.length, 16)
  for (const image of images) assert.match(image, /^\/catalog\/products\/.+\.webp$/)
})

test('company contact data includes both verified phone numbers and postcode', () => {
  assert.match(site, /\+86 182 0528 3908/)
  assert.match(site, /\+86 131 5167 2088/)
  assert.match(site, /zip:\s*'212200'/)
})
