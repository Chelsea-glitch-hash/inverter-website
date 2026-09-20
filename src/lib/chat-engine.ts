/**
 * Deterministic sales-chat engine — "code owns the facts, AI owns the wording".
 *
 * ============================================================================
 *  Why this file exists
 * ============================================================================
 *
 * Everything that could become a lie is decided here, in TypeScript, from
 * src/data/products.ts:
 *
 *   • which products are candidates for a request (power → USB → series)
 *   • what the customer sees about them (real spec bullets, real URL)
 *   • when the conversation starts asking for contact details
 *   • when it escalates to a human and why
 *
 * The language model, when enabled, only rephrases what this module already
 * decided, and its output is fact-checked before it reaches the customer
 * (see src/lib/chat-ai.ts). With no API key configured the chat still runs the
 * entire Identify → Recommend → Capture → Handoff flow — it just sounds more
 * templated.
 *
 * Pure functions, no I/O, no network: cheap to call on every turn and easy to
 * assert against in tests.
 */
import { CHAT } from '../config';
import {
  getChatPowers,
  isKnownPower,
  matchByPower,
  matchBySku,
  nearestPowers,
  toProductCard,
  type AiProduct,
} from './ai-catalog';
import type { ChatHandoff, ChatProductCard, ChatStage, ChatState } from './chat-types';

/** Turns before the conversation is handed to a human, unless overridden. */
export const DEFAULT_MAX_TURNS = 8;

/** Assistant reply length cap — model output longer than this is dropped. */
export const MAX_REPLY_CHARS = 700;

/* ------------------------------------------------------------------ *
 * State
 * ------------------------------------------------------------------ */

export function createInitialState(): ChatState {
  return {
    stage: 'power',
    power: null,
    usb: null,
    sku: null,
    contactCaptured: false,
    turnCount: 0,
    fallbacks: 0,
    handoffReason: null,
  };
}

const STAGES: readonly ChatStage[] = ['power', 'usb', 'recommend', 'contact'];

function asCount(value: unknown, max: number): number {
  const n = typeof value === 'number' && Number.isFinite(value) ? Math.floor(value) : 0;
  return n < 0 ? 0 : n > max ? max : n;
}

/**
 * Rebuild a state object from whatever the client sent.
 *
 * The client owns the conversation state, so every field is treated as
 * untrusted input: unknown stages fall back to 'power', counters are clamped,
 * and any SKU is re-validated against the catalog — a forged state can change
 * the script but can never inject a product that does not exist.
 */
export function sanitizeState(raw: unknown, maxTurns: number): ChatState {
  const base = createInitialState();
  if (!raw || typeof raw !== 'object') return base;
  const input = raw as Record<string, unknown>;

  const stage = STAGES.includes(input['stage'] as ChatStage)
    ? (input['stage'] as ChatStage)
    : base.stage;

  const powerInput = input['power'];
  const power = typeof powerInput === 'number' && isKnownPower(powerInput) ? powerInput : null;

  const resolvedSku = typeof input['sku'] === 'string' ? matchBySku(input['sku']) : undefined;
  // Drop a SKU that is not in the catalog, or whose power contradicts the state.
  const sku = resolvedSku && (power === null || resolvedSku.ratedPower === power)
    ? resolvedSku.sku
    : null;

  return {
    stage,
    power,
    usb: typeof input['usb'] === 'boolean' ? input['usb'] : null,
    sku,
    contactCaptured: input['contactCaptured'] === true,
    turnCount: asCount(input['turnCount'], maxTurns),
    fallbacks: asCount(input['fallbacks'], 10),
    handoffReason:
      typeof input['handoffReason'] === 'string' && input['handoffReason'].trim() !== ''
        ? input['handoffReason']
        : null,
  };
}

/* ------------------------------------------------------------------ *
 * Intent detection
 * ------------------------------------------------------------------ */

/**
 * Reasons the conversation escalates to a human.
 *
 * Order matters: the first match wins, so a message that clearly asks for a
 * person is not downgraded to "pricing_request".
 */
