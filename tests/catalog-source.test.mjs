import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const manifestPath = path.join(root, 'scripts', 'catalog-assets.json')

test('catalog asset manifest is complete and traceable', () => {
  assert.equal(fs.existsSync(manifestPath), true, 'catalog asset manifest must exist')
  const entries = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  assert.ok(entries.length >= 25, 'catalog must include product, company, and certificate assets')

  const ids = new Set()
  const outputs = new Set()
  for (const entry of entries) {
    assert.match(entry.id, /^[a-z0-9-]+$/)
    assert.equal(ids.has(entry.id), false, `duplicate id: ${entry.id}`)
    ids.add(entry.id)
    assert.ok(Number.isInteger(entry.sourcePage) && entry.sourcePage >= 1 && entry.sourcePage <= 76)
    assert.ok(['company', 'product', 'diagram', 'certificate'].includes(entry.kind))
    assert.match(entry.output, /^catalog\/[a-z0-9/_-]+\.(webp|png)$/)
    assert.equal(outputs.has(entry.output), false, `duplicate output: ${entry.output}`)
    outputs.add(entry.output)
    assert.match(entry.alt, /^[\x20-\x7E]+$/, `alt must be non-empty English ASCII: ${entry.id}`)
    assert.equal(entry.crop.length, 4)
    const [left, top, right, bottom] = entry.crop
    assert.ok(left >= 0 && top >= 0 && right > left && bottom > top)
    assert.ok(top >= 0.08, `crop must exclude repeated header zone: ${entry.id}`)
    assert.ok(bottom <= 0.94, `crop must exclude repeated footer zone: ${entry.id}`)
  }
})

test('processed catalog assets exist and decode to useful dimensions', async () => {
  assert.equal(fs.existsSync(manifestPath), true, 'catalog asset manifest must exist')
  const entries = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  for (const entry of entries) {
    const file = path.join(root, 'public', entry.output)
    assert.equal(fs.existsSync(file), true, `missing processed asset: ${entry.output}`)
    const bytes = fs.readFileSync(file)
    assert.ok(bytes.length > 8_000, `processed asset is unexpectedly small: ${entry.output}`)
  }
})
