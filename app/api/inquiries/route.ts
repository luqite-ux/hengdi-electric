import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission,
} from '@/lib/inquiry-captcha'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
    if (!tenantId) return NextResponse.json({ error: 'Inquiry service is not configured.' }, { status: 503 })
    const body = await request.json()
    const name = String(body.name || '').trim()
    const company = String(body.company || '').trim()
    const email = String(body.email || '').trim()
    const phone = String(body.phone || '').trim()
    const subject = String(body.subject || '').trim()
    const message = String(body.message || '').trim()
    if (!name || !company || !emailPattern.test(email) || !message) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }
    const captchaSecret = process.env.CAPTCHA_SECRET?.trim()
    if (!captchaSecret) {
      return NextResponse.json({ error: 'Verification service is not configured.' }, { status: 503 })
    }
    let captchaResult
    try {
      const { tenantId: captchaTenantId, siteScope, store } = createSupabaseCaptchaContextFromEnv()
      captchaResult = await verifyCaptchaSubmission({
        secret: captchaSecret,
        tenantId: captchaTenantId,
        siteScope,
        store,
        scope: String(body.captchaScope || ''),
        token: String(body.captchaToken || ''),
        answer: String(body.captchaAnswer || ''),
      })
    } catch {
      return NextResponse.json({ error: 'Verification service is temporarily unavailable.' }, { status: 503 })
    }
    if (!captchaResult.ok) {
      return NextResponse.json({ error: 'The verification code is invalid or expired. Please try again.' }, { status: 400 })
    }
    const { error } = await createAdminClient().from('inquiries').insert({
      tenant_id: tenantId,
      name,
      company,
      email,
      phone: phone || null,
      subject: subject || 'General product inquiry',
      message,
      status: 'unread',
    })
    if (error) throw error
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Unable to submit your inquiry. Please try again.' }, { status: 500 })
  }
}
