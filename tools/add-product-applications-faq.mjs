/**
 * One-off backfill: adds `applications` and `faq` to every product in
 * src/data/products.ts.
 *
 * WHY A SCRIPT
 *   The two fields are inserted immediately before each product's `seo:` block
 *   (or before the closing brace when there is none), which is a mechanical,
 *   position-sensitive edit across 35 objects — doing it by hand invites a
 *   mis-placed brace. The script is idempotent: a product that already declares
 *   `applications` or `faq` is left untouched.
 *
 * CONTENT RULES (the project's truth rule, enforced here)
 *   Every sentence is derived from fields that already exist on the product:
 *   ratedPower, productType, series, specifications.* (acOutput, outputSockets,
 *   dcInputVoltage, mpptRange, display, usb, powerRating) and the fact that the
 *   whole catalog is off-grid / pure sine wave. Nothing is invented: no
 *   efficiency figure, no certification, no protection feature, no warranty,
 *   no operating temperature, no battery chemistry — none of those are supplied
 *   data, so none of them appear.
 *
 *   `certifications` is deliberately NOT touched. The only certificates on hand
 *   are issued to Dongguan Powermerry Technology Co., Ltd. and the company's
 *   relationship to that entity is unconfirmed, so the field stays empty.
 *
 * Usage: node tools/add-product-applications-faq.mjs [--write]
 *   Without --write it prints a diff preview and changes nothing.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const PATH = 'src/data/products.ts';
const write = process.argv.includes('--write');

const q = (text) => text.replace(/'/g, "\\'");

/* --------------------------------------------------------------------------
 * Applications — grouped by product family. The strings describe use cases
 * that the listed electrical characteristics actually support; they do not
 * assert a rating or a capability that is not in `specifications`.
 * ------------------------------------------------------------------------ */
const APPS = {
  // Low-power standalone units (INV-001)
  STANDALONE_LOW: [
    'Small off-grid solar power systems',
    'Portable and backup power supplies',
    'Rural electrification and remote sites',
    'Caravan, RV and marine auxiliary power',
  ],
  // P-Series and 1159-Series, 1800W–3000W
  P_SERIES: [
    'Residential off-grid solar power systems',
    'Backup power for homes and small offices',
    'Rural electrification and remote sites',
    'Caravan, RV and marine auxiliary power',
  ],
  // P-Series with USB (INV-007…009)
  P_SERIES_USB: [
    'Residential off-grid solar power systems',
    'Backup power for homes and small offices',
    'Off-grid sites needing direct USB charging',
    'Caravan, RV and marine auxiliary power',
  ],
  // Higher-power 1159-Series (4000W / 5000W)
  HIGH_POWER: [
    'Residential and small commercial off-grid systems',
    'Backup power for homes and workshops',
    'Rural electrification and remote sites',
    'Off-grid systems supporting multiple AC loads',
  ],
  // Multi-voltage 1900W / 2300W / 3200W
  MULTI_VOLTAGE: [
    'Off-grid systems with mixed DC input requirements',
    'Distribution and reseller product ranges',
    'Backup power for homes and small offices',
    'Rural electrification and remote sites',
  ],
  // Residential solar wall units, INV-013…035
  SOLAR_RESIDENTIAL: [
    'Residential off-grid solar power systems',
    'Backup power for homes and small businesses',
    'Rural electrification and remote sites',
    'Off-grid systems with battery storage',
  ],
  // 8kW+ residential solar units
  SOLAR_HIGH_POWER: [
    'Residential off-grid solar power systems',
    'Backup power for larger homes and small businesses',
    'Rural electrification and remote sites',
    'Off-grid systems supporting multiple circuits',
  ],
};

