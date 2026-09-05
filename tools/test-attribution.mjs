// Attribution lifecycle + chain simulation.
//
// We mock window.location, document.referrer, sessionStorage, localStorage
// to verify the real attribution rules across multi-touch scenarios, and
// then validate the full chain:
//
//   capture  ->  getAttribution  ->  InquiryForm hidden fields
//                                     ->  /api/inquiry payload  ->  email HTML
//
// Run: node tools/test-attribution.mjs
// Dependencies: none (pure Node, no imports).

const memory = { session: {}, local: {} };
const sessionStorage = {
  getItem: (k) => (k in memory.session ? memory.session[k] : null),
  setItem: (k, v) => { memory.session[k] = String(v); },
};
const localStorage = {
  getItem: (k) => (k in memory.local ? memory.local[k] : null),
  setItem: (k, v) => { memory.local[k] = String(v); },
};

const URLSearchParams = globalThis.URLSearchParams;
const JSON = globalThis.JSON;

globalThis.window = globalThis.window || {};
globalThis.document = globalThis.document || {};

// --------------- inline mirror of src/lib/attribution.ts ----------------
const SESSION_KEY = 'attr_last_touch';
const FIRST_TOUCH_KEY = 'attr_first_touch';
const LANDING_KEY = 'attr_landing';
const REFERRER_KEY = 'attr_referrer';
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function readJson(storage, key) {
  try { return JSON.parse(storage.getItem(key) || '{}'); } catch { return {}; }
}
function writeJson(storage, key, value) {
  try { storage.setItem(key, JSON.stringify(value)); } catch {}
}

function captureAttribution(search, referrer, landingPathname) {
  const params = new URLSearchParams(search);
  const hasUtm = UTM_FIELDS.some((f) => params.get(f));
  const gclid = params.get('gclid');

  if (!sessionStorage.getItem(LANDING_KEY)) {
    sessionStorage.setItem(LANDING_KEY, landingPathname || '/');
  }
  if (referrer && !sessionStorage.getItem(REFERRER_KEY)) {
    sessionStorage.setItem(REFERRER_KEY, referrer);
  }
  if (hasUtm || gclid) {
    const touch = {};
    for (const f of UTM_FIELDS) {
      const v = params.get(f);
      if (v) touch[f] = v;
    }
    if (gclid) touch['gclid'] = gclid;
    if (gclid && !touch['utm_source']) {
      touch['utm_source'] = 'google';
      touch['utm_medium'] = 'cpc';
    }
    writeJson(sessionStorage, SESSION_KEY, touch);
    if (!localStorage.getItem(FIRST_TOUCH_KEY)) {
      writeJson(localStorage, FIRST_TOUCH_KEY, touch);
    }
  }
}

function toTouch(raw) {
  if (Object.keys(raw).length === 0) return null;
  return {
    source:   raw['utm_source']   || '',
    medium:   raw['utm_medium']   || '',
    campaign: raw['utm_campaign'] || '',
    term:     raw['utm_term']     || '',
    content:  raw['utm_content']  || '',
    gclid:    raw['gclid']        || '',
  };
}
function readTouches() {
  return {
    first: toTouch(readJson(localStorage, FIRST_TOUCH_KEY)),
    last:  toTouch(readJson(sessionStorage, SESSION_KEY)),
  };
}
function getAttribution() {
  const { first, last } = readTouches();
  return {
    first,
    last,
    landingPage: sessionStorage.getItem(LANDING_KEY) || '',
    referrer:    sessionStorage.getItem(REFERRER_KEY) || '',
  };
}

// --------------- inline mirror of InquiryForm field injection ---------------
function buildHiddenFields(attr) {
  const f = (n) => attr.first?.[n] || '';
  const l = (n) => attr.last?.[n]  || '';
  return {
    attr_source:        l('source'),
    attr_medium:        l('medium'),
    attr_campaign:      l('campaign'),
    attr_term:          l('term'),
    attr_content:       l('content'),
    attr_gclid:         l('gclid'),
    attr_landing_page:  attr.landingPage,
    attr_referrer:      attr.referrer,
    attr_first_source:   f('source'),
    attr_first_medium:   f('medium'),
    attr_first_campaign: f('campaign'),
    attr_first_term:     f('term'),
    attr_first_content:  f('content'),
    attr_last_source:    l('source'),
    attr_last_medium:    l('medium'),
    attr_last_campaign:  l('campaign'),
    attr_last_term:      l('term'),
    attr_last_content:   l('content'),
  };
}

