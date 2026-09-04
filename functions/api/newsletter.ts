/**
 * Cloudflare Pages Function: POST /api/newsletter
 *
 * Marketing subscription endpoint - STRICTLY SEPARATE from inquiries.
 * Subscribers explicitly opted in via the consent checkbox.
 *
 * Phase 1: validates + acknowledges. When the ESP (email marketing
 * platform) is chosen, wire it up where marked below:
 *   Brevo:    POST https://api.brevo.com/v3/contacts
 *   Mailchimp: uses list-specific data centers
 *
 * Environment variables:
 *   NEWSLETTER_API_URL  ESP endpoint
 *   NEWSLETTER_API_KEY  ESP API key
 *   NEWSLETTER_LIST_ID  ESP audience / list id
 */

interface Env {
  NEWSLETTER_API_URL?: string;
  NEWSLETTER_API_KEY?: string;
  NEWSLETTER_LIST_ID?: string;
}

interface Context {
  request: Request;
  env: Env;
}

interface NewsletterPayload {
  email?: string;
  consent?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  const jsonHeaders = { 'Content-Type': 'application/json' };

  try {
    const data = (await request.json()) as NewsletterPayload;

    /* Explicit marketing consent is REQUIRED for subscription */
    if (data.consent !== 'yes') {
      return new Response(
        JSON.stringify({ ok: false, error: 'Marketing consent is required to subscribe.' }),
        { status: 400, headers: jsonHeaders }
      );
    }
    if (!data.email || !EMAIL_RE.test(data.email)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Please provide a valid email address.' }),
        { status: 400, headers: jsonHeaders }
      );
    }

    /* -----------------------------------------------------------------
     * TODO(phase 2): forward to the email marketing platform.
     * Example (Brevo):
     *   await fetch('https://api.brevo.com/v3/contacts', {
     *     method: 'POST',
     *     headers: {
     *       'api-key': env.NEWSLETTER_API_KEY!,
     *       'Content-Type': 'application/json',
     *     },
     *     body: JSON.stringify({
     *       email: data.email,
     *       updateEnabled: true,
     *       listIds: [Number(env.NEWSLETTER_LIST_ID)],
     *     }),
     *   });
     * ----------------------------------------------------------------- */
    if (env.NEWSLETTER_API_URL && env.NEWSLETTER_API_KEY) {
      const res = await fetch(env.NEWSLETTER_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.NEWSLETTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, listId: env.NEWSLETTER_LIST_ID }),
      });
      if (!res.ok) {
        console.error('ESP error:', await res.text());
        return new Response(
          JSON.stringify({ ok: false, error: 'Subscription failed. Please try again later.' }),
          { status: 502, headers: jsonHeaders }
        );
      }
    } else {
      console.log('[dev] Newsletter subscription (no ESP configured):', data.email);
    }

    return new Response(JSON.stringify({ ok: true }), { headers: jsonHeaders });
  } catch {
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
