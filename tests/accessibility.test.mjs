import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('brand home link lets its visible text provide the accessible name', async () => {
  const source = await readFile(new URL('../components/site-header.tsx', import.meta.url), 'utf8')
  assert.equal(source.includes('aria-label={company.name}'), false)
})
