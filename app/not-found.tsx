import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="bg-gradient-mesh flex min-h-[75vh] items-center justify-center px-4 py-28 text-center">
      <div className="max-w-xl rounded-3xl border border-border/70 bg-card/80 p-10 shadow-xl backdrop-blur sm:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">404 Error</p>
        <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">Page not found</h1>
        <p className="mt-5 leading-7 text-muted-foreground">
          The page may have moved or the address may be incorrect. Return to the homepage or browse our product catalog.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            <ArrowLeft className="size-4" /> Back to home
          </Link>
          <Link href="/products" className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground">
            View products
          </Link>
        </div>
      </div>
    </main>
  )
}