/** Which application group each product ID belongs to. */
const APP_GROUP = {
  'INV-001': 'STANDALONE_LOW',
  'INV-002': 'P_SERIES', 'INV-003': 'P_SERIES', 'INV-004': 'P_SERIES',
  'INV-005': 'HIGH_POWER', 'INV-006': 'HIGH_POWER',
  'INV-007': 'P_SERIES_USB', 'INV-008': 'P_SERIES_USB', 'INV-009': 'P_SERIES_USB',
  'INV-010': 'MULTI_VOLTAGE', 'INV-011': 'MULTI_VOLTAGE', 'INV-012': 'MULTI_VOLTAGE',
  'INV-013': 'SOLAR_RESIDENTIAL', 'INV-014': 'SOLAR_RESIDENTIAL',
  'INV-015': 'SOLAR_RESIDENTIAL', 'INV-016': 'SOLAR_RESIDENTIAL',
  'INV-017': 'SOLAR_RESIDENTIAL', 'INV-018': 'SOLAR_RESIDENTIAL',
  'INV-019': 'SOLAR_RESIDENTIAL', 'INV-020': 'SOLAR_RESIDENTIAL',
  'INV-021': 'SOLAR_RESIDENTIAL', 'INV-022': 'SOLAR_HIGH_POWER',
  'INV-023': 'SOLAR_HIGH_POWER', 'INV-024': 'SOLAR_RESIDENTIAL',
  'INV-025': 'SOLAR_RESIDENTIAL', 'INV-026': 'SOLAR_RESIDENTIAL',
  'INV-027': 'SOLAR_RESIDENTIAL', 'INV-028': 'SOLAR_RESIDENTIAL',
  'INV-029': 'SOLAR_RESIDENTIAL', 'INV-030': 'SOLAR_RESIDENTIAL',
  'INV-031': 'SOLAR_HIGH_POWER', 'INV-032': 'SOLAR_HIGH_POWER',
  'INV-033': 'SOLAR_HIGH_POWER', 'INV-034': 'SOLAR_RESIDENTIAL',
  'INV-035': 'SOLAR_RESIDENTIAL',
};

/* --------------------------------------------------------------------------
 * FAQs — built from the product's own spec values. Each entry declares which
 * spec keys it needs; the entry is skipped when a needed value is absent, so
 * a question never appears with an answer the data cannot support.
 * ------------------------------------------------------------------------ */
/**
 * Turns a printed specification value into something that reads as a sentence.
 * The catalog prints values the way a datasheet does ("220V / 110V optional",
 * "Intelligent Temperature-Controlled Fan"); dropped into prose unchanged they
 * read like a form field. Only formatting changes here — never the meaning.
 */
