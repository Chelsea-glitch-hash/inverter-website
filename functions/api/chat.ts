/**
 * Cloudflare Pages Function: POST /api/chat
 *
 * The only place in the project that talks to an AI provider. The browser
 * posts a turn here; the function decides the facts, optionally asks the model
 * to rephrase them, verifies the result, and answers.
 *
 * Pipeline
 *   1. shape validation  (message / state / transcript are all untrusted)
 *   2. rate limiting     (per IP, per day, and a global daily ceiling)
 *   3. Turnstile         (required on the first turn when configured)
 *   4. deterministic engine  — decides products, escalates, asks for contact
 *   5. model rewrite     (optional; only rephrases step 4)
 *   6. fact-check        (SKU whitelist + spec-number guard + claim guard)
 *
 * Security properties this file is responsible for:
 *   - the API key exists only as a Cloudflare environment variable
 *   - the provider URL is never sent to, or accepted from, the browser
 *   - the model name, endpoint and system prompt are server-owned; any
 *     client-supplied value with those names is ignored outright
 *   - a reply that fails the fact check is discarded, not softened — the
 *     customer then sees deterministic wording that cannot be hallucinated
 *   - no PII is sent to the model (emails / phone numbers are redacted)
 *
 * Environment variables
 *   AI_API_KEY        provider key (absent -> chat runs on rules only)
 *   AI_API_BASE       OpenAI-compatible base URL (no default — set by the operator)
 *   AI_MODEL          model id (no default — set by the operator)
 *   CHAT_AI_ENABLED   set to "true" to enable the AI rewrite layer
 *   CHAT_MAX_TURNS    turns before handing off to a human, default 8
 *   TURNSTILE_SECRET_KEY  same secret the inquiry form uses
 *
 * The AI layer engages only when all four of CHAT_AI_ENABLED=true, AI_API_KEY,
 * AI_API_BASE and AI_MODEL are present. No provider or model name is baked into
 * this code — swapping providers is a base-URL + model change. With no AI
 * configuration at all the chat still works end to end on the rules engine.
 */
import {
  DEFAULT_MAX_TURNS,
  MAX_REPLY_CHARS,
  runRulesTurn,
  type ChatTurnResult,
} from '../../src/lib/chat-engine';
import { getChatPowers, matchByPower, matchBySku, type AiProduct } from '../../src/lib/ai-catalog';
import {
  buildSystemPrompt,
  buildUserPrompt,
  callModel,
  normalizeReply,
  validateReply,
} from '../../src/lib/chat-ai';
import type { ChatRequest, ChatResponse, ChatTranscriptEntry } from '../../src/lib/chat-types';

interface Env {
  AI_API_KEY?: string;
  AI_API_BASE?: string;
  AI_MODEL?: string;
  CHAT_AI_ENABLED?: string;
  CHAT_MAX_TURNS?: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface Context {
  request: Request;
  env: Env;
}

/** Input caps. They bound both token spend and abuse surface. */
const MAX_MESSAGE_CHARS = 500;
const MAX_TRANSCRIPT_ENTRIES = 10;
const MAX_TRANSCRIPT_CHARS = 400;

/** Rate limits. In-memory per isolate — see the note in `hit()`. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_IP_WINDOW = 30;
const MAX_PER_IP_DAY = 250;
const MAX_GLOBAL_DAY = 5000;

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function json(body: ChatResponse, status = 200): Response {
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

const ipWindow = new Map<string, Counter>();
const ipDaily = new Map<string, Counter>();
let globalDay: Counter = { count: 0, resetAt: 0 };

function prune(map: Map<string, Counter>, now: number): void {
  if (map.size < 400) return;
  for (const [key, value] of map) {
    if (value.resetAt <= now) map.delete(key);
  }
}

/**
 * Fixed-window counter.
 *
 * In-memory, so it is per-isolate and best effort: it reliably stops one
 * client hammering one edge location, but it is not a distributed quota. A
 * hard quota needs KV or a Durable Object, which this version deliberately
 * does not add. The Turnstile gate plus the per-conversation turn cap are what
 * actually bound the cost of a determined abuser.
 */
function hit(map: Map<string, Counter>, key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  prune(map, now);
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
  if (globalDay.resetAt <= now) globalDay = { count: 1, resetAt: now + 24 * 60 * 60 * 1000 };
  else if (globalDay.count >= limit) return false;
  else globalDay.count += 1;
  return true;
}

function parseMaxTurns(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10);
  if (!Number.isFinite(parsed) || parsed < 2 || parsed > 20) return DEFAULT_MAX_TURNS;
  return parsed;
}

