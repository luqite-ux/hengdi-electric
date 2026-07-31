import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const catalog = fs.readFileSync('lib/catalog-products.ts', 'utf8')
const site = fs.readFileSync('lib/site.ts', 'utf8')

test('verified catalog exposes the six product series listed in the company contents page', () => {
  const slugs = [...catalog.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1])
  assert.deepEqual(slugs, [
    'cable-tray-series',
    'busbar-trunking-series',
    'xl-low-voltage-switchgear',
    'jxf-switchgear-cabinet',
    'sdy-dual-power-distribution-box',
    'pz30-distribution-board',
  ])
})

test('every catalog product uses a processed customer-material image', () => {
  const images = [...catalog.matchAll(/image:\s*'([^']+)'/g)].map((match) => match[1])
  assert.equal(images.length, 6)
  for (const image of images) assert.match(image, /^\/catalog\/product-cards\/.+\.webp$/)
})

test('company contact data includes both verified phone numbers and postcode', () => {
  assert.match(site, /\+86 182 0528 3908/)
  assert.match(site, /\+86 131 5167 2088/)
  assert.match(site, /zip:\s*'212200'/)
})
