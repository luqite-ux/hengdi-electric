'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nav } from '@/lib/site'
import { isMobileMenuOpen, type MobileMenuState } from '@/lib/navigation'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuState, setMenuState] = useState<MobileMenuState>({ pathname, open: false })
  const open = isMobileMenuOpen(menuState, pathname)
  const overDarkHero = pathname === '/' && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[84px] lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 md:gap-3.5">
          <span className="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-white/95 shadow-lg ring-1 ring-white/20 md:size-12 md:rounded-xl">
            <Image src="/logo.png" alt="" width={44} height={44} className="size-8 object-contain md:size-11" />
          </span>
          <span className="flex flex-col leading-none">
            <span className={cn('text-sm font-bold tracking-tight md:text-base', overDarkHero ? 'text-white' : 'text-foreground')}>Hengdi Electric</span>
            <span className={cn('text-[10px] font-medium uppercase tracking-[0.18em]', overDarkHero ? 'text-white/65' : 'text-muted-foreground')}>
              Intelligent Electric
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex lg:gap-3">
          {nav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'motion-nav-link relative rounded-md px-3 py-2 text-sm font-medium transition-colors md:text-base lg:px-4',
                  overDarkHero
                    ? active ? 'text-white' : 'text-white/70 hover:text-white'
                    : active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px] shadow-primary/70 transition-transform hover:scale-[1.03] sm:flex md:px-6 md:py-3 md:text-base"
          >
            <Phone className="size-4" />
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={() => setMenuState({ pathname, open: !open })}
            className={cn('flex size-10 items-center justify-center rounded-md md:hidden', overDarkHero ? 'text-white' : 'text-foreground')}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {nav.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'rounded-md px-3 py-3 text-base font-medium',
                    active ? 'bg-secondary text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="size-4" />
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
