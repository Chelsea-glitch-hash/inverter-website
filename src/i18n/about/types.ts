/**
 * Shape of the About page content dictionary.
 *
 * The About page template renders ONLY from this structure, so a new language
 * is a new dictionary file that must satisfy this interface - the compiler
 * reports anything missing, and no page markup has to be duplicated.
 *
 * Rules for translators / future locales:
 *  - Keep every user-facing string in a dictionary, never in the template.
 *  - URLs and slugs stay in the template: routing is not translated yet.
 *  - Numbers may need local formatting; treat values as display strings.
 */

export interface AboutStat {
  /** Display value, e.g. "10,000㎡+" */
  value: string;
  /** What the value measures, e.g. "Production & Operations Space" */
  label: string;
}

export interface AboutPoint {
  title: string;
  text: string;
}

/** A picture slot: real image when supplied, labelled placeholder until then. */
export interface AboutImageSlot {
  alt: string;
  placeholder: string;
}

export interface AboutContent {
  seo: {
    title: string;
    description: string;
  };

  hero: {
    eyebrow: string;
    heading: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    image: AboutImageSlot;
  };

  glance: {
    eyebrow: string;
    title: string;
    stats: AboutStat[];
  };

  focus: {
    eyebrow: string;
    title: string;
    intro: string;
    points: AboutPoint[];
  };

  capability: {
    eyebrow: string;
    title: string;
    intro: string;
    image: AboutImageSlot;
    space: AboutStat;
    testing: {
      value: string;
      label: string;
      areasLabel: string;
      areas: string[];
    };
    quality: {
      value: string;
      label: string;
      passRate: AboutStat;
    };
    /**
     * Production-floor photo strip. These are factory-floor / test-site
     * images, NOT product photos - captions must describe the scene, never
     * name or imply a product series.
     */
    gallery: {
      label: string;
      title: string;
      intro: string;
      items: {
        caption: string;
        image: AboutImageSlot;
      }[];
    };
  };

  portfolio: {
    eyebrow: string;
    title: string;
    intro: string;
    applicationsLabel: string;
    applications: string[];
    cta: string;
  };

  oem: {
    eyebrow: string;
    title: string;
    text: string;
  };

  global: {
    eyebrow: string;
    title: string;
    intro: string;
    image: AboutImageSlot;
    metrics: AboutStat[];
    flowLabel: string;
    flow: string[];
    positioning: string[];
  };

  vision: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };

  finalCta: {
    title: string;
    subtitle: string;
  };
}
