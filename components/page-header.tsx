import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumb?: { label: string; href?: string }[]
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60 pt-16">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, oklch(0.62 0.12 220 / 0.14) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.62 0.12 220 / 0.14) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          maskImage: 'radial-gradient(ellipse 60% 100% at 30% 0%, black, transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {breadcrumb && (
          <nav className="motion-enter mb-5 flex items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumb.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1.5">
                {b.href ? (
                  <Link href={b.href} className="transition-colors hover:text-foreground">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <ChevronRight className="size-3.5" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="motion-enter inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent" style={{ animationDelay: '80ms' }}>
            {eyebrow}
          </span>
        )}
        <h1 className="motion-enter mt-3 max-w-6xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl" style={{ animationDelay: '150ms' }}>
          {title}
        </h1>
        {description && (
          <p className="motion-enter mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: '240ms' }}>
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
