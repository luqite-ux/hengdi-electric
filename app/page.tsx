import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, Factory, Globe, Wrench, Award, CheckCircle2 } from 'lucide-react'
import { Hero } from '@/components/hero'
import { Reveal } from '@/components/reveal'
import { products, stats, certifications } from '@/lib/site'

const advantages = [
  {
    icon: Factory,
    title: 'In-House Manufacturing',
    desc: 'Dedicated production lines for cable tray, busbar trunking and switchgear support consistent quality and reliable delivery schedules.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Quality',
    desc: 'CCC compulsory certification, ISO 9001 quality system and GB/T 7251.6-2015 type-test reports are available for busbar systems.',
  },
  {
    icon: Globe,
    title: 'International Supply',
    desc: 'Packaging, shipping and applicable taxes confirmed per order. Contact us for a complete quotation.',
  },
  {
    icon: Wrench,
    title: 'OEM / ODM Ready',
    desc: 'Custom sizes, materials, surface treatments and configurations supported, with prototype confirmation before mass production.',
  },
]

const applications = [
  'High-rise Buildings',
  'Industrial Plants',
  'Data Centers',
  'Exhibition Centers',
  'Hotels & Malls',
  'Power Substations',
  'Hospitals',
  'Infrastructure',
]

export default function HomePage() {
  return (
    <main className="bg-gradient-mesh">
      <Hero />

      {/* Stats */}
      <section className="relative border-y border-border/60 bg-background/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 90}
              className="px-4 py-10 text-center sm:py-12"
            >
              <div className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Products
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            A Complete Power Transmission Portfolio
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            From cable management to power distribution, engineered for safety, reliability and
            efficiency.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120} as="article">
              <Link
                href={`/products/${p.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_20px_60px_-20px] hover:shadow-primary/40"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    View details
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="relative overflow-hidden border-y border-border/60 bg-background/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Why Hengdi
              </span>
              <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your Reliable Partner in Intelligent Electric
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                An innovative enterprise focused on the intelligent electric field, we research,
                produce and sell high-quality products with advanced technology and refined
                craftsmanship — delivering safe, reliable and efficient power solutions.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {advantages.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur transition-colors hover:border-primary/50"
                  >
                    <a.icon className="size-6 text-accent" />
                    <h3 className="mt-3 font-semibold text-foreground">{a.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {a.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-primary/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-6 shadow-2xl backdrop-blur sm:p-8">
                {/* Catalog product images */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden rounded-2xl border border-border/60">
                    <Image
                      src="/products/cable-tray.png"
                      alt="Cable tray systems"
                      width={420}
                      height={280}
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs font-semibold text-foreground">
                      Cable Tray Systems
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl border border-border/60">
                    <Image
                      src="/products/busbar.png"
                      alt="Busbar trunking systems"
                      width={420}
                      height={280}
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs font-semibold text-foreground">
                      Busbar Trunking
                    </span>
                  </div>
                  <div className="relative col-span-2 overflow-hidden rounded-2xl border border-border/60">
                    <Image
                      src="/products/switchgear.png"
                      alt="Switchgear and distribution boxes"
                      width={860}
                      height={320}
                      className="aspect-[16/7] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs font-semibold text-foreground">
                      Switchgear &amp; Distribution Boxes
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 p-3.5 backdrop-blur">
                  <Award className="size-7 shrink-0 text-accent" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Yangzhong, Zhenjiang · Jiangsu, China
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cable tray · Busbar trunking · Switchgear
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Compliance
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Certifications &amp; Standards
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal
              key={c}
              delay={i * 90}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
              <span className="text-sm font-medium text-foreground">{c}</span>
            </Reveal>
          ))}
        </div>

        {/* Applications */}
        <Reveal className="mt-16 rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur sm:p-10">
          <h3 className="text-center text-lg font-semibold text-foreground">
            Trusted Across Industries
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {applications.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border/70 bg-secondary/40 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-gradient-to-br from-primary/25 via-card/60 to-accent/15 p-10 text-center backdrop-blur sm:p-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, oklch(0.7 0.16 230 / 0.5), transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.6 0.19 255 / 0.5), transparent 40%)',
            }}
          />
          <div className="relative">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Ready to Power Your Next Project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Send us your specifications and get a tailored quotation. Packaging, shipping and
              applicable taxes are confirmed for each order.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_36px_-8px] shadow-primary/80 transition-transform hover:scale-[1.03]"
              >
                Get a Quote
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-8 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary"
              >
                Browse Catalog
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
