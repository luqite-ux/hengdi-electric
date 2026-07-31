import { buildNoIndexMetadata } from '@/lib/seo'

export const metadata = buildNoIndexMetadata('Admin Login')

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
