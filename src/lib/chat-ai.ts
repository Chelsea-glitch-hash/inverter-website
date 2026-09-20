/**
 * AI layer: provider adapter, prompt and output fact-checking.
 *
 * ============================================================================
 *  SERVER-SIDE ONLY.
 * ============================================================================
 *
 * This module is imported exclusively by functions/api/chat.ts. Nothing in a
 * browser-bundled script may import it — the API key only ever exists as a
 * Cloudflare environment variable, and the provider endpoint is never exposed
 * to the client.
 *
 * Three decisions worth knowing:
 *
 *  1. OpenAI-compatible protocol. One `callModel()` speaks to any endpoint that
 *     implements POST {base}/chat/completions with a JSON body — OpenAI, Azure,
 *     DeepSeek, Qwen/DashScope, Moonshot, Groq, OpenRouter, Together. Switching
 *     provider is a base-URL + model change, not a rewrite, and there is no SDK
 *     to keep up to date.
 *
 *  2. The model never decides product facts. It receives a shortlist the
 *     deterministic engine already chose and may only rephrase it.
 *
 *  3. Every reply is fact-checked before a customer sees it. If the check
 *     fails, the caller falls back to the deterministic wording — a rejection
 *     costs a request, never a false specification.
 */
import { COMPANY } from '../config';
import type { AiProduct } from './ai-catalog';

/* ------------------------------------------------------------------ *
 * Provider adapter
 * ------------------------------------------------------------------ */

export interface ModelConfig {
  apiKey: string;
  /** e.g. https://api.openai.com/v1 — no trailing slash required. */
  apiBase: string;
  model: string;
  timeoutMs?: number;
}

export interface ModelReply {
  reply: string;
  sku: string | null;
  handoff: boolean;
  handoffReason: string | null;
}

const DEFAULT_TIMEOUT_MS = 9000;
const MAX_OUTPUT_TOKENS = 320;

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[];
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, '');
}

/**
 * Ask the model to rephrase a decision the engine already made.
 *
 * Returns null for every failure mode (no config, HTTP error, timeout,
 * unparseable body). The caller treats null as "use the deterministic reply",
 * so a provider outage degrades the wording and never the answer.
 */
