#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || '3be44d64-97ed-4190-af7c-d63ca0c2353d'
const dryRun = process.argv.includes('--dry-run')

function argument(name, fallback) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : fallback
}

function loadEnv() {
  const envPath = argument('--env', path.join(root, '.env'))
  if (!existsSync(envPath)) throw new Error(`Environment file not found: ${envPath}`)
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const split = trimmed.indexOf('=')
    if (split < 0) continue
    let value = trimmed.slice(split + 1).trim()
    if (/^['"]/.test(value) && value.at(-1) === value[0]) value = value.slice(1, -1)
    process.env[trimmed.slice(0, split).trim()] = value
  }
}

async function loadProducts() {
  const source = readFileSync(path.join(root, 'lib', 'catalog-products.ts'), 'utf8')
    .replace("import type { Product } from '@/lib/site'\n", '')
  const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText
  const temporary = path.join(root, 'scripts', '_tmp_hengdi_products.mjs')
  writeFileSync(temporary, compiled, 'utf8')
  try {
    return (await import(`${pathToFileURL(temporary).href}?v=${Date.now()}`)).catalogProducts
  } finally {
    try { unlinkSync(temporary) } catch {}
  }
}

const categorySlugs = new Map([
  ['Cable Tray Systems', 'cable-tray-systems'],
  ['Busbar Trunking Systems', 'busbar-trunking-systems'],
  ['Switchgear & Distribution', 'switchgear-and-distribution'],
])

async function main() {
  const products = await loadProducts()
  if (products.length !== 6) throw new Error(`Expected six product series, found ${products.length}`)
  console.log(JSON.stringify({ tenantId, categories: categorySlugs.size, products: products.length, dryRun }))
  if (dryRun) return

  loadEnv()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

  for (const [sortOrder, [name, slug]] of [...categorySlugs].entries()) {
    const { error } = await supabase.from('product_categories').upsert({
      tenant_id: tenantId, slug, name, name_en: name, name_i18n: { en: name }, parent_id: null,
      description: '', description_en: '', description_i18n: { en: '' }, sort_order: sortOrder, is_active: true,
      extra_data: { source: 'Hengdi company catalog contents page' },
    }, { onConflict: 'tenant_id,slug' })
    if (error) throw error
  }

  for (const [sortOrder, product] of products.entries()) {
    const { error } = await supabase.from('products').upsert({
      tenant_id: tenantId, slug: product.slug, name: product.name, name_en: product.name, name_i18n: { en: product.name },
      description: product.description, description_en: product.description, description_i18n: { en: product.description },
      overview: product.description, overview_en: product.description, overview_i18n: { en: product.description },
      image_url: product.image, category: product.category, category_slug: categorySlugs.get(product.category),
      model: product.specs?.find((item) => item.label === 'Series')?.value || '', features: product.highlights,
      features_i18n: { en: product.highlights }, applications: [], applications_i18n: { en: [] }, advantages: [], advantages_i18n: { en: [] },
      specs: product.specs, sort_order: sortOrder, is_active: true,
      extra_data: { site_product: product, category: product.category, subcategory: product.subcategory, gallery: product.gallery, source_pages: product.sourcePages, source: 'Hengdi company catalog' },
    }, { onConflict: 'tenant_id,slug' })
    if (error) throw error
  }

  const approvedSlugs = products.map((product) => product.slug)
  const { data: currentProducts, error: currentError } = await supabase.from('products').select('id,slug').eq('tenant_id', tenantId)
  if (currentError) throw currentError
  const obsoleteProductIds = currentProducts.filter((row) => !approvedSlugs.includes(row.slug)).map((row) => row.id)
  if (obsoleteProductIds.length) {
    const { error } = await supabase.from('products').update({ is_active: false }).in('id', obsoleteProductIds)
    if (error) throw error
  }

  const approvedCategorySlugs = [...categorySlugs.values()]
  const { data: currentCategories, error: categoryError } = await supabase.from('product_categories').select('id,slug').eq('tenant_id', tenantId)
  if (categoryError) throw categoryError
  const obsoleteCategoryIds = currentCategories.filter((row) => !approvedCategorySlugs.includes(row.slug)).map((row) => row.id)
  if (obsoleteCategoryIds.length) {
    const { error } = await supabase.from('product_categories').update({ is_active: false }).in('id', obsoleteCategoryIds)
    if (error) throw error
  }

  const [{ count }, { data: activeCategories, error: verifyCategoryError }] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('tenant_id', tenantId).eq('is_active', true),
    supabase.from('product_categories').select('slug').eq('tenant_id', tenantId).eq('is_active', true),
  ])
  if (verifyCategoryError) throw verifyCategoryError
  if (count !== 6 || activeCategories.length !== 3) throw new Error(`Verification mismatch: products=${count}, categories=${activeCategories.length}`)
  console.log(JSON.stringify({ verified: true, products: count, categories: activeCategories.length }))
}

main().catch((error) => { console.error(error.message); process.exit(1) })
