import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url))
  response.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 })
  response.cookies.set(TENANT_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}