function sanitizeTranscript(raw: unknown): ChatTranscriptEntry[] {
  if (!Array.isArray(raw)) return [];
  const entries: ChatTranscriptEntry[] = [];
  for (const item of raw.slice(-MAX_TRANSCRIPT_ENTRIES)) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const text = typeof record['text'] === 'string' ? record['text'].trim() : '';
    if (!text) continue;
    entries.push({
      role: record['role'] === 'bot' ? 'bot' : 'user',
      text: text.slice(0, MAX_TRANSCRIPT_CHARS),
    });
  }
  return entries;
}

/**
 * Strip anything that looks like contact details before text reaches the
 * model. The lead endpoint — not the model — is where personal data belongs.
 */
function redactForModel(text: string): string {
  return text
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/g, '[email]')
    .replace(/\+?\d[\d\s\-()]{7,}\d/g, '[number]');
}

/* ------------------------------------------------------------------ *
 * AI layer
 * ------------------------------------------------------------------ */

/**
 * The AI rewrite layer is opt-in and fully config-driven: it engages only when
 * the operator has explicitly switched it on and supplied a key, a base URL and
 * a model. Nothing here names a provider or a model, so the same code runs
 * against any OpenAI-compatible endpoint. When this returns false we never touch
 * the network — the deterministic engine answers on its own.
 */
function aiEnabled(env: Env): boolean {
  if ((env.CHAT_AI_ENABLED ?? '').trim().toLowerCase() !== 'true') return false;
  return Boolean(
    env.AI_API_KEY?.trim() && env.AI_API_BASE?.trim() && env.AI_MODEL?.trim()
  );
}

/** Which products the model is allowed to talk about this turn. */
function pickCandidates(base: ChatTurnResult): AiProduct[] {
  const fromCards = base.products
    .map((card) => matchBySku(card.sku))
    .filter((product): product is AiProduct => Boolean(product));
  if (fromCards.length > 0) return fromCards;

  if (base.state.power !== null) return matchByPower(base.state.power);
  return [];
}

/**
 * Turn the engine's decision into one sentence of instruction for the model.
 *
 * The instruction describes the SHAPE of the reply the code already decided on
 * — it is never a licence to add a fact. Note the last case: when nothing has
 * been shortlisted we ask about the application, because a rated power is one
 * matching signal rather than a gate the customer has to pass.
 */
function instructionFor(base: ChatTurnResult): string {
  if (base.handoff.required) {
    if (base.state.contactCaptured) {
      return 'The lead is already captured. Acknowledge the sales follow-up briefly and do not ask for contact details again.';
    }
    return 'The customer needs a sales answer we cannot verify (price, quotation, bulk terms, certifications, lead time or stock, or they asked for a person). Acknowledge it briefly and ask for their email or WhatsApp so the sales team can follow up.';
  }
  if (base.products.length > 0) {
    return base.askForContact
      ? `Recommend ${base.products.map((card) => card.sku).join(' or ')} and ask for the customer's email or WhatsApp number.`
      : `Talk about ${base.products.map((card) => card.sku).join(' or ')} plainly. Answer the question and keep the conversation moving; do not push for contact details this turn.`;
  }
  if (base.state.stage === 'usb') {
    return 'Ask whether they need a USB port — both a standard and a USB-equipped model exist at this rating.';
  }
  if (base.state.contactCaptured) {
    return 'The lead is already captured. Answer briefly and do not ask for contact details again.';
  }
  if (base.askForContact) {
    return 'A buying signal came up that we cannot answer from the catalog. Say briefly that the sales team will confirm it, and ask for the customer\'s email or WhatsApp number.';
  }
  return 'No model has been shortlisted yet. Do not ask for a rated power — ask what equipment the customer needs to power, or answer the question they asked.';
}

