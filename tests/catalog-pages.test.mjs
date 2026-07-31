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

test('homepage hero uses the immersive Hengdi product scene and verified trust content', () => {
  const hero = read('components/hero.tsx')
  const bridgePath = 'components/hero-product-bridge.tsx'
  assert.equal(fs.existsSync(bridgePath), true, 'desktop product bridge must exist')
  const bridge = read(bridgePath)
  assert.match(hero, /hengdi-immersive-hero\.webp/)
  assert.match(hero, /CCC Certified/)
  assert.match(hero, /ISO 9001 Quality System/)
  assert.match(hero, /OEM \/ ODM Available/)
  assert.match(hero, /Cable Tray Series/)
  assert.match(hero, /\/products\/cable-tray-series/)
  assert.match(hero, /6 Core Product Series/)
  assert.match(hero, /Approx\. 15-Day Lead Time/)
  assert.match(hero, /Project-Based Quotation/)
  assert.match(bridge, /Cable Tray Systems/)
  assert.match(bridge, /Busbar Trunking/)
  assert.match(bridge, /Switchgear (?:&|&amp;) Distribution/)
  assert.doesNotMatch(hero, /6300A|IP66|Live Capacity|300t|2000m/)
})

test('site header keeps mobile compact and scales up on desktop', () => {
  const header = read('components/site-header.tsx')
  assert.match(header, /h-16[^"\n]*md:h-\[76px\]/)
  assert.match(header, /size-9[^\n]*md:size-11/)
  assert.match(header, /text-sm[^'\n]*md:text-\[15px\]/)
  assert.match(header, /md:px-5 md:py-2\.5 md:text-\[15px\]/)
  assert.match(header, /size-10.*md:hidden/)
})

test('global content container is widened to 96rem for large screens', () => {
  const css = read('app/globals.css')
  assert.match(css, /\.max-w-7xl\s*\{[^}]*max-width:\s*96rem/, 'globals.css must widen max-w-7xl to 96rem')
})

test('site motion system covers hero, cards, counters and reduced-motion users', () => {
  const css = read('app/globals.css')
  const hero = read('components/hero.tsx')
  const home = read('app/page.tsx')
  assert.match(css, /@keyframes hero-scene-drift/)
  assert.match(css, /\.motion-enter/)
  assert.match(css, /\.motion-card/)
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.motion-enter/)
  assert.match(hero, /motion-scene/)
  assert.match(hero, /motion-enter/)
  assert.match(home, /CountUp/)
  assert.equal(fs.existsSync('components/count-up.tsx'), true, 'count-up component must exist')
})

test('business licenses use orientation metadata and a landscape certificate template', () => {
  const data = read('lib/certifications.ts')
  const gallery = read('components/certificate-gallery.tsx')
  assert.match(data, /orientation\?: 'clockwise'/)
  assert.match(data, /business-license-1\.png[^\n]*orientation: 'clockwise'/)
  assert.match(data, /business-license-2\.png[^\n]*orientation: 'clockwise'/)
  assert.match(gallery, /landscape/)
  assert.match(gallery, /rotate-90/)
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