// --------------- inline mirror of /api/inquiry email HTML builder ------------
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
const FIRST_TOUCH = ['attr_first_source', 'attr_first_medium', 'attr_first_campaign', 'attr_first_term', 'attr_first_content'];
const LAST_TOUCH  = ['attr_last_source',  'attr_last_medium',  'attr_last_campaign',  'attr_last_term',  'attr_last_content'];
const META        = ['attr_gclid', 'attr_landing_page', 'attr_referrer'];
const LEGACY      = ['attr_source', 'attr_medium', 'attr_campaign', 'attr_term', 'attr_content'];
const FIRST_LABELS = { attr_first_source: 'Source', attr_first_medium: 'Medium', attr_first_campaign: 'Campaign', attr_first_term: 'Term', attr_first_content: 'Content' };
const LAST_LABELS  = { attr_last_source:  'Source', attr_last_medium:  'Medium', attr_last_campaign:  'Campaign', attr_last_term:  'Term', attr_last_content:  'Content' };
const META_LABELS  = { attr_gclid: 'GCLID', attr_landing_page: 'Landing Page', attr_referrer: 'Referrer' };
const LEGACY_LABELS= { attr_source: 'Source (legacy/last)', attr_medium: 'Medium (legacy/last)', attr_campaign: 'Campaign (legacy/last)', attr_term: 'Term (legacy/last)', attr_content: 'Content (legacy/last)' };

function renderSection(heading, fields, labels, data) {
  const rows = fields.map((f) => {
    const v = data[f];
    if (!v) return '';
    return `<tr><td style="padding:6px 12px;color:#64748b;">${labels[f]}</td><td style="padding:6px 12px;color:#0f172a;">${escapeHtml(v)}</td></tr>`;
  }).filter(Boolean);
  if (rows.length === 0) return '';
  return `<h3>${heading}</h3><table>${rows.join('')}</table>`;
}
function buildEmailHtml(payload) {
  const blocks = [
    renderSection('First Touch Attribution', FIRST_TOUCH, FIRST_LABELS, payload),
    renderSection('Last Touch Attribution',  LAST_TOUCH,  LAST_LABELS,  payload),
    renderSection('Attribution Meta',        META,        META_LABELS,  payload),
    renderSection('Legacy Attribution (v0.1.0 compatibility)', LEGACY, LEGACY_LABELS, payload),
  ].filter(Boolean);
  return blocks.join('\n');
}

function reset() {
  for (const k of Object.keys(memory.session)) delete memory.session[k];
  for (const k of Object.keys(memory.local)) delete memory.local[k];
}
function snap(label) {
  const a = getAttribution();
  console.log(`[${label}]`);
  console.log('  first:', JSON.stringify(a.first));
  console.log('  last :', JSON.stringify(a.last));
  console.log('  landing:', a.landingPage, '  referrer:', a.referrer);
  return a;
}

// ====================== TESTS ======================

console.log('================ Test 1: Google Organic (first=last) ================');
reset();
captureAttribution('?utm_source=google&utm_medium=organic&utm_campaign=brand', 'https://www.google.com/', '/');
const t1 = snap('after 1st touch');
const pass1 =
  t1.first?.source === 'google' &&
  t1.first?.medium === 'organic' &&
  t1.first?.campaign === 'brand' &&
  t1.last?.source === 'google' &&
  t1.referrer === 'https://www.google.com/';
console.log('  → PASS:', pass1);
console.log();

console.log('================ Test 2: LinkedIn second touch (last overrides, first preserved) ================');
captureAttribution('?utm_source=linkedin&utm_medium=social&utm_campaign=q3-b2b', 'https://www.linkedin.com/feed', '/products/');
const t2 = snap('after 2nd touch');
const pass2 =
  t2.first?.source === 'google' &&  // first preserved
  t2.first?.medium === 'organic' &&
  t2.last?.source === 'linkedin' && // last updated
  t2.last?.medium === 'social';
console.log('  → PASS:', pass2);
console.log();

console.log('================ Test 3: Direct third visit (must NOT overwrite last) ================');
captureAttribution('', '', '/about');
const t3 = snap('after 3rd touch (Direct)');
const pass3 =
  t3.first?.source === 'google' &&
  t3.last?.source === 'linkedin' &&
  t3.referrer === 'https://www.google.com/'; // original referrer kept
