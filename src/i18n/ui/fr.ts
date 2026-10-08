/**
 * Dictionnaire UI du site — FRANÇAIS.
 *
 * Même forme que src/i18n/ui/en.ts : mêmes clés, mêmes longueurs de tableaux,
 * même ordre. Les tokens {name} restent identiques à l'anglais et sont remplis
 * au rendu par fill().
 */
import type { Dictionary } from './en';

export const fr: Dictionary = {
  nav: {
    products: 'Produits',
    factory: 'Usine',
    quality: 'Qualité',
    about: 'À propos',
    blog: 'Blog',
    viewAllProducts: 'Voir tous les produits',
    requestQuote: 'Demander un devis',
    whatsappUs: 'Nous contacter sur WhatsApp',
    mainNavAria: 'Navigation principale',
    mobileNavAria: 'Navigation mobile',
    toggleMenuAria: 'Ouvrir / fermer le menu de navigation',
    languageAria: 'Changer de langue',
    skipToContent: 'Aller au contenu',
  },

  footer: {
    productsHeading: 'Produits',
    allProducts: 'Tous les produits',
    companyHeading: 'Entreprise',
    aboutUs: 'À propos de nous',
    factoryAndManufacturing: 'Usine & Fabrication',
    qualityControl: 'Contrôle qualité',
    blogInsights: 'Blog & Analyses',
    contactUs: 'Nous contacter',
    privacyPolicy: 'Politique de confidentialité',
    stayUpdated: 'Restez informé',
    newsletterBlurb: 'Nouveautés produits, informations techniques et actualités de l’entreprise.',
    blurb: 'fabricant professionnel d’onduleurs depuis {year}. Partenaire OEM / ODM pour plus de {countries} pays.',
    whatsappLabel: 'WhatsApp',
    emailAria: 'E-mail',
    rights: 'Tous droits réservés.',
    productCategoriesAria: 'Catégories de produits',
    companyNavAria: 'Entreprise',
  },

  newsletter: {
    emailLabel: 'Adresse e-mail',
    subscribe: 'S’abonner',
    consent: 'J’accepte de recevoir par e-mail les nouveautés produits, les informations techniques et les actualités de l’entreprise. Je peux me désabonner à tout moment.',
    success: 'Inscription confirmée — bienvenue à bord.',
    error: 'Échec de l’inscription. Veuillez réessayer plus tard.',
  },

  consent: {
    text: 'Nous utilisons des cookies pour comprendre comment le site est utilisé et améliorer votre expérience. Les cookies marketing ne sont utilisés qu’avec votre consentement. Consultez notre',
    privacyLink: 'politique de confidentialité',
    reject: 'Cookies nécessaires uniquement',
    accept: 'Tout accepter',
    aria: 'Consentement aux cookies',
  },

  cta: {
    defaultTitle: 'Demandez votre devis dès aujourd’hui',
    defaultSubtitle: 'Envoyez-nous vos besoins — nos ingénieurs commerciaux vous répondent sous 24 heures avec les tarifs, les délais et les options OEM.',
    defaultButton: 'Demander un devis',
    whatsapp: 'Discuter sur WhatsApp',
    midTitle: 'Besoin d’un tarif ou d’une solution sur mesure ?',
    midSubtitle: 'Envoyez-nous vos besoins — nos ingénieurs commerciaux vous répondent sous 24 heures.',
  },

  common: {
    home: 'Accueil',
    viewDetails: 'Voir le détail',
    getQuote: 'Obtenir un devis',
    requestQuote: 'Demander un devis',
    viewProducts: 'Voir les produits',
    browseAllProducts: 'Parcourir tous les produits',
    readAllArticles: 'Lire tous les articles',
    featured: 'En vedette',
    ratedOutput: 'puissance de sortie nominale',
    contactSales: 'Contacter le service commercial',
    quoteForModel: 'Demander un devis pour ce modèle',
    productOverview: 'Présentation du produit',
    technicalSpecifications: 'Caractéristiques techniques',
    keyFeatures: 'Caractéristiques principales',
    packagingInformation: 'Informations d’emballage',
    applications: 'Applications',
    downloads: 'Téléchargements',
    relatedProducts: 'Produits associés',
    relatedSameCategory: 'Autres options en {category}',
    relatedMoreModels: 'Autres modèles de notre catalogue',
    relatedGuides: 'Guides associés',
    relatedGuidesSubtitle: 'Articles techniques rédigés par nos ingénieurs',
    standard: 'Standard',
    product: 'Produit',
    viewCertificate: 'Voir le certificat',
    viewCertificateSr: '(ouvre le PDF dans un nouvel onglet)',
    specifications: 'Caractéristiques',
    model: 'modèle',
    models: 'modèles',
    since: 'Depuis',
    oemBullets: [
      'Marquage OEM / ODM disponible pour les commandes en volume',
      'Fiche technique et tarifs sur demande',
      'Réponse sous 24 heures les jours ouvrés',
    ],
    pageAria: {
      productCategories: 'Catégories de produits',
    },
  },

  seo: {
    home: {
      title: '{brand} — Fabricant d’onduleurs pour partenaires B2B dans le monde entier',
      description:
        'Fabricant professionnel d’onduleurs solaires depuis {year}. Onduleurs hybrides, raccordés au réseau et hors-réseau avec support OEM/ODM, système qualité ISO 9001 et tarifs usine en direct. Export vers plus de {countries} pays.',
    },
    productsIndex: {
      title: 'Tous les produits — Catalogue d’onduleurs',
      description:
        'Parcourez notre catalogue d’onduleurs actuel : onduleurs de puissance hors-réseau de 900W à 5000W, avec support OEM/ODM. Contactez-nous pour les caractéristiques, les tarifs et l’approvisionnement en volume.',
    },
    category: {
      titleSuffix: '— Fabricant & Fournisseur OEM',
    },
    factory: {
      title: 'Usine & Fabrication — Lignes SMT, Assemblage et Tests de Vieillissement',
      description:
        'Découvrez notre usine d’onduleurs de {area} m² : lignes SMT automatisées, lignes d’assemblage, salles de test de vieillissement et entrepôt. Audits d’usine par vidéo disponibles pour les acheteurs internationaux.',
    },
    quality: {
      title: 'Contrôle Qualité — Système ISO 9001, 100 % de Tests, 8 Heures de Vieillissement',
      description:
        'Notre contrôle qualité des onduleurs : système qualité certifié ISO 9001, tests fonctionnels à 100 %, tests de vieillissement de 8 heures et traçabilité complète de la production. Inspections par tiers bienvenues.',
    },
    contact: {
      title: 'Nous contacter — Demander un devis pour nos onduleurs',
      description:
        'Demandez les tarifs, les fiches techniques et les options OEM de nos onduleurs. Nos ingénieurs commerciaux répondent sous 24 heures les jours ouvrés. E-mail, WhatsApp et formulaire de demande disponibles.',
    },
    blog: {
      title: 'Blog & Analyses du Secteur — Base de Connaissances Onduleurs',
      description:
        'Guides techniques et analyses du secteur sur les onduleurs solaires : hybride vs raccordé au réseau vs hors-réseau, dimensionnement, certifications et fabrication OEM.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Fabricant d’onduleurs depuis {year}',
      title: 'Onduleurs solaires au prix usine pour les partenaires B2B du monde entier',
      subtitle:
        'Onduleurs hybrides, raccordés au réseau et hors-réseau, conçus et fabriqués dans notre propre usine. Programmes OEM / ODM, qualité certifiée et tarifs usine compétitifs en direct pour les distributeurs, installateurs et développeurs de projets.',
      heroImageAria: 'Illustration d’un système d’énergie solaire',
      bullets: ['OEM / ODM', 'ISO 9001', 'Réponse sous 24 h', 'Plus de {countries} pays d’export'],
    },
    trust: {
      manufacturer: 'Fabricant',
      factoryArea: 'Surface d’usine',
      unitsPerYear: 'Unités / an',
      exportCountries: 'Pays d’exportation',
      oemClients: 'Clients OEM / ODM',
    },
    categories: {
      eyebrow: 'Nos produits',
      title: 'Catégories d’onduleurs',
      subtitle: 'Explorez les gammes d’onduleurs que nous fabriquons actuellement. Les catégories sont ajoutées ici dès la publication de leur premier modèle.',
    },
    featured: {
      eyebrow: 'En vedette',
      title: 'Modèles populaires',
      subtitle: 'Onduleurs les plus vendus de notre catalogue. Chaque modèle prend en charge le marquage OEM et la personnalisation des caractéristiques.',
    },
    advantages: {
      eyebrow: 'Avantages produits',
      title: 'Avantages Produits & Expertise Technique',
      subtitle: 'Caractéristiques clés de notre gamme d’onduleurs hors-réseau — du type de sortie et des options d’entrée CC aux puissances nominales et aux configurations produits pratiques.',
      items: [
        {
          title: 'Sortie en onde sinusoïdale pure',
          description: 'Sortie CA en onde sinusoïdale pure et stable, conçue pour les applications hors-réseau nécessitant une alimentation fiable pour différents types de charges.',
        },
        {
          title: 'Plusieurs options d’entrée CC',
          description: 'Certains modèles prennent en charge plusieurs configurations de tension d’entrée CC, dont 12V, 24V, 48V, 60V et 72V, selon le produit.',
        },
        {
          title: 'Refroidissement intelligent à température contrôlée',
          description: 'Le refroidissement par ventilateur à température contrôlée intelligente contribue à un fonctionnement fiable dans les différentes applications hors-réseau.',
        },
        {
          title: 'Configurations de sortie CA flexibles',
          description: 'Certains modèles sont proposés avec des options de sortie CA 220V / 110V et différentes configurations de prises pour répondre aux exigences des différents marchés.',
        },
        {
          title: 'Plusieurs options de puissance',
          description: 'La gamme actuelle d’onduleurs hors-réseau couvre 900W à 5000W, offrant différentes options de puissance pour une grande variété d’applications hors-réseau.',
        },
        {
          title: 'Configurations produits pratiques',
          description: 'La gamme comprend différentes configurations telles que des écrans LCD ou digitaux, plusieurs prises de sortie CA et des modèles équipés d’un port USB, selon le produit.',
        },
      ],
    },
    whyUs: {
      eyebrow: 'Pourquoi nous',
      title: 'Pourquoi les acheteurs internationaux nous choisissent',
      subtitle: 'Nous sommes un fabricant, pas une société de négoce — ce qui se traduit par un support d’ingénierie direct, une qualité maîtrisée et de meilleures marges.',
      items: [
        {
          title: 'R&D intégrée',
          description: '{engineers} ingénieurs couvrant la conception matérielle, micrologicielle et structurelle. Micrologiciels, logos, emballages et caractéristiques personnalisés pour les projets OEM/ODM.',
        },
        {
          title: 'Capacité de fabrication',
          description: 'Site de {area} m² avec lignes SMT, d’assemblage et de vieillissement — capacité annuelle de {capacity} unités.',
        },
        {
          title: 'Une qualité que vous pouvez auditer',
          description:
            'Système qualité ISO 9001, tests fonctionnels à 100 % et test de vieillissement de 8 heures avant emballage. La documentation de conformité LVD (EN 62109-1) et CE / EMC pour nos onduleurs solaires est disponible sur demande. Inspections par tiers bienvenues.',
        },
      ],
    },
    process: {
      eyebrow: 'Notre façon de travailler',
      title: 'De la demande de devis à la livraison',
      subtitle: 'Un processus transparent en six étapes conçu pour les partenaires B2B internationaux — vous savez toujours où en est votre commande.',
      steps: [
        { title: 'Demande de devis', description: 'Envoyez vos besoins via le formulaire de demande, par e-mail ou sur WhatsApp.' },
        { title: 'Solution & Devis', description: 'Nos ingénieurs commerciaux répondent sous 24 heures avec une proposition et des tarifs.' },
        { title: 'Confirmation des échantillons', description: 'Évaluez les échantillons, validez les caractéristiques et finalisez les détails de la commande.' },
        { title: 'Tests & Certification', description: 'Les tests requis et la conformité au marché de destination sont traités avant la production.' },
        { title: 'Production en série', description: 'Production planifiée avec contrôle qualité à chaque étape.' },
        { title: 'Livraison & Support', description: 'Emballage d’export, organisation de l’expédition et support après-vente.' },
      ],
    },
    factory: {
      eyebrow: 'Au cœur de notre usine',
      title: 'Conçus pour une Qualité Constante et un Approvisionnement Fiable',
      subtitle: 'Notre processus de fabrication associe production, assemblage, tests et contrôle qualité pour garantir une qualité produit constante et un approvisionnement fiable pour nos clients du monde entier.',
      capabilities: [
        { title: 'Production & Assemblage', description: 'Des processus de production et d’assemblage structurés garantissent une fabrication régulière et un approvisionnement produit fiable.' },
        { title: 'Tests Qualité', description: 'Le contrôle qualité et les tests fonctionnels sont intégrés au processus de fabrication pour garantir une qualité produit constante.' },
        { title: 'Tests de vieillissement', description: 'Le test de vieillissement fait partie du processus qualité de production avant que les produits ne soient préparés pour la livraison.' },
        { title: 'Produits finis & Logistique', description: 'Les produits finis sont préparés pour l’emballage et l’expédition afin d’assurer une exécution efficace des commandes.' },
      ],
      bullets: [
        'Plus de {employees} employés, {engineers} ingénieurs R&D',
        'Processus de production et d’assemblage structurés',
        'Tests fonctionnels à 100 % avant emballage',
        'Test de vieillissement de 8 heures sur chaque lot de production',
        'Inspection avant expédition par un tiers bienvenue',
      ],
      cta: 'Découvrez notre usine',
    },
    applications: {
      eyebrow: 'Applications',
      title: 'Là où nos onduleurs sont utilisés',
      subtitle: 'Éprouvés dans des projets résidentiels, commerciaux, télécoms et hors-réseau sous des climats et des conditions de réseau variés.',
      items: [
        { title: 'Solaire résidentiel', description: 'Systèmes PV de toiture résidentiels avec stockage sur batterie et optimisation de l’autoconsommation.' },
        { title: 'Commercial & Industriel', description: 'Centrales de toiture et au sol C&I avec onduleurs de chaîne de 10 à 50 kW.' },
        { title: 'Stockage d’énergie', description: 'Systèmes hybrides avec batteries LiFePO4 pour l’effacement de pointe et le secours.' },
        { title: 'Stations de base télécoms', description: 'Alimentation hors-réseau pour tours de communication isolées, avec réseau instable ou absent.' },
        { title: 'Électrification rurale', description: 'Micro-réseaux autonomes et alimentation hors-réseau pour villages, fermes et communautés insulaires.' },
        { title: 'Alimentation de secours', description: 'Alimentation ininterrompue pour maisons, cliniques et petites entreprises en cas de coupure.' },
      ],
    },
    certifications: {
      eyebrow: 'Certifications & Normes',
      title: 'Documentation de Conformité pour les Marchés Internationaux',
      subtitle: 'La documentation de conformité de nos onduleurs solaires répond aux besoins d’examen des clients et de qualification des produits. Documentation disponible sur demande.',
      items: [
        {
          title: 'CE / LVD',
          description: 'La documentation de conformité LVD pour nos onduleurs solaires est disponible sur demande.',
        },
        {
          title: 'CE / EMC',
          description: 'La documentation de conformité EMC pour nos onduleurs solaires est disponible sur demande.',
        },
      ],
      note: 'La disponibilité des certifications varie selon le modèle et le marché de destination. Indiquez-nous votre pays de destination et nous confirmerons les certifications applicables à votre commande.',
      qualityButton: 'Découvrir notre système qualité',
    },
    testimonials: {
      title: 'Ce que disent nos partenaires',
      items: [
        { quote: 'La gamme d’options de puissance et les caractéristiques produits clairement définies nous facilitent l’évaluation des différentes configurations d’onduleurs pour notre marché.', country: 'Allemagne', customerType: 'Distributeur solaire' },
        { quote: 'Disposer de plusieurs onduleurs hors-réseau de puissances différentes nous offre plus de souplesse pour sélectionner des produits selon les applications de nos clients.', country: 'Nigeria', customerType: 'Installateur solaire' },
        { quote: 'Les onduleurs de puissance supérieure nous donnent plus de souplesse face aux différents besoins en puissance hors-réseau.', country: 'EAU', customerType: 'Distributeur solaire' },
        { quote: 'Les configurations multi-tensions sont utiles lorsque nous devons évaluer différentes exigences d’entrée CC pour des applications hors-réseau.', country: 'Kenya', customerType: 'Entreprise d’énergies renouvelables' },
        { quote: 'Les configurations d’onduleurs avec port USB nous offrent une option supplémentaire pour les applications nécessitant une fonction de charge additionnelle.', country: 'Philippines', customerType: 'Distributeur de produits solaires' },
        { quote: 'La gamme allant des onduleurs hors-réseau de faible puissance aux modèles de puissance supérieure nous offre plus de souplesse pour sélectionner des produits selon les applications.', country: 'Afrique du Sud', customerType: 'Fournisseur d’énergie hors-réseau' },
      ],
    },
    blog: {
      eyebrow: 'Analyses',
      title: 'Les derniers articles de notre blog',
    },
  },

  productsIndex: {
    eyebrow: 'Catalogue produits',
    title: 'Tous les produits',
    subtitle: 'Chaque modèle est conçu, fabriqué et testé dans notre propre usine. Contactez-nous pour les fiches techniques, les tarifs et les options OEM.',
    viewCategory: 'Voir la catégorie',
  },

  categoryPage: {
    eyebrow: 'Catégorie de produits',
    empty: 'Les modèles de cette catégorie sont en préparation. Contactez-nous pour obtenir le dernier catalogue.',
    byPowerTitle: '{category} par puissance nominale',
    byPowerEyebrow: 'Choisir par puissance',
    byPowerSubtitle: 'Choisissez la puissance de sortie dont vous avez besoin — chaque page liste tous les modèles disponibles à cette valeur nominale.',
    customCtaTitle: 'Besoin d’une caractéristique sur mesure ?',
    customCtaSubtitle: 'Nous développons des onduleurs personnalisés pour les projets OEM/ODM — puissance nominale, micrologiciel, marquage et certifications adaptés à votre marché.',
  },

  powerPage: {
    empty: 'Les modèles de cette puissance nominale sont en préparation. Contactez-nous pour obtenir le dernier catalogue.',
    modelsInRating: '{count} {model} dans cette puissance nominale',
    otherRatings: {
      eyebrow: 'Gamme hors-réseau',
      title: 'Autres puissances nominales',
      subtitle: 'Parcourez l’ensemble de la gamme d’onduleurs hors-réseau par puissance nominale.',
    },
    chip: 'Hors-réseau {power}',
    ctaTitle: 'Besoin d’un onduleur hors-réseau {power} ?',
    ctaSubtitle: 'Indiquez-nous votre marché cible, la tension d’entrée CC requise et la quantité — nous répondons avec des tarifs usine en direct et les délais.',
    /**
     * Texte localisé d’une page de puissance, assemblé à partir des seules
     * données du catalogue.
     * `facts.dc` / `facts.ac` sont des listes brutes de valeurs techniques
     * (indépendantes de la langue) ; facts peut être null lorsqu’aucun modèle
     * de cette puissance ne renseigne le champ.
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
      const specSentence = facts.dc ? ` Caractéristiques clés : entrée CC ${facts.dc}.` : '';
      return {
        description: `${facts.count} onduleur${plural} hors-réseau ${facts.label} disponible${plural} — ${facts.types}${seriesNote}.${specSentence} Contactez-nous pour les configurations, les tarifs et l’approvisionnement en volume.`,
        seoTitle: `Onduleur${plural} hors-réseau ${facts.label}${seriesNote}`,
        seoDescription: `Onduleur${plural} hors-réseau ${facts.label} : ${facts.types}.${
          facts.dc ? ` Entrée CC ${facts.dc}.` : ''
        } Contactez-nous pour les tarifs et l’approvisionnement en volume.`,
      };
    },
  },

  specs: {
    ratedPower: 'Puissance nominale',
    acOutput: 'Sortie CA',
    outputSockets: 'Prises de sortie',
    dcInputVoltage: 'Tension d’entrée CC',
    display: 'Affichage',
    usb: 'USB',
    cooling: 'Refroidissement',
    dimensions: 'Dimensions',
    netWeight: 'Poids net',
    groups: {
      acOutput: 'Sortie CA',
      dcInput: 'Entrée CC',
      displayCooling: 'Affichage & Refroidissement',
      interface: 'Interface',
      physical: 'Physique',
    },
    packaging: {
      packageDimensions: 'Dimensions du colis',
      grossWeight: 'Poids brut',
      cartonQuantity: 'Quantité par carton',
      cartonDimensions: 'Dimensions du carton',
      cartonWeight: 'Poids du carton',
      cartonInformation: 'Informations carton',
    },
    /** Traductions des VALEURS de caractéristiques récurrentes. Les valeurs non listées restent inchangées. */
    values: {
      display: {
        'Digital Display': 'Affichage digital',
        'LCD Display': 'Écran LCD',
        'LCD Smart Display': 'Écran LCD intelligent',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'Ventilateur intelligent à température contrôlée',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V en option',
        '220V optional': '220V en option',
      },
      usb: {
        Yes: 'Oui',
      },
      cartonInformation: {
        'Available in different packing configurations': 'Disponible dans différentes configurations d’emballage',
      },
      approx: 'Env.',
      units: '{n} unités',
      unitsOr: '{a} ou {b} unités',
    },
  },

  factory: {
    glance: {
      eyebrow: 'Fabrication',
      title: 'Notre usine en un coup d’œil',
      items: [
        { title: 'Lignes SMT', text: 'Placement automatisé + AOI' },
        { title: 'Lignes d’assemblage', text: 'Plusieurs lignes en parallèle' },
        { title: 'Salle de test de vieillissement', text: 'Test de 100 % des lots' },
        { title: 'Entrepôt', text: 'Produits finis + composants' },
      ],
    },
    process: {
      eyebrow: 'Processus',
      title: 'Comment chaque onduleur est fabriqué',
      steps: [
        'Inspection des composants à réception (IQC) — composants clés issus de fournisseurs qualifiés avec traçabilité par lot.',
        'Placement SMT automatisé avec inspection optique AOI pour toutes les cartes électroniques.',
        'Test fonctionnel au niveau carte et flashage du micrologiciel.',
        'Assemblage complet du produit avec serrage à couple contrôlé.',
        'Test fonctionnel à 100 % : forme d’onde de sortie, rendement, fonctions de protection.',
        'Test de vieillissement de 8 heures sous charge pour chaque lot de production.',
        'Inspection QC finale, enregistrement du numéro de série et emballage.',
      ],
    },
    visits: {
      eyebrow: 'Visites',
      title: 'Audits d’usine bienvenus',
      text: 'Nous accueillons les audits d’usine sur site ainsi que les inspections par des tiers (SGS, TÜV, BV ou l’organisme de votre choix). Pour les acheteurs internationaux qui ne peuvent pas se déplacer, nous proposons des visites vidéo en direct des lignes de production — planifiez-en une via le formulaire de contact.',
      addressLabel: 'Adresse',
    },
    cta: {
      title: 'Planifier une visite vidéo de l’usine',
      subtitle: 'Voyez nos lignes de production en direct avant de passer commande.',
    },
  },

  quality: {
    intro: {
      eyebrow: 'Qualité',
      title: 'La Qualité Est un Processus, Pas un Certificat',
      items: [
        { title: 'Système qualité ISO 9001', text: 'Des processus documentés couvrent la conception, les achats, la production et le service après-vente. Des audits internes réguliers maintiennent le système vivant, pas seulement certifié.' },
        { title: 'Tests fonctionnels à 100 %', text: 'Chaque unité est testée — forme d’onde de sortie, rendement, comportement des protections et communication — avant de quitter la ligne. Aucune excuse liée à l’échantillonnage par lot.' },
        { title: 'Test de vieillissement de 8 heures', text: 'Les lots de production fonctionnent à pleine charge dans notre salle de vieillissement afin de détecter les défaillances de jeunesse avant l’expédition.' },
      ],
    },
    traceability: {
      eyebrow: 'Traçabilité',
      title: 'Chaque Unité Est Traçable',
      text: 'Chaque onduleur porte un numéro de série unique le reliant à la date de production, aux enregistrements de test et aux lots de composants. Si un problème apparaît sur le terrain, nous pouvons tracer le lot concerné en quelques heures — pas en semaines. Les rapports de test et les données d’inspection sont mis à disposition des clients B2B sur demande.',
      bullets: [
        'Contrôle qualité à réception (IQC) sur tous les composants clés',
        'Contrôle qualité en cours de production (IPQC) à chaque étape',
        'Contrôle qualité en sortie (OQC) avec inspection avant expédition',
        'Tests de fiabilité : hautes/basses températures, humidité, vibrations',
        'Inspection par un tiers acceptée (SGS / TÜV / BV)',
      ],
    },
    certifications: {
      eyebrow: 'Certifications',
      title: 'Conformité & Certifications',
      note: 'La disponibilité des certifications varie selon le modèle et le marché de destination. Contactez notre équipe commerciale pour confirmer les certificats applicables à votre commande.',
    },
    cta: {
      title: 'Demander des rapports de test ou un échantillon',
      subtitle: 'Validez notre qualité par vous-même — nous fournissons rapports de test et échantillons aux acheteurs B2B qualifiés.',
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Demander un devis',
    subtitle: 'Remplissez le formulaire et décrivez votre projet — quantité, marché cible et exigences techniques nous aident à chiffrer plus rapidement.',
    directContact: 'Contact direct',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    phone: 'Téléphone',
    responseTime: 'Délai de réponse',
    responseTimeValue: 'Sous 24 heures les jours ouvrés',
    beforeYouWrite: 'Avant de nous écrire',
    tips: [
      'Vous avez une fiche technique ? Joignez-la à votre e-mail de réponse.',
      'Indiquez-nous votre pays de destination — les certifications varient selon les marchés.',
      'Acheteurs en volume : renseignez-vous sur le marquage OEM et la distribution exclusive.',
    ],
    linkedin: 'Nous suivre sur LinkedIn',
  },

  form: {
    title: 'Demander un devis',
    subtitle: 'Dites-nous ce dont vous avez besoin. Nos ingénieurs commerciaux répondent sous 24 heures les jours ouvrés.',
    name: 'Nom',
    company: 'Société',
    country: 'Pays',
    email: 'E-mail',
    phone: 'WhatsApp / Téléphone',
    quantity: 'Quantité estimée',
    quantityPlaceholder: 'ex. 500',
    product: 'Produit concerné',
    productGeneral: 'Demande générale / pas encore sûr',
    message: 'Message',
    messagePlaceholder: 'Exigences techniques, marché cible, besoins de certification, calendrier de livraison...',
    submit: 'Envoyer la demande',
    consentPrefix: 'En envoyant ce formulaire, vous acceptez notre',
    consentLink: 'politique de confidentialité',
    consentSuffix: '. Votre demande ne constitue pas une inscription marketing.',
    successTitle: 'Merci — votre demande a bien été envoyée.',
    successText: 'Nos ingénieurs commerciaux reviendront vers vous sous 24 heures les jours ouvrés.',
    errorTitle: 'Une erreur est survenue.',
    errorDetail: '{message} Veuillez réessayer, ou écrivez-nous directement par e-mail.',
    fallbackError: 'Veuillez réessayer, ou écrivez-nous directement par e-mail.',
    submissionFailed: 'Échec de l’envoi.',
  },

  chat: {
    greeting: 'Bonjour ! Quelle puissance recherchez-vous ?',
    teaser: 'Bonjour ! Vous cherchez un onduleur hors-réseau ? Je peux vous aider à trouver la bonne puissance.',
    headerTitle: 'Discutez avec nous',
    headerSubtitle: '{brand} · Assistant commercial IA',
    inputPlaceholder: 'Saisissez votre message…',
    inputAria: 'Saisissez votre message',
    sendAria: 'Envoyer le message',
    closeAria: 'Fermer la discussion',
    launcherAria: 'Discutez avec nous',
    launcherUnreadAria: 'Discutez avec nous, 1 nouveau message',
    dismissAria: 'Masquer le message',
    messagesAria: 'Messages',
    contactPlaceholder: 'Votre e-mail ou WhatsApp…',
    contactHint: 'Vos coordonnées sont destinées uniquement à notre équipe commerciale.',
    optionalNote: 'Facultatif — un e-mail ou un WhatsApp suffit.',
    namePlaceholder: 'Nom',
    nameAria: 'Votre nom (facultatif)',
    companyPlaceholder: 'Société',
    companyAria: 'Votre société (facultatif)',
    countryPlaceholder: 'Pays',
    countryAria: 'Votre pays (facultatif)',
    viewProduct: 'Voir le détail du produit',
    reachUsDirectly: 'Vous pouvez également nous contacter directement :',
    leadThanks: 'Merci — notre équipe commerciale vous recontactera rapidement. Voici nos coordonnées si vous préférez nous écrire d’abord :',
    verificationError: 'Je n’ai pas pu vérifier cette session. Veuillez utiliser le bouton WhatsApp ou le formulaire de contact et notre équipe vous répondra directement.',
    genericError: 'Désolé, une erreur est survenue. Veuillez réessayer ou utiliser le formulaire de contact.',
    networkError: 'Désolé — je n’ai pas pu joindre le serveur. Veuillez réessayer, ou utilisez le formulaire de contact et notre équipe vous répondra par e-mail.',
    leadError: 'Désolé, nous n’avons pas pu enregistrer vos coordonnées. Veuillez nous écrire par e-mail ou réessayer.',
    typing: 'En train d’écrire…',
    /** Libellés affichés pour les chips connues du moteur anglais (la valeur envoyée reste en anglais pour que le moteur continue de reconnaître). */
    chipLabels: {
      'I know the power': 'Je connais la puissance',
      'Not sure': 'Je ne sais pas encore',
      'Show other models': 'Voir les autres modèles',
    },
  },

  blog: {
    eyebrow: 'Analyses',
    title: 'Blog & Analyses du Secteur',
    subtitle: 'Connaissances pratiques pour acheteurs d’onduleurs, installateurs et développeurs de projets — rédigées par notre équipe d’ingénieurs.',
    breadcrumb: 'Blog',
    articleCtaTitle: 'Besoin d’aide pour choisir un onduleur ?',
    articleCtaSubtitle: 'Nos ingénieurs commerciaux peuvent recommander le modèle adapté à votre projet — gratuitement.',
    translatedNote: 'Cet article est actuellement disponible en anglais.',
  },
};
