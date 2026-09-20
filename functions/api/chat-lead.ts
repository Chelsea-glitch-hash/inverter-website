/**
 * Cloudflare Pages Function: POST /api/chat-lead
 *
 * Stores a chat lead by emailing it to the sales inbox through the same Resend
 * pipeline the inquiry form uses, and — only on success — returns the company's
 * own contact details so the widget can show them in the conversation.
 *
 * Why the contact details come back from here instead of being rendered into
 * the page: the requirement is that they appear only after the visitor has
 * given us their own. Keeping them out of the static HTML also means a scraper
 * cannot harvest the sales inbox from the chat widget's source.
 *
 * Environment variables
 *   RESEND_API_KEY          Resend API key
 *   INQUIRY_TO_EMAIL        sales inbox
 *   INQUIRY_FROM_EMAIL      verified Resend sender
 *   TURNSTILE_SECRET_KEY    Turnstile secret (required when set)
 *   CHAT_CONTACT_EMAIL      overrides CONTACT.email shown in the chat
 *   CHAT_CONTACT_WHATSAPP   overrides CONTACT.whatsapp shown in the chat
 */
import { CONTACT, whatsappDisplay } from '../../src/config';
import {
  EMAIL_RE,
  buildChatLeadEmail,
  buildChatLeadSubject,
} from '../../src/lib/lead-email';
import type {
  ChatContact,
  ChatLeadRequest,
  ChatLeadResponse,
  ChatTranscriptEntry,
} from '../../src/lib/chat-types';

interface Env {
  RESEND_API_KEY?: string;
  INQUIRY_TO_EMAIL?: string;
  INQUIRY_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  CHAT_CONTACT_EMAIL?: string;
  CHAT_CONTACT_WHATSAPP?: string;
}

interface Context {
  request: Request;
  env: Env;
}

/** Caps that keep a hostile payload from inflating the notification email. */
const MAX_TRANSCRIPT_ENTRIES = 40;
const MAX_TRANSCRIPT_CHARS = 600;
const MAX_RECOMMENDED = 6;
const MAX_SHORT_FIELD = 160;

const LEAD_WINDOW_MS = 60 * 60 * 1000;
const MAX_LEADS_PER_IP_WINDOW = 6;
const MAX_LEADS_PER_IP_DAY = 60;
const MAX_LEADS_GLOBAL_DAY = 1000;

function json(body: ChatLeadResponse, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
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

interface Counter {
  count: number;
  resetAt: number;
}

const leadWindow = new Map<string, Counter>();
const leadDaily = new Map<string, Counter>();
let leadGlobalDay: Counter = { count: 0, resetAt: 0 };

function hit(map: Map<string, Counter>, key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = map.get(key);
  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= limit) return false;
  existing.count += 1;
  return true;
}

function hitGlobal(limit: number): boolean {
  const now = Date.now();
  if (leadGlobalDay.resetAt <= now) leadGlobalDay = { count: 1, resetAt: now + 24 * 60 * 60 * 1000 };
  else if (leadGlobalDay.count >= limit) return false;
  else leadGlobalDay.count += 1;
  return true;
}

function str(value: unknown, max = MAX_SHORT_FIELD): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

/** Digits only — what wa.me links and phone comparisons need. */
function digits(value: string): string {
  return value.replace(/\D/g, '');
}

function sanitizeTranscript(raw: unknown): ChatTranscriptEntry[] {
  if (!Array.isArray(raw)) return [];
  const entries: ChatTranscriptEntry[] = [];
  for (const item of raw.slice(-MAX_TRANSCRIPT_ENTRIES)) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const text = str(record['text'], MAX_TRANSCRIPT_CHARS);
    if (!text) continue;
    entries.push({ role: record['role'] === 'bot' ? 'bot' : 'user', text });
  }
  return entries;
}

function sanitizeRecommended(raw: unknown): { sku: string; name: string }[] {
  if (!Array.isArray(raw)) return [];
  const items: { sku: string; name: string }[] = [];
  for (const item of raw.slice(0, MAX_RECOMMENDED)) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const sku = str(record['sku'], 32);
    if (!sku) continue;
    items.push({ sku, name: str(record['name'], MAX_SHORT_FIELD) });
  }
  return items;
}

/**
 * A one-line statement of what the visitor wanted, derived from the transcript
 * when the client did not send one. Contact-only lines are skipped so the
 * requirement reads as a requirement rather than as an email address.
 */
