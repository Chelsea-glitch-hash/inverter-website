/**
 * Site-wide UI dictionary — ITALIAN.
 * Mirrors the key structure of src/i18n/ui/en.ts key-for-key.
 */
import type { Dictionary } from './en';

export const it: Dictionary = {
  nav: {
    products: 'Prodotti',
    factory: 'Fabbrica',
    quality: 'Qualità',
    about: 'Chi siamo',
    blog: 'Blog',
    viewAllProducts: 'Vedi tutti i prodotti',
    requestQuote: 'Richiedi un preventivo',
    whatsappUs: 'Scrivici su WhatsApp',
    mainNavAria: 'Navigazione principale',
    mobileNavAria: 'Navigazione mobile',
    toggleMenuAria: 'Attiva/disattiva il menu di navigazione',
    languageAria: 'Cambia lingua',
    skipToContent: 'Vai al contenuto',
  },

  footer: {
    productsHeading: 'Prodotti',
    allProducts: 'Tutti i prodotti',
    companyHeading: 'Azienda',
    aboutUs: 'Chi siamo',
    factoryAndManufacturing: 'Fabbrica e produzione',
    qualityControl: 'Controllo qualità',
    blogInsights: 'Blog e approfondimenti',
    contactUs: 'Contattaci',
    privacyPolicy: 'Informativa sulla privacy',
    stayUpdated: 'Resta aggiornato',
    newsletterBlurb: 'Aggiornamenti sui prodotti, approfondimenti tecnici e novità aziendali.',
    blurb: 'Produttore professionale di inverter dal {year}. Partner OEM / ODM per {countries}+ paesi.',
    whatsappLabel: 'WhatsApp',
    emailAria: 'Email',
    rights: 'Tutti i diritti riservati.',
    productCategoriesAria: 'Categorie di prodotto',
    companyNavAria: 'Azienda',
  },

  newsletter: {
    emailLabel: 'Indirizzo email',
    subscribe: 'Iscriviti',
    consent: 'Acconsento a ricevere via email aggiornamenti sui prodotti, informazioni tecniche e novità aziendali. Posso annullare l’iscrizione in qualsiasi momento.',
    success: 'Iscrizione completata — benvenuto a bordo.',
    error: 'Iscrizione non riuscita. Riprova più tardi.',
  },

  consent: {
    text: 'Utilizziamo i cookie per capire come viene utilizzato il sito web e migliorare la tua esperienza. I cookie di marketing vengono utilizzati solo con il tuo consenso. Consulta la nostra',
    privacyLink: 'informativa sulla privacy',
    reject: 'Solo necessari',
    accept: 'Accetta tutti',
    aria: 'Consenso cookie',
  },

  cta: {
    defaultTitle: 'Richiedi un preventivo oggi',
    defaultSubtitle: 'Inviaci i tuoi requisiti — i nostri ingegneri di vendita rispondono entro 24 ore con prezzi, tempi di consegna e opzioni OEM.',
    defaultButton: 'Richiedi un preventivo',
    whatsapp: 'Chatta su WhatsApp',
    midTitle: 'Hai bisogno di un prezzo o di una soluzione personalizzata?',
    midSubtitle: 'Inviaci i tuoi requisiti — i nostri ingegneri di vendita rispondono entro 24 ore.',
  },

  common: {
    home: 'Home',
    viewDetails: 'Vedi dettagli',
    getQuote: 'Richiedi un preventivo',
    requestQuote: 'Richiedi un preventivo',
    viewProducts: 'Vedi i prodotti',
    browseAllProducts: 'Sfoglia tutti i prodotti',
    readAllArticles: 'Leggi tutti gli articoli',
    featured: 'In evidenza',
    ratedOutput: 'potenza nominale',
    contactSales: 'Contatta il reparto vendite',
    quoteForModel: 'Richiedi un preventivo per questo modello',
    productOverview: 'Panoramica del prodotto',
    technicalSpecifications: 'Specifiche tecniche',
    keyFeatures: 'Caratteristiche principali',
    packagingInformation: 'Informazioni sull’imballo',
    applications: 'Applicazioni',
    downloads: 'Download',
    relatedProducts: 'Prodotti correlati',
    relatedSameCategory: 'Altre opzioni in {category}',
    relatedMoreModels: 'Altri modelli del nostro catalogo',
    relatedGuides: 'Guide correlate',
    relatedGuidesSubtitle: 'Articoli tecnici del nostro team di ingegneria',
    standard: 'Standard',
    product: 'Prodotto',
    viewCertificate: 'Visualizza certificato',
    viewCertificateSr: '(apre il PDF in una nuova scheda)',
    specifications: 'Specifiche',
    model: 'modello',
    models: 'modelli',
    since: 'Dal',
    oemBullets: [
      'Marchio OEM / ODM disponibile per ordini di volume',
      'Scheda tecnica e prezzi su richiesta',
      'Risposta entro 24 ore nei giorni lavorativi',
    ],
    pageAria: {
      productCategories: 'Categorie di prodotto',
    },
  },

  seo: {
    home: {
      title: '{brand} — Produttore di inverter per partner B2B internazionali',
      description:
        'Produttore professionale di inverter solari dal {year}. Inverter ibridi, grid-tie e off-grid con supporto OEM/ODM, sistema qualità ISO 9001 e prezzi diretti di fabbrica. Esportazione in {countries}+ paesi.',
    },
    productsIndex: {
      title: 'Tutti i prodotti — Catalogo inverter',
      description:
        'Sfoglia il nostro catalogo inverter attuale: inverter di potenza off-grid da 900W a 5000W, con supporto OEM/ODM. Contattaci per specifiche, prezzi e forniture all’ingrosso.',
    },
    category: {
      titleSuffix: '— Produttore e fornitore OEM',
    },
    factory: {
      title: 'Fabbrica e produzione — Linee SMT, assemblaggio e test di invecchiamento',
      description:
        'Visita la nostra fabbrica di inverter di {area} m²: linee SMT automatizzate, linee di assemblaggio, camere di invecchiamento e magazzino. Audit di fabbrica via video disponibili per gli acquirenti esteri.',
    },
    quality: {
      title: 'Controllo qualità — Sistema ISO 9001, test al 100%, 8 ore di invecchiamento',
      description:
        'Il nostro controllo qualità per gli inverter: sistema qualità certificato ISO 9001, test funzionali al 100%, test di invecchiamento di 8 ore e tracciabilità completa della produzione. Ispezione di terze parti benvenuta.',
    },
    contact: {
      title: 'Contattaci — Richiedi un preventivo per gli inverter',
      description:
        'Richiedi prezzi, schede tecniche e opzioni OEM per i nostri inverter. Gli ingegneri di vendita rispondono entro 24 ore nei giorni lavorativi. Disponibili email, WhatsApp e modulo di richiesta.',
    },
    blog: {
      title: 'Blog e approfondimenti del settore — Base di conoscenza sugli inverter',
      description:
        'Guide tecniche e approfondimenti sugli inverter solari: ibrido vs grid-tie vs off-grid, dimensionamento, certificazioni e produzione OEM.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Produttore di inverter dal {year}',
      title: 'Inverter solari direttamente dalla fabbrica per partner B2B internazionali',
      subtitle:
        'Inverter ibridi, grid-tie e off-grid progettati e costruiti nella nostra fabbrica. Programmi OEM / ODM, qualità certificata e prezzi competitivi diretti da fabbrica per distributori, installatori e sviluppatori di progetti.',
      heroImageAria: 'Illustrazione di un sistema di energia solare',
      bullets: ['OEM / ODM', 'ISO 9001', 'Risposta in 24h', '{countries}+ paesi di esportazione'],
    },
    trust: {
      manufacturer: 'Produttore',
      factoryArea: 'Superficie di fabbrica',
      unitsPerYear: 'Unità / anno',
      exportCountries: 'Paesi di esportazione',
      oemClients: 'Clienti OEM / ODM',
    },
    categories: {
      eyebrow: 'I nostri prodotti',
      title: 'Categorie di inverter',
      subtitle: 'Esplora le gamme di inverter che produciamo attualmente. Le categorie vengono aggiunte qui non appena è pubblicato il loro primo modello.',
    },
    featured: {
      eyebrow: 'In evidenza',
      title: 'Modelli più richiesti',
      subtitle: 'Gli inverter più venduti del nostro catalogo. Ogni modello supporta la personalizzazione OEM del marchio e delle specifiche.',
    },
    advantages: {
      eyebrow: 'Vantaggi del prodotto',
      title: 'Vantaggi del prodotto e competenza tecnica',
      subtitle: 'Caratteristiche chiave della nostra gamma di inverter off-grid — dal tipo di uscita e dalle opzioni di ingresso DC alle potenze nominali e alle configurazioni pratiche del prodotto.',
      items: [
        {
          title: 'Uscita a onda sinusoidale pura',
          description: 'Uscita AC a onda sinusoidale pura e stabile, progettata per le applicazioni off-grid che richiedono energia affidabile per diversi tipi di carichi.',
        },
        {
          title: 'Multiple opzioni di ingresso DC',
          description: 'Alcuni modelli supportano più configurazioni di tensione di ingresso DC, tra cui 12V, 24V, 48V, 60V e 72V, a seconda del prodotto.',
        },
        {
          title: 'Raffreddamento intelligente con controllo della temperatura',
          description: 'Il raffreddamento con ventilatore a controllo intelligente della temperatura contribuisce a un funzionamento affidabile nelle diverse applicazioni off-grid.',
        },
        {
          title: 'Configurazioni flessibili dell’uscita AC',
          description: 'Alcuni modelli sono disponibili con opzioni di uscita AC 220V / 110V e diverse configurazioni di prese per rispondere alle esigenze dei diversi mercati.',
        },
        {
          title: 'Multiple opzioni di potenza',
          description: 'L’attuale gamma di inverter off-grid copre da 900W a 5000W, offrendo diverse opzioni di potenza per un’ampia varietà di applicazioni off-grid.',
        },
        {
          title: 'Configurazioni pratiche del prodotto',
          description: 'La gamma di prodotti include configurazioni diverse, come display LCD o digitali, più prese di uscita AC e modelli con porta USB, a seconda del prodotto.',
        },
      ],
    },
    whyUs: {
      eyebrow: 'Perché noi',
      title: 'Perché gli acquirenti internazionali ci scelgono',
      subtitle: 'Siamo un produttore, non una società commerciale — il che significa supporto tecnico diretto, qualità controllata e margini migliori.',
      items: [
        {
          title: 'R&S interna',
          description: '{engineers} ingegneri che coprono hardware, firmware e progettazione strutturale. Firmware, loghi, imballi e specifiche personalizzati per i progetti OEM/ODM.',
        },
        {
          title: 'Scala produttiva',
          description: 'Struttura di {area} m² con linee SMT, assemblaggio e invecchiamento — capacità annua di {capacity} unità.',
        },
        {
          title: 'Qualità verificabile',
          description:
            'Sistema qualità ISO 9001, test funzionali al 100% e test di invecchiamento di 8 ore prima dell’imballaggio. La documentazione di conformità LVD (EN 62109-1) ed EMC relativa al marchio CE è disponibile su richiesta per i nostri inverter solari. Ispezione di terze parti benvenuta.',
        },
      ],
    },
    process: {
      eyebrow: 'Come lavoriamo',
      title: 'Dalla richiesta di preventivo alla consegna',
      subtitle: 'Un processo trasparente in sei fasi pensato per i partner B2B internazionali — sai sempre a che punto è il tuo ordine.',
      steps: [
        { title: 'RFQ', description: 'Invia i tuoi requisiti tramite il modulo di richiesta, email o WhatsApp.' },
        { title: 'Soluzione e preventivo', description: 'I nostri ingegneri di vendita rispondono entro 24 ore con una proposta e i prezzi.' },
        { title: 'Conferma del campione', description: 'Valuta i campioni, conferma le specifiche e finalizza i dettagli dell’ordine.' },
        { title: 'Test e certificazione', description: 'Test richiesti e conformità al mercato di destinazione gestiti prima della produzione.' },
        { title: 'Produzione del lotto', description: 'Produzione programmata con controllo qualità in ogni fase.' },
        { title: 'Consegna e assistenza', description: 'Imballo da esportazione, organizzazione della spedizione e assistenza post-vendita.' },
      ],
    },
    factory: {
      eyebrow: 'Dentro la nostra fabbrica',
      title: 'Costruiti per una qualità costante e una fornitura affidabile',
      subtitle: 'Il nostro processo produttivo unisce produzione, assemblaggio, test e controllo qualità per garantire una qualità del prodotto costante e una fornitura affidabile per i clienti di tutto il mondo.',
      capabilities: [
        { title: 'Produzione e assemblaggio', description: 'Processi strutturati di produzione e assemblaggio garantiscono una produzione costante e una fornitura affidabile dei prodotti.' },
        { title: 'Test di qualità', description: 'Il controllo qualità e i test funzionali sono integrati nel processo produttivo per garantire una qualità del prodotto costante.' },
        { title: 'Test di invecchiamento', description: 'Il test di invecchiamento fa parte del processo di qualità produttiva prima che i prodotti siano preparati per la consegna.' },
        { title: 'Prodotti finiti e logistica', description: 'I prodotti finiti sono preparati per l’imballo e la spedizione per garantire un’evasione efficiente degli ordini.' },
      ],
      bullets: [
        '{employees}+ dipendenti, {engineers} ingegneri R&S',
        'Processi strutturati di produzione e assemblaggio',
        'Test funzionali al 100% prima dell’imballaggio',
        'Test di invecchiamento di 8 ore su ogni lotto di produzione',
        'Ispezione pre-spedizione di terze parti benvenuta',
      ],
      cta: 'Esplora la nostra fabbrica',
    },
    applications: {
      eyebrow: 'Applicazioni',
      title: 'Dove funzionano i nostri inverter',
      subtitle: 'Collaudati in progetti residenziali, commerciali, di telecomunicazioni e off-grid in climi e condizioni di rete diversi.',
      items: [
        { title: 'Energia solare residenziale', description: 'Sistemi fotovoltaici su tetto domestico con accumulo in batteria e ottimizzazione dell’autoconsumo.' },
        { title: 'Commercial e industriale', description: 'Impianti su tetto e a terra C&I con inverter a stringa da 10 a 50 kW.' },
        { title: 'Stoccaggio di energia', description: 'Sistemi ibridi con integrazione di batterie LiFePO4 per peak shaving e backup.' },
        { title: 'Stati base di telecomunicazioni', description: 'Alimentazione off-grid per torri di comunicazione remote senza accesso alla rete o con rete inaffidabile.' },
        { title: 'Elettrificazione rurale', description: 'Microreti standalone e alimentazione off-grid per villaggi, aziende agricole e comunità insulari.' },
        { title: 'Alimentazione di backup', description: 'Fornitura ininterrotta per abitazioni, cliniche e piccole aziende durante le interruzioni di corrente.' },
      ],
    },
    certifications: {
      eyebrow: 'Certificazioni e norme',
      title: 'Documentazione di conformità per i mercati internazionali',
      subtitle: 'La documentazione di conformità dei nostri inverter solari supporta le esigenze di revisione dei clienti e di qualificazione del prodotto. La documentazione è disponibile su richiesta.',
      items: [
        {
          title: 'CE / LVD',
          description: 'La documentazione di conformità LVD è disponibile su richiesta per i nostri inverter solari.',
        },
        {
          title: 'CE / EMC',
          description: 'La documentazione di conformità EMC è disponibile su richiesta per i nostri inverter solari.',
        },
      ],
      note: 'La disponibilità delle certificazioni varia in base al modello e al mercato di destinazione. Indicaci il paese di destinazione e confermeremo le certificazioni applicabili al tuo ordine.',
      qualityButton: 'Scopri il nostro sistema qualità',
    },
    testimonials: {
      title: 'Cosa dicono i nostri partner',
      items: [
        { quote: 'La gamma di opzioni di potenza e le specifiche dei prodotti chiaramente definite ci facilitano la valutazione delle diverse configurazioni di inverter per il nostro mercato.', country: 'Germania', customerType: 'Distributore di prodotti solari' },
        { quote: 'Avere diverse opzioni di potenza per inverter off-grid ci offre maggiore flessibilità nella selezione dei prodotti per le diverse applicazioni dei clienti.', country: 'Nigeria', customerType: 'Installatore solare' },
        { quote: 'Le opzioni di inverter di potenza più elevata ci offrono maggiore flessibilità nell’analisi dei diversi fabbisogni di potenza off-grid.', country: 'Emirati Arabi Uniti', customerType: 'Distributore di prodotti solari' },
        { quote: 'Le configurazioni multitensione sono utili quando dobbiamo valutare diversi requisiti di ingresso DC per applicazioni off-grid.', country: 'Kenya', customerType: 'Azienda di energie rinnovabili' },
        { quote: 'Le configurazioni di inverter con porta USB ci offrono un’ulteriore opzione per le applicazioni che richiedono funzionalità di ricarica aggiuntive.', country: 'Filippine', customerType: 'Distributore di prodotti solari' },
        { quote: 'La gamma che va dagli inverter off-grid di potenza inferiore a quelli di potenza superiore ci offre maggiore flessibilità nella selezione dei prodotti per le diverse applicazioni.', country: 'Sudafrica', customerType: 'Fornitore di energia off-grid' },
      ],
    },
    blog: {
      eyebrow: 'Approfondimenti',
      title: 'Ultimi dal nostro blog',
    },
  },

  productsIndex: {
    eyebrow: 'Catalogo prodotti',
    title: 'Tutti i prodotti',
    subtitle: 'Ogni modello è progettato, prodotto e testato nella nostra fabbrica. Contattaci per schede tecniche, prezzi e opzioni OEM.',
    viewCategory: 'Vedi la categoria',
  },

  categoryPage: {
    eyebrow: 'Categoria di prodotto',
    empty: 'I modelli di questa categoria sono in preparazione. Contattaci per il catalogo più aggiornato.',
    byPowerTitle: '{category} per potenza nominale',
    byPowerEyebrow: 'Scegli per potenza',
    byPowerSubtitle: 'Scegli la potenza di uscita di cui hai bisogno — ogni pagina elenca tutti i modelli disponibili con quella potenza nominale.',
    customCtaTitle: 'Hai bisogno di specifiche personalizzate?',
    customCtaSubtitle: 'Sviluppiamo inverter personalizzati per progetti OEM/ODM — potenza nominale, firmware, marchio e certificazioni adattati al tuo mercato.',
  },

  powerPage: {
    empty: 'I modelli con questa potenza sono in preparazione. Contattaci per il catalogo più aggiornato.',
    modelsInRating: '{count} {model} con questa potenza',
    otherRatings: {
      eyebrow: 'Gamma off-grid',
      title: 'Altre potenze',
      subtitle: 'Sfoglia l’intera gamma di inverter off-grid per potenza nominale.',
    },
    chip: '{power} Off-Grid',
    ctaTitle: 'Hai bisogno di un inverter off-grid da {power}?',
    ctaSubtitle: 'Indicaci il mercato di destinazione, la tensione di ingresso DC richiesta e la quantità — risponderemo con prezzi diretti di fabbrica e tempi di consegna.',
    /**
     * Copy localizzata per una pagina di potenza, assemblata solo dai dati del
     * catalogo. `facts.dc` / `facts.ac` sono elenchi di valori tecnici grezzi
     * (indipendenti dalla lingua); facts può essere null quando nessun modello
     * con questa potenza dichiara il campo.
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
      const specSentence = facts.dc ? ` Specifiche principali: ingresso DC ${facts.dc}.` : '';
      return {
        description: `${facts.count} inverter off-grid ${facts.label} disponibili — ${facts.types}${seriesNote}.${specSentence} Contattaci per configurazioni, prezzi e forniture all’ingrosso.`,
        seoTitle: `Inverter Off-Grid ${facts.label}${plural}${seriesNote}`,
        seoDescription: `Inverter off-grid ${facts.label}${plural}: ${facts.types}.${
          facts.dc ? ` Ingresso DC ${facts.dc}.` : ''
        } Contattaci per prezzi e forniture all’ingrosso.`,
      };
    },
  },

  specs: {
    ratedPower: 'Potenza nominale',
    acOutput: 'Uscita AC',
    outputSockets: 'Prese di uscita',
    dcInputVoltage: 'Tensione di ingresso DC',
    display: 'Display',
    usb: 'USB',
    cooling: 'Raffreddamento',
    dimensions: 'Dimensioni',
    netWeight: 'Peso netto',
    groups: {
      acOutput: 'Uscita AC',
      dcInput: 'Ingresso DC',
      displayCooling: 'Display e raffreddamento',
      interface: 'Interfaccia',
      physical: 'Fisiche',
    },
    packaging: {
      packageDimensions: 'Dimensioni dell’imballo',
      grossWeight: 'Peso lordo',
      cartonQuantity: 'Quantità per cartone',
      cartonDimensions: 'Dimensioni del cartone',
      cartonWeight: 'Peso del cartone',
      cartonInformation: 'Informazioni sull’imballo',
    },
    /** Traduzioni dei VALORI di specifica ricorrenti. I valori non elencati restano invariati. */
    values: {
      display: {
        'Digital Display': 'Display digitale',
        'LCD Display': 'Display LCD',
        'LCD Smart Display': 'Display LCD intelligente',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'Ventilatore con controllo intelligente della temperatura',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V opzionale',
        '220V optional': '220V opzionale',
      },
      usb: {
        Yes: 'Sì',
      },
      cartonInformation: {
        'Available in different packing configurations': 'Disponibile in diverse configurazioni di imballo',
      },
      approx: 'Circa',
      units: '{n} unità',
      unitsOr: '{a} o {b} unità',
    },
  },

  factory: {
    glance: {
      eyebrow: 'Produzione',
      title: 'La nostra fabbrica in sintesi',
      items: [
        { title: 'Linee SMT', text: 'Posizionamento automatizzato + AOI' },
        { title: 'Linee di assemblaggio', text: 'Più linee in parallelo' },
        { title: 'Camera di invecchiamento', text: 'Test al 100% dei lotti' },
        { title: 'Magazzino', text: 'Prodotti finiti + componenti' },
      ],
    },
    process: {
      eyebrow: 'Processo',
      title: 'Come viene prodotto ogni inverter',
      steps: [
        'Ispezione dei componenti in entrata (IQC) — componenti chiave da fornitori qualificati con tracciabilità di lotto.',
        'Posizionamento SMT automatizzato con ispezione ottica AOI per tutte le schede PCB.',
        'Test funzionale a livello di scheda e programmazione del firmware.',
        'Assemblaggio completo del prodotto con serraggi a coppia controllata.',
        'Test funzionale al 100%: forma d’onda di uscita, efficienza, funzioni di protezione.',
        'Test di invecchiamento di 8 ore sotto carico per ogni lotto di produzione.',
        'Ispezione QC finale, registrazione del numero di serie e imballo.',
      ],
    },
    visits: {
      eyebrow: 'Visite',
      title: 'Audit di fabbrica benvenuti',
      text: 'Accettiamo audit di fabbrica in loco e ispezioni di terze parti (SGS, TÜV, BV o l’agenzia da voi incaricata). Per gli acquirenti esteri che non possono viaggiare offriamo visite video in diretta delle linee di produzione — prenotale tramite il modulo di contatto.',
      addressLabel: 'Indirizzo',
    },
    cta: {
      title: 'Prenota una visita video alla fabbrica',
      subtitle: 'Guarda le nostre linee di produzione in diretta prima di effettuare un ordine.',
    },
  },

  quality: {
    intro: {
      eyebrow: 'Qualità',
      title: 'La qualità è un processo, non un certificato',
      items: [
        { title: 'Sistema qualità ISO 9001', text: 'Processi documentati che coprono progettazione, acquisti, produzione e assistenza post-vendita. Audit interni regolari mantengono il sistema vivo, non solo certificato.' },
        { title: 'Test funzionali al 100%', text: 'Ogni singola unità viene testata per forma d’onda di uscita, efficienza, comportamento delle protezioni e comunicazione prima di lasciare la linea. Nessuna giustificazione basata sul campionamento dei lotti.' },
        { title: 'Test di invecchiamento di 8 ore', text: 'I lotti di produzione funzionano a pieno carico nella nostra camera di invecchiamento per intercettare i guasti precoci prima della spedizione.' },
      ],
    },
    traceability: {
      eyebrow: 'Tracciabilità',
      title: 'Ogni unità è tracciabile',
      text: 'Ogni inverter porta un numero di serie univoco che lo collega alla data di produzione, ai record di test e ai lotti dei componenti. Se dovesse mai verificarsi un problema sul campo, possiamo tracciare il lotto interessato in poche ore — non settimane. I rapporti di test e i dati di ispezione sono disponibili su richiesta per i clienti B2B.',
      bullets: [
        'Controllo qualità in entrata (IQC) su tutti i componenti chiave',
        'Controllo qualità in processo (IPQC) in ogni fase produttiva',
        'Controllo qualità in uscita (OQC) con ispezione pre-spedizione',
        'Test di affidabilità: alta/bassa temperatura, umidità, vibrazioni',
        'Ispezione di terze parti (SGS / TÜV / BV) accettata',
      ],
    },
    certifications: {
      eyebrow: 'Certificazioni',
      title: 'Conformità e certificazioni',
      note: 'La disponibilità delle certificazioni varia in base al modello e al mercato di destinazione. Contatta il nostro team di vendita per confermare i certificati applicabili al tuo ordine.',
    },
    cta: {
      title: 'Richiedi rapporti di test o un campione',
      subtitle: 'Verifica la nostra qualità in prima persona — forniamo rapporti di test e campioni agli acquirenti B2B qualificati.',
    },
  },

  contact: {
    eyebrow: 'Contatti',
    title: 'Richiedi un preventivo',
    subtitle: 'Compila il modulo e raccontaci il tuo progetto — quantità, mercato di destinazione e requisiti tecnici ci aiutano a preventivare più rapidamente.',
    directContact: 'Contatto diretto',
    email: 'Email',
    whatsapp: 'WhatsApp',
    phone: 'Telefono',
    responseTime: 'Tempo di risposta',
    responseTimeValue: 'Entro 24 ore nei giorni lavorativi',
    beforeYouWrite: 'Prima di scriverci',
    tips: [
      'Hai una scheda tecnica? Allegala nella tua email di risposta.',
      'Indicaci il paese di destinazione — le certificazioni variano da mercato a mercato.',
      'Acquirenti di grandi quantità: chiedi informazioni sul marchio OEM e sulla distribuzione esclusiva.',
    ],
    linkedin: 'Connettiti su LinkedIn',
  },

  form: {
    title: 'Richiedi un preventivo',
    subtitle: 'Dicci cosa ti serve. I nostri ingegneri di vendita rispondono entro 24 ore nei giorni lavorativi.',
    name: 'Nome',
    company: 'Azienda',
    country: 'Paese',
    email: 'Email',
    phone: 'WhatsApp / Telefono',
    quantity: 'Quantità stimata',
    quantityPlaceholder: 'es. 500',
    product: 'Prodotto di interesse',
    productGeneral: 'Richiesta generica / non ancora deciso',
    message: 'Messaggio',
    messagePlaceholder: 'Requisiti tecnici, mercato di destinazione, esigenze di certificazione, tempi di consegna...',
    submit: 'Invia richiesta',
    consentPrefix: 'Inviando accetti la nostra',
    consentLink: 'informativa sulla privacy',
    consentSuffix: '. La tua richiesta non è un’iscrizione a finalità di marketing.',
    successTitle: 'Grazie — la tua richiesta è stata inviata.',
    successText: 'I nostri ingegneri di vendita ti ricontatteranno entro 24 ore nei giorni lavorativi.',
    errorTitle: 'Si è verificato un errore.',
    errorDetail: '{message} Riprova, oppure scrivici direttamente via email.',
    fallbackError: 'Riprova, oppure scrivici direttamente via email.',
    submissionFailed: 'Invio non riuscito.',
  },

  chat: {
    greeting: 'Salve! Quale potenza sta cercando?',
    teaser: 'Salve! Cerca un inverter off-grid? Possiamo aiutarla a trovare la potenza giusta.',
    headerTitle: 'Chatta con noi',
    headerSubtitle: '{brand} · Assistente vendite AI',
    inputPlaceholder: 'Scrivi il tuo messaggio…',
    inputAria: 'Scrivi il tuo messaggio',
    sendAria: 'Invia messaggio',
    closeAria: 'Chiudi la chat',
    launcherAria: 'Chatta con noi',
    launcherUnreadAria: 'Chatta con noi, 1 nuovo messaggio',
    dismissAria: 'Ignora messaggio',
    messagesAria: 'Messaggi',
    contactPlaceholder: 'La tua email o WhatsApp…',
    contactHint: 'I tuoi dati vanno solo al nostro team di vendita.',
    optionalNote: 'Facoltativo — ci serve solo un’email o un WhatsApp.',
    namePlaceholder: 'Nome',
    nameAria: 'Il tuo nome (facoltativo)',
    companyPlaceholder: 'Azienda',
    companyAria: 'La tua azienda (facoltativa)',
    countryPlaceholder: 'Paese',
    countryAria: 'Il tuo paese (facoltativo)',
    viewProduct: 'Vedi i dettagli del prodotto',
    reachUsDirectly: 'Puoi anche contattarci direttamente:',
    leadThanks: 'Grazie — il nostro team di vendita ti ricontatterà a breve. Ecco i nostri contatti se preferisci contattarci prima:',
    verificationError: 'Non sono riuscito a verificare questa sessione. Usa il pulsante WhatsApp o il modulo di contatto e il nostro team ti aiuterà direttamente.',
    genericError: 'Siamo spiacenti, si è verificato un errore. Riprova o usa il modulo di contatto.',
    networkError: 'Siamo spiacenti — non sono riuscito a contattare il server. Riprova, oppure usa il modulo di contatto e il nostro team risponderà via email.',
    leadError: 'Siamo spiacenti, non siamo riusciti a salvare i tuoi dati. Scrivici via email o riprova.',
    typing: 'Sta scrivendo…',
    /** Etichette visualizzate per i chip inglesi noti del motore (il valore inviato resta in inglese così il motore continua a riconoscerlo). */
    chipLabels: {
      'I know the power': 'Conosco la potenza',
      'Not sure': 'Non sono sicuro',
      'Show other models': 'Mostra altri modelli',
    },
  },

  blog: {
    eyebrow: 'Approfondimenti',
    title: 'Blog e approfondimenti del settore',
    subtitle: 'Conoscenze pratiche per acquirenti di inverter, installatori e sviluppatori di progetti — scritte dal nostro team di ingegneri.',
    breadcrumb: 'Blog',
    articleCtaTitle: 'Serve aiuto per scegliere un inverter?',
    articleCtaSubtitle: 'I nostri ingegneri di vendita possono consigliarti il modello giusto per il tuo progetto — gratuitamente.',
    translatedNote: 'Questo articolo è attualmente disponibile in inglese.',
  },
};
