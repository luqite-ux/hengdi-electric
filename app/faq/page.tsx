import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { FaqAccordion } from '@/components/faq-accordion'
import { faqCategories } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Hengdi Electric products, pricing, samples, production lead time and quality control.',
}

export default function FaqPage() {
  return (
    <main className="bg-gradient-mesh">
      <PageHeader
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Everything you need to know about our products, ordering, samples, production and quality assurance."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="mx-auto max-w-4xl space-y-14 px-4 py-20 sm:px-6 lg:px-8">
        {faqCategories.map((cat, i) => (
          <Reveal key={cat.category} delay={i * 60}>
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-foreground">
              {cat.category}
            </h2>
            <FaqAccordion items={cat.items} />
          </Reveal>
        ))}

        <Reveal className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/25 via-card/60 to-accent/15 p-8 text-center backdrop-blur sm:p-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Our team is ready to help with specifications, custom requirements and quotations.
          </p>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px] shadow-primary/70 transition-transform hover:scale-[1.03]"
          >
            Contact Us
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
