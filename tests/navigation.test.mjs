import assert from 'node:assert/strict'
import test from 'node:test'

const navigationModule = await import('../lib/navigation.ts').catch(() => ({}))

test('mobile menu is closed after the pathname changes', () => {
  assert.equal(typeof navigationModule.isMobileMenuOpen, 'function')
  assert.equal(navigationModule.isMobileMenuOpen({ pathname: '/', open: true }, '/products'), false)
})

test('mobile menu keeps its state while pathname is unchanged', () => {
  assert.equal(typeof navigationModule.isMobileMenuOpen, 'function')
  assert.equal(navigationModule.isMobileMenuOpen({ pathname: '/products', open: true }, '/products'), true)
})