const HANDOFF_PATTERNS: { reason: string; re: RegExp }[] = [
  {
    reason: 'customer_requested_human',
    re: /\b(human|real person|live (?:agent|chat)|agent|representative|sales ?(?:team|person|rep|manager)|talk to (?:someone|a person|your team)|speak to (?:someone|a person)|call me|contact me)\b/i,
  },
  {
    reason: 'lead_time_or_stock',
    re: /\b(lead ?time|leadtime|delivery(?: ?time)?|in ?stock|stock|inventory|availability|available|dispatch|ship(?:ping|ment)? (?:date|time)|when (?:can|will) (?:you|it|i)|ready to ship)\b/i,
  },
  {
    reason: 'pricing_request',
    re: /\b(price|pricing|quotation|quote|cost|how much|discount|fob|cif|ex.?works)\b/i,
  },
  {
    reason: 'bulk_or_oem',
    re: /\b(bulk|container|wholesale|moq|minimum order|distributor|reseller|oem|odm|private label|white label|custom(?:ised|ized)? (?:logo|brand|packaging))\b/i,
  },
  {
    reason: 'certification_or_datasheet',
    re: /\b(certificat\w*|datasheet|data sheet|spec sheet|test report|ce|ul|rohs|iec)\b/i,
  },
  {
    reason: 'after_sales',
    re: /\b(warranty|after.?sales|repair|rma|faulty|broken|not working)\b/i,
  },
  {
    reason: 'technical_question',
    re: /\b(technical|waveform|thd|efficiency|surge|peak power|overload|mppt|bms|parallel(?:ing)?)\b/i,
  },
];

