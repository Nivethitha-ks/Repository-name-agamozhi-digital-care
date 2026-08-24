// SUPABASE EDGE FUNCTION — NEW LEAD EMAIL NOTIFICATION
// Deploy command: supabase functions deploy notify-lead --no-verify-jwt
// Required Secrets: RESEND_API_KEY, ADMIN_NOTIFICATION_EMAIL

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

interface LeadPayload {
  name: string
  business_name?: string
  phone: string
  business_type: string
  requirement: string
  message?: string
  created_at: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { record }: { record: LeadPayload } = await req.json()
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const ADMIN_EMAIL = Deno.env.get('ADMIN_NOTIFICATION_EMAIL') || 'info@agamozhi.com'

    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY environment variable is not configured.')
      return new Response(
        JSON.stringify({ message: 'Lead notification skipped: RESEND_API_KEY missing' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const emailSubject = `🔔 New Enquiry Received: ${record.name} (${record.business_type})`
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #0F172A;">
        <h2 style="color: #2563EB;">New Business Enquiry — Agamozhi Digital Care</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #E2E8F0;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${record.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #E2E8F0;">Business:</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${record.business_name || 'N/A'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #E2E8F0;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${record.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #E2E8F0;">Business Type:</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${record.business_type}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #E2E8F0;">Requirement:</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${record.requirement}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #E2E8F0;">Message:</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${record.message || 'None'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #E2E8F0;">Date:</td><td style="padding: 8px; border-bottom: 1px solid #E2E8F0;">${new Date(record.created_at || Date.now()).toLocaleString()}</td></tr>
        </table>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Agamozhi Digital Care <notifications@agamozhi.com>',
        to: [ADMIN_EMAIL],
        subject: emailSubject,
        html: htmlBody,
      }),
    })

    const resData = await res.json()
    return new Response(JSON.stringify(resData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
