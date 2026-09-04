/**
 * Cloudflare Pages Function: POST /api/inquiry
 *
 * Flow: honeypot check -> field validation -> Turnstile verification
 *       -> Resend transactional email -> sales inbox.
 *
 * Environment variables (Cloudflare Pages -> Settings -> Environment variables):
 *   RESEND_API_KEY        Resend API key
 *   INQUIRY_TO_EMAIL      sales inbox receiving notifications
 *   INQUIRY_FROM_EMAIL    verified Resend sender
 *   TURNSTILE_SECRET_KEY  Turnstile secret (server-side verification)
 */

interface Env {
  RESEND_API_KEY?: string;
  INQUIRY_TO_EMAIL?: string;
  INQUIRY_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface InquiryPayload {
  [key: string]: string;
}

interface Context {
  request: Request;
  env: Env;
}

const REQUIRED_FIELDS = ['name', 'email', 'message'] as const;
const ATTRIBUTION_FIELDS = [
  'attr_source',
  'attr_medium',
  'attr_campaign',
  'attr_term',
  'attr_content',
  'attr_gclid',
  'attr_landing_page',
  'attr_referrer',
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null
): Promise<boolean> {
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function buildEmailHtml(data: InquiryPayload): string {
  const formRows: string[] = [];
  const fieldLabels: Record<string, string> = {
    name: 'Name',
    company: 'Company',
    country: 'Country',
    email: 'Email',
    phone: 'WhatsApp / Phone',
    product: 'Interested Product',
    quantity: 'Estimated Quantity',
    message: 'Message',
    marketing_opt_in: 'Marketing Consent',
  };
  for (const [key, label] of Object.entries(fieldLabels)) {
    if (data[key]) {
      formRows.push(
        `<tr><td style="padding:6px 12px;color:#64748b;">${label}</td><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(data[key])}</td></tr>`
      );
    }
  }

  const attrRows = ATTRIBUTION_FIELDS.map((field) => {
    const value = data[field];
    if (!value) return '';
    return `<tr><td style="padding:6px 12px;color:#64748b;">${field.replace('attr_', '')}</td><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(value)}</td></tr>`;
  }).join('');

  return `
  <div style="font-family:Arial,sans-serif;max-width:640px;">
    <h2 style="color:#245299;">New Website Inquiry</h2>
    <table style="border-collapse:collapse;border:1px solid #e2e8f0;">
      ${formRows.join('')}
    </table>
    ${
      attrRows
        ? `<h3 style="color:#245299;margin-top:20px;">Attribution (where did this customer come from?)</h3>
    <table style="border-collapse:collapse;border:1px solid #e2e8f0;">${attrRows}</table>`
        : '<p style="color:#94a3b8;font-size:12px;">No UTM / attribution data captured.</p>'
    }
  </div>`;
}

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  const jsonHeaders = { 'Content-Type': 'application/json' };

  try {
    const data = (await request.json()) as InquiryPayload;

    /* 1. Honeypot - bots filling the hidden field are rejected silently */
    if (data['website']) {
      return new Response(JSON.stringify({ ok: true }), { headers: jsonHeaders });
    }

    /* 2. Field validation */
    for (const field of REQUIRED_FIELDS) {
      if (!data[field] || !data[field].trim()) {
        return new Response(
          JSON.stringify({ ok: false, error: `Missing required field: ${field}.` }),
          { status: 400, headers: jsonHeaders }
        );
      }
    }
    if (!EMAIL_RE.test(data['email'])) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Please provide a valid email address.' }),
        { status: 400, headers: jsonHeaders }
      );
    }

    /* 3. Turnstile verification (when configured) */
    if (env.TURNSTILE_SECRET_KEY) {
      const token = data['cf-turnstile-response'] || '';
      if (!token) {
        return new Response(
          JSON.stringify({ ok: false, error: 'Spam verification failed. Please refresh and try again.' }),
          { status: 400, headers: jsonHeaders }
        );
      }
      const ip = request.headers.get('CF-Connecting-IP');
      const human = await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, ip);
      if (!human) {
        return new Response(
          JSON.stringify({ ok: false, error: 'Spam verification failed.' }),
          { status: 400, headers: jsonHeaders }
        );
      }
    }

    /* 4. Send notification email via Resend */
    const html = buildEmailHtml(data);
    const subject = `Inquiry: ${data['product'] || 'General'} — ${data['name']} (${data['country'] || 'unknown country'})`;

    if (env.RESEND_API_KEY && env.INQUIRY_TO_EMAIL) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.INQUIRY_FROM_EMAIL || 'Website <onboarding@resend.dev>',
          to: [env.INQUIRY_TO_EMAIL],
          reply_to: data['email'],
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error('Resend error:', detail);
        return new Response(
          JSON.stringify({ ok: false, error: 'Email delivery failed. Please contact us directly.' }),
          { status: 502, headers: jsonHeaders }
        );
      }
    } else {
      // Development mode: no keys configured. Log instead of sending.
      console.log('[dev] Inquiry received (no RESEND_API_KEY configured):', subject);
      console.log(html);
    }

    return new Response(JSON.stringify({ ok: true }), { headers: jsonHeaders });
  } catch (err) {
    console.error('Inquiry handler error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid request.' }),
      { status: 400, headers: jsonHeaders }
    );
  }
};

export const onRequest = (): Response =>
  new Response(JSON.stringify({ ok: false, error: 'Method not allowed.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
