/**
 * UTM / attribution capture and persistence (first + last touch).
 *
 * Captures utm_source / utm_medium / utm_campaign / utm_term /
 * utm_content and gclid on every page load, then:
 *  - last touch  -> sessionStorage (updated whenever new params arrive)
 *  - first touch -> localStorage   (kept across sessions)
 *  - landing page + referrer      -> sessionStorage
 *
 * The InquiryForm injects these fields as hidden inputs so every
 * inquiry email answers "where did this customer come from?".
 */

export interface Attribution {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  gclid: string;
  landingPage: string;
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

/** Merged attribution snapshot for the current visitor. */
export function getAttribution(): Attribution {
  const last = readJson(sessionStorage, SESSION_KEY);
  const first = readJson(localStorage, FIRST_TOUCH_KEY);
  // Last touch describes the *current* campaign, so it wins on overlap.
  const combined = { ...first, ...last };
  return {
    source: combined['utm_source'] || '',
    medium: combined['utm_medium'] || '',
    campaign: combined['utm_campaign'] || '',
    term: combined['utm_term'] || '',
    content: combined['utm_content'] || '',
    gclid: combined['gclid'] || '',
    landingPage: sessionStorage.getItem(LANDING_KEY) || '',
    referrer: sessionStorage.getItem(REFERRER_KEY) || '',
  };
}