function prose(value) {
  if (!value) return value;
  return value
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\s+optional\b/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * "a" / "an" for the following word.
 *
 * An all-caps token (LCD, USB, MPPT) is spoken letter by letter, so the choice
 * follows the SOUND of that letter, not whether it is a written vowel: L is
 * "el" → "an LCD"; U is "you" → "a USB". Lowercase words use the plain vowel
 * test.
 */
const LETTER_SOUNDS_AS_VOWEL = new Set(['A', 'E', 'F', 'H', 'I', 'L', 'M', 'N', 'O', 'R', 'S', 'X']);
const article = (phrase) => {
  // Only the leading word decides the article, so callers may pass a whole
  // phrase such as "LCD smart display".
  const word = phrase.trim().split(/\s+/)[0] ?? '';
  const first = word[0] ?? '';
  if (/^[A-Z0-9]{2,}$/.test(word)) {
    // Multi-letter acronym (LCD, USB): decide on the spoken sound of the
    // leading letter.
    return LETTER_SOUNDS_AS_VOWEL.has(first.toUpperCase()) ? 'an' : 'a';
  }
  return 'aeiou'.includes(first.toLowerCase()) ? 'an' : 'a';
};

/** A spec value that carries no information must not reach prose. */
const isUnknown = (value) => !value || /^tbc$/i.test(value.trim());

/**
 * Lowercases a spec value for mid-sentence use while preserving acronyms and
 * model numbers: "LCD Smart Display" -> "LCD smart display",
 * "Intelligent Temperature-Controlled Fan" -> "intelligent ... fan",
 * "Digital Display" -> "digital display".
 */
const sentenceCase = (value) =>
  value
    .split(' ')
    .map((word) =>
      // Keep tokens that are all-caps (LCD, USB), contain a digit (3K, 24V),
      // or are already lowercase.
      /^[A-Z0-9]+$/.test(word) || /\d/.test(word) ? word : word.toLowerCase()
    )
    .join(' ');

function faqFor(p) {
  const s = p.specs;
  const out = [];
  const short = p.name;

  // Power rating — always available (drives the power page). Wording avoids
  // any claim about what is printed on the unit or its packaging.
  {
    const va = s.powerRating ? ` (${prose(s.powerRating)})` : '';
    out.push({
      question: `What is the rated power of the ${short}?`,
      answer: `It is rated at ${p.ratedPower}W${va}. The same rating appears in the specification table above.`,
    });
  }

  // DC input voltage
  if (s.dcInputVoltage) {
    const v = prose(s.dcInputVoltage);
    const isMulti = /[/,]/.test(v);
    out.push({
      question: `What DC input voltage does the ${short} use?`,
      answer: isMulti
        ? `It accepts ${v} DC input, so it can be matched to different battery bank configurations.`
        : `It operates on a ${v} battery bank, as listed in the specification table above.`,
    });
  }

  // MPPT range (solar models)
  if (s.mpptRange) {
    out.push({
      question: `What is the MPPT operating range of the ${short}?`,
      answer: `The MPPT operating range is ${s.mpptRange}. The array voltage should be designed to fall inside this window under normal operating conditions.`,
    });
  }

  // AC output. The catalog values are "220V / 110V optional" / "220V optional",
  // so the sentence is built from the voltage list only — the word "optional"
  // is turned into a clause rather than left dangling.
  if (s.acOutput) {
    const optional = /optional/i.test(s.acOutput);
    const v = prose(s.acOutput.replace(/\s*optional\b/i, ''));
    const isMulti = /[/,]/.test(v);
    const list = isMulti ? `${v} AC output` : `a ${v} AC output`;
    out.push({
      question: `Which AC output voltage is available for the ${short}?`,
      answer: optional
        ? `It is available with ${list}; the required option is specified at order stage.`
        : `It provides ${list}, as listed in the specification table above.`,
    });
  }

  if (s.outputSockets) {
    const n = Number(s.outputSockets);
    const word = { 1: 'one', 2: 'two', 3: 'three', 4: 'four' }[n] ?? s.outputSockets;
    out.push({
      question: `How many AC output sockets does the ${short} have?`,
      answer: `It provides ${word} AC output socket${n === 1 ? '' : 's'}, as listed in the specification table above.`,
    });
  }

  if (s.display) {
    const d = sentenceCase(s.display);
    out.push({
      question: `Does the ${short} have a display?`,
      answer: `Yes. It is fitted with ${article(d)} ${d}.`,
    });
  }

  if (s.usb) {
    out.push({
      question: `Does the ${short} have USB charging?`,
      answer: 'Yes. This model includes a USB output; the supplied configuration is listed in the specification table above.',
    });
  }

  if (!isUnknown(s.cooling)) {
    const c = sentenceCase(s.cooling);
    out.push({
      question: `How is the ${short} cooled?`,
      answer: `It uses ${article(c)} ${c}.`,
    });
  }

  // Pure sine wave — true for every product in this catalog (asserted by
  // productType), so it is always safe to state.
  out.push({
    question: `Is the output of the ${short} a pure sine wave?`,
    answer: 'Yes. The output is a pure sine wave, which suits equipment that requires a stable, clean AC waveform.',
  });

  // Dimensions / weight. Either value may be "TBC" in the source catalog — a
  // placeholder must never be read out as if it were a figure, so the entry is
  // dropped entirely when neither side carries real data, and each half is
  // omitted when only one does.
  {
    const dims = isUnknown(s.dimensions) ? undefined : s.dimensions;
    const weight = isUnknown(s.netWeight) ? undefined : s.netWeight;
    if (dims && weight) {
      out.push({
        question: 'What are the dimensions and weight?',
        answer: `The enclosure measures ${dims} and the unit weighs ${weight}.`,
      });
    } else if (dims) {
      out.push({
        question: 'What are the dimensions?',
        answer: `The enclosure measures ${dims}.`,
      });
    } else if (weight) {
      out.push({
        question: 'What is the unit weight?',
        answer: `The unit weighs ${weight}.`,
      });
    }
  }

  return out;
}

/* ------------------------------------------------------------------ parse */

const src = readFileSync(PATH, 'utf8');

/**
 * Walk the PRODUCTS array object by object using brace counting, so we know
 * precisely where each product starts and ends. String literals and comments
 * are respected closely enough for this file's shape (no braces inside
 * strings are present in practice, and comments are single-line).
 */
function findProductBlocks(text) {
  const blocks = [];
  const idRe = /\n    id: "(INV-\d+)",/g;
  let m;
  while ((m = idRe.exec(text)) !== null) {
    const start = m.index + 1; // start of the `id:` line's indentation
    // find the product's opening brace: the line `  {` above `id:`
    const open = text.lastIndexOf('\n  {', start);
    // walk braces from `open` to find its matching close
    let depth = 0;
    let i = open;
    let inStr = null;
    for (; i < text.length; i++) {
      const ch = text[i];
      if (inStr) {
        if (ch === '\\') { i++; continue; }
        if (ch === inStr) inStr = null;
        continue;
      }
      if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue; }
      if (ch === '/' && text[i + 1] === '/') { // line comment
        const nl = text.indexOf('\n', i);
        i = nl === -1 ? text.length : nl;
        continue;
      }
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) break;
      }
    }
    blocks.push({ id: m[1], start: open, end: i + 1 });
  }
  return blocks;
}