console.log('  → PASS:', pass3);
console.log();

console.log('================ Test 4: Google Ads gclid auto-completes to google/cpc ================');
reset();
captureAttribution('?gclid=ABC123XYZ', 'https://www.google.com/', '/products/hybrid-inverters/hv-5000/');
const t4 = snap('after gclid touch');
const pass4 =
  t4.first?.source === 'google' &&
  t4.first?.medium === 'cpc' &&
  t4.first?.gclid === 'ABC123XYZ';
console.log('  → PASS:', pass4);
console.log();

console.log('================ Test 5: EDM full 5-UTM preserved ================');
reset();
captureAttribution('?utm_source=edm&utm_medium=email&utm_campaign=launch2026&utm_term=inverter&utm_content=hero', '', '/');
const t5 = snap('after EDM');
const pass5 =
  t5.first?.source === 'edm' &&
  t5.first?.medium === 'email' &&
  t5.first?.campaign === 'launch2026' &&
  t5.first?.term === 'inverter' &&
  t5.first?.content === 'hero';
console.log('  → PASS:', pass5);
console.log();

console.log('================ Test 6: First visit Direct (first/last stay null) ================');
reset();
captureAttribution('', '', '/');
const t6 = snap('first direct visit');
const pass6 =
  t6.first === null &&
  t6.last === null &&
  t6.landingPage === '/';
console.log('  → PASS:', pass6);
console.log();

// ================ CHAIN TEST: Browser -> InquiryForm -> inquiry.ts -> email ================
console.log('================ Test 7: End-to-end chain (Google Organic then LinkedIn then inquiry on HV-5000) ================');
reset();
captureAttribution('?utm_source=google&utm_medium=organic&utm_campaign=brand', 'https://www.google.com/', '/');
captureAttribution('?utm_source=linkedin&utm_medium=social&utm_campaign=q3-b2b&utm_term=hybrid&utm_content=cta', 'https://www.linkedin.com/feed', '/products/hybrid-inverters/hv-5000/');
const attr = getAttribution();
const hidden = buildHiddenFields(attr);
// Simulate product page injecting the SKU via the form select.
hidden.product = 'HV-5000';
hidden.country = 'Germany';
const emailHtml = buildEmailHtml(hidden);

const chain_pass_first = hidden.attr_first_source === 'google' && hidden.attr_first_medium === 'organic';
const chain_pass_last  = hidden.attr_last_source === 'linkedin' && hidden.attr_last_campaign === 'q3-b2b' && hidden.attr_last_term === 'hybrid';
const chain_pass_legacy= hidden.attr_source === 'linkedin' && hidden.attr_medium === 'social';
const chain_pass_meta  = hidden.attr_landing_page === '/' && hidden.attr_referrer === 'https://www.google.com/';
const chain_pass_email = emailHtml.includes('First Touch Attribution')
                      && emailHtml.includes('google')
                      && emailHtml.includes('organic')
                      && emailHtml.includes('Last Touch Attribution')
                      && emailHtml.includes('linkedin')
                      && emailHtml.includes('q3-b2b')
                      && emailHtml.includes('hybrid')
                      && emailHtml.includes('Attribution Meta')
                      && emailHtml.includes('Landing Page')
                      && emailHtml.includes('Referrer')
                      && emailHtml.includes('Legacy Attribution');

const pass7 = chain_pass_first && chain_pass_last && chain_pass_legacy && chain_pass_meta && chain_pass_email;
console.log('  first_source on hidden =', hidden.attr_first_source, '(expect google)');
console.log('  last_source on hidden  =', hidden.attr_last_source,  '(expect linkedin)');
console.log('  legacy attr_source     =', hidden.attr_source,        '(expect linkedin, last-wins)');
console.log('  email contains First Touch:', emailHtml.includes('First Touch Attribution'));
console.log('  email contains Last Touch:',  emailHtml.includes('Last Touch Attribution'));
console.log('  email contains Meta:       ', emailHtml.includes('Attribution Meta'));
console.log('  → PASS:', pass7);
console.log();

// ====================== SUMMARY ======================
console.log('================ Summary ================');
const all = [pass1, pass2, pass3, pass4, pass5, pass6, pass7];
console.log('Passes:', all.filter(Boolean).length, '/', all.length);
process.exit(all.every(Boolean) ? 0 : 1);
