import Image from 'next/image'

const errors: Record<string, string> = {
  missing: 'Please enter your email and password.',
  invalid: 'The email or password is incorrect.',
  inactive: 'This account is inactive. Please contact support.',
  configuration: 'The login service is not configured.',
  session: 'Unable to create a login session. Please try again.',
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const error = errors[(await searchParams).error || '']
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/\/$/, '')
  const loginAction = adminUrl ? `${adminUrl}/api/auth/login` : '/api/auth/login'
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-mesh px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-2xl">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Hengdi Electric" width={52} height={52} className="rounded-xl object-contain" />
          <div><h1 className="text-xl font-bold">Hengdi Electric</h1><p className="text-sm text-muted-foreground">Content Management Portal</p></div>
        </div>
        {error && <p role="alert" className="mt-6 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <form action={loginAction} method="post" className="mt-7 space-y-5">
          <div><label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label><input id="email" name="email" type="email" required autoComplete="username" className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" /></div>
          <button type="submit" className="w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground">Sign in</button>
        </form>
      </div>
    </main>
  )
}
