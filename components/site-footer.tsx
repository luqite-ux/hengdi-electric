import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'
import { nav, company, products } from '@/lib/site'

export function SiteFooter() {
  const footerCompanyName = company.fullName.replace(/[.\s]+$/, '')

  return (
    <footer className="relative mt-24 border-t border-border/60 bg-background/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Link href="/" aria-label="Hengdi Electric home" className="flex w-fit items-center gap-2.5">
            <span className="flex size-12 items-center justify-center overflow-hidden rounded-lg bg-white/95">
              <Image src="/logo.png" alt="" width={44} height={44} className="max-w-full object-contain" />
            </span>
            <span className="text-sm font-bold text-foreground">Hengdi Electric</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {company.fullName} — a professional manufacturer of cable tray, busbar trunking and
            switchgear.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
          <ul className="mt-4 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Products</h3>
          <ul className="mt-4 space-y-3">
            {products.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{company.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${company.phoneSecondary.replace(/\s/g, '')}`} className="hover:text-foreground">{company.phoneSecondary}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-foreground">
                {company.phone}
              </a>
            </li>
            <li className="pl-7">Postcode: {company.zip}</li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${company.email}`} className="hover:text-foreground">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {footerCompanyName}. All rights reserved.
          </p>
          <p>ISO 9001 Quality System · CCC &amp; Type-Test Reports Available for Busbar Systems</p>
        </div>
      </div>
    </footer>
  )
}
