/**
 * Shared pieces of the internal lead-notification email.
 *
 * The chat lead email deliberately mirrors the inquiry email built in
 * functions/api/inquiry.ts — same visual language, same attribution section
 * headings, same field names — so the sales team reads one format regardless
 * of which form on the site produced the lead.
 *
 * The helpers here are pure string builders: no network, no secrets.
 */
import type { ChatTranscriptEntry } from './chat-types';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Attribution field names, identical to the inquiry payload. */
export const FIRST_TOUCH_FIELDS = [
  'attr_first_source',
  'attr_first_medium',
  'attr_first_campaign',
  'attr_first_term',
  'attr_first_content',
] as const;

export const LAST_TOUCH_FIELDS = [
  'attr_last_source',
  'attr_last_medium',
  'attr_last_campaign',
  'attr_last_term',
  'attr_last_content',
] as const;

export const META_FIELDS = ['attr_gclid', 'attr_landing_page', 'attr_referrer'] as const;

const FIRST_LABELS: Record<string, string> = {
  attr_first_source: 'Source',
  attr_first_medium: 'Medium',
  attr_first_campaign: 'Campaign',
  attr_first_term: 'Term',
  attr_first_content: 'Content',
};

const LAST_LABELS: Record<string, string> = {
  attr_last_source: 'Source',
  attr_last_medium: 'Medium',
  attr_last_campaign: 'Campaign',
  attr_last_term: 'Term',
  attr_last_content: 'Content',
};

const META_LABELS: Record<string, string> = {
  attr_gclid: 'GCLID',
  attr_landing_page: 'Landing Page',
  attr_referrer: 'Referrer',
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Render an attribution block as a row group; empty blocks render nothing. */
export function renderAttributionSection(
  heading: string,
  fields: readonly string[],
  labelMap: Record<string, string>,
  data: Record<string, unknown>
): string {
  const rows: string[] = [];
  for (const field of fields) {
    const value = data[field];
    if (typeof value !== 'string' || value.trim() === '') continue;
    rows.push(
      `<tr><td style="padding:6px 12px;color:#64748b;">${labelMap[field] || field}</td><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(value)}</td></tr>`
    );
  }
  if (rows.length === 0) return '';
  return `<h3 style="color:#245299;margin-top:20px;margin-bottom:6px;">${heading}</h3>
    <table style="border-collapse:collapse;border:1px solid #e2e8f0;">${rows.join('')}</table>`;
}

function rows(pairs: [string, string][]): string {
  const filled = pairs.filter(([, value]) => value.trim() !== '');
  if (filled.length === 0) return '';
  return `<table style="border-collapse:collapse;border:1px solid #e2e8f0;">${filled
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;">${label}</td><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(value)}</td></tr>`
    )
    .join('')}</table>`;
}

export interface ChatLeadEmailInput {
  email: string;
  whatsapp: string;
  name: string;
  company: string;
  country: string;
  requirement: string;
  recommended: { sku: string; name: string }[];
  transcript: ChatTranscriptEntry[];
  pageUrl: string;
  productSku: string;
  handoffReason: string;
  sessionId: string;
  turnCount: number;
  createdAt: string;
  /** Flat attribution payload (attr_* keys). */
  attribution: Record<string, unknown>;
}

/**
 * The lead email.
 *
 * Every section the sales team needs to answer without asking the customer to
 * repeat themselves: who they are, what they asked for, what the assistant
 * offered, the full transcript, and where the visit came from.
 */
export function buildChatLeadEmail(input: ChatLeadEmailInput): string {
  const contactBlock = rows([
    ['Email', input.email],
    ['WhatsApp', input.whatsapp],
    ['Name', input.name],
    ['Company', input.company],
    ['Country', input.country],
  ]);

  const recommendedBlock =
    input.recommended.length > 0
      ? `<table style="border-collapse:collapse;border:1px solid #e2e8f0;">${input.recommended
          .map(
            (item) =>
              `<tr><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(item.sku)}</td><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(item.name)}</td></tr>`
          )
          .join('')}</table>`
      : '<p style="color:#94a3b8;font-size:12px;">No product was recommended before the lead was captured.</p>';

  const transcriptBlock =
    input.transcript.length > 0
      ? `<table style="border-collapse:collapse;border:1px solid #e2e8f0;">${input.transcript
          .map(
            (entry) =>
              `<tr><td style="padding:6px 12px;color:#64748b;vertical-align:top;">${
                entry.role === 'user' ? 'Customer' : 'Assistant'
              }</td><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(entry.text).replace(/\n/g, '<br>')}</td></tr>`
          )
          .join('')}</table>`
      : '<p style="color:#94a3b8;font-size:12px;">No transcript was captured.</p>';

  const metaBlock = rows([
    ['Chat Session ID', input.sessionId],
    ['Turns in Conversation', String(input.turnCount)],
    ['Current Page URL', input.pageUrl],
    ['Product Viewed (SKU)', input.productSku],
    ['Handoff Reason', input.handoffReason],
    ['Created At', input.createdAt],
  ]);

  const firstBlock = renderAttributionSection(
    'First Touch Attribution',
    FIRST_TOUCH_FIELDS,
    FIRST_LABELS,
    input.attribution
  );
  const lastBlock = renderAttributionSection(
    'Last Touch Attribution',
    LAST_TOUCH_FIELDS,
    LAST_LABELS,
    input.attribution
  );
  const attributionMeta = renderAttributionSection(
    'Attribution Meta',
    META_FIELDS,
    META_LABELS,
    input.attribution
  );

  const hasAttribution = Boolean(firstBlock || lastBlock || attributionMeta);

  return `
  <div style="font-family:Arial,sans-serif;max-width:680px;">
    <h2 style="color:#245299;">New Chat Lead (AI Sales Assistant)</h2>

    <h3 style="color:#245299;margin-top:20px;margin-bottom:6px;">Contact</h3>
    ${contactBlock}

    <h3 style="color:#245299;margin-top:20px;margin-bottom:6px;">Customer Requirement</h3>
    <p style="color:#0f172a;margin:0;white-space:pre-line;">${
      input.requirement.trim() ? escapeHtml(input.requirement) : 'Not stated in the chat.'
    }</p>

    <h3 style="color:#245299;margin-top:20px;margin-bottom:6px;">Recommended Product(s)</h3>
    ${recommendedBlock}

    <h3 style="color:#245299;margin-top:20px;margin-bottom:6px;">Conversation Transcript</h3>
    ${transcriptBlock}

    <h3 style="color:#245299;margin-top:20px;margin-bottom:6px;">Session</h3>
    ${metaBlock}

    ${
      hasAttribution
        ? `${firstBlock}${lastBlock}${attributionMeta}`
        : '<p style="color:#94a3b8;font-size:12px;">No UTM / attribution data captured.</p>'
    }
  </div>`;
}

/** Internal notification subject line. */
export function buildChatLeadSubject(input: ChatLeadEmailInput): string {
  const who = input.email || (input.whatsapp ? `WhatsApp ${input.whatsapp}` : 'unknown contact');
  const product = input.recommended.length > 0 ? input.recommended[0].sku : 'no model yet';
  return `Chat lead: ${who} — ${product} (${input.country || 'unknown country'})`;
}