const blocks = findProductBlocks(src);

/** Pull the spec values we need by regexing the block's own text. */
function parseBlock(blockText) {
  const specsStart = blockText.indexOf('specifications: {');
  const specsEnd = blockText.indexOf('\n    },', specsStart);
  const specText = specsStart === -1 ? '' : blockText.slice(specsStart, specsEnd === -1 ? undefined : specsEnd);
  const spec = (key) => {
    const hit = specText.match(new RegExp(`${key}: "([^"]*)"`));
    return hit ? hit[1] : undefined;
  };
  const power = blockText.match(/powerRating: "([^"]*)"/);
  return {
    name: (blockText.match(/name: "([^"]*)"/) || [])[1],
    ratedPower: (blockText.match(/ratedPower: (\d+)/) || [])[1],
    specs: {
      powerRating: power ? power[1] : undefined,
      acOutput: spec('acOutput'),
      outputSockets: spec('outputSockets'),
      dcInputVoltage: spec('dcInputVoltage'),
      mpptRange: spec('mpptRange'),
      display: spec('display'),
      usb: spec('usb'),
      cooling: spec('cooling'),
      dimensions: spec('dimensions'),
      netWeight: spec('netWeight'),
    },
  };
}

const renderStringArray = (key, values, indent = '    ') =>
  `${indent}${key}: [\n${values.map((v) => `${indent}  "${v}",`).join('\n')}\n${indent}],\n`;

const renderFaq = (entries, indent = '    ') => {
  const body = entries
    .map(
      (e) =>
        `${indent}  {\n${indent}    question: "${e.question}",\n${indent}    answer: "${q(e.answer)}",\n${indent}  },`
    )
    .join('\n');
  return `${indent}faq: [\n${body}\n${indent}],\n`;
};

/* ------------------------------------------------------------------ apply */

// Process from the bottom up so earlier offsets stay valid.
let out = src;
const report = [];

for (const b of blocks.reverse()) {
  const blockText = src.slice(b.start, b.end);
  const parsed = parseBlock(blockText);

  if (/^\s*applications:/m.test(blockText) || /\n    faq: \[/.test(blockText)) {
    report.push(`${b.id}  SKIP (already has applications/faq)`);
    continue;
  }

  const group = APP_GROUP[b.id];
  if (!group) throw new Error(`No application group mapped for ${b.id}`);

  let insert =
    '\n' +
    renderStringArray('applications', APPS[group]) +
    '\n' +
    renderFaq(faqFor(parsed));

  // Insert immediately before `    seo: {` when present, else before the
  // product's closing brace (`\n  }`) minus the trailing comma handling.
  const seoIdx = blockText.indexOf('\n    seo: {');
  let posInBlock;
  if (seoIdx !== -1) {
    posInBlock = seoIdx + 1; // keep the leading newline of the seo block
    insert = insert.trimEnd() + '\n';
  } else {
    // no seo block: insert before the final `  }` of the product
    const closeIdx = blockText.lastIndexOf('\n  }');
    posInBlock = closeIdx + 1;
  }

  const abs = b.start + posInBlock;
  out = out.slice(0, abs) + insert + out.slice(abs);
  report.push(`${b.id}  +applications(${APPS[group].length}) +faq(${faqFor(parsed).length})`);
}

console.log(report.join('\n'));

if (write) {
  writeFileSync(PATH, out, 'utf8');
  console.log(`\nWROTE ${PATH}`);
} else {
  console.log('\n(dry run — pass --write to apply)');
}
