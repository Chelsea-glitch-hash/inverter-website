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

/**
 * A purchase quantity that is itself the buying signal — "I need 20 pcs".
 *
 * Checked after the intent patterns so "what is your MOQ for 20 pcs" is still
 * classified as a bulk enquiry. The number is used only as intent: nothing in
 * the catalog declares a minimum order, so it is never echoed back.
 */
const PURCHASE_QUANTITY_RE =
  /\b\d{1,6}[\s-]*(?:pcs?|pieces?|units?|sets?|kits?|containers?|pallets?|cartons?|boxes?)\b|\b(?:a|one|two|three|four|five|ten|twenty|fifty|hundred|thousand)\s+(?:pcs?|pieces?|units?|sets?|kits?|containers?|pallets?)\b/i;

/** The same expression, global, for removing a quantity before power detection. */
const QUANTITY_CLAUSE_RE =
  /\b\d{1,6}[\s-]*(?:pcs?|pieces?|units?|sets?|kits?|containers?|pallets?|cartons?|boxes?)\b/gi;

const NOT_SURE_RE =
  /\b(not sure|not certain|no idea|don'?t know|dont know|unsure|no preference|either|whatever|recommend|suggest)\b/i;

/**
 * Someone describing what they want to run rather than naming a rating.
 *
 * This is the alternative the assistant offers to the power question, so it is
 * matched BEFORE the generic fallback: "I need an inverter for my cabin" must
 * be answered with a helpful prompt about the load, not by repeating the same
 * list of wattages back at the visitor.
 */
const APPLICATION_RE =
  /\b(?:for|to run|to power|powering|running|back(?:ing)? up|supply(?:ing)?)\b[^.!?]{0,60}\b(refrigerator|fridge|freezer|air ?condition\w*|a\/?c\b|washing machine|dryer|microwave|oven|kettle|pump|water pump|well pump|motor|compressor|welder|power tool|drill|saw|grinder|fan|light|lights|lighting|led|tv|television|computer|laptop|fridge|server|cctv|camera|router|starlink|printer|coffee machine|blender|rice cooker|hot plate|heater|air compressor|lathe|cnc|aircon)\b|\b(cabin|cottage|hut|home|house|apartment|office|shop|store|farm|ranch|boat|yacht|rv|camper|van|caravan|truck|shed|warehouse|factory|clinic|hospital|school|site|job ?site|village|off[- ]?grid|remote (?:area|location|site)|solar (?:system|setup|array)|battery bank|my (?:home|house|household|family))\b/i;

const USB_RE = /\busb\b/i;

/** Phrases that mean "without USB" — checked before the generic USB match. */
const NO_RE = /\b(no|nope|without|don'?t|do not|dont|not needed|no thanks|negative|standard)\b/i;

/** Phrases that mean "yes" when answering the USB question. */
const YES_RE = /\b(yes|yeah|yep|yup|sure|ok|okay|please|correct|need it|with it)\b/i;

export type UsbAnswer = 'yes' | 'no' | 'unsure' | null;

/**
 * Whether a message is essentially just an answer — "yes", "no", "not sure",
 * "sure", "standard".
 *
 * A chip question is asked with two chips, so the replies to it are short.
 * `detectUsbAnswer` cannot be used on its own for a message that merely
 * contains a pleasantry: its YES_RE includes "please", so
 * "please quote us for the 2500W" would read as a USB confirmation. Requiring
 * the message to be nothing but answer words keeps that safe while still
 * supporting a plain "yes" or "no".
 */
function isAnswerLike(lower: string): boolean {
  return /^(?:yes|yeah|yep|yup|sure|ok|okay|correct|no|nope|negative|standard|not sure|not certain|unsure|no idea)\b[\s.!,]*$/.test(
    lower.trim()
  );
}

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
  if (PURCHASE_QUANTITY_RE.test(text)) return 'purchase_quantity';
  return null;
}

/**
 * Strip a purchase quantity out of a message before looking for a wattage.
 *
 * "I need 20 pcs" is harmless, but "I need 500 units" contains the bare digits
 * "500" — and if 500 were a rating we build, the order size would be read as a
 * request for a 500W inverter. Removing the quantity clause first keeps an
 * order size from ever selecting a model.
 */
export function stripQuantity(text: string): string {
  return text.replace(QUANTITY_CLAUSE_RE, ' ').replace(/\s{2,}/g, ' ').trim();
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

/**
 * Quick-reply chips that answer the USB question.
 *
 * Checked alongside an explicit "usb" mention, so a bare chip reply is still
 * understood — but a chip we no longer offer, or any other bare word, is not.
 */
const CHIP_ANSWERS = new Set([WITH_USB_CHIP.toLowerCase(), WITHOUT_USB_CHIP.toLowerCase()]);

/**
 * Handoff reasons that are buying signals rather than "please solve my whole
 * problem for me": the customer is ready to transact and mainly needs a person.
 *
 * They get a shorter, more direct request for contact details — and they are
 * routed there immediately rather than being walked through product selection
 * first (the flow is a tool, not a gate).
 */
const BUYING_SIGNALS = new Set([
  'pricing_request',
  'bulk_or_oem',
  'certification_or_datasheet',
  'lead_time_or_stock',
]);

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

/**
 * The alternative to the power question: describe the load instead of the
 * rating. Offered whenever the customer does not name a power, so the
 * conversation never stalls waiting for a number they may not know.
 */
function askForApplicationReply(): string {
  return 'No problem — tell me what you need to power (for example a fridge, a pump, lights, or a whole cabin) and I can help narrow down the right size.';
}

/** Prompt for a description of the application, with the real ratings still on offer. */
function offerApplicationHelp(): string {
  return `Happy to help you work it out. ${askForApplicationReply()}\n\nIf you already have a figure in mind, our off-grid line covers ${getChatPowers().join('W, ')}W.`;
}

function askForContactReply(): string {
  return 'Please share an email address or a WhatsApp number and our sales team will send you the specifications and quotation.';
}

/** Natural contact request used when a buying signal arrives before a model is chosen. */
function askForContactFirstReply(): string {
  return 'Please share your email or WhatsApp number and our sales team will follow up with you directly.';
}

/**
 * Show a model without turning the turn into a sales moment.
 *
 * Used when the customer is plainly gathering information (browsing a rating,
 * re-asking a question) rather than moving towards a purchase: the product card
 * still goes out, but contact details are not demanded. That decision is the
 * whole point of "power is one signal, not a gate" — a question deserves an
 * answer, not a form.
 */
function showProduct(
  product: AiProduct,
  state: ChatState,
  note: string | null
): ChatTurnResult {
  state.stage = 'recommend';
  state.sku = product.sku;
  state.fallbacks = 0;

  return done(
    state,
    recommendReply(product, note, false),
    chips([OTHER_MODELS_CHIP]),
    [toProductCard(product)],
    false
  );
}

/**
 * Handoff reasons that are really questions about supplying the goods rather
 * than about which product is right.
 *
 * Stock level and lead time are not facts this site holds, so naming a model
 * does not make the answer any more accurate — it just delays the human who
 * can actually answer. These reasons stop the product flow instead of riding
 * along with it.
 */
const SUPPLY_REASONS = new Set(['lead_time_or_stock', 'purchase_quantity']);

function needsHumanOnSupply(reason: string | null): boolean {
  return reason !== null && SUPPLY_REASONS.has(reason);
}

function supplyHandoffReply(): string {
  return `That one depends on our current schedule, so let me put you in touch with the sales team.\n\n${askForContactFirstReply()}`;
}

/**
 * The recommendation body.
 *
 * `askForContact` is passed in rather than assumed: a buying signal that also
 * names a rating must still end by asking for contact details, and an
 * information turn must not. Getting this wrong is invisible in the JSON
 * (askForContact would be true while the text never asked), so it is decided
 * once here.
 */
function recommendReply(product: AiProduct, note: string | null, askForContact: boolean): string {
  const extra = note ? `\n\n${note}` : '';
  const closing = askForContact
    ? '\n\nWould you like the full specifications and a quotation? Leave your email or WhatsApp number here and our sales team will follow up with you.'
    : '';
  return `We have a ${product.name} that may suit your requirement.${extra}${closing}`;
}

/**
 * The sibling model at the same rating, when one exists with a different USB
 * configuration. Used to MENTION the alternative in the recommendation instead
 * of blocking on a question — so an unstated USB preference is a footnote, not
 * a gate.
 */
function usbVariantOf(product: AiProduct): AiProduct | undefined {
  return matchByPower(product.ratedPower).find((model) => model.usb !== product.usb);
}

/** "A USB-equipped version of this 3000W model is also available." */
function mentionVariant(product: AiProduct): string | null {
  const variant = usbVariantOf(product);
  if (!variant) return null;
  return variant.usb
    ? `A USB-equipped version of this ${product.powerLabel} model is also available — tell me if you would rather have that one.`
    : `A standard (no USB) version of this ${product.powerLabel} model is also available — tell me if you would rather have that one.`;
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

  /* 5. A watt figure we do not build — say so, offer the nearest real ratings.
        Checked BEFORE the power branch so a stock question naming a rating we
        do not sell ("do you have 1800W in stock") is not downgraded into a
        "we don't build that" answer about a product nobody asked to buy. */
  const unmatched = detectUnmatchedPower(text);
  if (unmatched !== null && needsHumanOnSupply(state.handoffReason)) {
    return done(state, supplyHandoffReply(), chips([]), [], true);
  }
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

  /* 6. A rated power was mentioned — pick from the real models at that rating.
        `state.power` is used rather than the local value because a selection
        made in an earlier turn still stands: it is the source of truth for
        which rating the conversation is about. */
  const power = detectPower(stripQuantity(text));
  if (power !== null) state.power = power;

  if (state.power !== null) {
    const rated = state.power;
    const models = matchByPower(rated);
    state.fallbacks = 0;

    /* Did this message state a USB preference?
     *
     * A message counts as an answer when it is about USB (the word, or one of
     * our two chips) OR when it is essentially nothing but an answer — "yes",
     * "no", "not sure". That second case is what makes a two-chip question
     * answerable, and it is narrow on purpose: a whole sentence that merely
     * happens to contain "no" ("we have no budget for this") or "please"
     * ("please quote us for the 2500W") is NOT read as a USB choice.
     */
    const answerLike = isAnswerLike(lower);
    const mentionsUsb = USB_RE.test(lower) || CHIP_ANSWERS.has(lower);
    const answered = mentionsUsb || answerLike ? detectUsbAnswer(text) : null;
    const statedPreference =
      mentionsUsb || answerLike
        ? answered === 'yes' || answered === 'no'
        : false;

    /* A preference the customer stated earlier still decides the model when
     * this message is about something else ("do you have it in stock?"), but a
     * fresh statement always wins. `state.usb` is carried in from the client
     * state, so there is nothing to do when this message says nothing. */
    if (statedPreference) state.usb = answered === 'yes';

    if (models.length === 1) {
      // Only one real model at this rating: nothing to disambiguate. Say so
      // rather than silently skipping a "do you have a USB version?" question.
      if (statedPreference && state.usb !== models[0].usb) {
        state.usb = models[0].usb;
        return recommend(
          models[0],
          state,
          `There is no USB version at ${rated}W — this is the model at this rating.`
        );
      }
      if (models[0].usb) return recommend(models[0], state, null, false);
      // Nothing to decide. With a buying signal the usual recommendation is
      // right; without one this is a plain information turn — show the model
      // but do not demand contact details from someone just browsing a rating.
      if (state.handoffReason !== null) return recommend(models[0], state, null);
      return showProduct(models[0], state, null);
    }

    /* Two models exist at this rating and they differ only in USB. A stated
       preference selects one; an unstated one must NOT block the
       recommendation — we put the standard model forward and mention the
       variant in passing. USB is a footnote, never a gate. */
    if (answered === 'unsure') state.usb = null;

    if (state.usb !== null) {
      const wanted = models.find((model) => model.usb === state.usb);
      if (wanted) {
        // Only a statement made in THIS message counts as buying intent; a
        // preference merely remembered from an earlier turn does not, so a
        // returning visitor re-asking a question is not nagged for contact.
        if (statedPreference || state.handoffReason !== null) {
          return recommend(wanted, state, null);
        }
        return showProduct(wanted, state, null);
      }
    }

    const mention = !statedPreference;
    const standard = models.find((model) => !model.usb) ?? models[0];

    if (needsHumanOnSupply(state.handoffReason)) {
      // A question the catalog cannot answer (stock, lead time, an order size)
      // is not made more accurate by naming a model — go to the sales team.
      return done(state, supplyHandoffReply(), chips([]), [], true);
    }

    // Nothing was decided in this message and no buying signal arrived, so this
    // is an information turn: show the standard model without pressing for
    // contact details. The variant is still mentioned in passing.
    if (state.handoffReason === null && !statedPreference && !mentionsUsb && !answerLike) {
      return showProduct(standard, state, mention ? mentionVariant(standard) : null);
    }

    return recommend(standard, state, mention ? mentionVariant(standard) : null);
  }

  /* 7. "Not sure" — help them choose instead of pushing a model. The answer is
        a question about the load, not a repeated list of wattages. */
  if (NOT_SURE_RE.test(lower)) {
    state.stage = 'power';
    state.sku = null;
    state.fallbacks = 0;
    return done(
      state,
      `${offerApplicationHelp()}\n\nA useful rule of thumb: add up the wattage of everything you want to run at the same time, then allow about 30% headroom for motor starting.`,
      chips(powerQuickReplies().filter((chip) => chip !== NOT_SURE_CHIP)),
      [],
      false
    );
  }

  /* 8. The customer is describing their load instead of naming a rating — meet
        them where they are rather than asking for watts again. */
  if (APPLICATION_RE.test(lower)) {
    state.stage = 'power';
    state.sku = null;
    state.fallbacks = 0;
    return done(state, offerApplicationHelp(), chips(powerQuickReplies()), [], false);
  }

  /* 9. A model is already on the table — keep the thread going and lean gently
         towards contact details. */
  if (state.stage === 'recommend' && state.sku) {
    const product = matchBySku(state.sku);
    const lead = product
      ? `Happy to keep going on the ${product.powerLabel}${product.usb ? ' USB-equipped' : ''} model.`
      : 'Happy to keep going.';
    return done(state, `${lead}\n\n${askForContactReply()}`, chips([OTHER_MODELS_CHIP]), [], true);
  }

  /* 10. Anything else. Naming a power is never a precondition for being helped:
         we ask about the application, and only press for contact details when
         there is a real reason to (a buying signal, or two unanswered turns). */
  state.fallbacks += 1;
  if (state.fallbacks >= 2 && !state.handoffReason) state.handoffReason = 'unresolved_question';

  if (state.handoffReason) {
    const buyingSignal = BUYING_SIGNALS.has(state.handoffReason);
    const reply = buyingSignal
      ? `Let me get a sales engineer involved.\n\n${askForContactFirstReply()}`
      : `Let me get a sales engineer involved so you get an accurate answer.\n\n${askForContactReply()}`;

    return done(state, reply, chips([]), [], true);
  }

  return done(state, offerApplicationHelp(), chips(powerQuickReplies()), [], false);
}

function handoffOf(state: ChatState): ChatHandoff {
  return { required: state.handoffReason !== null, reason: state.handoffReason ?? '' };
}

function recommend(
  product: AiProduct,
  state: ChatState,
  note: string | null,
  askForContact = true
): ChatTurnResult {
  state.stage = 'recommend';
  state.sku = product.sku;
  state.fallbacks = 0;

  const prefix = state.handoffReason ? "Thanks — I've flagged this for our sales team.\n\n" : '';
  return done(
    state,
    `${prefix}${recommendReply(product, note, askForContact)}`,
    chips([OTHER_MODELS_CHIP]),
    [toProductCard(product)],
    askForContact
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