function deriveRequirement(transcript: ChatTranscriptEntry[]): string {
  const looksLikeContact = (text: string) =>
    EMAIL_RE.test(text) || digits(text).length >= 8;

  const lines = transcript
    .filter((entry) => entry.role === 'user')
    .map((entry) => entry.text.replace(/\s+/g, ' ').trim())
    .filter((text) => text !== '' && !looksLikeContact(text));

  const picked = lines.slice(0, 3).join(' ');
  return picked.length > 400 ? `${picked.slice(0, 399)}…` : picked;
}

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  try {
    const payload = (await request.json()) as ChatLeadRequest;

    /* 1. Contact details — at least one of email / WhatsApp is required, and
          neither is invented for the sales team. */
    const email = str(payload.email, 200);
    const whatsappRaw = str(payload.whatsapp, 40);
    const whatsapp = digits(whatsappRaw);

    if (!email && !whatsapp) {
      return json(
        { ok: false, error: 'Please provide an email address or a WhatsApp number.' },
        400
      );
    }
    if (email && !EMAIL_RE.test(email)) {
      return json({ ok: false, error: 'Please provide a valid email address.' }, 400);
    }
    if (whatsappRaw && (whatsapp.length < 7 || whatsapp.length > 15)) {
      return json({ ok: false, error: 'Please provide a valid WhatsApp number.' }, 400);
    }

    /* 2. Rate limiting — a lead email costs money and lands in a human inbox. */
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (
      !hit(leadWindow, ip, MAX_LEADS_PER_IP_WINDOW, LEAD_WINDOW_MS) ||
      !hit(leadDaily, ip, MAX_LEADS_PER_IP_DAY, 24 * 60 * 60 * 1000) ||
      !hitGlobal(MAX_LEADS_GLOBAL_DAY)
    ) {
      return json(
        { ok: false, error: 'Too many submissions. Please contact us by email or WhatsApp directly.' },
        429
      );
    }

    /* 3. Turnstile — same secret and verification flow as the inquiry form. */
    if (env.TURNSTILE_SECRET_KEY) {
      const token = str(payload['cf-turnstile-response'], 4096);
      if (!token) {
        return json({ ok: false, error: 'verification_required', retryable: true }, 400);
      }
      const human = await verifyTurnstile(
        token,
        env.TURNSTILE_SECRET_KEY,
        ip === 'unknown' ? null : ip
      );
      if (!human) {
        return json({ ok: false, error: 'verification_failed', retryable: true }, 400);
      }
    }

    /* 4. Build the notification. */
    const transcript = sanitizeTranscript(payload.transcript);
    const turnCountRaw = payload.turnCount;
    const turnCount =
      typeof turnCountRaw === 'number' && Number.isFinite(turnCountRaw)
        ? Math.max(0, Math.min(50, Math.floor(turnCountRaw)))
        : 0;

    const pageUrl = str(payload.pageUrl, 300);
    const emailInput = {
      email,
      whatsapp: whatsapp ? whatsappDisplay(whatsapp) : '',
      name: str(payload.name),
      company: str(payload.company),
      country: str(payload.country),
      requirement: deriveRequirement(transcript),
      recommended: sanitizeRecommended(payload.recommended),
      transcript,
      pageUrl: /^https?:\/\//i.test(pageUrl) || pageUrl.startsWith('/') ? pageUrl : '',
      productSku: str(payload.productSku, 32),
      handoffReason: str(payload.handoffReason, 120),
      sessionId: str(payload.sessionId, 64) || 'unknown',
      turnCount,
      // Server clock — never the client's.
      createdAt: new Date().toISOString(),
      attribution: payload as Record<string, unknown>,
    };

    const html = buildChatLeadEmail(emailInput);
    const subject = buildChatLeadSubject(emailInput);

    /* 5. Send through Resend (skipped in development when unconfigured). */
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
          ...(email ? { reply_to: email } : {}),
          subject,
          html,
        }),
      });
      if (!res.ok) {
        console.error('Resend error (chat lead):', await res.text());
        return json(
          {
            ok: false,
            error: 'We could not save your details. Please email us directly or try again.',
            retryable: true,
          },
          502
        );
      }
    } else {
      console.log('[dev] Chat lead received (no RESEND_API_KEY configured):', subject);
      console.log(html);
    }

    /* 6. Only now release the company's own contact details. */
    const contactEmail = (env.CHAT_CONTACT_EMAIL || CONTACT.email).trim();
    const contactWhatsapp = digits(env.CHAT_CONTACT_WHATSAPP || CONTACT.whatsapp);

    const contact: ChatContact = {
      email: contactEmail,
      whatsapp: contactWhatsapp,
      whatsappDisplay: whatsappDisplay(contactWhatsapp),
      waLink: `https://wa.me/${contactWhatsapp}`,
      mailtoLink: `mailto:${contactEmail}`,
    };

    return json({ ok: true, contact });
  } catch (err) {
    console.error('Chat lead handler error:', err);
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
};

export const onRequest = (): Response => json({ ok: false, error: 'Method not allowed.' }, 405);