export async function callModel(
  config: ModelConfig,
  system: string,
  user: string
): Promise<ModelReply | null> {
  if (!config.apiKey || !config.apiBase || !config.model) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(`${stripTrailingSlash(config.apiBase)}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0.3,
        max_tokens: MAX_OUTPUT_TOKENS,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error('AI provider error:', res.status, (await res.text()).slice(0, 400));
      return null;
    }

    const data = (await res.json()) as ChatCompletionResponse;
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    return parseModelJson(content);
  } catch (err) {
    console.error('AI provider call failed:', err instanceof Error ? err.message : err);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Tolerant JSON extraction — models sometimes wrap output in a code fence. */
export function parseModelJson(content: string): ModelReply | null {
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .trim();

  let raw: unknown;
  try {
    raw = JSON.parse(cleaned);
  } catch {
    return null;
  }
  if (!raw || typeof raw !== 'object') return null;

  const obj = raw as Record<string, unknown>;
  const reply = typeof obj['reply'] === 'string' ? obj['reply'] : '';
  if (!reply.trim()) return null;

  const skuRaw = typeof obj['sku'] === 'string' ? obj['sku'].trim().toUpperCase() : '';
  const reasonRaw = typeof obj['reason'] === 'string' ? obj['reason'].trim() : '';

  return {
    reply,
    sku: /^INV-\d{1,4}$/.test(skuRaw) ? skuRaw : null,
    handoff: obj['handoff'] === true,
    handoffReason: reasonRaw ? reasonRaw.slice(0, 120) : null,
  };
}

/* ------------------------------------------------------------------ *
 * Prompts
 * ------------------------------------------------------------------ */

/**
 * System prompt.
 *
 * Deliberately short: it is sent on every turn, so it is the single biggest
 * fixed cost in the whole feature.
 */
export function buildSystemPrompt(): string {
  return [
    `You are the sales assistant on the website of ${COMPANY.legalName}, a Chinese manufacturer of off-grid pure sine wave inverters. You write short replies that a B2B buyer reads in a small chat widget.`,
    '',
    'HARD RULES',
    '- English only. 1-3 short sentences, 60 words maximum. Plain prose: no markdown, no bullet lists, no "Dear customer".',
    '- The CANDIDATES block below is the ONLY source of product facts. Never state a model, SKU, power rating, voltage, socket count, weight, dimension, certification, price, MOQ, lead time or stock level that is not written there.',
    '- If the customer asks for a fact that is not in CANDIDATES, say your sales team will confirm it. Never guess or approximate.',
    '- Never quote a price, discount, MOQ, lead time, warranty length or certification. Those are always "confirmed by our sales team".',
    '- Only ever use a SKU that appears in CANDIDATES.',
    '- Ask for the customer\'s email or WhatsApp number once, politely, when you recommend a model.',
    '- Set "handoff" to true if the customer asks for a human, a quotation, bulk/OEM/distributor terms, certifications, or anything you cannot answer from CANDIDATES.',
    '',
    'OUTPUT: one JSON object and nothing else.',
    '{"reply": string, "sku": string|null, "handoff": boolean, "reason": string}',
    '"sku" is the single candidate SKU you are talking about, or null.',
    '"reason" is a few words explaining a handoff, otherwise an empty string.',
  ].join('\n');
}

export interface UserPromptInput {
  message: string;
  /** What the deterministic engine already decided. */
  instruction: string;
  candidates: AiProduct[];
  /** Real rated powers, used only when no model has been shortlisted yet. */
  powerList: number[];
  transcript: { role: string; text: string }[];
}

export function buildUserPrompt(input: UserPromptInput): string {
  const candidates =
    input.candidates.length > 0
      ? input.candidates
          .map(
            (product) =>
              `- SKU ${product.sku} | ${product.name}\n  specs: ${
                product.specs.map((s) => `${s.label}=${s.value}`).join('; ') || 'none declared'
              }\n  not available: ${product.unknowns.join(', ') || 'nothing missing'}`
          )
          .join('\n')
      : `- (no specific model chosen yet) The off-grid line covers these ratings only: ${input.powerList
          .map((power) => `${power}W`)
          .join(', ')}.`;

  const history =
    input.transcript.length > 0
      ? input.transcript
          .slice(-4)
          .map((entry) => `${entry.role === 'user' ? 'Customer' : 'Assistant'}: ${entry.text.slice(0, 240)}`)
          .join('\n')
      : '(none)';

  return [
    `CANDIDATES\n${candidates}`,
    '',
    `RECENT CONVERSATION\n${history}`,
    '',
    `WHAT THE SYSTEM ALREADY DECIDED: ${input.instruction}`,
    '',
    `CUSTOMER MESSAGE: ${input.message}`,
    '',
    'Rewrite it as one short, natural sales reply. Do not add facts.',
  ].join('\n');
}

/* ------------------------------------------------------------------ *
 * Output validation — the real defence
 * ------------------------------------------------------------------ */

export interface ValidationResult {
  ok: boolean;
  reason?: string;
}

/** Claim patterns that must never come from the model. */
const POISON_PATTERNS: { reason: string; re: RegExp }[] = [
  {
    reason: 'price_claim',
    re: /(?:[$€£¥]|\b(?:usd|eur|rmb|cny|gbp)\b)\s*\d|\b\d+(?:[.,]\d+)?\s*(?:usd|eur|rmb|cny|gbp|dollars?|yuan)\b/i,
  },
  {
    reason: 'moq_claim',
    re: /\b(?:moq|minimum (?:order|quantity))\b[^.]{0,40}\b\d+/i,
  },
  {
    reason: 'lead_time_claim',
    re: /\b(?:lead ?time|delivery|dispatch|shipping|produce|production)\b[^.]{0,50}\b\d+\s*(?:day|week|month|hour)/i,
  },
  {
    reason: 'warranty_claim',
    re: /\b(?:warranty|guarantee)\b[^.]{0,30}\b\d+\s*(?:year|month)/i,
  },
  {
    reason: 'certification_claim',
    re: /\b(?:ce|ul|rohs|iec|tuv|fcc|ccc|iso\s?\d{4,5}|certified|certification)\b/i,
  },
  {
    reason: 'stock_claim',
    re: /\b(?:in stock|ex stock|ready to ship|available from stock|we have stock)\b/i,
  },
  {
    reason: 'off_catalog_claim',
    re: /\b(?:hybrid|grid[- ]?tie|on[- ]grid|accessor(?:y|ies)|charge controller|battery charger)\b/i,
  },
];

/**
 * Words that turn a preceding number into a specification claim.
 *
 * Checking "number + unit" alone misses the most natural way to state a spec —
 * "4 AC output sockets" — because the unit there is a noun, not a symbol. So a
 * number is treated as a claim when it is followed by up to three spec
 * adjectives and one of these nouns.
 */
const SPEC_NOUNS = new Set([
  'w', 'kw', 'kva', 'va', 'v', 'volt', 'volts', 'a', 'amp', 'amps', 'ah',
  'kg', 'g', 'cm', 'mm', 'inch', 'hz',
  'watt', 'watts', 'socket', 'sockets', 'port', 'ports',
]);

/** Multipliers so "3 kW" and "3000W" compare equal. */
const SPEC_SCALE: Record<string, number> = { kw: 1000, kva: 1000 };

const SPEC_ADJECTIVES = '(?:(?:ac|dc|output|input|usb|charging|rated|peak|max|nominal|continuous)\\s+){0,3}';

function numbersIn(text: string): Set<string> {
  const found = new Set<string>();
  const re = /\d+(?:[.,]\d+)?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    found.add(m[0].replace(',', '.'));
  }
  return found;
}

/**
 * Numbers in a reply that assert a specification, with the noun that makes them
 * a claim. Numbers in prose ("24 hours", "1 short reply") are not claims and
 * are deliberately left alone — they are handled by the claim patterns above.
 */
function specClaims(reply: string): { value: string; noun: string }[] {
  const claims: { value: string; noun: string }[] = [];
  const re = new RegExp(`(\\d+(?:[.,]\\d+)?)\\s*${SPEC_ADJECTIVES}([a-z]{1,12})\\b`, 'gi');

  let match: RegExpExecArray | null;
  while ((match = re.exec(reply)) !== null) {
    const noun = match[2].toLowerCase();
    if (!SPEC_NOUNS.has(noun)) continue;
    const raw = match[1].replace(',', '.');
    const scale = SPEC_SCALE[noun] ?? 1;
    claims.push({ value: String(Math.round(Number(raw) * scale)), noun });
  }
  return claims;
}

/**
 * Every number a candidate product legitimately contains.
 *
 * Numbers are compared by value in the unit's base scale, so a reply may write
 * "3 kW" for a product whose data says "3000W" without being flagged.
 */
function allowedNumbers(products: AiProduct[], extraFacts: string[] = []): Set<string> {
  const allowed = new Set<string>();
  for (const product of products) {
    const blob = [
      product.name,
      product.powerLabel,
      String(product.ratedPower),
      ...product.specs.map((s) => `${s.label} ${s.value}`),
      ...product.bullets,
    ].join(' ');
    for (const value of numbersIn(blob)) allowed.add(value);
  }
  for (const fact of extraFacts) {
    for (const value of numbersIn(fact)) allowed.add(value);
  }
  return allowed;
}

/**
 * Fact-check a model reply against the candidates it was given.
 *
 * This — not input filtering — is what makes the assistant unable to lie about
 * a product: the shortlist is compiled from src/data/products.ts, and a reply
 * that mentions a spec the data does not contain is discarded before it is
 * sent. A rejected reply costs one request; the caller falls back to wording
 * that was never generated by a model in the first place.
 */
export function validateReply(
  reply: string,
  candidates: AiProduct[],
  extraFacts: string[] = []
): ValidationResult {
  if (!reply.trim()) return { ok: false, reason: 'empty' };

  for (const pattern of POISON_PATTERNS) {
    if (pattern.re.test(reply)) return { ok: false, reason: pattern.reason };
  }

  // Any SKU the model mentions must be one of the candidates.
  const allowedSkus = new Set(candidates.map((product) => product.sku));
  const mentioned = reply.match(/\bINV-\d{1,4}\b/gi) ?? [];
  for (const sku of mentioned) {
    if (!allowedSkus.has(sku.toUpperCase())) return { ok: false, reason: 'unknown_sku' };
  }

  // Narrow the numeric check to the power level the reply actually talks about,
  // so spec values cannot leak between two models of the same rating.
  const powersInReply = new Set<number>();
  for (const product of candidates) {
    if (new RegExp(`\\b${product.ratedPower}\\s*(?:w|watt)`, 'i').test(reply)) {
      powersInReply.add(product.ratedPower);
    }
  }
  const scope =
    powersInReply.size === 1
      ? candidates.filter((product) => powersInReply.has(product.ratedPower))
      : candidates;
  const allowed = allowedNumbers(scope.length > 0 ? scope : candidates, extraFacts);

  for (const claim of specClaims(reply)) {
    if (allowed.has(claim.value)) continue;
    return { ok: false, reason: `unverified_number:${claim.value}${claim.noun}` };
  }

  return { ok: true };
}

/** Collapse a model reply into one clean paragraph of bounded length. */
export function normalizeReply(reply: string, maxChars: number): string {
  const flat = reply
    .replace(/\r/g, '')
    .replace(/\n{2,}/g, '\n')
    .split('\n')
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
    .filter((line) => line !== '')
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return flat.length > maxChars ? `${flat.slice(0, maxChars - 1).trimEnd()}…` : flat;
}
