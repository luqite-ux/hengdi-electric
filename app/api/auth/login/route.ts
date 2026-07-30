import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

const SESSION_DAYS = 7

function redirectError(request: NextRequest, code: string) {
  return NextResponse.redirect(new URL(`/admin/login?error=${encodeURIComponent(code)}`, request.url), 303)
}

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const email = String(form.get('email') || '').trim().toLowerCase()
  const password = String(form.get('password') || '')
  if (!email || !password) return redirectError(request, 'missing')

  try {
    const supabase = createAdminClient()
    const { data: user } = await supabase.from('admin_users')
      .select('id,tenant_id,password_hash,is_active').eq('email', email).maybeSingle()
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return redirectError(request, 'invalid')
    if (!user.is_active) return redirectError(request, 'inactive')

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000)
    const { error } = await supabase.from('admin_user_sessions').insert({
      admin_user_id: user.id,
      token,
      expires_at: expiresAt.toISOString(),
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      user_agent: request.headers.get('user-agent'),
    })
    if (error) return redirectError(request, 'session')
    await supabase.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', user.id)

    const response = NextResponse.redirect(new URL('/admin', request.url), 303)
    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, expires: expiresAt, path: '/' }
    response.cookies.set(SESSION_COOKIE, token, options)
    response.cookies.set(TENANT_COOKIE, user.tenant_id, options)
    return response
  } catch {
    return redirectError(request, 'configuration')
  }
}
