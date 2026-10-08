/**
 * Site-wide UI dictionary — ENGLISH SOURCE (single source of truth).
 *
 * Every user-facing string outside the product catalog and the About page
 * lives here. Other locales implement the same Dictionary shape in
 * src/i18n/ui/<locale>.ts; getDict() in src/i18n/index.ts resolves them and
 * falls back to English at the dictionary level.
 *
 * Placeholders: strings containing {name} style tokens are filled at render
 * time with fill() — values interpolated are facts (numbers, company data)
 * and are identical in every language.
 */

export const en = {
  nav: {
    products: 'Products',
    factory: 'Factory',
    quality: 'Quality',
    about: 'About',
    blog: 'Blog',
    viewAllProducts: 'View all products',
    requestQuote: 'Request a Quote',
    whatsappUs: 'WhatsApp Us',
    mainNavAria: 'Main navigation',
    mobileNavAria: 'Mobile navigation',
    toggleMenuAria: 'Toggle navigation menu',
    languageAria: 'Change language',
    skipToContent: 'Skip to content',
  },

  footer: {
    productsHeading: 'Products',
    allProducts: 'All products',
    companyHeading: 'Company',
    aboutUs: 'About us',
    factoryAndManufacturing: 'Factory & Manufacturing',
    qualityControl: 'Quality Control',
    blogInsights: 'Blog & Insights',
    contactUs: 'Contact us',
    privacyPolicy: 'Privacy policy',
    stayUpdated: 'Stay updated',
    newsletterBlurb: 'Product updates, technical insights and company news.',
    blurb: 'professional inverter manufacturer since {year}. OEM / ODM partner for {countries}+ countries.',
    whatsappLabel: 'WhatsApp',
    emailAria: 'Email',
    rights: 'All rights reserved.',
    productCategoriesAria: 'Product categories',
    companyNavAria: 'Company',
  },

  newsletter: {
    emailLabel: 'Email address',
    subscribe: 'Subscribe',
    consent: 'I agree to receive product updates, technical information and company news by email. I can unsubscribe at any time.',
    success: 'Subscribed — welcome aboard.',
    error: 'Subscription failed. Please try again later.',
  },

  consent: {
    text: 'We use cookies to understand how the website is used and to improve your experience. Marketing cookies are only used with your consent. See our',
    privacyLink: 'privacy policy',
    reject: 'Necessary only',
    accept: 'Accept all',
    aria: 'Cookie consent',
  },

  cta: {
    defaultTitle: 'Request a Quote Today',
    defaultSubtitle: 'Send us your requirements — our sales engineers reply within 24 hours with pricing, lead times and OEM options.',
    defaultButton: 'Request a Quote',
    whatsapp: 'Chat on WhatsApp',
    midTitle: 'Need pricing or a custom solution?',
    midSubtitle: 'Send us your requirements — our sales engineers reply within 24 hours.',
  },

  common: {
    home: 'Home',
    viewDetails: 'View details',
    getQuote: 'Get a quote',
    requestQuote: 'Request a Quote',
    viewProducts: 'View Products',
    browseAllProducts: 'Browse all products',
    readAllArticles: 'Read all articles',
    featured: 'Featured',
    ratedOutput: 'rated output',
    contactSales: 'Contact Sales',
    quoteForModel: 'Get a Quote for This Model',
    productOverview: 'Product Overview',
    technicalSpecifications: 'Technical Specifications',
    keyFeatures: 'Key Features',
    packagingInformation: 'Packaging Information',
    applications: 'Applications',
    downloads: 'Downloads',
    relatedProducts: 'Related Products',
    relatedSameCategory: 'More options in {category}',
    relatedMoreModels: 'More models from our catalog',
    relatedGuides: 'Related Guides',
    relatedGuidesSubtitle: 'Technical articles from our engineering team',
    standard: 'Standard',
    product: 'Product',
    viewCertificate: 'View Certificate',
    viewCertificateSr: '(opens the PDF in a new tab)',
    specifications: 'Specifications',
    model: 'model',
    models: 'models',
    since: 'Since',
    oemBullets: [
      'OEM / ODM branding available for volume orders',
      'Datasheet and pricing on request',
      'Reply within 24 hours on business days',
    ],
    pageAria: {
      productCategories: 'Product categories',
    },
  },

  seo: {
    home: {
      title: '{brand} — Inverter Manufacturer for Global B2B Partners',
      description:
        'Professional solar inverter manufacturer since {year}. Hybrid, grid-tie and off-grid inverters with OEM/ODM support, ISO 9001 quality system and factory-direct pricing. Export to {countries}+ countries.',
    },
    productsIndex: {
      title: 'All Products — Inverter Catalog',
      description:
        'Browse our current inverter catalog: off-grid power inverters from 900W to 5000W, with OEM/ODM support. Contact us for specifications, pricing and bulk supply.',
    },
    category: {
      titleSuffix: '— Manufacturer & OEM Supplier',
    },
    factory: {
      title: 'Factory & Manufacturing — SMT, Assembly and Aging Test Lines',
      description:
        'Tour our {area} m² inverter factory: automated SMT lines, assembly lines, aging test rooms and warehouse. Video factory audits available for overseas buyers.',
    },
    quality: {
      title: 'Quality Control — ISO 9001 System, 100% Testing, 8-Hour Aging',
      description:
        'Our inverter quality control: ISO 9001 certified quality system, 100% functional testing, 8-hour aging tests and full production traceability. Third-party inspection welcome.',
    },
    contact: {
      title: 'Contact Us — Request a Quote for Inverters',
      description:
        'Request pricing, datasheets and OEM options for our inverters. Sales engineers reply within 24 hours on business days. Email, WhatsApp and inquiry form available.',
    },
    blog: {
      title: 'Blog & Industry Insights — Inverter Knowledge Base',
      description:
        'Technical guides and industry insights on solar inverters: hybrid vs grid-tie vs off-grid, sizing, certifications and OEM manufacturing.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Inverter Manufacturer since {year}',
      title: 'Factory-Direct Solar Inverters for Global B2B Partners',
      subtitle:
        'Hybrid, grid-tie and off-grid inverters engineered and built in our own factory. OEM / ODM programs, certified quality, and competitive factory-direct pricing for distributors, installers and project developers.',
      heroImageAria: 'Solar energy system illustration',
      bullets: ['OEM / ODM', 'ISO 9001', '24h response', '{countries}+ export countries'],
    },
    trust: {
      manufacturer: 'Manufacturer',
      factoryArea: 'Factory area',
      unitsPerYear: 'Units / year',
      exportCountries: 'Export countries',
      oemClients: 'OEM / ODM clients',
    },
    categories: {
      eyebrow: 'Our Products',
      title: 'Inverter Categories',
      subtitle: 'Explore the inverter ranges we currently manufacture. Categories are added here as soon as their first model is published.',
    },
    featured: {
      eyebrow: 'Featured',
      title: 'Popular Models',
      subtitle: 'Best-selling inverters from our catalog. Every model supports OEM branding and spec customization.',
    },
    advantages: {
      eyebrow: 'Product Advantages',
      title: 'Product Advantages & Technical Strength',
      subtitle: 'Key characteristics of our off-grid inverter range — from output type and DC input options to power ratings and practical product configurations.',
      items: [
        {
          title: 'Pure Sine Wave Output',
          description: 'Stable pure sine wave AC output designed for off-grid applications requiring reliable power for different types of loads.',
        },
        {
          title: 'Multiple DC Input Options',
          description: 'Selected models support multiple DC input voltage configurations, including 12V, 24V, 48V, 60V and 72V, depending on the product.',
        },
        {
          title: 'Intelligent Temperature-Controlled Cooling',
          description: 'Intelligent temperature-controlled fan cooling helps support reliable operation across different off-grid applications.',
        },
        {
          title: 'Flexible AC Output Configurations',
          description: 'Selected models are available with 220V / 110V AC output options and different socket configurations to meet different market requirements.',
        },
        {
          title: 'Multiple Power Options',
          description: 'The current off-grid inverter range covers 900W to 5000W, providing different power options for a variety of off-grid applications.',
        },
        {
          title: 'Practical Product Configurations',
          description: 'The product range includes different configurations such as LCD or digital displays, multiple AC output sockets and USB-equipped models, depending on the product.',
        },
      ],
    },
    whyUs: {
      eyebrow: 'Why Us',
      title: 'Why Global Buyers Choose Us',
      subtitle: 'We are a manufacturer, not a trading company — which means direct engineering support, controlled quality and better margins.',
      items: [
        {
          title: 'In-house R&D',
          description: '{engineers} engineers covering hardware, firmware and structure design. Custom firmware, logos, packaging and specs for OEM/ODM projects.',
        },
        {
          title: 'Manufacturing scale',
          description: '{area} m² facility with SMT, assembly and aging lines — {capacity} units annual capacity.',
        },
        {
          title: 'Quality you can audit',
          description:
            'ISO 9001 quality system, 100% functional testing and 8-hour aging test before packing. CE-related LVD (EN 62109-1) and EMC compliance documentation is available for our solar inverters on request. Third-party inspection welcome.',
        },
      ],
    },
    process: {
      eyebrow: 'How We Work',
      title: 'From RFQ to Delivery',
      subtitle: 'A transparent six-step process designed for overseas B2B partners — you always know where your order stands.',
      steps: [
        { title: 'RFQ', description: 'Send your requirements via the inquiry form, email or WhatsApp.' },
        { title: 'Solution & Quotation', description: 'Our sales engineers reply within 24 hours with a proposal and pricing.' },
        { title: 'Sample Confirmation', description: 'Evaluate samples, confirm specs and finalize the order details.' },
        { title: 'Testing & Certification', description: 'Required testing and destination-market compliance handled before production.' },
        { title: 'Batch Production', description: 'Scheduled production with quality control at every stage.' },
        { title: 'Delivery & Support', description: 'Export packing, shipping arrangement and after-sales support.' },
      ],
    },
    factory: {
      eyebrow: 'Inside Our Factory',
      title: 'Built for Consistent Quality and Reliable Supply',
      subtitle: 'Our manufacturing process brings together production, assembly, testing and quality control to support consistent product quality and reliable supply for global customers.',
      capabilities: [
        { title: 'Production & Assembly', description: 'Structured production and assembly processes support consistent manufacturing and reliable product supply.' },
        { title: 'Quality Testing', description: 'Quality control and functional testing are integrated into the manufacturing process to support consistent product quality.' },
        { title: 'Aging Testing', description: 'Aging testing is part of the production quality process before products are prepared for delivery.' },
        { title: 'Finished Goods & Logistics', description: 'Finished products are prepared for packing and shipment to support efficient order fulfillment.' },
      ],
      bullets: [
        '{employees}+ staff, {engineers} R&D engineers',
        'Structured production and assembly processes',
        '100% functional testing before packing',
        '8-hour aging test on every production batch',
        'Third-party pre-shipment inspection welcome',
      ],
      cta: 'Explore our factory',
    },
    applications: {
      eyebrow: 'Applications',
      title: 'Where Our Inverters Work',
      subtitle: 'Proven in residential, commercial, telecom and off-grid projects across diverse climates and grid conditions.',
      items: [
        { title: 'Residential Solar', description: 'Home rooftop PV systems with battery backup and self-consumption optimization.' },
        { title: 'Commercial & Industrial', description: 'C&I rooftop and ground-mount plants with string inverters from 10 to 50 kW.' },
        { title: 'Energy Storage', description: 'Hybrid systems with LiFePO4 battery integration for peak shaving and backup.' },
        { title: 'Telecom Base Stations', description: 'Off-grid power for remote communication towers with unreliable or no grid access.' },
        { title: 'Rural Electrification', description: 'Standalone microgrid and off-grid power for villages, farms and island communities.' },
        { title: 'Backup Power', description: 'Uninterruptible supply for homes, clinics and small businesses during outages.' },
      ],
    },
    certifications: {
      eyebrow: 'Certifications & Standards',
      title: 'Compliance Documentation for Global Markets',
      subtitle: 'Our solar inverter compliance documentation supports customer review and product qualification requirements. Documentation is available on request.',
      items: [
        {
          title: 'CE / LVD',
          description: 'LVD compliance documentation is available for our solar inverters on request.',
        },
        {
          title: 'CE / EMC',
          description: 'EMC compliance documentation is available for our solar inverters on request.',
        },
      ],
      note: 'Certification availability varies by model and target market. Tell us your destination country and we will confirm applicable certifications for your order.',
      qualityButton: 'Learn about our quality system',
    },
    testimonials: {
      title: 'What Our Partners Say',
      items: [
        { quote: 'The range of power options and clearly defined product specifications makes it easier for us to evaluate different inverter configurations for our market.', country: 'Germany', customerType: 'Solar Distributor' },
        { quote: 'Having several off-grid inverter power options gives us more flexibility when selecting products for different customer applications.', country: 'Nigeria', customerType: 'Solar Installer' },
        { quote: 'The higher-power inverter options give us more flexibility when looking at different off-grid power requirements.', country: 'UAE', customerType: 'Solar Distributor' },
        { quote: 'The multi-voltage configurations are useful when we need to evaluate different DC input requirements for off-grid applications.', country: 'Kenya', customerType: 'Renewable Energy Company' },
        { quote: 'The USB-equipped inverter configurations give us another option for applications where additional charging functionality is required.', country: 'Philippines', customerType: 'Solar Products Distributor' },
        { quote: 'The range from lower-power to higher-power off-grid inverters gives us more flexibility when selecting products for different applications.', country: 'South Africa', customerType: 'Off-Grid Energy Supplier' },
      ],
    },
    blog: {
      eyebrow: 'Insights',
      title: 'Latest From Our Blog',
    },
  },

  productsIndex: {
    eyebrow: 'Product Catalog',
    title: 'All Products',
    subtitle: 'Every model is designed, manufactured and tested in our own factory. Contact us for datasheets, pricing and OEM options.',
    viewCategory: 'View category',
  },

  categoryPage: {
    eyebrow: 'Product Category',
    empty: 'Models for this category are being prepared. Contact us for the latest catalog.',
    byPowerTitle: '{category} by Rated Power',
    byPowerEyebrow: 'Shop by Power',
    byPowerSubtitle: 'Choose the output power you need — each page lists every model available at that rating.',
    customCtaTitle: 'Need a Custom Specification?',
    customCtaSubtitle: 'We develop custom inverters for OEM/ODM projects — power rating, firmware, branding and certifications tailored to your market.',
  },

  powerPage: {
    empty: 'Models for this power rating are being prepared. Contact us for the latest catalog.',
    modelsInRating: '{count} {model} in this power rating',
    otherRatings: {
      eyebrow: 'Off-Grid Range',
      title: 'Other Power Ratings',
      subtitle: 'Browse the full off-grid inverter range by rated power.',
    },
    chip: '{power} Off-Grid',
    ctaTitle: 'Need a {power} Off-Grid Inverter?',
    ctaSubtitle: 'Tell us your target market, required DC input voltage and quantity — we reply with factory-direct pricing and lead time.',
    /**
     * Localized copy for a power page, assembled from catalog facts only.
     * `facts.dc` / `facts.ac` are raw spec value lists (language-neutral);
     * facts may be null when no model at this rating declares the field.
     */
    copy: (facts: {
      label: string;
      count: number;
      types: string;
      series: string | null;
      dc: string | null;
      ac: string | null;
    }) => {
      const plural = facts.count > 1 ? 's' : '';
      const seriesNote = facts.series ? ` (${facts.series})` : '';
      const specSentence = facts.dc ? ` Key specs: DC input ${facts.dc}.` : '';
      return {
        description: `${facts.count} ${facts.label} off-grid inverter${plural} available — ${facts.types}${seriesNote}.${specSentence} Contact us for configurations, pricing and bulk supply.`,
        seoTitle: `${facts.label} Off-Grid Inverter${plural}${seriesNote}`,
        seoDescription: `${facts.label} off-grid inverter${plural}: ${facts.types}.${
          facts.dc ? ` DC input ${facts.dc}.` : ''
        } Contact us for pricing and bulk supply.`,
      };
    },
  },

  specs: {
    ratedPower: 'Rated Power',
    acOutput: 'AC Output',
    outputSockets: 'Output Sockets',
    dcInputVoltage: 'DC Input Voltage',
    display: 'Display',
    usb: 'USB',
    cooling: 'Cooling',
    dimensions: 'Dimensions',
    netWeight: 'Net Weight',
    groups: {
      acOutput: 'AC Output',
      dcInput: 'DC Input',
      displayCooling: 'Display & Cooling',
      interface: 'Interface',
      physical: 'Physical',
    },
    packaging: {
      packageDimensions: 'Package Dimensions',
      grossWeight: 'Gross Weight',
      cartonQuantity: 'Carton Quantity',
      cartonDimensions: 'Carton Dimensions',
      cartonWeight: 'Carton Weight',
      cartonInformation: 'Carton Information',
    },
    /** Translations for recurring specification VALUES. Unlisted values pass through unchanged. */
    values: {
      display: {
        'Digital Display': 'Digital Display',
        'LCD Display': 'LCD Display',
        'LCD Smart Display': 'LCD Smart Display',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'Intelligent Temperature-Controlled Fan',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V optional',
        '220V optional': '220V optional',
      },
      usb: {
        Yes: 'Yes',
      },
      cartonInformation: {
        'Available in different packing configurations': 'Available in different packing configurations',
      },
      approx: 'Approx.',
      units: '{n} units',
      unitsOr: '{a} or {b} units',
    },
  },

  factory: {
    glance: {
      eyebrow: 'Manufacturing',
      title: 'Our Factory at a Glance',
      items: [
        { title: 'SMT lines', text: 'Automated placement + AOI' },
        { title: 'Assembly lines', text: 'Multiple parallel lines' },
        { title: 'Aging test room', text: '100% batch testing' },
        { title: 'Warehouse', text: 'Finished goods + components' },
      ],
    },
    process: {
      eyebrow: 'Process',
      title: 'How Every Inverter Is Made',
      steps: [
        'Incoming component inspection (IQC) — key components from qualified suppliers with batch traceability.',
        'Automated SMT placement with AOI optical inspection for all PCBAs.',
        'Board-level functional test and firmware flashing.',
        'Full product assembly with torque-controlled fastening.',
        '100% functional test: output waveform, efficiency, protection functions.',
        '8-hour aging test under load for every production batch.',
        'Final QC inspection, serial number registration and packing.',
      ],
    },
    visits: {
      eyebrow: 'Visits',
      title: 'Factory Audits Welcome',
      text: 'We welcome on-site factory audits and welcome third-party inspections (SGS, TÜV, BV or your appointed agency). For overseas buyers who cannot travel, we offer live video walkthroughs of the production lines — schedule one through the contact form.',
      addressLabel: 'Address',
    },
    cta: {
      title: 'Schedule a Factory Video Tour',
      subtitle: 'See our production lines live before you place an order.',
    },
  },

  quality: {
    intro: {
      eyebrow: 'Quality',
      title: 'Quality Is a Process, Not a Certificate',
      items: [
        { title: 'ISO 9001 quality system', text: 'Documented processes cover design, purchasing, production and after-sales. Regular internal audits keep the system alive, not just certified.' },
        { title: '100% functional testing', text: 'Every single unit is tested for output waveform, efficiency, protection behavior and communication before it leaves the line. No batch sampling excuses.' },
        { title: '8-hour aging test', text: 'Production batches run under full load in our aging room to catch early-life failures before shipping.' },
      ],
    },
    traceability: {
      eyebrow: 'Traceability',
      title: 'Every Unit Can Be Traced Back',
      text: 'Each inverter carries a unique serial number linking it to production date, test records and component batches. If a field issue ever occurs, we can trace the affected batch within hours — not weeks. Test reports and inspection data are available to B2B customers on request.',
      bullets: [
        'Incoming quality control (IQC) on all key components',
        'In-process quality control (IPQC) at each production stage',
        'Outgoing quality control (OQC) with pre-shipment inspection',
        'Reliability testing: high/low temperature, humidity, vibration',
        'Third-party inspection (SGS / TÜV / BV) accepted',
      ],
    },
    certifications: {
      eyebrow: 'Certifications',
      title: 'Compliance & Certifications',
      note: 'Certification availability varies by model and destination market. Contact our sales team and we will confirm the applicable certificates for your order.',
    },
    cta: {
      title: 'Request Test Reports or a Sample',
      subtitle: 'Validate our quality yourself — we provide test reports and samples for qualified B2B buyers.',
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Request a Quote',
    subtitle: 'Fill in the form and tell us about your project — quantity, target market and technical requirements help us quote faster.',
    directContact: 'Direct contact',
    email: 'Email',
    whatsapp: 'WhatsApp',
    phone: 'Phone',
    responseTime: 'Response time',
    responseTimeValue: 'Within 24 hours on business days',
    beforeYouWrite: 'Before you write',
    tips: [
      'Have a datasheet? Attach it in your reply email.',
      'Tell us your destination country — certifications differ by market.',
      'Volume buyers: ask about OEM branding and exclusive distribution.',
    ],
    linkedin: 'Connect on LinkedIn',
  },

  form: {
    title: 'Request a Quote',
    subtitle: 'Tell us what you need. Our sales engineers reply within 24 hours on business days.',
    name: 'Name',
    company: 'Company',
    country: 'Country',
    email: 'Email',
    phone: 'WhatsApp / Phone',
    quantity: 'Estimated Quantity',
    quantityPlaceholder: 'e.g. 500',
    product: 'Interested Product',
    productGeneral: 'General inquiry / not sure yet',
    message: 'Message',
    messagePlaceholder: 'Technical requirements, target market, certification needs, delivery schedule...',
    submit: 'Send inquiry',
    consentPrefix: 'By submitting, you agree to our',
    consentLink: 'privacy policy',
    consentSuffix: '. Your inquiry is not a marketing subscription.',
    successTitle: 'Thank you — your inquiry has been sent.',
    successText: 'Our sales engineers will get back to you within 24 hours on business days.',
    errorTitle: 'Something went wrong.',
    errorDetail: '{message} Please try again, or email us directly.',
    fallbackError: 'Please try again, or email us directly.',
    submissionFailed: 'Submission failed.',
  },

  chat: {
    greeting: 'Hi! What power are you looking for?',
    teaser: 'Hi! Looking for an off-grid inverter? I can help you find the right power.',
    headerTitle: 'Chat with us',
    headerSubtitle: '{brand} · AI sales assistant',
    inputPlaceholder: 'Type your message…',
    inputAria: 'Type your message',
    sendAria: 'Send message',
    closeAria: 'Close chat',
    launcherAria: 'Chat with us',
    launcherUnreadAria: 'Chat with us, 1 new message',
    dismissAria: 'Dismiss message',
    messagesAria: 'Messages',
    contactPlaceholder: 'Your email or WhatsApp…',
    contactHint: 'Your details go to our sales team only.',
    optionalNote: 'Optional — we only need an email or WhatsApp.',
    namePlaceholder: 'Name',
    nameAria: 'Your name (optional)',
    companyPlaceholder: 'Company',
    companyAria: 'Your company (optional)',
    countryPlaceholder: 'Country',
    countryAria: 'Your country (optional)',
    viewProduct: 'View product details',
    reachUsDirectly: 'You can also reach us directly:',
    leadThanks: 'Thank you — our sales team will follow up with you shortly. Here are our details if you would rather contact us first:',
    verificationError: 'I could not verify this session. Please use the WhatsApp button or the contact form and our team will help you directly.',
    genericError: 'Sorry, something went wrong. Please try again or use the contact form.',
    networkError: 'Sorry — I could not reach the server. Please try again, or use the contact form and our team will reply by email.',
    leadError: 'Sorry, we could not save your details. Please email us or try again.',
    typing: 'Typing…',
    /** Display labels for known English engine chips (the value sent stays English so the engine keeps matching). */
    chipLabels: {
      'I know the power': 'I know the power',
      'Not sure': 'Not sure',
      'Show other models': 'Show other models',
    },
  },

  blog: {
    eyebrow: 'Insights',
    title: 'Blog & Industry Insights',
    subtitle: 'Practical knowledge for inverter buyers, installers and project developers — written by our engineering team.',
    breadcrumb: 'Blog',
    articleCtaTitle: 'Need Help Choosing an Inverter?',
    articleCtaSubtitle: 'Our sales engineers can recommend the right model for your project — free of charge.',
    translatedNote: 'This article is currently available in English.',
  },
};

export type Dictionary = typeof en;
