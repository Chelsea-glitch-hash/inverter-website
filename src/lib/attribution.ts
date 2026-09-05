/**
 * UTM / attribution capture and persistence (first + last touch).
 *
 * Captures utm_source / utm_medium / utm_campaign / utm_term /
 * utm_content and gclid on every page load, then:
 *  - last touch  -> sessionStorage (updated whenever new params arrive)
 *  - first touch -> localStorage   (kept across sessions)
 *  - landing page + referrer      -> sessionStorage
 *
 * The InquiryForm injects BOTH first-touch and last-touch as hidden
 * inputs so every inquiry email can answer "where did this customer
 * first come from?" (first touch) and "what campaign drove this
 * conversion?" (last touch). Direct visits are never mistaken for a
 * marketing source because sessionStorage is only updated when a
 * real campaign signal (UTM or gclid) is present.
 */

export interface TouchData {
  /** Source of the touch, e.g. "google", "linkedin", "edm" */
  source: string;
  /** Medium, e.g. "organic", "cpc", "social", "email" */
  medium: string;
  /** Campaign name from utm_campaign */
  campaign: string;
  /** Paid keyword from utm_term */
  term: string;
  /** Creative / ad variant from utm_content */
  content: string;
  /** Google Ads click identifier (when present) */
  gclid: string;
}

export interface AttributionData {
  /** First touch kept across sessions; null if never seen a campaign. */
  first: TouchData | null;
  /** Last touch for the current session; null if no campaign seen. */
  last: TouchData | null;
  /** First page seen this session. */
  landingPage: string;
  /** External referrer when user first arrived. */
  referrer: string;
}

const SESSION_KEY = 'attr_last_touch';
const FIRST_TOUCH_KEY = 'attr_first_touch';
const LANDING_KEY = 'attr_landing';
const REFERRER_KEY = 'attr_referrer';

const UTM_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

function readJson(storage: Storage | null, key: string): Record<string, string> {
  if (!storage) return {};
  try {
    return JSON.parse(storage.getItem(key) || '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

function writeJson(storage: Storage | null, key: string, value: Record<string, string>) {
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) - attribution is best-effort */
  }
}

/** Internal: convert stored JSON into a TouchData object (or null when empty). */
function toTouch(raw: Record<string, string>): TouchData | null {
  if (Object.keys(raw).length === 0) return null;
  return {
    source: raw['utm_source'] || '',
    medium: raw['utm_medium'] || '',
    campaign: raw['utm_campaign'] || '',
    term: raw['utm_term'] || '',
    content: raw['utm_content'] || '',
    gclid: raw['gclid'] || '',
  };
}

/** Internal: read first and last touches as separated objects (never merged). */
function readTouches(): { first: TouchData | null; last: TouchData | null } {
  const firstRaw = readJson(localStorage, FIRST_TOUCH_KEY);
  const lastRaw = readJson(sessionStorage, SESSION_KEY);
  return { first: toTouch(firstRaw), last: toTouch(lastRaw) };
}

/** Called once on every page load by src/scripts/tracking.ts */
export function captureAttribution(): void {
  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_FIELDS.some((f) => params.get(f));
  const gclid = params.get('gclid');

  // Landing page: first page seen this session
  if (!sessionStorage.getItem(LANDING_KEY)) {
    sessionStorage.setItem(LANDING_KEY, window.location.pathname);
  }
  // Document referrer: only if we came from outside the site
  if (
    document.referrer &&
    !document.referrer.includes(window.location.hostname) &&
    !sessionStorage.getItem(REFERRER_KEY)
  ) {
    sessionStorage.setItem(REFERRER_KEY, document.referrer);
  }

  if (hasUtm || gclid) {
    const touch: Record<string, string> = {};
    for (const f of UTM_FIELDS) {
      const v = params.get(f);
      if (v) touch[f] = v;
    }
    if (gclid) touch['gclid'] = gclid;
    // Default source for gclid-only clicks (Google Ads auto-tagging)
    if (gclid && !touch['utm_source']) {
      touch['utm_source'] = 'google';
      touch['utm_medium'] = 'cpc';
    }

    // Last touch: always updated on new campaign params
    writeJson(sessionStorage, SESSION_KEY, touch);
    // First touch: only stored if nothing stored yet
    if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
      writeJson(localStorage, FIRST_TOUCH_KEY, touch);
    }
  }
}

/**
 * Full attribution snapshot for the current visitor with EXPLICIT first/last.
 * UI uses this to populate both the inquiry hidden fields and the email body.
 * Direct visits leave both `first` and `last` as null instead of inventing
 * "direct" traffic, so downstream analytics still recognize the absence of
 * campaign data as "no marketing source seen this journey".
 */
export function getAttribution(): AttributionData {
  const { first, last } = readTouches();
  return {
    first,
    last,
    landingPage: sessionStorage.getItem(LANDING_KEY) || '',
    referrer: sessionStorage.getItem(REFERRER_KEY) || '',
  };
}
