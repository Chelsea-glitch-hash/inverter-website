/**
 * Site-wide UI dictionary — GERMAN.
 * Same shape as en.ts: same keys, same array lengths, same order.
 */
import type { Dictionary } from './en';

export const de: Dictionary = {
  nav: {
    products: 'Produkte',
    factory: 'Fabrik',
    quality: 'Qualität',
    oemOdm: 'OEM / ODM',
    about: 'Über uns',
    blog: 'Blog',
    viewAllProducts: 'Alle Produkte ansehen',
    requestQuote: 'Angebot anfordern',
    whatsappUs: 'WhatsApp',
    mainNavAria: 'Hauptnavigation',
    mobileNavAria: 'Mobile Navigation',
    toggleMenuAria: 'Navigationsmenü umschalten',
    languageAria: 'Sprache ändern',
    skipToContent: 'Zum Inhalt springen',
  },

  footer: {
    productsHeading: 'Produkte',
    allProducts: 'Alle Produkte',
    companyHeading: 'Unternehmen',
    aboutUs: 'Über uns',
    factoryAndManufacturing: 'Fabrik & Fertigung',
    qualityControl: 'Qualitätskontrolle',
    blogInsights: 'Blog & Insights',
    contactUs: 'Kontakt',
    privacyPolicy: 'Datenschutzerklärung',
    stayUpdated: 'Bleiben Sie auf dem Laufenden',
    newsletterBlurb: 'Produktneuigkeiten, technische Einblicke und Unternehmensnachrichten.',
    blurb: 'professioneller Wechselrichterhersteller seit {year}. OEM-/ODM-Partner für über {countries} Länder.',
    whatsappLabel: 'WhatsApp',
    emailAria: 'E-Mail',
    rights: 'Alle Rechte vorbehalten.',
    productCategoriesAria: 'Produktkategorien',
    companyNavAria: 'Unternehmen',
  },

  newsletter: {
    emailLabel: 'E-Mail-Adresse',
    subscribe: 'Abonnieren',
    consent: 'Ich stimme zu, Produktneuigkeiten, technische Informationen und Unternehmensnachrichten per E-Mail zu erhalten. Eine Abmeldung ist jederzeit möglich.',
    success: 'Angemeldet — herzlich willkommen.',
    error: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es später erneut.',
  },

  consent: {
    text: 'Wir verwenden Cookies, um zu verstehen, wie die Website genutzt wird, und Ihr Erlebnis zu verbessern. Marketing-Cookies werden nur mit Ihrer Zustimmung verwendet. Siehe unsere',
    privacyLink: 'Datenschutzerklärung',
    reject: 'Nur notwendige',
    accept: 'Alle akzeptieren',
    aria: 'Cookie-Einwilligung',
  },

  cta: {
    defaultTitle: 'Fordern Sie heute ein Angebot an',
    defaultSubtitle: 'Senden Sie uns Ihre Anforderungen — unsere Vertriebsingenieure antworten innerhalb von 24 Stunden mit Preisen, Lieferzeiten und OEM-Optionen.',
    defaultButton: 'Angebot anfordern',
    whatsapp: 'Per WhatsApp chatten',
    midTitle: 'Benötigen Sie Preise oder eine kundenspezifische Lösung?',
    midSubtitle: 'Senden Sie uns Ihre Anforderungen — unsere Vertriebsingenieure antworten innerhalb von 24 Stunden.',
  },

  common: {
    home: 'Startseite',
    viewDetails: 'Details ansehen',
    getQuote: 'Angebot anfordern',
    requestQuote: 'Angebot anfordern',
    viewProducts: 'Produkte ansehen',
    browseAllProducts: 'Alle Produkte durchsuchen',
    readAllArticles: 'Alle Artikel lesen',
    featured: 'Empfohlen',
    ratedOutput: 'Nennausgang',
    contactSales: 'Vertrieb kontaktieren',
    quoteForModel: 'Angebot für dieses Modell anfordern',
    productOverview: 'Produktübersicht',
    technicalSpecifications: 'Technische Daten',
    keyFeatures: 'Wichtige Funktionen',
    packagingInformation: 'Verpackungsinformationen',
    applications: 'Anwendungen',
    downloads: 'Downloads',
    relatedProducts: 'Ähnliche Produkte',
    relatedSameCategory: 'Weitere Optionen in {category}',
    relatedMoreModels: 'Weitere Modelle aus unserem Katalog',
    relatedGuides: 'Weiterführende Leitfäden',
    relatedGuidesSubtitle: 'Technische Artikel unseres Ingenieursteams',
    standard: 'Standard',
    product: 'Produkt',
    viewCertificate: 'Zertifikat ansehen',
    viewCertificateSr: '(öffnet das PDF in einem neuen Tab)',
    specifications: 'Spezifikationen',
    model: 'Modell',
    models: 'Modelle',
    since: 'Seit',
    oemBullets: [
      'OEM-/ODM-Branding für Großbestellungen',
      'Datenblatt und Preise auf Anfrage',
      'Antwort innerhalb von 24 Stunden an Werktagen',
    ],
    pageAria: {
      productCategories: 'Produktkategorien',
    },
  },

  seo: {
    home: {
      title: '{brand} — Wechselrichterhersteller für globale B2B-Partner',
      description:
        'Professioneller Solar-Wechselrichterhersteller seit {year}. Hybrid-, netzgekoppelte und Off-Grid-Wechselrichter mit OEM/ODM-Unterstützung, ISO 9001-Qualitätsmanagementsystem und Fabrik-Direktpreisen. Export in über {countries} Länder.',
    },
    productsIndex: {
      title: 'Alle Produkte — Wechselrichterkatalog',
      description:
        'Stöbern Sie in unserem aktuellen Wechselrichterkatalog: Off-Grid-Wechselrichter von 900W bis 5000W, mit OEM/ODM-Unterstützung. Kontaktieren Sie uns für Spezifikationen, Preise und Mengenlieferung.',
    },
    category: {
      titleSuffix: '— Hersteller & OEM-Lieferant',
    },
    factory: {
      title: 'Fabrik & Fertigung — SMT-, Montage- und Dauertestlinien',
      description:
        'Besichtigen Sie unsere {area} m² große Wechselrichterfabrik: automatisierte SMT-Linien, Montagelinien, Dauertest-Räume und Lager. Video-Fabrikaudits sind für Käufer aus dem Ausland möglich.',
    },
    quality: {
      title: 'Qualitätskontrolle — ISO 9001-System, 100 % Testung, 8 Stunden Dauertest',
      description:
        'Unsere Qualitätskontrolle für Wechselrichter: ISO 9001-zertifiziertes Qualitätsmanagementsystem, 100 % Funktionstest, 8-stündige Dauertests und lückenlose Produktionsrückverfolgbarkeit. Fremdinspektionen willkommen.',
    },
    contact: {
      title: 'Kontakt — Angebot für Wechselrichter anfordern',
      description:
        'Fordern Sie Preise, Datenblätter und OEM-Optionen für unsere Wechselrichter an. Vertriebsingenieure antworten innerhalb von 24 Stunden an Werktagen. E-Mail, WhatsApp und Anfrageformular verfügbar.',
    },
    blog: {
      title: 'Blog & Brancheneinblicke — Wechselrichter-Wissensdatenbank',
      description:
        'Technische Leitfäden und Brancheneinblicke zu Solar-Wechselrichtern: Hybrid vs. netzgekoppelt vs. Off-Grid, Auslegung, Zertifizierungen und OEM-Fertigung.',
    },
    oemOdm: {
      title: 'OEM / ODM Solar Inverter Manufacturer | Zhongze Huasong',
      description:
        'OEM / ODM solar inverter manufacturing with private label, custom firmware and packaging. Own factory, 200,000 units annual capacity, ISO 9001. Get a quote in 24 hours.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Wechselrichterhersteller seit {year}',
      title: 'Solar-Wechselrichter direkt ab Werk für globale B2B-Partner',
      subtitle:
        'Hybrid-, netzgekoppelte und Off-Grid-Wechselrichter direkt ab Werk, entwickelt für Regionen mit schwachem Stromnetz, hohen Strompreisen oder unzuverlässiger Versorgung. Konzipiert für Eigenverbrauch, Lastverschiebung und Notstrom — mit OEM-/ODM-Programmen, ISO-9001-Qualität und 24-Stunden-Antwort für Händler, Installateure und Projektentwickler.',
      heroImageAria: 'Illustration einer Solarenergieanlage',
      bullets: ['OEM / ODM', 'ISO 9001', 'Antwort in 24h', '{countries}+ Exportländer'],
    },
    trust: {
      manufacturer: 'Hersteller',
      factoryArea: 'Werksfläche',
      unitsPerYear: 'Einheiten / Jahr',
      exportCountries: 'Exportländer',
      oemClients: 'OEM-/ODM-Kunden',
    },
    categories: {
      eyebrow: 'Unsere Produkte',
      title: 'Wechselrichter-Kategorien',
      subtitle: 'Entdecken Sie die Wechselrichter-Baureihen, die wir derzeit fertigen. Kategorien werden hier veröffentlicht, sobald ihr erstes Modell erschienen ist.',
    },
    featured: {
      eyebrow: 'Empfohlen',
      title: 'Beliebte Modelle',
      subtitle: 'Bestverkaufte Wechselrichter aus unserem Katalog. Jedes Modell unterstützt OEM-Branding und Spezifikationsanpassungen.',
    },
    advantages: {
      eyebrow: 'Produktvorteile',
      title: 'Produktvorteile & technische Stärke',
      subtitle: 'Zentrale Merkmale unserer Off-Grid-Wechselrichter-Baureihe — vom Ausgangstyp und DC-Eingangsoptionen bis zu Leistungsklassen und praxisnahen Produktkonfigurationen.',
      items: [
        {
          title: 'Reine Sinuswelle am Ausgang',
          description: 'Stabile AC-Ausgangsleistung mit reiner Sinuswelle, entwickelt für Off-Grid-Anwendungen, die eine zuverlässige Versorgung verschiedenster Lastarten erfordern.',
        },
        {
          title: 'Mehrere DC-Eingangsoptionen',
          description: 'Ausgewählte Modelle unterstützen mehrere DC-Eingangsspannungskonfigurationen, darunter 12V, 24V, 48V, 60V und 72V, je nach Produkt.',
        },
        {
          title: 'Intelligente temperaturgesteuerte Kühlung',
          description: 'Intelligente Lüfterkühlung mit Temperaturregelung unterstützt den zuverlässigen Betrieb in verschiedensten Off-Grid-Anwendungen.',
        },
        {
          title: 'Flexible AC-Ausgangskonfigurationen',
          description: 'Ausgewählte Modelle sind mit 220V / 110V AC-Ausgangsoptionen und verschiedenen Steckdosenkonfigurationen erhältlich, um unterschiedlichen Marktanforderungen gerecht zu werden.',
        },
        {
          title: 'Mehrere Leistungsoptionen',
          description: 'Die aktuelle Off-Grid-Wechselrichter-Baureihe umfasst 900W bis 5000W und bietet verschiedene Leistungsoptionen für vielfältige Off-Grid-Anwendungen.',
        },
        {
          title: 'Praktische Produktkonfigurationen',
          description: 'Die Produktpalette umfasst je nach Produkt verschiedene Konfigurationen wie LCD- oder Digitalanzeige, mehrere AC-Ausgangssteckdosen und Modelle mit USB.',
        },
      ],
    },
    whyUs: {
      eyebrow: 'Warum wir',
      title: 'Warum globale Käufer uns wählen',
      subtitle: 'Wir sind ein Hersteller, kein Handelsunternehmen — das bedeutet direkte Entwicklungsbegleitung, kontrollierte Qualität und bessere Margen.',
      items: [
        {
          title: 'Eigene F&E',
          description: '{engineers} F&E-Ingenieure für Hardware-, Firmware- und Gehäusedesign. Individuelle Firmware, Logos, Verpackungen und Spezifikationen für OEM-/ODM-Projekte.',
        },
        {
          title: 'Fertigung im Maßstab',
          description: '{area} m² großer Standort mit SMT, Montage und Dauertestlinien — {capacity} Einheiten Jahreskapazität.',
        },
        {
          title: 'Audierbare Qualität',
          description:
            'ISO 9001-Qualitätsmanagementsystem, 100 % Funktionstest und 8-stündiger Dauertest vor der Verpackung. CE-bezogene LVD- (EN 62109-1) und EMC-Konformitätsdokumentation ist für unsere Solar-Wechselrichter auf Anfrage erhältlich. Fremdinspektionen willkommen.',
        },
      ],
    },
    process: {
      eyebrow: 'So arbeiten wir',
      title: 'Von der Anfrage bis zur Lieferung',
      subtitle: 'Ein transparenter Sechs-Schritte-Prozess für ausländische B2B-Partner — Sie wissen jederzeit, wo Ihr Auftrag steht.',
      steps: [
        { title: 'Anfrage (RFQ)', description: 'Senden Sie Ihre Anforderungen über das Anfrageformular, per E-Mail oder WhatsApp.' },
        { title: 'Lösung & Angebot', description: 'Unsere Vertriebsingenieure antworten innerhalb von 24 Stunden mit einem Vorschlag und Preisen.' },
        { title: 'Musterbestätigung', description: 'Prüfen Sie Muster, bestätigen Sie Spezifikationen und finalisieren Sie die Auftragsdetails.' },
        { title: 'Test & Zertifizierung', description: 'Erforderliche Prüfungen und Zielmarkt-Konformität werden vor der Produktion geklärt.' },
        { title: 'Serienproduktion', description: 'Geplante Produktion mit Qualitätskontrolle in jeder Phase.' },
        { title: 'Lieferung & Support', description: 'Exportverpackung, Versandabwicklung und After-Sales-Support.' },
      ],
    },
    factory: {
      eyebrow: 'In unserer Fabrik',
      title: 'Gebaut für gleichbleibende Qualität und zuverlässige Lieferfähigkeit',
      subtitle: 'Unser Fertigungsprozess vereint Produktion, Montage, Testung und Qualitätskontrolle, um gleichbleibende Produktqualität und eine zuverlässige Versorgung unserer globalen Kunden zu unterstützen.',
      capabilities: [
        { title: 'Produktion & Montage', description: 'Strukturierte Produktions- und Montageprozesse unterstützen eine gleichmäßige Fertigung und zuverlässige Produktverfügbarkeit.' },
        { title: 'Qualitätstestung', description: 'Qualitätskontrolle und Funktionstests sind in den Fertigungsprozess integriert und sichern gleichbleibende Produktqualität.' },
        { title: 'Dauertest (Aging-Test)', description: 'Dauertests sind Teil des Produktionsqualitätsprozesses, bevor die Produkte für die Auslieferung vorbereitet werden.' },
        { title: 'Fertigware & Logistik', description: 'Fertige Produkte werden für Verpackung und Versand vorbereitet, um eine effiziente Auftragsabwicklung zu unterstützen.' },
      ],
      bullets: [
        '{employees}+ Mitarbeitende, {engineers} F&E-Ingenieure',
        'Strukturierte Produktions- und Montageprozesse',
        '100 % Funktionstest vor der Verpackung',
        '8-stündiger Dauertest für jede Produktionscharge',
        'Fremdinspektion vor dem Versand willkommen',
      ],
      cta: 'Unsere Fabrik entdecken',
    },
    applications: {
      eyebrow: 'Anwendungen',
      title: 'Wo unsere Wechselrichter im Einsatz sind',
      subtitle: 'Bewährt in Wohn-, Gewerbe-, Telekommunikations- und Off-Grid-Projekten unter verschiedensten Klimazonen und Netzbedingungen.',
      items: [
        { title: 'Wohngebäude-Solar', description: 'PV-Dachanlagen für Privathäuser mit Batteriepuffer und Optimierung des Eigenverbrauchs.' },
        { title: 'Gewerbe & Industrie', description: 'Gewerbe- und Industrieanlagen auf Dächern und Freiflächen mit String-Wechselrichtern von 10 bis 50 kW.' },
        { title: 'Energiespeicherung', description: 'Hybrid-systeme mit LiFePO4-Batterieintegration für Spitzenlastkappung und Backup.' },
        { title: 'Telekommunikations-Basisstationen', description: 'Off-Grid-Stromversorgung für entfernte Funktürme ohne oder mit unzuverlässigem Netzanschluss.' },
        { title: 'Ländliche Elektrifizierung', description: 'Inselnetze und Off-Grid-Versorgung für Dörfer, Farmen und Insellgemeinschaften.' },
        { title: 'Notstromversorgung', description: 'Unterbrechungsfreie Versorgung für Haushalte, Kliniken und kleine Betriebe bei Stromausfällen.' },
      ],
    },
    certifications: {
      eyebrow: 'Zertifizierungen & Standards',
      title: 'Konformitätsdokumentation für globale Märkte',
      subtitle: 'Unsere Konformitätsdokumentation für Solar-Wechselrichter unterstützt die Prüfung durch Kunden und Produktqualifizierungsanforderungen. Dokumentation ist auf Anfrage erhältlich.',
      items: [
        {
          title: 'CE / LVD',
          description: 'LVD-Konformitätsdokumentation ist für unsere Solar-Wechselrichter auf Anfrage erhältlich.',
        },
        {
          title: 'CE / EMC',
          description: 'EMC-Konformitätsdokumentation ist für unsere Solar-Wechselrichter auf Anfrage erhältlich.',
        },
      ],
      note: 'Die Verfügbarkeit von Zertifizierungen variiert je nach Modell und Zielmarkt. Nennen Sie uns Ihr Zielland, und wir bestätigen die für Ihre Bestellung geltenden Zertifizierungen.',
      qualityButton: 'Mehr über unser Qualitätsmanagementsystem erfahren',
    },
    testimonials: {
      title: 'Was unsere Partner sagen',
      items: [
        { quote: 'Die Bandbreite an Leistungsoptionen und klar definierten Produktspezifikationen erleichtert uns die Bewertung verschiedener Wechselrichterkonfigurationen für unseren Markt.', country: 'Deutschland', customerType: 'Solar-Großhändler' },
        { quote: 'Mehrere Off-Grid-Wechselrichter-Leistungsklassen geben uns mehr Flexibilität bei der Produktauswahl für verschiedene Kundenanwendungen.', country: 'Nigeria', customerType: 'Solar-Installateur' },
        { quote: 'Die höher dimensionierten Wechselrichteroptionen geben uns mehr Flexibilität bei unterschiedlichen Off-Grid-Leistungsanforderungen.', country: 'VAE', customerType: 'Solar-Großhändler' },
        { quote: 'Die Multi-Spannungs-Konfigurationen sind hilfreich, wenn wir verschiedene DC-Eingangsanforderungen für Off-Grid-Anwendungen bewerten.', country: 'Kenia', customerType: 'Unternehmen für erneuerbare Energien' },
        { quote: 'Die Wechselrichterkonfigurationen mit USB bieten uns eine weitere Option für Anwendungen mit zusätzlichem Ladebedarf.', country: 'Philippinen', customerType: 'Händler für Solarprodukte' },
        { quote: 'Die Palette von leistungsschwächeren bis hin zu leistungsstarken Off-Grid-Wechselrichtern gibt uns mehr Flexibilität bei der Produktauswahl für verschiedene Anwendungen.', country: 'Südafrika', customerType: 'Off-Grid-Energieversorger' },
      ],
    },
    blog: {
      eyebrow: 'Insights',
      title: 'Neues aus unserem Blog',
    },
  },

  productsIndex: {
    eyebrow: 'Produktkatalog',
    title: 'Alle Produkte',
    subtitle: 'Jedes Modell wird in unserer eigenen Fabrik entwickelt, gefertigt und getestet. Kontaktieren Sie uns für Datenblätter, Preise und OEM-Optionen.',
    viewCategory: 'Kategorie ansehen',
  },

  categoryPage: {
    eyebrow: 'Produktkategorie',
    empty: 'Modelle für diese Kategorie werden vorbereitet. Kontaktieren Sie uns für den aktuellen Katalog.',
    byPowerTitle: '{category} nach Nennleistung',
    byPowerEyebrow: 'Nach Leistung wählen',
    byPowerSubtitle: 'Wählen Sie die Ausgangsleistung, die Sie benötigen — jede Seite listet alle Modelle mit dieser Leistungsklasse auf.',
    customCtaTitle: 'Benötigen Sie eine kundenspezifische Spezifikation?',
    customCtaSubtitle: 'Wir entwickeln kundenspezifische Wechselrichter für OEM-/ODM-Projekte — Leistungsklasse, Firmware, Branding und Zertifizierungen zugeschnitten auf Ihren Markt.',
  },

  powerPage: {
    empty: 'Modelle dieser Leistungsklasse werden vorbereitet. Kontaktieren Sie uns für den aktuellen Katalog.',
    modelsInRating: '{count} {model} in dieser Leistungsklasse',
    otherRatings: {
      eyebrow: 'Off-Grid-Programm',
      title: 'Andere Leistungsklassen',
      subtitle: 'Durchsuchen Sie das gesamte Off-Grid-Wechselrichter-Programm nach Nennleistung.',
    },
    chip: '{power} Off-Grid',
    ctaTitle: 'Benötigen Sie einen {power} Off-Grid-Wechselrichter?',
    ctaSubtitle: 'Nennen Sie uns Ihren Zielmarkt, die benötigte DC-Eingangsspannung und die Stückzahl — wir antworten mit Fabrik-Direktpreisen und Lieferzeit.',
    /**
     * Lokalisierter Text für eine Leistungsseite, ausschließlich aus
     * Katalogfakten zusammengesetzt. `facts.dc` / `facts.ac` sind rohe
     * (sprachneutrale) Spezifikationswertlisten; facts können null sein,
     * wenn kein Modell dieser Klasse das Feld deklariert.
     */
    copy: (facts: {
      label: string;
      count: number;
      types: string;
      series: string | null;
      dc: string | null;
      ac: string | null;
    }) => {
      const plural = '';
      const seriesNote = facts.series ? ` (${facts.series})` : '';
      const specSentence = facts.dc ? ` Wichtige Daten: DC-Eingang ${facts.dc}.` : '';
      return {
        description: `${facts.count} ${facts.label} Off-Grid-Wechselrichter${plural} verfügbar — ${facts.types}${seriesNote}.${specSentence} Kontaktieren Sie uns für Konfigurationen, Preise und Mengenlieferung.`,
        seoTitle: `${facts.label} Off-Grid-Wechselrichter${plural}${seriesNote}`,
        seoDescription: `${facts.label} Off-Grid-Wechselrichter${plural}: ${facts.types}.${
          facts.dc ? ` DC-Eingang ${facts.dc}.` : ''
        } Kontaktieren Sie uns für Preise und Mengenlieferung.`,
      };
    },
  },

  specs: {
    ratedPower: 'Nennleistung',
    acOutput: 'AC-Ausgang',
    outputSockets: 'Ausgangssteckdosen',
    dcInputVoltage: 'DC-Eingangsspannung',
    display: 'Anzeige',
    usb: 'USB',
    cooling: 'Kühlung',
    dimensions: 'Abmessungen',
    netWeight: 'Nettogewicht',
    groups: {
      acOutput: 'AC-Ausgang',
      dcInput: 'DC-Eingang',
      displayCooling: 'Anzeige & Kühlung',
      interface: 'Schnittstellen',
      physical: 'Gehäuse & Gewicht',
    },
    packaging: {
      packageDimensions: 'Verpackungsabmessungen',
      grossWeight: 'Bruttogewicht',
      cartonQuantity: 'Menge pro Karton',
      cartonDimensions: 'Kartonabmessungen',
      cartonWeight: 'Kartongewicht',
      cartonInformation: 'Kartoninformationen',
    },
    /** Übersetzungen wiederkehrender SpezifikationsWERTE. Nicht gelistete Werte werden unverändert übernommen. */
    values: {
      display: {
        'Digital Display': 'Digitale Anzeige',
        'LCD Display': 'LCD-Display',
        'LCD Smart Display': 'LCD-Smart-Display',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'Intelligenter, temperaturgesteuerter Lüfter',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V optional',
        '220V optional': '220V optional',
      },
      usb: {
        Yes: 'Ja',
      },
      cartonInformation: {
        'Available in different packing configurations': 'In verschiedenen Verpackungskonfigurationen erhältlich',
      },
      approx: 'ca.',
      units: '{n} Stück',
      unitsOr: '{a} oder {b} Stück',
    },
  },

  factory: {
    glance: {
      eyebrow: 'Fertigung',
      title: 'Unsere Fabrik auf einen Blick',
      items: [
        { title: 'SMT-Linien', text: 'Automatische Bestückung + AOI' },
        { title: 'Montagelinien', text: 'Mehrere parallele Linien' },
        { title: 'Dauertest-Raum', text: '100 % Chargentestung' },
        { title: 'Lager', text: 'Fertigware + Komponenten' },
      ],
    },
    process: {
      eyebrow: 'Prozess',
      title: 'Wie jeder Wechselrichter entsteht',
      steps: [
        'Wareneingangsprüfung (IQC) — Schlüsselkomponenten von qualifizierten Lieferanten mit Chargenrückverfolgbarkeit.',
        'Automatisierte SMT-Bestückung mit AOI-Optikinspektion für alle Platinen.',
        'Funktionstest auf Platinebene und Firmware-Aufspielung.',
        'Komplette Geräte montage mit drehmomentkontrolliertem Verschrauben.',
        '100 % Funktionstest: Ausgangswellenform, Wirkungsgrad, Schutzfunktionen.',
        '8-stündiger Dauertest unter Last für jede Produktionscharge.',
        'Abschließende Endkontrolle, Seriennummernregistrierung und Verpackung.',
      ],
    },
    visits: {
      eyebrow: 'Besuche',
      title: 'Fabrikaudits willkommen',
      text: 'Wir begrüßen Fabrikaudits vor Ort sowie Fremdinspektionen (SGS, TÜV, BV oder eine von Ihnen beauftragte Agentur). Für ausländische Käufer, die nicht reisen können, bieten wir Live-Videoführungen durch die Produktionslinien — buchbar über das Kontaktformular.',
      addressLabel: 'Adresse',
    },
    cta: {
      title: 'Fabrik-Videotour vereinbaren',
      subtitle: 'Sehen Sie unsere Produktionslinien live, bevor Sie eine Bestellung aufgeben.',
    },
  },

  quality: {
    intro: {
      eyebrow: 'Qualität',
      title: 'Qualität ist ein Prozess, kein Zertifikat',
      items: [
        { title: 'ISO 9001-Qualitätsmanagementsystem', text: 'Dokumentierte Prozesse decken Entwicklung, Einkauf, Produktion und After-Sales ab. Regelmäßige interne Audits halten das System lebendig — nicht nur zertifiziert.' },
        { title: '100 % Funktionstest', text: 'Jedes einzelne Gerät wird vor Verlassen der Linie auf Ausgangswellenform, Wirkungsgrad, Schutzverhalten und Kommunikation getestet. Keine Ausreden per Stichproben.' },
        { title: '8-stündiger Dauertest', text: 'Produktionschargen laufen unter Volllast in unserem Dauertestraum, um Ausfälle in der frühen Lebensphase vor dem Versand zu erkennen.' },
      ],
    },
    traceability: {
      eyebrow: 'Rückverfolgbarkeit',
      title: 'Jedes Gerät ist zurückverfolgbar',
      text: 'Jeder Wechselrichter trägt eine eindeutige Seriennummer, die ihn mit Produktionsdatum, Testprotokollen und Komponentenchargen verknüpft. Tritt je ein Feldproblem auf, können wir die betroffene Charge innerhalb von Stunden — nicht Wochen — zurückverfolgen. Testberichte und Prüfdaten stellen B2B-Kunden auf Anfrage zur Verfügung.',
      bullets: [
        'Wareneingangskontrolle (IQC) aller Schlüsselkomponenten',
        'Prozessbegleitende Qualitätskontrolle (IPQC) in jeder Produktionsphase',
        'Ausgangskontrolle (OQC) mit Inspektion vor dem Versand',
        'Zuverlässigkeitstests: Hoch-/Tieftemperatur, Feuchtigkeit, Vibration',
        'Fremdinspektion (SGS / TÜV / BV) akzeptiert',
      ],
    },
    certifications: {
      eyebrow: 'Zertifizierungen',
      title: 'Konformität & Zertifizierungen',
      note: 'Die Verfügbarkeit von Zertifizierungen variiert je nach Modell und Zielmarkt. Kontaktieren Sie unser Vertriebsteam, um die für Ihre Bestellung geltenden Zertifikate zu bestätigen.',
    },
    cta: {
      title: 'Testberichte oder ein Muster anfordern',
      subtitle: 'Überzeugen Sie sich selbst von unserer Qualität — wir stellen Testberichte und Muster für qualifizierte B2B-Käufer bereit.',
    },
  },

  contact: {
    eyebrow: 'Kontakt',
    title: 'Angebot anfordern',
    subtitle: 'Füllen Sie das Formular aus und schildern Sie Ihr Projekt — Stückzahl, Zielmarkt und technische Anforderungen helfen uns, schneller zu kalkulieren.',
    directContact: 'Direkter Kontakt',
    email: 'E-Mail',
    whatsapp: 'WhatsApp',
    phone: 'Telefon',
    responseTime: 'Antwortzeit',
    responseTimeValue: 'Innerhalb von 24 Stunden an Werktagen',
    beforeYouWrite: 'Bevor Sie schreiben',
    tips: [
      'Datenblatt vorhanden? Hängen Sie es an Ihre Antwort-E-Mail an.',
      'Nennen Sie uns Ihr Zielland — Zertifizierungen unterscheiden sich je nach Markt.',
      'Großabnehmer: Fragen Sie nach OEM-Branding und Exklusivvertrieb.',
    ],
    linkedin: 'Auf LinkedIn vernetzen',
  },

  form: {
    title: 'Angebot anfordern',
    subtitle: 'Teilen Sie uns mit, was Sie benötigen. Unsere Vertriebsingenieure antworten innerhalb von 24 Stunden an Werktagen.',
    name: 'Name',
    company: 'Unternehmen',
    country: 'Land',
    email: 'E-Mail',
    phone: 'WhatsApp / Telefon',
    quantity: 'Geschätzte Stückzahl',
    quantityPlaceholder: 'z. B. 500',
    product: 'Gewünschtes Produkt',
    productGeneral: 'Allgemeine Anfrage / noch unsicher',
    message: 'Nachricht',
    messagePlaceholder: 'Technische Anforderungen, Zielmarkt, Zertifizierungsbedarf, Liefertermin...',
    submit: 'Anfrage senden',
    consentPrefix: 'Mit dem Absenden stimmen Sie unserer',
    consentLink: 'Datenschutzerklärung',
    consentSuffix: ' zu. Ihre Anfrage ist kein Marketing-Abonnement.',
    successTitle: 'Vielen Dank — Ihre Anfrage wurde gesendet.',
    successText: 'Unsere Vertriebsingenieure melden sich innerhalb von 24 Stunden an Werktagen bei Ihnen.',
    errorTitle: 'Etwas ist schiefgelaufen.',
    errorDetail: '{message} Bitte versuchen Sie es erneut oder schreiben Sie uns direkt eine E-Mail.',
    fallbackError: 'Bitte versuchen Sie es erneut oder schreiben Sie uns direkt eine E-Mail.',
    submissionFailed: 'Senden fehlgeschlagen.',
  },

  chat: {
    greeting: 'Hallo! Welche Leistung suchen Sie?',
    teaser: 'Hallo! Suchen Sie einen Off-Grid-Wechselrichter? Ich helfe Ihnen gerne bei der richtigen Leistung.',
    headerTitle: 'Chatten Sie mit uns',
    headerSubtitle: '{brand} · KI-Vertriebsassistent',
    inputPlaceholder: 'Nachricht eingeben…',
    inputAria: 'Nachricht eingeben',
    sendAria: 'Nachricht senden',
    closeAria: 'Chat schließen',
    launcherAria: 'Mit uns chatten',
    launcherUnreadAria: 'Mit uns chatten, 1 neue Nachricht',
    dismissAria: 'Nachricht ausblenden',
    messagesAria: 'Nachrichten',
    contactPlaceholder: 'Ihre E-Mail oder WhatsApp…',
    contactHint: 'Ihre Angaben gehen ausschließlich an unser Vertriebsteam.',
    optionalNote: 'Optional — wir benötigen nur eine E-Mail-Adresse oder WhatsApp.',
    namePlaceholder: 'Name',
    nameAria: 'Ihr Name (optional)',
    companyPlaceholder: 'Unternehmen',
    companyAria: 'Ihr Unternehmen (optional)',
    countryPlaceholder: 'Land',
    countryAria: 'Ihr Land (optional)',
    viewProduct: 'Produktdetails ansehen',
    reachUsDirectly: 'Sie erreichen uns auch direkt:',
    leadThanks: 'Vielen Dank — unser Vertriebsteam meldet sich in Kürze bei Ihnen. Hier unsere Kontaktdaten, falls Sie uns zuerst kontaktieren möchten:',
    verificationError: 'Ich konnte diese Sitzung nicht verifizieren. Bitte nutzen Sie den WhatsApp-Button oder das Kontaktformular, und unser Team hilft Ihnen direkt weiter.',
    genericError: 'Entschuldigung, etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder nutzen Sie das Kontaktformular.',
    networkError: 'Entschuldigung — ich konnte den Server nicht erreichen. Bitte versuchen Sie es erneut, oder nutzen Sie das Kontaktformular; unser Team antwortet per E-Mail.',
    leadError: 'Entschuldigung, wir konnten Ihre Angaben nicht speichern. Bitte schreiben Sie uns eine E-Mail oder versuchen Sie es erneut.',
    typing: 'Schreibt…',
    /** Anzeige-Bezeichnungen für bekannte englische Engine-Chips (der gesendete Wert bleibt englisch, damit die Engine weiter匹配t). */
    chipLabels: {
      'I know the power': 'Ich kenne die Leistung',
      'Not sure': 'Nicht sicher',
      'Show other models': 'Andere Modelle anzeigen',
    },
  },

  blog: {
    eyebrow: 'Insights',
    title: 'Blog & Brancheneinblicke',
    subtitle: 'Praxiswissen für Wechselrichter-Käufer, Installateure und Projektentwickler — geschrieben von unserem Ingenieursteam.',
    breadcrumb: 'Blog',
    articleCtaTitle: 'Brauchen Sie Hilfe bei der Wechselrichterwahl?',
    articleCtaSubtitle: 'Unsere Vertriebsingenieure empfehlen Ihnen das passende Modell für Ihr Projekt — kostenlos.',
    translatedNote: 'Dieser Artikel ist derzeit nur auf Englisch verfügbar.',
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
        { q: 'Can you customize the firmware or parameters?', a: "Yes. Output voltage, frequency, communication protocols and display language are customizable within the model's hardware limits." },
        { q: 'What certifications do your inverters have?', a: 'Our quality system is ISO 9001 certified and products carry CE and RoHS. Specific certifications for your market can be discussed per project.' },
        { q: 'How long does an OEM order take?', a: 'After sample approval, standard production runs typically ship within 30–45 days depending on quantity and customization.' },
      ],
    },
  },
};
