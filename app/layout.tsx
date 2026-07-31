import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Sora } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationJsonLd } from '@/lib/seo'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hengdielectrical.com'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hengdi Electric | Cable Tray & Busbar Trunking Manufacturer',
    template: '%s | Hengdi Electric',
  },
  description:
    'Zhenjiang Hengdi Intelligent Electric Co., Ltd. — a professional manufacturer of cable tray systems, busbar trunking and switchgear. ISO 9001 certified; CCC and type-test reports available for busbar systems. OEM/ODM welcome.',
  generator: 'v0.app',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Hengdi Electric',
    title: 'Hengdi Electric | Cable Tray & Busbar Trunking Manufacturer',
    description: 'Industrial cable tray, busbar trunking, switchgear and distribution box manufacturer.',
    url: '/',
    images: [{ url: '/logo.png', alt: 'Hengdi Electric' }],
  },
  keywords: [
    'cable tray',
    'busbar trunking',
    'busway',
    'switchgear',
    'electrical manufacturer',
    'Hengdi Electric',
    'OEM',
    'ODM',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} bg-background`}>
      <body className="min-h-screen antialiased font-sans">
        <SiteHeader />
        <JsonLd data={buildOrganizationJsonLd()} />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