const NOT_SURE_RE =
  /\b(not sure|not certain|no idea|don'?t know|dont know|unsure|no preference|either|whatever|recommend|suggest)\b/i;

const USB_RE = /\busb\b/i;

/** Phrases that mean "without USB" — checked before the generic USB match. */
const NO_RE = /\b(no|nope|without|don'?t|do not|dont|not needed|no thanks|negative|standard)\b/i;

/** Phrases that mean "yes" when answering the USB question. */
const YES_RE = /\b(yes|yeah|yep|yup|sure|ok|okay|please|correct|need it|with it)\b/i;

export type UsbAnswer = 'yes' | 'no' | 'unsure' | null;

/** Interpret a reply to "Do you need a USB port?". */
export function detectUsbAnswer(text: string): UsbAnswer {
  const value = text.trim().toLowerCase();
  if (!value) return null;
  if (NOT_SURE_RE.test(value)) return 'unsure';
  if (/\bwithout usb\b|\bno usb\b/i.test(value)) return 'no';
  if (NO_RE.test(value) && !USB_RE.test(value)) return 'no';
  if (USB_RE.test(value)) return 'yes';
  if (YES_RE.test(value)) return 'yes';
  return null;
}

/**
 * Rated power mentioned in a message, in W.
 *
 * Only two kinds of number are accepted:
 *   1. an explicit watt figure — "3000W", "3000 W", "3kW", "1800 watts"
 *   2. a bare number that is exactly a rating we build — "3000"
 *
 * A bare number that is NOT a rating is ignored on purpose: "220V output" must
 * never be read as a request for a 220W inverter.
 */
export function detectPower(text: string): number | null {
  const value = text.trim();
  if (!value) return null;

  const explicit: number[] = [];
  let m: RegExpExecArray | null;

  // kW first so "3kW" is not also scanned as the bare number 3.
  const kw = /\b(\d+(?:[.,]\d+)?)\s*kw\b/gi;
  while ((m = kw.exec(value)) !== null) {
    explicit.push(Math.round(Number(m[1].replace(',', '.')) * 1000));
  }

  const w = /\b(\d{2,5})\s*(?:w\b|watt?s?\b)/gi;
  while ((m = w.exec(value)) !== null) {
    explicit.push(Number(m[1]));
  }

  for (const candidate of explicit) {
    if (isKnownPower(candidate)) return candidate;
  }

  const bare = /\b(\d{3,5})\b/g;
  while ((m = bare.exec(value)) !== null) {
    const candidate = Number(m[1]);
    if (isKnownPower(candidate)) return candidate;
  }

  return null;
}

/** A watt figure the customer asked for that we do not build ("3500W"). */
export function detectUnmatchedPower(text: string): number | null {
  const value = text.trim();
  const re = /\b(\d+(?:[.,]\d+)?)\s*(k?w|watt?s?)\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    const unit = m[2].toLowerCase();
    const raw = Number(m[1].replace(',', '.'));
    const watts = unit.startsWith('k') ? Math.round(raw * 1000) : Math.round(raw);
    if (watts >= 100 && watts <= 20000 && !isKnownPower(watts)) return watts;
  }
  return null;
}

function detectHandoffReason(text: string): string | null {
  for (const pattern of HANDOFF_PATTERNS) {
    if (pattern.re.test(text)) return pattern.reason;
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * Turn result
 * ------------------------------------------------------------------ */

export interface ChatTurnResult {
  reply: string;
  quickReplies: string[];
  products: ChatProductCard[];
  askForContact: boolean;
  handoff: ChatHandoff;
  state: ChatState;
}

const OTHER_MODELS_CHIP = 'Show other models';
const WITH_USB_CHIP = 'With USB';
const WITHOUT_USB_CHIP = 'Without USB';
const NOT_SURE_CHIP = 'Not sure';

/** Quick replies for the power question — the real ratings, highest first. */
export function powerQuickReplies(): string[] {
  return getChatPowers()
    .slice()
    .sort((a, b) => b - a)
    .map((power) => `${power}W`)
    .concat(NOT_SURE_CHIP);
}

function chips(list: string[]): string[] {
  return CHAT.quickReplies ? list : [];
}

export function askForPowerReply(): string {
  const powers = getChatPowers();
  return `${CHAT.greeting} Our off-grid line covers ${powers.join('W, ')}W — or just tell me roughly what you need to power.`;
}

function askForUsbReply(power: number): string {
  return `Both a standard and a USB-equipped ${power}W model are available. Do you need a USB port?`;
}

function askForContactReply(): string {
  return 'Please share an email address or a WhatsApp number and our sales team will send you the specifications and quotation.';
}

function recommendReply(product: AiProduct, note: string | null): string {
  const extra = note ? `\n\n${note}` : '';
  return `We have a ${product.name} that may suit your requirement.${extra}\n\nWould you like the full specifications and a quotation? Leave your email or WhatsApp number here and our sales team will follow up with you.`;
}

/* ------------------------------------------------------------------ *
 * The turn
 * ------------------------------------------------------------------ */

interface RunOptions {
  maxTurns?: number;
  /** Handoff reason decided outside the engine (rate limits, abuse). */
  handoffReason?: string | null;
}

/**
 * Produce the next assistant turn.
 *
 * @param message  raw customer text (length-capped by the caller)
 * @param rawState conversation state as sent by the client (untrusted)
 * @param options  turn cap and any externally forced handoff reason
 */
export function runRulesTurn(
  message: string,
  rawState: unknown,
  options: RunOptions = {}
): ChatTurnResult {
  const maxTurns = options.maxTurns ?? DEFAULT_MAX_TURNS;
  const state = sanitizeState(rawState, maxTurns);
  const text = message.trim();
  const lower = text.toLowerCase();

  state.turnCount += 1;

  /* 1. Escalation intent — recorded, never dropped, but the conversation
        continues so the visitor is never left without an answer. */
  const detected = detectHandoffReason(lower);
  if (detected && !state.handoffReason) state.handoffReason = detected;
  if (options.handoffReason && !state.handoffReason) state.handoffReason = options.handoffReason;

  /* 2. Turn cap — checked before anything else so every branch escalates. */
  if (state.turnCount >= maxTurns && !state.handoffReason) state.handoffReason = 'turn_limit';

  /* 3. Lead already captured — nothing to ask for, keep it short. */
  if (state.contactCaptured) {
    state.stage = 'contact';
    return {
      reply:
        'Your details are already with our sales team — they will follow up with you. If you have another question about our off-grid inverters, ask away.',
      quickReplies: chips([OTHER_MODELS_CHIP]),
      products: [],
      askForContact: false,
      handoff: handoffOf(state),
      state,
    };
  }

  /* 4. "Show me the list again". */
  if (lower === OTHER_MODELS_CHIP.toLowerCase()) {
    state.stage = 'power';
    state.sku = null;
    return done(state, askForPowerReply(), chips(powerQuickReplies()), [], false);
  }

  /* 5. A rated power was mentioned — always wins over the USB question,
        because it changes which pair of models we are choosing from. */
  const power = detectPower(text);
  if (power !== null) {
    const samePower = state.power === power;
    state.power = power;
    if (!samePower) {
      state.usb = null;
      state.sku = null;
    }
    state.fallbacks = 0;

    const models = matchByPower(power);
    if (models.length === 1) return recommend(models[0], state, null);

    if (models.length > 1) {
      // A USB preference can arrive in the same message as the power
      // ("I need a 2500W inverter with USB"), so this turn's wording wins over
      // whatever an earlier turn stored.
      //
      // Only an explicit USB mention is trusted here: `detectUsbAnswer` accepts
      // bare pleasantries as "yes" (it was written for replies to "do you need
      // a USB port?"), and "please quote us for the 2500W" must not be read as
      // a USB confirmation.
      const stated = USB_RE.test(text) ? detectUsbAnswer(text) : null;

      if (stated === 'yes' || stated === 'no') {
        state.usb = stated === 'yes';
        const wanted =
          models.find((model) => model.usb === state.usb) ?? models.find((model) => !model.usb);
        if (wanted) return recommend(wanted, state, null);
      }

      if (stated === 'unsure') {
        // Put the standard model forward but keep the variant visibly available.
        state.usb = null;
        const standard = models.find((model) => !model.usb) ?? models[0];
        if (standard) {
          return recommend(
            standard,
            state,
            'A USB-equipped version of this rating also exists — mention it if you need one.'
          );
        }
      }

      if (state.usb !== null) {
        const wanted =
          models.find((model) => model.usb === state.usb) ?? models.find((model) => !model.usb);
        if (wanted) return recommend(wanted, state, null);
      }

      state.stage = 'usb';
      return done(state, askForUsbReply(power), chips([WITH_USB_CHIP, WITHOUT_USB_CHIP]), [], false);
    }
  }

  /* 5. A watt figure we do not build — say so, offer the nearest real ratings. */
  const unmatched = detectUnmatchedPower(text);
  if (unmatched !== null) {
    const nearest = nearestPowers(unmatched);
    const listed = nearest.map((value) => `${value}W`).join(' and ');
    state.stage = 'power';
    state.sku = null;
    state.fallbacks = 0;
    return done(
      state,
      `We don't build a ${unmatched}W off-grid inverter. The closest ratings we do have are ${listed} — would either of those work?`,
      chips(nearest.map((value) => `${value}W`)),
      [],
      false
    );
  }

  /* 6. Answering the USB question — or asking about USB for a known power. */
  if (state.power !== null && (state.stage === 'usb' || USB_RE.test(lower))) {
    const answer = detectUsbAnswer(text);

    if (answer === 'unsure') {
      // Put the standard model forward but keep the variant visibly available.
      const standard =
        matchByPower(state.power).find((model) => !model.usb) ?? matchByPower(state.power)[0];
      if (standard) {
        return recommend(
          standard,
          state,
          'A USB-equipped version of this rating also exists — mention it if you need one.'
        );
      }
    }

    if (answer === 'yes' || answer === 'no') {
      state.usb = answer === 'yes';
      const models = matchByPower(state.power);
      const wanted =
        models.find((model) => model.usb === state.usb) ??
        // No USB variant exists at this rating (5000W): never invent one.
        models.find((model) => !model.usb);

      if (wanted) {
        const note =
          wanted.usb === state.usb
            ? null
            : `There is no USB version at ${state.power}W — this is the model at this rating.`;
        return recommend(wanted, state, note);
      }
    }
  }

  /* 8. "Not sure" — help them choose instead of pushing a model. */
  if (NOT_SURE_RE.test(lower)) {
    state.stage = 'power';
    state.sku = null;
    state.fallbacks = 0;
    return done(
      state,
      `${askForPowerReply()}\n\nA useful rule of thumb: add up the wattage of everything you want to run at the same time, then allow about 30% headroom for motor starting.`,
      chips(powerQuickReplies().filter((chip) => chip !== NOT_SURE_CHIP)),
      [],
      false
    );
  }

  /* 8. A model is already on the table — re-ask for contact rather than
        restarting the conversation. */
  if (state.stage === 'recommend' && state.sku) {
    const product = matchBySku(state.sku);
    const lead = product
      ? `Happy to keep going on the ${product.powerLabel}${product.usb ? ' USB-equipped' : ''} model.`
      : 'Happy to keep going.';
    return done(state, `${lead}\n\n${askForContactReply()}`, chips([OTHER_MODELS_CHIP]), [], true);
  }

  /* 9. Anything else. */
  state.fallbacks += 1;
  if (state.fallbacks >= 2 && !state.handoffReason) state.handoffReason = 'unresolved_question';
  if (state.turnCount >= maxTurns && !state.handoffReason) state.handoffReason = 'turn_limit';

  const escalate = state.handoffReason !== null;
  const reply = escalate
    ? `Let me get a sales engineer involved so you get an accurate answer.\n\n${askForContactReply()}`
    : askForPowerReply();

  return done(state, reply, chips(escalate ? [] : powerQuickReplies()), [], escalate);
}

function handoffOf(state: ChatState): ChatHandoff {
  return { required: state.handoffReason !== null, reason: state.handoffReason ?? '' };
}

function recommend(product: AiProduct, state: ChatState, note: string | null): ChatTurnResult {
  state.stage = 'recommend';
  state.sku = product.sku;
  state.fallbacks = 0;

  const prefix = state.handoffReason ? "Thanks — I've flagged this for our sales team.\n\n" : '';
  return done(
    state,
    `${prefix}${recommendReply(product, note)}`,
    chips([OTHER_MODELS_CHIP]),
    [toProductCard(product)],
    true
  );
}

function done(
  state: ChatState,
  reply: string,
  quickReplies: string[],
  products: ChatProductCard[],
  askForContact: boolean
): ChatTurnResult {
  // An escalation always asks for contact details — that is the point of
  // escalating, and it is decided here rather than by the model.
  const needsContact = askForContact || state.handoffReason !== null;
  return {
    reply,
    quickReplies,
    products,
    askForContact: needsContact,
    handoff: handoffOf(state),
    state,
  };
}
