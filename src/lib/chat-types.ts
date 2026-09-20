/**
 * Wire types shared between the chat client (ChatWidget.astro) and the
 * Cloudflare Pages Functions (/api/chat, /api/chat-lead).
 *
 * This module is TYPES ONLY — it contains no runtime code, no product data and
 * no prompt text, so importing it from a browser-bundled script is safe and
 * costs nothing (the import is erased at build time).
 */

/** Who produced a turn in the conversation. */
export type ChatRole = 'user' | 'bot';

export interface ChatTranscriptEntry {
  role: ChatRole;
  text: string;
}

/**
 * Where the deterministic dialogue engine currently is.
 *
 *  power     — waiting for (or re-asking) a rated power
 *  usb       — power known and ambiguous (2 models); waiting for USB choice
 *  recommend — a model has been recommended; asking for contact details
 *  contact   — contact details already captured
 */
export type ChatStage = 'power' | 'usb' | 'recommend' | 'contact';

/**
 * Conversation state.
 *
 * It is held by the CLIENT (sessionStorage) and echoed back on every turn —
 * the server stays stateless. Every fact it uses (which SKU, what specs) is
 * re-derived from src/data/products.ts server-side, so a tampered client state
 * can change the flow but never the facts.
 *
 * `turnCount` and `fallbacks` are re-clamped server-side.
 */
export interface ChatState {
  stage: ChatStage;
  /** Rated power in W the customer is interested in, or null. */
  power: number | null;
  /** USB preference. null = not asked / not answered yet. */
  usb: boolean | null;
  /** SKU of the recommended model, or null. Always validated server-side. */
  sku: string | null;
  contactCaptured: boolean;
  turnCount: number;
  fallbacks: number;
  /** Why the conversation was escalated to a human, or null. */
  handoffReason: string | null;
}

/** Where the visitor was when they chatted. Personal data free. */
export interface ChatContext {
  pageUrl?: string;
  /** SKU of the product page the widget was opened on, if any. */
  productSku?: string;
}

/** Product block rendered inside the chat — real values only, never invented. */
export interface ChatProductCard {
  sku: string;
  name: string;
  /** Site-relative product detail URL, e.g. /products/off-grid-inverters/…/ */
  url: string;
  powerLabel: string;
  /** 3–5 short factual bullets, taken verbatim from the catalog. */
  bullets: string[];
}

export interface ChatHandoff {
  required: boolean;
  reason: string;
}

export interface ChatRequest {
  sessionId: string;
  message: string;
  /** True when the message came from a quick-reply chip (analytics only). */
  quickReply?: boolean;
  state?: Partial<ChatState> | null;
  context?: ChatContext | null;
  /** Recent turns, oldest first. Clamped server-side. */
  transcript?: ChatTranscriptEntry[];
  /** Cloudflare Turnstile token. Required on the first turn when configured. */
  turnstileToken?: string;
}

export interface ChatResponse {
  ok: boolean;
  error?: string;
  /** True when the failure is worth retrying (e.g. verification pending). */
  retryable?: boolean;
  reply?: string;
  quickReplies?: string[];
  products?: ChatProductCard[];
  /** The client switches its input into "email or WhatsApp" mode. */
  askForContact?: boolean;
  handoff?: ChatHandoff;
  state?: ChatState;
  /** Whether the reply was written by the model or by the rules engine. */
  source?: 'rules' | 'ai';
}

/** Company contact details — released ONLY after a lead is stored. */
export interface ChatContact {
  email: string;
  /** Digits only, international format (no "+"). */
  whatsapp: string;
  /** Display form, e.g. "+86 189 2309 4074". */
  whatsappDisplay: string;
  waLink: string;
  mailtoLink: string;
}

export interface ChatLeadRequest {
  sessionId: string;
  email?: string;
  whatsapp?: string;
  name?: string;
  company?: string;
  country?: string;
  /** SKUs the assistant actually recommended in this conversation. */
  recommended?: { sku: string; name: string }[];
  transcript?: ChatTranscriptEntry[];
  pageUrl?: string;
  productSku?: string;
  handoffReason?: string;
  turnCount?: number;
  /** Cloudflare Turnstile token (same field name as the inquiry form). */
  'cf-turnstile-response'?: string;
  /** Flat attribution fields — same names as functions/api/inquiry.ts. */
  [key: string]: unknown;
}

export interface ChatLeadResponse {
  ok: boolean;
  error?: string;
  retryable?: boolean;
  contact?: ChatContact;
}
