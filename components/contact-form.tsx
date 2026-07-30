'use client'

import { useState, useCallback } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { products } from '@/lib/site'

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia', 'Canada',
  'Japan', 'South Korea', 'India', 'Brazil', 'Mexico', 'Singapore', 'Malaysia',
  'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'Saudi Arabia', 'UAE',
  'Turkey', 'Russia', 'Poland', 'Netherlands', 'Italy', 'Spain', 'Other',
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FieldErrors {
  name?: string
  company?: string
  email?: string
  country?: string
  message?: string
}

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const baseInput =
    'w-full rounded-xl border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:ring-2'
  const inputClass = (field: keyof FieldErrors) =>
    `${baseInput} ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/30'
        : 'border-border/70 focus:border-primary focus:ring-primary/30'
    }`

  const validate = useCallback((data: FormData): FieldErrors => {
    const e: FieldErrors = {}
    if (!String(data.get('name') ?? '').trim()) e.name = 'Name is required.'
    if (!String(data.get('company') ?? '').trim()) e.company = 'Company is required.'
    const email = String(data.get('email') ?? '').trim()
    if (!email) e.email = 'Email is required.'
    else if (!validateEmail(email)) e.email = 'Please enter a valid email address.'
    if (!String(data.get('country') ?? '').trim()) e.country = 'Please select a country or region.'
    if (!String(data.get('message') ?? '').trim()) e.message = 'Message is required.'
    return e
  }, [])

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
    const fd = new FormData(e.target.form!)
    const errs = validate(fd)
    setErrors((prev) => ({ ...prev, [e.target.name]: errs[e.target.name as keyof FieldErrors] }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const allFields = ['name', 'company', 'email', 'country', 'message']
    setTouched(Object.fromEntries(allFields.map((f) => [f, true])))
    const errs = validate(fd)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setFormState('submitting')
    const country = String(fd.get('country') || '').trim()
    const product = String(fd.get('product') || '').trim()
    const specs = String(fd.get('specs') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const details = [
      `Country/Region: ${country}`,
      product ? `Product interest: ${product}` : '',
      specs ? `Specifications/Quantity: ${specs}` : '',
      '',
      message,
    ].filter(Boolean).join('\n')
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: String(fd.get('name') || '').trim(),
        company: String(fd.get('company') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        subject: product ? `Product inquiry: ${product}` : 'General product inquiry',
        message: details,
      }),
    })
    if (!response.ok) {
      setFormState('error')
      return
    }
    e.currentTarget.reset()
    setFormState('success')
  }

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border/70 bg-card/50 p-10 text-center backdrop-blur">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/15">
          <CheckCircle2 className="size-8 text-accent" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Inquiry Received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thank you. Your inquiry has been submitted successfully. Our team will contact you
          using the details provided.
        </p>
        <button
          type="button"
          onClick={() => { setFormState('idle'); setTouched({}); setErrors({}) }}
          className="mt-6 rounded-full border border-border/80 bg-secondary/40 px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Send another inquiry
        </button>
      </div>
    )
  }

  if (formState === 'error') {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-red-400/40 bg-card/50 p-10 text-center backdrop-blur">
        <div className="flex size-16 items-center justify-center rounded-full bg-red-400/10">
          <AlertCircle className="size-8 text-red-500" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Submission Failed</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Something went wrong. Please try again or contact us directly at{' '}
          <a href="mailto:641320694@qq.com" className="text-accent underline underline-offset-2">
            641320694@qq.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => { setFormState('idle'); setTouched({}); setErrors({}) }}
          className="mt-6 rounded-full border border-border/80 bg-secondary/40 px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Try again
        </button>
      </div>
    )
  }

  const isSubmitting = formState === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="B2B inquiry form"
      className="rounded-3xl border border-border/70 bg-card/50 p-6 backdrop-blur sm:p-8"
    >
      {/* Row 1: Name + Company */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Name <span aria-hidden="true" className="text-accent">*</span>
          </label>
          <input
            id="name" name="name" type="text" required
            autoComplete="name" placeholder="Your full name"
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
            className={inputClass('name')}
          />
          {touched.name && errors.name && (
            <p id="err-name" role="alert" className="mt-1.5 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
            Company <span aria-hidden="true" className="text-accent">*</span>
          </label>
          <input
            id="company" name="company" type="text" required
            autoComplete="organization" placeholder="Company or organization"
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={touched.company && !!errors.company}
            aria-describedby={errors.company ? 'err-company' : undefined}
            className={inputClass('company')}
          />
          {touched.company && errors.company && (
            <p id="err-company" role="alert" className="mt-1.5 text-xs text-red-500">{errors.company}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email + Phone/WhatsApp */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Business Email <span aria-hidden="true" className="text-accent">*</span>
          </label>
          <input
            id="email" name="email" type="email" required
            autoComplete="email" placeholder="you@company.com"
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            className={inputClass('email')}
          />
          {touched.email && errors.email && (
            <p id="err-email" role="alert" className="mt-1.5 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
            Phone / WhatsApp
            <span className="ml-1 text-xs font-normal text-muted-foreground">(your number)</span>
          </label>
          <input
            id="phone" name="phone" type="tel"
            autoComplete="tel" placeholder="+1 555 000 0000"
            disabled={isSubmitting}
            className={`${baseInput} border-border/70 focus:border-primary focus:ring-primary/30`}
          />
        </div>
      </div>

      {/* Row 3: Country + Product Interest */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="mb-2 block text-sm font-medium text-foreground">
            Country / Region <span aria-hidden="true" className="text-accent">*</span>
          </label>
          <select
            id="country" name="country" required
            defaultValue=""
            onBlur={handleBlur}
            disabled={isSubmitting}
            aria-invalid={touched.country && !!errors.country}
            aria-describedby={errors.country ? 'err-country' : undefined}
            className={inputClass('country')}
          >
            <option value="" disabled>Select country / region</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {touched.country && errors.country && (
            <p id="err-country" role="alert" className="mt-1.5 text-xs text-red-500">{errors.country}</p>
          )}
        </div>
        <div>
          <label htmlFor="product" className="mb-2 block text-sm font-medium text-foreground">
            Product Interest
          </label>
          <select id="product" name="product" defaultValue="" disabled={isSubmitting}
            className={`${baseInput} border-border/70 focus:border-primary focus:ring-primary/30`}>
            <option value="" disabled>Select a product line</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
            <option value="other">Other / Not sure yet</option>
          </select>
        </div>
      </div>

      {/* Row 4: Specifications / Quantity */}
      <div className="mt-5">
        <label htmlFor="specs" className="mb-2 block text-sm font-medium text-foreground">
          Required Specifications / Quantity
        </label>
        <input
          id="specs" name="specs" type="text"
          disabled={isSubmitting}
          placeholder="e.g. HDCMC copper 800 A 3-phase 4-wire 200 m; XQJ-T ladder 400×100 mm 500 m"
          className={`${baseInput} border-border/70 focus:border-primary focus:ring-primary/30`}
        />
      </div>

      {/* Row 5: Message */}
      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          Message <span aria-hidden="true" className="text-accent">*</span>
        </label>
        <textarea
          id="message" name="message" rows={5} required
          onBlur={handleBlur}
          disabled={isSubmitting}
          placeholder="Describe your project, installation environment, delivery destination or any other requirements."
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={errors.message ? 'err-message' : undefined}
          className={inputClass('message')}
        />
        {touched.message && errors.message && (
          <p id="err-message" role="alert" className="mt-1.5 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Fields marked <span className="text-accent">*</span> are required.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-8px] shadow-primary/70 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Inquiry
            <Send className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}
