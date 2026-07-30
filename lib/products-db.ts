import { products as fallbackProducts, type Product } from '@/lib/site'
import { getSupabaseClient, getTenantId } from '@/lib/supabase'

type ProductRow = {
  slug: string
  name: string
  description: string | null
  image_url: string | null
  specs: unknown
  features: unknown
  extra_data: unknown
}

function mapRow(row: ProductRow): Product {
  const extra = row.extra_data && typeof row.extra_data === 'object'
    ? row.extra_data as Record<string, unknown>
    : {}
  const original = extra.site_product && typeof extra.site_product === 'object'
    ? extra.site_product as Partial<Product>
    : {}

  return {
    slug: row.slug,
    name: row.name,
    short: original.short || row.description || '',
    description: row.description || original.description || '',
    image: row.image_url || original.image || '/placeholder.svg',
    highlights: Array.isArray(row.features) ? row.features.filter((x): x is string => typeof x === 'string') : (original.highlights || []),
    specs: Array.isArray(row.specs) ? row.specs as Product['specs'] : (original.specs || []),
    families: original.families,
    specTable: original.specTable,
  }
}

export async function fetchProductsData(): Promise<Product[]> {
  const supabase = getSupabaseClient()
  const tenantId = getTenantId()
  if (!supabase || !tenantId) return fallbackProducts

  const { data, error } = await supabase
    .from('products')
    .select('slug,name,description,image_url,specs,features,extra_data')
    .eq('tenant_id', tenantId)
    .eq('is_active', true)
    .order('sort_order')

  if (error || !data?.length) return fallbackProducts
  return (data as ProductRow[]).map(mapRow)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await fetchProductsData()
  return products.find((product) => product.slug === slug) || null
}
