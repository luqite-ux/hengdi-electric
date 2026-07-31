import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Target, Gem, Headphones, Lightbulb } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { company, stats, certifications } from '@/lib/site'
import { buildPageMetadata } from '@/lib/seo'

export const metadata = buildPageMetadata({
  title: 'About Us',
  description:
    'Zhenjiang Hengdi Intelligent Electric Co., Ltd. is an innovative enterprise focused on the intelligent electric field, manufacturing busbar, cable tray and distribution products.',
  path: '/about',
})

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation Driven',
    desc: 'A dedicated R&D team continuously integrates the latest technology into our intelligent electrical products.',
  },
  {
    icon: Gem,
    title: 'Quality First',
    desc: 'Refined production management under strict national and international standards, backed by CCC and ISO 9001 certification.',
  },
  {
    icon: Headphones,
    title: 'Service Priority',
    desc: 'A customer-first approach delivering comprehensive technical support and dependable after-sales service.',
  },
  {
    icon: Target,
    title: 'Continuous Improvement',
    desc: 'Guided by "innovation-driven, quality-based, service-first," we continually strengthen our core competencies.',
  },
]

const milestones = [
  { year: 'R&D', title: 'Dedicated Team', desc: 'Skilled engineers and technicians driving innovation in intelligent electric products.' },
  { year: 'CCC', title: '3C Certified', desc: 'China Compulsory Certification for busbar trunking systems.' },
  { year: 'ISO', title: '9001 System', desc: 'ISO 9001 quality management system certified across production operations.' },
  { year: 'Type Test', title: 'GB/T 7251.6-2015', desc: 'Independent type-test reports available for busbar trunking systems (IEC 60439 / GB/T 7251.6-2015).' },
]

export default function AboutPage() {
  return (
    <main className="bg-gradient-mesh">
        <PageHeader
        eyebrow="About Hengdi"
        title="An Innovative Intelligent Electric Enterprise"
        description={`${company.fullName} is dedicated to the research, production and sale of high-quality intelligent electrical products — busbar trunking, cable trays and distribution equipment.`}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-5 shadow-2xl backdrop-blur">
              <Image src="/catalog/company/factory-overview-render.webp" alt="Hengdi Electric factory planning rendering" width={1200} height={700} className="aspect-[16/9] w-full rounded-2xl object-cover" />
              <p className="mt-3 text-xs text-muted-foreground">Factory planning rendering supplied in the company catalog; shown for company overview reference.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Safe, Reliable &amp; Efficient Power Solutions
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Our products span busbar trunking, cable trays, distribution boxes and more. With
                advanced technology and exquisite craftsmanship, they are widely applied across
                industrial, commercial and civil fields.
              </p>
              <p>
                We maintain refined management of the production process, strictly following
                international quality standards. Our busbar systems have passed China&apos;s
                compulsory 3C certification and the ISO 9001 quality system certification, ensuring
                every product delivers outstanding quality and performance.
              </p>
              <p>
                Guided by &quot;innovation-driven, quality-based, service-first,&quot; we keep
                enhancing our core competitiveness to contribute to the development of the
                intelligent electric industry.
              </p>
            </div>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px] shadow-primary/70 transition-transform hover:scale-[1.03]"
            >
              Work With Us
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-background/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="text-center">
              <div className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our Philosophy
          </span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Values That Power Everything We Do
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 100}
              className="rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur transition-colors hover:border-primary/50"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15">
                <v.icon className="size-6 text-accent" />
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="border-y border-border/60 bg-background/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Credentials
            </span>
            <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Recognized &amp; Certified
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal
                key={m.title}
                delay={i * 90}
                className="relative rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-accent">
                  {m.year}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {certifications.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border/70 bg-secondary/40 px-4 py-2 text-sm text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
