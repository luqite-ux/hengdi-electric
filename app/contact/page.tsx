import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/reveal'
import { ContactForm } from '@/components/contact-form'
import { company } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Hengdi Electric for quotations, samples and OEM/ODM inquiries. Cable tray, busbar trunking and switchgear manufacturer in Zhenjiang, China.',
}

export default function ContactPage() {
  const details = [
    {
      icon: MapPin,
      label: 'Address',
      value: company.address,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: company.phone,
      href: `tel:${company.phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon – Sat, 09:00 – 18:00 (GMT+8)',
    },
  ]

  return (
    <main className="bg-gradient-mesh">
      <PageHeader
        eyebrow="Get in Touch"
        title="Let's Build Something Powerful"
        description="Send us your requirements and our team will respond with a tailored quotation. Packaging, shipping and applicable taxes are confirmed for each order."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Reach out through any channel below. We welcome OEM / ODM cooperation and bulk-order
              inquiries.
            </p>
            <ul className="mt-8 space-y-5">
              {details.map((d) => (
                <li
                  key={d.label}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                    <d.icon className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block font-medium text-foreground transition-colors hover:text-accent"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-foreground">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
