/**
 * Contact details a customer typed into an ordinary chat message.
 *
 * Shared on purpose: the browser widget uses this to decide whether a message
 * *is* a lead, and the rules engine uses it to decide whether the customer has
 * just handed their details over — and therefore must not be asked again. One
 * implementation means the two can never disagree.
 *
 * Kept dependency-free and side-effect-free: it is bundled into the client
 * script as well as the server bundle.
 */

/** An email address, as a customer types it. Unambiguous, so it needs no cue. */
export const EMAIL_IN_TEXT_RE = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/;

/** A run of digits long enough to be a phone number, separators allowed. */
export const PHONE_IN_TEXT_RE = /\+?\d[\d\s()\-]{6,}\d/g;

/**
 * Words that introduce a phone number.
 *
 * A digit run without a country code is not proof of anything on its own: the
 * same shape appears in ordinary business messages — a price bracket
 * ("15000 20000 USD", ten digits once joined), a quantity ("20000 30000 pcs")
 * or an order reference ("order 1234567890"). Reading those as a number would
 * swallow the customer's question and file a lead that never existed, so a
 * number without a "+" has to be announced by one of these words to count.
 */
const CONTACT_CUE_RE = /\b(?:whats\s?app|call|phone|number|reach|contact)/i;

/**
 * A message that is nothing but a number — no words around it at all.
 *
 * Used only while the composer is waiting for details: there, digits on their
 * own are the answer to the question we just asked. Everywhere else this shape
 * is not evidence of anything, which is why "15000 20000 USD" (a price
 * bracket), "20000 30000 pcs" (a quantity) and "order 1234567890" (a
 * reference) all stay ordinary content.
 */
const ONLY_NUMBER_RE = /^[\s+()\-.\d]+$/;

export interface DetectedContact {
  email: string;
  whatsapp: string;
}

export interface DetectContactOptions {
  /**
   * True when the assistant has just asked for details and the composer is
   * waiting for them ("Your email or WhatsApp…"). A customer answering that
   * question may type nothing but the number, which is unambiguous in context —
   * but only when the message is *nothing but* the number, so a business
   * message that happens to arrive while the question is open is still read as
   * business content rather than filed as a lead.
   */
  awaiting?: boolean;
}

/**
 * Pick the email address and phone number out of a message, if any.
 *
 * A number is accepted when either
 *   - it carries a country code ("+86 189 2309 4074"), or
 *   - it has at least ten digits and the message says what it is
 *     ("WhatsApp 8618923094074", "reach me on 4155550134"), or
 *   - the composer is waiting for details and the message is only that number.
 * Everything else is ordinary content: 3000W, 20 pcs, 48V, "3000 4000",
 * "15000 20000 USD", "20000 30000 pcs", "order 1234567890".
 */
export function detectContact(text: string, options: DetectContactOptions = {}): DetectedContact | null {
  const email = text.match(EMAIL_IN_TEXT_RE)?.[0] ?? '';
  /* Words that introduce the number, or the number on its own in answer to our
     own question. Anything else of this shape is business content. */
  const introduced = CONTACT_CUE_RE.test(text) || (options.awaiting === true && ONLY_NUMBER_RE.test(text));

  let whatsapp = '';
  for (const candidate of text.match(PHONE_IN_TEXT_RE) ?? []) {
    const digits = candidate.replace(/\D/g, '');
    if (digits.length < 8 || digits.length > 15) continue;
    if (candidate.startsWith('+') || (digits.length >= 10 && introduced)) {
      whatsapp = digits;
      break;
    }
  }

  if (!email && !whatsapp) return null;
  return { email, whatsapp };
}