/* ------------------------------------------------------------------ *
 * Handler
 * ------------------------------------------------------------------ */

export const onRequestPost = async ({ request, env }: Context): Promise<Response> => {
  try {
    const payload = (await request.json()) as ChatRequest;

    /* 1. Input validation. Note that `model`, `apiBase` and `system` are
          never read from the payload — the server owns all three. */
    const message =
      typeof payload.message === 'string' ? payload.message.trim().slice(0, MAX_MESSAGE_CHARS) : '';
    if (!message) return json({ ok: false, error: 'Please type a message.' }, 400);

    const sessionId =
      typeof payload.sessionId === 'string' ? payload.sessionId.slice(0, 64) : 'anonymous';
    const transcript = sanitizeTranscript(payload.transcript);
    const incomingState = payload.state ?? null;

    /* 2. Rate limiting. */
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (!hit(ipWindow, ip, MAX_PER_IP_WINDOW, WINDOW_MS)) {
      return json(
        { ok: false, error: 'Too many messages. Please wait a few minutes or contact us by email.' },
        429
      );
    }
    if (!hit(ipDaily, ip, MAX_PER_IP_DAY, 24 * 60 * 60 * 1000) || !hitGlobal(MAX_GLOBAL_DAY)) {
      return json(
        { ok: false, error: 'Too many messages today. Please contact us by email or WhatsApp.' },
        429
      );
    }

    /* 3. Turnstile on the first turn only. */
    const stateTurnCount =
      incomingState && typeof incomingState === 'object' && typeof (incomingState as Record<string, unknown>)['turnCount'] === 'number'
        ? ((incomingState as Record<string, unknown>)['turnCount'] as number)
        : 0;
    const isFirstTurn = stateTurnCount <= 0;

    if (env.TURNSTILE_SECRET_KEY && isFirstTurn) {
      const token = typeof payload.turnstileToken === 'string' ? payload.turnstileToken : '';
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

    /* 4. Deterministic engine — this is what actually decides the answer. */
    const maxTurns = parseMaxTurns(env.CHAT_MAX_TURNS);
    const base = runRulesTurn(message, incomingState, { maxTurns });

    /* 5. Optional model rewrite. */
    let reply = base.reply;
    let source: 'rules' | 'ai' = 'rules';

    if (aiEnabled(env)) {
      const candidates = pickCandidates(base);
      const powerFacts = getChatPowers().map((power) => `${power}W`);

      const modelReply = await callModel(
        {
          apiKey: (env.AI_API_KEY ?? '').trim(),
          apiBase: (env.AI_API_BASE ?? '').trim(),
          model: (env.AI_MODEL ?? '').trim(),
        },
        buildSystemPrompt(),
        buildUserPrompt({
          message: redactForModel(message),
          instruction: instructionFor(base),
          candidates,
          powerList: getChatPowers(),
          transcript: transcript.map((entry) => ({
            role: entry.role,
            text: redactForModel(entry.text),
          })),
        })
      );

      if (modelReply) {
        const normalized = normalizeReply(modelReply.reply, MAX_REPLY_CHARS);
        const check = validateReply(normalized, candidates, powerFacts);

        if (check.ok) {
          reply = normalized;
          source = 'ai';
        } else {
          // Never soften a failed check — the customer sees the wording the
          // code wrote, which cannot contain an invented specification.
          console.warn(`[chat] discarded AI reply (${check.reason}) for session ${sessionId}`);
        }

        if (modelReply.handoff && !base.handoff.required) {
          base.handoff = { required: true, reason: 'ai_escalation' };
          base.state.handoffReason = 'ai_escalation';
          base.askForContact = true;
        }
      }
    }

    /* 6. Respond. Product cards always come from the engine, never the model. */
    return json({
      ok: true,
      reply,
      quickReplies: base.quickReplies,
      products: base.products,
      askForContact: base.askForContact,
      handoff: base.handoff,
      state: base.state,
      source,
    });
  } catch (err) {
    console.error('[chat] handler error:', err);
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
};

export const onRequest = (): Response =>
  json({ ok: false, error: 'Method not allowed.' }, 405);
