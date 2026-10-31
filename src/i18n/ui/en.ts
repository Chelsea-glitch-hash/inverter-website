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
    oemOdm: 'OEM / ODM',
    about: 'About',
    blog: 'Blog',
    sizingCalculator: 'Sizing Calculator',
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
    sizingCalculator: 'Sizing Calculator',
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
    /* Entity-verification block. A buyer (or an answer engine) checking
       whether this is a real, traceable company needs the registered name,
       the street address and a content date on the page itself — not only in
       structured data. Values come from COMPANY in src/config.ts. */
    legalNameLabel: 'Registered name',
    registeredAddressLabel: 'Registered address',
    lastUpdatedLabel: 'Last updated',
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
    oemOdm: {
      title: 'OEM / ODM Solar Inverter Manufacturer | Zhongze Huasong',
      description:
        'OEM / ODM solar inverter manufacturing with private label, custom firmware and packaging. Own factory, 200,000 units annual capacity, ISO 9001. Get a quote in 24 hours.',
    },
    privacy: {
      title: "Privacy Policy — How We Handle Your Data",
      description:
        "How we collect, use and protect your personal data when you use our website, submit an inquiry or subscribe to our newsletter. GDPR-aligned disclosure of processors and your rights.",
    },
    sizing: {
      title: 'Off-Grid System Sizing Calculator — Inverter, Battery & PV Array',
      description:
        'Free off-grid sizing calculator: enter daily energy, peak load, system voltage and sun hours to get a recommended inverter rating, battery bank capacity and PV array size — then match the result to real catalog models.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Inverter Manufacturer since {year}',
      title: 'Factory-Direct Solar Inverters for Global B2B Partners',
      /* Leads with a self-contained sentence carrying the facts a reader (or an
         answer engine) needs to state who this is without further context:
         what we make, over what range, and at what scale. The qualifying
         sentence after it names where the range fits and where it does not. */
      subtitle:
        'Zhongze Huasong is a Shenzhen inverter manufacturer producing 35 models from 900 W to 11 kW in its own 12,000 m² factory. The range covers off-grid and off-grid solar inverters for regions with weak grids, high electricity costs or unreliable power — sold factory-direct with OEM / ODM programs, ISO 9001 quality and a 24-hour response.',
      heroImageAria: 'Solar energy system illustration',
      bullets: ['OEM / ODM', 'ISO 9001', '24h response', '{countries}+ export countries'],
    },
    /* Answer summary: the five things a buyer asks first, each stated as a
       standalone fact with its numbers. Placed directly under the hero so the
       page answers "who is this, what do they make, how big, who buys, how do
       I start" before any scrolling. */
    summary: {
      title: 'Zhongze Huasong at a glance',
      items: [
        {
          label: 'What we make',
          text: '{models} inverter models from {minPower} to {maxPower} — {offGrid} off-grid units and {solar} off-grid solar units, all pure sine wave.',
        },
        {
          label: 'Where',
          text: 'Our own {area} m² factory in Shenzhen, China, running SMT, assembly and aging lines in-house.',
        },
        {
          label: 'How much',
          text: 'About {capacity} units a year, built by {employees} staff including {engineers} R&D engineers.',
        },
        {
          label: 'Who buys',
          text: '{oemClients}+ OEM / ODM clients and distributors across {countries}+ export markets.',
        },
        {
          label: 'How to start',
          text: 'Send your specification and quantity — our sales engineers reply within 24 hours, and a standard production run ships in 30–45 days after sample approval.',
        },
      ],
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
      subtitle: 'We manufacture two inverter ranges: off-grid inverters without a built-in solar controller, and off-grid solar inverters with one. Pick a range to see every model and its full specification table.',
    },
    featured: {
      eyebrow: 'Featured',
      title: 'Popular Models',
      subtitle: 'These are the models overseas buyers order most often. Every one can carry your own brand, with the output configuration, DC input range and socket types adjusted for your market.',
    },
    advantages: {
      eyebrow: 'Product Advantages',
      title: 'Product Advantages & Technical Strength',
      subtitle: 'Six characteristics define the off-grid range: pure sine wave output, DC input options from 12 V to 72 V, temperature-controlled cooling, 220 V or 110 V AC output, power ratings from 900 W to 5000 W, and LCD or digital displays with USB variants.',
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
      subtitle: 'We are the factory, not a trading company: your engineering questions reach the people who design the product, and your cost reflects the manufacturing line rather than a reseller margin.',
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
      subtitle: 'An order moves through six steps: RFQ, quotation, sample confirmation, testing and certification, batch production, then delivery. You get a reply within 24 hours at step two, and a standard run ships 30–45 days after samples are approved.',
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
      subtitle: 'A {area} m² facility with SMT, assembly and aging lines in-house, staffed by {employees} people and capable of about {capacity} units a year. Every production batch gets 100% functional testing and an 8-hour aging test before it is packed.',
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
      subtitle: 'Six application types drive most of our orders: residential rooftop, commercial and industrial plants, battery storage, telecom base stations, rural electrification and backup power. Each one leans on a different part of the range.',
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
      subtitle: 'Two document sets are available for the solar inverter range: CE-related LVD documentation assessed against IEC 62109-1:2010, and EMC documentation. Certificates are issued per model and per destination market, so the applicable set depends on your order.',
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
      /* The standards this documentation is assessed against, quoted with
         their exact designation and year so a buyer can look each one up at
         the issuing body. Links go to the publisher's own catalogue page —
         the primary source — not to a third-party summary. ISO 9001 is cited
         without a year: the 2015 edition was withdrawn in September 2026. */
      standards: {
        heading: 'Standards this documentation is assessed against',
        items: [
          {
            code: 'IEC 62109-1:2010',
            scope: 'Safety of power converters for use in photovoltaic power systems — Part 1: General requirements.',
            publisher: 'IEC',
            url: 'https://webstore.iec.ch/en/publication/6470',
          },
          {
            code: 'IEC 62109-2:2011',
            scope: 'Safety of power converters for use in photovoltaic power systems — Part 2: Particular requirements for inverters.',
            publisher: 'IEC',
            url: 'https://webstore.iec.ch/en/publication/6471',
          },
          {
            code: 'ISO 9001',
            scope: 'Quality management systems — the standard behind our factory quality system, 100% functional testing and 8-hour aging test.',
            publisher: 'ISO',
            url: 'https://www.iso.org/standard/62085.html',
          },
        ],
        sourceNote: 'Standard designations and scopes as published by the issuing bodies. Follow a link to read the standard at its source.',
      },
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
    /* Buyer questions, answered in the order a purchasing manager asks them.
       Every figure here is one the site already states elsewhere (catalog
       count, power range, factory data, lead time); nothing is introduced that
       the rest of the site does not already stand behind. */
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions Buyers Ask Before Ordering',
      items: [
        {
          q: 'Are you a manufacturer or a trading company?',
          a: 'We are a manufacturer. Shenzhen Zhongze Huasong Trading Co., Ltd. runs its own 12,000 m² facility with SMT, assembly and aging lines in-house, and ships about 200,000 units a year. You buy factory-direct, not through a middle layer.',
        },
        {
          q: 'How many inverter models do you make, and over what power range?',
          a: 'The current catalog holds 35 models spanning 900 W to 11 kW. It splits into 12 off-grid inverters (900 W–5000 W, no built-in solar charge controller) and 23 off-grid solar inverters (1500 W–11 kW, with a built-in MPPT controller).',
        },
        {
          q: 'Can you manufacture under my own brand?',
          a: 'Yes. Our OEM/ODM programme covers the enclosure, packaging, manual and display, and firmware can carry your brand where the model supports it. Output configuration, DC input range and socket types can be adjusted for your market.',
        },
        {
          q: 'What is the minimum order quantity?',
          a: 'MOQ depends on the model and how far the customization goes, because a private-label run needs its own artwork and firmware setup. Tell us the model and quantity you have in mind and we will confirm a realistic MOQ with pricing.',
        },
        {
          q: 'How long does an order take to ship?',
          a: 'Our sales engineers answer an inquiry within 24 hours. After sample approval, a standard production run typically ships in 30–45 days, depending on quantity and customization depth.',
        },
        {
          q: 'How is product quality verified before shipment?',
          a: 'The factory runs an ISO 9001 quality system with 100% functional testing and an 8-hour aging test before packing. Third-party pre-shipment inspection is welcome, and we will work with the inspector you appoint.',
        },
        {
          q: 'What certifications do your inverters carry?',
          a: 'CE-related LVD documentation to EN 62109-1 and EMC documentation are available for the solar inverter range on request. Certificates are issued per model and per destination market, so tell us your target country and we will confirm the applicable set.',
        },
        {
          q: 'Off-grid or off-grid solar — which do I need?',
          a: 'Choose an off-grid inverter when the solar charging is already handled by a separate charge controller. Choose an off-grid solar inverter when you want PV input, battery charging and AC output in one wall-mount unit. Both give pure sine wave output; the difference is whether the MPPT controller is built in.',
        },
      ],
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
    instagram: 'Follow us on Instagram',
    linkedin: 'Connect on LinkedIn',
    youtube: 'Watch us on YouTube',
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

  oemOdm: {
    hero: {
      eyebrow: 'OEM / ODM Manufacturing',
      title: 'Your Private-Label Solar Inverter, Built in Our Own Factory',
      intro:
        'We manufacture inverters for distributors, installers and project developers who sell under their own brand. From private-label packaging and firmware to custom specifications — one factory, one accountable partner.',
      primaryCta: 'Request OEM / ODM Quote',
      secondaryCta: 'View Product Catalog',
    },
    stats: {
      eyebrow: 'Factory Capability',
      title: 'A Manufacturing Partner You Can Verify',
      intro: 'Real capacity, real testing, real traceability — every claim backed by our own production lines.',
      items: [
        { value: '12,000 m²', label: 'Factory area (SMT, assembly, aging lines)' },
        { value: '200,000', label: 'Units annual capacity' },
        { value: '120+', label: 'OEM / ODM clients' },
        { value: 'ISO 9001', label: 'Quality system, 100% testing + 8h aging' },
      ],
    },
    services: {
      eyebrow: 'What We Customize',
      title: 'OEM / ODM Services, End to End',
      subtitle: 'Bring your brand to market without building a factory. We handle the rest.',
      items: [
        { title: 'Private Label & Packaging', text: 'Your logo, brand colors, carton and manual — a product that looks like yours.' },
        { title: 'Firmware & Software', text: 'Custom parameters, communication protocols and display language tailored to your market.' },
        { title: 'Specification Tuning', text: 'Adjust output configurations, DC input ranges and socket types for your target region.' },
        { title: 'Quality & Compliance', text: 'ISO 9001 system, 100% functional testing and 8-hour aging before every shipment.' },
      ],
    },
    process: {
      eyebrow: 'How It Works',
      title: 'From Inquiry to Shipment',
      subtitle: 'A transparent process with clear milestones, so your brand launch stays on schedule.',
      steps: [
        'Send your requirements (spec, quantity, target market)',
        'Receive quotation, samples plan and timeline',
        'Approve samples and private-label artwork',
        'Mass production with in-line quality checks',
        'QC, aging test, packing and shipment',
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'OEM / ODM Questions, Answered',
      items: [
        { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ depends on the model and customization depth. Tell us your plan and we will confirm a realistic MOQ with pricing.' },
        { q: 'Can you put my brand on the inverter?', a: 'Yes — private-label branding covers the enclosure, packaging, manual and display. Firmware can also carry your brand where supported.' },
        { q: 'Can you customize the firmware or parameters?', a: 'Yes. Output voltage, frequency, communication protocols and display language are customizable within the model\'s hardware limits.' },
        { q: 'What certifications do your inverters have?', a: 'Our quality system is ISO 9001 certified and products carry CE and RoHS. Specific certifications for your market can be discussed per project.' },
        { q: 'How long does an OEM order take?', a: 'After sample approval, standard production runs typically ship within 30–45 days depending on quantity and customization.' },
      ],
    },
  },

  sizing: {
    eyebrow: 'Free Engineering Tool',
    title: 'Off-Grid System Sizing Calculator',
    subtitle:
      'Enter your loads and site conditions to get a first-pass PV array, inverter and battery size — then match the result against models in our catalog.',
    intro:
      'This calculator sizes an off-grid system with three formulas: PV array watts = daily energy × 1.3 ÷ peak sun hours; inverter watts = simultaneous peak load × 1.25; battery capacity = daily energy ÷ depth of discharge × days of autonomy ÷ system voltage. All three are the same formulas worked through in our off-grid sizing guides.',
    form: {
      heading: 'Your loads and site',
      dailyEnergy: 'Daily energy use',
      dailyEnergyHelp: 'Total watt-hours your loads consume in a day. Watts × hours per day, added up across every load.',
      peakLoad: 'Simultaneous peak load',
      peakLoadHelp: 'The watts running at the same moment — the busiest hour, not the daily total.',
      voltage: 'Battery / system voltage',
      chemistry: 'Battery type',
      autonomy: 'Days of autonomy',
      autonomyHelp: 'How many sunless days the battery bank must cover.',
      region: 'Pick a region',
      sunHours: 'Peak sun hours',
      sunHoursHelp: 'The daily equivalent of full-strength sunlight — not hours of daylight. Use the worst month.',
    },
    chemistry: {
      flooded: 'Lead-acid (flooded)',
      agm: 'Lead-acid (AGM / gel)',
      lifepo4: 'LiFePO4 (lithium)',
    },
    region: {
      'northern-europe': 'Northern Europe',
      'central-europe': 'Central Europe',
      mediterranean: 'Mediterranean',
      'middle-east-africa': 'Middle East / North Africa',
      'southeast-asia': 'Southeast Asia (equatorial)',
      'us-southwest': 'US Southwest',
    },
    results: {
      heading: 'Your recommended system',
      array: 'PV array',
      inverter: 'Inverter continuous rating',
      battery: 'Battery bank',
      batteryAtVoltage: 'at {voltage} V',
      empty: 'Fill in the fields above to see a recommended system.',
      disclaimer:
        'A first-pass estimate for planning, based on the standard derating and depth-of-discharge figures published in our sizing guides. Motor starting surge, cable sizing, MPPT input limits and local compliance all need a separate check.',
    },
    recommended: {
      heading: 'Matching models from our catalog',
      note: 'Smallest catalog models that meet the numbers above at the selected system voltage.',
      none: 'No single catalog model covers every number above. Contact our engineers — a multi-unit or custom configuration may fit better.',
      viewAll: 'View all inverters',
    },
    howItWorks: {
      heading: 'How the three numbers are calculated',
      steps: [
        {
          title: 'PV array',
          formula: 'daily energy (Wh) × 1.3 ÷ peak sun hours',
          text: 'The 1.3 factor covers conversion, wiring and battery round-trip losses. Peak sun hours is the daily equivalent of full-strength sunlight, not hours of daylight.',
        },
        {
          title: 'Inverter',
          formula: 'simultaneous peak load (W) × 1.25',
          text: 'Sized on the load that runs at the same time, never the daily total. Motor starting surge is a separate check — see our surge power guide.',
        },
        {
          title: 'Battery bank',
          formula: 'daily energy (Wh) ÷ depth of discharge × days of autonomy ÷ voltage',
          text: 'Depth of discharge is how much of the battery is safely usable: about 50% for flooded lead-acid, 55% for AGM / gel and 85% for LiFePO4.',
        },
      ],
    },
    faq: {
      heading: 'Sizing calculator — FAQ',
      items: [
        {
          q: 'Does this calculator replace an engineering review?',
          a: 'No. It returns a first-pass estimate from the standard derating and depth-of-discharge figures. Motor starting surge, cable and fuse sizing, MPPT input limits, string voltage and destination-market compliance all sit outside it — send us your load audit and our engineers will review the sizing free of charge.',
        },
        {
          q: 'Why does the calculator ask for two different power numbers?',
          a: 'Daily energy and peak load size different parts of the system. The array and battery follow daily energy, because both work on energy over time. The inverter follows the simultaneous peak load, because it has to supply that many watts at once.',
        },
        {
          q: 'What is depth of discharge?',
          a: 'Depth of discharge is the share of a battery\'s capacity that can safely be used before recharging. Drawing a lead-acid bank below about 50% shortens its life sharply; a LiFePO4 bank tolerates roughly 85%. This is why the same daily energy needs a larger nominal capacity in lead-acid than in lithium.',
        },
        {
          q: 'Does this work for hybrid or grid-tie systems?',
          a: 'The formulas here are for off-grid systems with a battery bank. A grid-tie system has no autonomy requirement and a hybrid system adds export and grid-charging rules, so both are sized differently. Our sizing guides cover the off-grid case; contact us for the others.',
        },
      ],
    },
    guides: {
      heading: 'Work through the numbers in detail',
      links: [
        { label: 'How many solar panels do you need?', href: '/blog/how-many-solar-panels-for-off-grid/' },
        { label: 'Battery bank sizing, step by step', href: '/blog/off-grid-battery-bank-sizing/' },
        { label: 'Surge power and motor starting', href: '/blog/inverter-surge-power-motor-starting/' },
      ],
    },
    cta: {
      title: 'Want our engineers to check your sizing?',
      subtitle: 'Send your load audit and target market — we will review it and recommend models, free of charge.',
    },
  },
};

export type Dictionary = typeof en;
