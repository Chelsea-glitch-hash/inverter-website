/**
 * Site-wide UI dictionary — SPANISH (international).
 *
 * Same shape as en.ts (src/i18n/ui/en.ts). Placeholders {name} are filled at
 * render time with fill() — token names stay identical to the English source.
 */

import type { Dictionary } from './en';

export const es: Dictionary = {
  nav: {
    products: 'Productos',
    factory: 'Fábrica',
    quality: 'Calidad',
    about: 'Sobre nosotros',
    blog: 'Blog',
    viewAllProducts: 'Ver todos los productos',
    requestQuote: 'Solicitar presupuesto',
    whatsappUs: 'Escríbenos por WhatsApp',
    mainNavAria: 'Navegación principal',
    mobileNavAria: 'Navegación móvil',
    toggleMenuAria: 'Abrir o cerrar el menú de navegación',
    languageAria: 'Cambiar idioma',
    skipToContent: 'Ir al contenido',
  },

  footer: {
    productsHeading: 'Productos',
    allProducts: 'Todos los productos',
    companyHeading: 'Empresa',
    aboutUs: 'Sobre nosotros',
    factoryAndManufacturing: 'Fábrica y fabricación',
    qualityControl: 'Control de calidad',
    blogInsights: 'Blog y novedades',
    contactUs: 'Contacto',
    privacyPolicy: 'Política de privacidad',
    stayUpdated: 'Mantente al día',
    newsletterBlurb: 'Novedades de producto, información técnica y noticias de la empresa.',
    blurb: 'fabricante profesional de inversores desde {year}. Socio OEM / ODM en más de {countries} países.',
    whatsappLabel: 'WhatsApp',
    emailAria: 'Correo electrónico',
    rights: 'Todos los derechos reservados.',
    productCategoriesAria: 'Categorías de producto',
    companyNavAria: 'Empresa',
  },

  newsletter: {
    emailLabel: 'Dirección de correo electrónico',
    subscribe: 'Suscribirse',
    consent: 'Acepto recibir por correo electrónico novedades de producto, información técnica y noticias de la empresa. Puedo darme de baja en cualquier momento.',
    success: 'Suscripción completada. Bienvenido a bordo.',
    error: 'No se pudo completar la suscripción. Inténtalo de nuevo más tarde.',
  },

  consent: {
    text: 'Utilizamos cookies para entender cómo se usa el sitio web y mejorar tu experiencia. Las cookies de marketing solo se utilizan con tu consentimiento. Consulta nuestra',
    privacyLink: 'política de privacidad',
    reject: 'Solo las necesarias',
    accept: 'Aceptar todas',
    aria: 'Consentimiento de cookies',
  },

  cta: {
    defaultTitle: 'Solicita tu presupuesto hoy',
    defaultSubtitle: 'Envíanos tus requisitos: nuestros ingenieros de ventas responden en un plazo de 24 horas con precios, plazos de entrega y opciones OEM.',
    defaultButton: 'Solicitar presupuesto',
    whatsapp: 'Chatear por WhatsApp',
    midTitle: '¿Necesitas precios o una solución a medida?',
    midSubtitle: 'Envíanos tus requisitos: nuestros ingenieros de ventas responden en un plazo de 24 horas.',
  },

  common: {
    home: 'Inicio',
    viewDetails: 'Ver detalles',
    getQuote: 'Solicitar presupuesto',
    requestQuote: 'Solicitar presupuesto',
    viewProducts: 'Ver productos',
    browseAllProducts: 'Ver todos los productos',
    readAllArticles: 'Leer todos los artículos',
    featured: 'Destacados',
    ratedOutput: 'potencia de salida nominal',
    contactSales: 'Contactar con ventas',
    quoteForModel: 'Solicitar presupuesto para este modelo',
    productOverview: 'Descripción del producto',
    technicalSpecifications: 'Especificaciones técnicas',
    keyFeatures: 'Características principales',
    packagingInformation: 'Información de embalaje',
    applications: 'Aplicaciones',
    downloads: 'Descargas',
    relatedProducts: 'Productos relacionados',
    relatedSameCategory: 'Más opciones en {category}',
    relatedMoreModels: 'Más modelos de nuestro catálogo',
    relatedGuides: 'Guías relacionadas',
    relatedGuidesSubtitle: 'Artículos técnicos de nuestro equipo de ingeniería',
    standard: 'Estándar',
    product: 'Producto',
    viewCertificate: 'Ver certificado',
    viewCertificateSr: '(abre el PDF en una pestaña nueva)',
    specifications: 'Especificaciones',
    model: 'modelo',
    models: 'modelos',
    since: 'Desde',
    oemBullets: [
      'Marca OEM / ODM disponible para pedidos de gran volumen',
      'Ficha técnica y precios a petición',
      'Respuesta en un plazo de 24 horas en días laborables',
    ],
    pageAria: {
      productCategories: 'Categorías de producto',
    },
  },

  seo: {
    home: {
      title: '{brand} — Fabricante de inversores para partners B2B de todo el mundo',
      description:
        'Fabricante profesional de inversores solares desde {year}. Inversores híbridos, conectados a red y off-grid con soporte OEM/ODM, sistema de calidad ISO 9001 y precios directos de fábrica. Exportamos a más de {countries} países.',
    },
    productsIndex: {
      title: 'Todos los productos — Catálogo de inversores',
      description:
        'Descubre nuestro catálogo actual de inversores: inversores de potencia off-grid de 900W a 5000W, con soporte OEM/ODM. Contáctanos para especificaciones, precios y suministro por volumen.',
    },
    category: {
      titleSuffix: '— Fabricante y proveedor OEM',
    },
    factory: {
      title: 'Fábrica y fabricación — Líneas SMT, montaje y prueba de envejecimiento',
      description:
        'Recorre nuestra fábrica de inversores de {area} m²: líneas SMT automatizadas, líneas de montaje, salas de prueba de envejecimiento y almacén. Auditorías de fábrica por vídeo disponibles para compradores internacionales.',
    },
    quality: {
      title: 'Control de calidad — Sistema ISO 9001, 100 % de pruebas y 8 horas de envejecimiento',
      description:
        'Nuestro control de calidad de inversores: sistema de calidad certificado ISO 9001, pruebas funcionales al 100 %, pruebas de envejecimiento de 8 horas y trazabilidad completa de la producción. Inspección de terceros bienvenida.',
    },
    contact: {
      title: 'Contacto — Solicita un presupuesto para inversores',
      description:
        'Solicita precios, fichas técnicas y opciones OEM para nuestros inversores. Los ingenieros de ventas responden en un plazo de 24 horas en días laborables. Correo electrónico, WhatsApp y formulario de consulta disponibles.',
    },
    blog: {
      title: 'Blog y novedades del sector — Base de conocimiento sobre inversores',
      description:
        'Guías técnicas y análisis del sector sobre inversores solares: híbrido frente a conectado a red frente a off-grid, dimensionamiento, certificaciones y fabricación OEM.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Fabricante de inversores desde {year}',
      title: 'Inversores solares directos de fábrica para partners B2B de todo el mundo',
      subtitle:
        'Inversores híbridos, conectados a red y off-grid diseñados y fabricados en nuestra propia fábrica. Programas OEM / ODM, calidad certificada y precios competitivos directos de fábrica para distribuidores, instaladores y desarrolladores de proyectos.',
      heroImageAria: 'Ilustración de un sistema de energía solar',
      bullets: ['OEM / ODM', 'ISO 9001', 'Respuesta en 24 h', 'Más de {countries} países de exportación'],
    },
    trust: {
      manufacturer: 'Fabricante',
      factoryArea: 'Área de fábrica',
      unitsPerYear: 'Unidades / año',
      exportCountries: 'Países de exportación',
      oemClients: 'Clientes OEM / ODM',
    },
    categories: {
      eyebrow: 'Nuestros productos',
      title: 'Categorías de inversores',
      subtitle: 'Explora las gamas de inversores que fabricamos actualmente. Las categorías se publican aquí en cuanto se lanza su primer modelo.',
    },
    featured: {
      eyebrow: 'Destacados',
      title: 'Modelos populares',
      subtitle: 'Los inversores más vendidos de nuestro catálogo. Todos los modelos admiten marca OEM y personalización de especificaciones.',
    },
    advantages: {
      eyebrow: 'Ventajas del producto',
      title: 'Ventajas del producto y solidez técnica',
      subtitle: 'Características clave de nuestra gama de inversores off-grid: desde el tipo de salida y las opciones de entrada CC hasta las potencias nominales y las configuraciones prácticas del producto.',
      items: [
        {
          title: 'Salida de onda senoidal pura',
          description: 'Salida CA de onda senoidal pura y estable, diseñada para aplicaciones off-grid que requieren alimentación fiable para diferentes tipos de cargas.',
        },
        {
          title: 'Múltiples opciones de entrada CC',
          description: 'Los modelos seleccionados admiten varias configuraciones de tensión de entrada CC, incluidas 12V, 24V, 48V, 60V y 72V, según el producto.',
        },
        {
          title: 'Refrigeración inteligente controlada por temperatura',
          description: 'La refrigeración por ventilador con control inteligente de temperatura contribuye a un funcionamiento fiable en distintas aplicaciones off-grid.',
        },
        {
          title: 'Configuraciones flexibles de salida CA',
          description: 'Los modelos seleccionados están disponibles con opciones de salida CA de 220V / 110V y diferentes configuraciones de enchufe para satisfacer los requisitos de cada mercado.',
        },
        {
          title: 'Múltiples opciones de potencia',
          description: 'La gama actual de inversores off-grid cubre de 900W a 5000W, ofreciendo diferentes opciones de potencia para una gran variedad de aplicaciones off-grid.',
        },
        {
          title: 'Configuraciones prácticas del producto',
          description: 'La gama de productos incluye diferentes configuraciones, como pantallas LCD o digitales, varios enchufes de salida CA y modelos con USB, según el producto.',
        },
      ],
    },
    whyUs: {
      eyebrow: 'Por qué nosotros',
      title: 'Por qué nos eligen los compradores internacionales',
      subtitle: 'Somos fabricantes, no una empresa comercializadora: eso significa soporte de ingeniería directo, calidad controlada y mejores márgenes.',
      items: [
        {
          title: 'I+D propio',
          description: '{engineers} ingenieros que cubren el diseño de hardware, firmware y estructura. Firmware, logos, embalaje y especificaciones personalizados para proyectos OEM/ODM.',
        },
        {
          title: 'Escala de fabricación',
          description: 'Instalación de {area} m² con líneas SMT, de montaje y de envejecimiento: capacidad anual de {capacity} unidades.',
        },
        {
          title: 'Calidad que se puede auditar',
          description:
            'Sistema de calidad ISO 9001, pruebas funcionales al 100 % y prueba de envejecimiento de 8 horas antes del embalaje. La documentación de conformidad LVD (EN 62109-1) y EMC relacionada con CE está disponible para nuestros inversores solares a petición. Inspección de terceros bienvenida.',
        },
      ],
    },
    process: {
      eyebrow: 'Cómo trabajamos',
      title: 'De la solicitud de presupuesto a la entrega',
      subtitle: 'Un proceso transparente de seis pasos diseñado para partners B2B internacionales: siempre sabrás en qué punto está tu pedido.',
      steps: [
        { title: 'Solicitud de presupuesto', description: 'Envíanos tus requisitos a través del formulario de consulta, por correo electrónico o por WhatsApp.' },
        { title: 'Solución y cotización', description: 'Nuestros ingenieros de ventas responden en un plazo de 24 horas con una propuesta y precios.' },
        { title: 'Confirmación de muestras', description: 'Evalúa las muestras, confirma las especificaciones y cierra los detalles del pedido.' },
        { title: 'Pruebas y certificación', description: 'Las pruebas necesarias y la conformidad con el mercado de destino se gestionan antes de la producción.' },
        { title: 'Producción por lotes', description: 'Producción programada con control de calidad en cada etapa.' },
        { title: 'Entrega y soporte', description: 'Embalaje de exportación, organización del envío y soporte posventa.' },
      ],
    },
    factory: {
      eyebrow: 'Dentro de nuestra fábrica',
      title: 'Fabricados para una calidad constante y un suministro fiable',
      subtitle: 'Nuestro proceso de fabricación integra producción, montaje, pruebas y control de calidad para garantizar una calidad de producto constante y un suministro fiable para clientes de todo el mundo.',
      capabilities: [
        { title: 'Producción y montaje', description: 'Procesos estructurados de producción y montaje que garantizan una fabricación constante y un suministro fiable de producto.' },
        { title: 'Pruebas de calidad', description: 'El control de calidad y las pruebas funcionales están integrados en el proceso de fabricación para asegurar una calidad de producto constante.' },
        { title: 'Prueba de envejecimiento', description: 'La prueba de envejecimiento forma parte del proceso de calidad de producción antes de preparar los productos para su entrega.' },
        { title: 'Producto terminado y logística', description: 'Los productos terminados se preparan para el embalaje y el envío, para una gestión de pedidos eficiente.' },
      ],
      bullets: [
        'Más de {employees} empleados, {engineers} ingenieros de I+D',
        'Procesos estructurados de producción y montaje',
        'Pruebas funcionales al 100 % antes del embalaje',
        'Prueba de envejecimiento de 8 horas en cada lote de producción',
        'Inspección previa al envío por terceros bienvenida',
      ],
      cta: 'Explora nuestra fábrica',
    },
    applications: {
      eyebrow: 'Aplicaciones',
      title: 'Dónde trabajan nuestros inversores',
      subtitle: 'Probados en proyectos residenciales, comerciales, de telecomunicaciones y off-grid en climas y condiciones de red muy diversos.',
      items: [
        { title: 'Solar residencial', description: 'Sistemas FV de tejado residencial con respaldo de batería y optimización del autoconsumo.' },
        { title: 'Comercial e industrial', description: 'Plantas C&I de tejado y de suelo con inversores de cadena de 10 a 50 kW.' },
        { title: 'Almacenamiento de energía', description: 'Sistemas híbridos con integración de baterías LiFePO4 para gestión de picos y respaldo.' },
        { title: 'Estaciones base de telecomunicaciones', description: 'Alimentación off-grid para torres de comunicación remotas sin acceso a la red o con red poco fiable.' },
        { title: 'Electrificación rural', description: 'Microrredes autónomas y alimentación off-grid para pueblos, granjas y comunidades insulares.' },
        { title: 'Energía de respaldo', description: 'Suministro ininterrumpido para hogares, clínicas y pequeñas empresas durante los cortes de luz.' },
      ],
    },
    certifications: {
      eyebrow: 'Certificaciones y normativas',
      title: 'Documentación de conformidad para mercados globales',
      subtitle: 'Nuestra documentación de conformidad de inversores solares responde a los requisitos de revisión del cliente y de homologación de producto. Documentación disponible a petición.',
      items: [
        {
          title: 'CE / LVD',
          description: 'La documentación de conformidad LVD está disponible para nuestros inversores solares a petición.',
        },
        {
          title: 'CE / EMC',
          description: 'La documentación de conformidad EMC está disponible para nuestros inversores solares a petición.',
        },
      ],
      note: 'La disponibilidad de certificaciones varía según el modelo y el mercado de destino. Indícanos el país de destino y confirmaremos las certificaciones aplicables a tu pedido.',
      qualityButton: 'Conoce nuestro sistema de calidad',
    },
    testimonials: {
      title: 'Lo que dicen nuestros partners',
      items: [
        { quote: 'La gama de opciones de potencia y las especificaciones de producto claramente definidas nos facilitan evaluar diferentes configuraciones de inversores para nuestro mercado.', country: 'Alemania', customerType: 'Distribuidor de productos solares' },
        { quote: 'Disponer de varias opciones de potencia en inversores off-grid nos da más flexibilidad al seleccionar productos para diferentes aplicaciones de nuestros clientes.', country: 'Nigeria', customerType: 'Instalador solar' },
        { quote: 'Las opciones de inversores de mayor potencia nos dan más flexibilidad al analizar diferentes requisitos de potencia off-grid.', country: 'EAU', customerType: 'Distribuidor de productos solares' },
        { quote: 'Las configuraciones multivoltaje resultan útiles cuando necesitamos evaluar distintos requisitos de entrada CC para aplicaciones off-grid.', country: 'Kenia', customerType: 'Empresa de energías renovables' },
        { quote: 'Las configuraciones de inversores con USB nos ofrecen una alternativa para aplicaciones donde se requiere funcionalidad de carga adicional.', country: 'Filipinas', customerType: 'Distribuidor de productos solares' },
        { quote: 'La gama que va desde inversores off-grid de menor potencia hasta modelos de mayor potencia nos da más flexibilidad al seleccionar productos para distintas aplicaciones.', country: 'Sudáfrica', customerType: 'Proveedor de energía off-grid' },
      ],
    },
    blog: {
      eyebrow: 'Novedades',
      title: 'Lo último de nuestro blog',
    },
  },

  productsIndex: {
    eyebrow: 'Catálogo de productos',
    title: 'Todos los productos',
    subtitle: 'Cada modelo se diseña, fabrica y prueba en nuestra propia fábrica. Contáctanos para fichas técnicas, precios y opciones OEM.',
    viewCategory: 'Ver categoría',
  },

  categoryPage: {
    eyebrow: 'Categoría de producto',
    empty: 'Los modelos de esta categoría están en preparación. Contáctanos para recibir el catálogo más reciente.',
    byPowerTitle: '{category} por potencia nominal',
    byPowerEyebrow: 'Buscar por potencia',
    byPowerSubtitle: 'Elige la potencia de salida que necesitas: cada página incluye todos los modelos disponibles con esa potencia nominal.',
    customCtaTitle: '¿Necesitas una especificación a medida?',
    customCtaSubtitle: 'Desarrollamos inversores personalizados para proyectos OEM/ODM: potencia nominal, firmware, marca y certificaciones adaptadas a tu mercado.',
  },

  powerPage: {
    empty: 'Los modelos con esta potencia nominal están en preparación. Contáctanos para recibir el catálogo más reciente.',
    modelsInRating: '{count} {model} en esta potencia nominal',
    otherRatings: {
      eyebrow: 'Gama off-grid',
      title: 'Otras potencias nominales',
      subtitle: 'Explora toda la gama de inversores off-grid por potencia nominal.',
    },
    chip: 'Off-grid {power}',
    ctaTitle: '¿Necesitas un inversor off-grid de {power}?',
    ctaSubtitle: 'Indícanos tu mercado de destino, la tensión de entrada CC requerida y la cantidad; te respondemos con precios directos de fábrica y plazo de entrega.',
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
      const specSentence = facts.dc ? ` Especificaciones clave: entrada CC ${facts.dc}.` : '';
      return {
        description: `Disponibles ${facts.count} inversor${plural} off-grid de ${facts.label}: ${facts.types}${seriesNote}.${specSentence} Contáctanos para configuraciones, precios y suministro por volumen.`,
        seoTitle: `Inversor${plural} off-grid de ${facts.label}${seriesNote}`,
        seoDescription: `Inversor${plural} off-grid de ${facts.label}: ${facts.types}.${
          facts.dc ? ` Entrada CC ${facts.dc}.` : ''
        } Contáctanos para precios y suministro por volumen.`,
      };
    },
  },

  specs: {
    ratedPower: 'Potencia nominal',
    acOutput: 'Salida CA',
    outputSockets: 'Enchufes de salida',
    dcInputVoltage: 'Tensión de entrada CC',
    display: 'Pantalla',
    usb: 'USB',
    cooling: 'Refrigeración',
    dimensions: 'Dimensiones',
    netWeight: 'Peso neto',
    groups: {
      acOutput: 'Salida CA',
      dcInput: 'Entrada CC',
      displayCooling: 'Pantalla y refrigeración',
      interface: 'Interfaces',
      physical: 'Físicas',
    },
    packaging: {
      packageDimensions: 'Dimensiones del paquete',
      grossWeight: 'Peso bruto',
      cartonQuantity: 'Cantidad por caja',
      cartonDimensions: 'Dimensiones de la caja',
      cartonWeight: 'Peso de la caja',
      cartonInformation: 'Información de embalaje',
    },
    /** Translations for recurring specification VALUES. Unlisted values pass through unchanged. */
    values: {
      display: {
        'Digital Display': 'Pantalla digital',
        'LCD Display': 'Pantalla LCD',
        'LCD Smart Display': 'Pantalla LCD inteligente',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'Ventilador con control inteligente de temperatura',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V opcional',
        '220V optional': '220V opcional',
      },
      usb: {
        Yes: 'Sí',
      },
      cartonInformation: {
        'Available in different packing configurations': 'Disponible en diferentes configuraciones de embalaje',
      },
      approx: 'Aprox.',
      units: '{n} unidades',
      unitsOr: '{a} o {b} unidades',
    },
  },

  factory: {
    glance: {
      eyebrow: 'Fabricación',
      title: 'Nuestra fábrica de un vistazo',
      items: [
        { title: 'Líneas SMT', text: 'Colocación automatizada + AOI' },
        { title: 'Líneas de montaje', text: 'Varias líneas en paralelo' },
        { title: 'Sala de prueba de envejecimiento', text: 'Pruebas al 100 % de cada lote' },
        { title: 'Almacén', text: 'Producto terminado + componentes' },
      ],
    },
    process: {
      eyebrow: 'Proceso',
      title: 'Cómo se fabrica cada inversor',
      steps: [
        'Inspección de componentes en recepción (IQC): componentes clave de proveedores cualificados con trazabilidad por lote.',
        'Colocación SMT automatizada con inspección óptica AOI para todos los PCB.',
        'Prueba funcional a nivel de placa y grabado del firmware.',
        'Montaje completo del producto con atornillado con control de par.',
        'Prueba funcional al 100 %: forma de onda de salida, eficiencia y funciones de protección.',
        'Prueba de envejecimiento de 8 horas bajo carga para cada lote de producción.',
        'Inspección final de control de calidad, registro de número de serie y embalaje.',
      ],
    },
    visits: {
      eyebrow: 'Visitas',
      title: 'Auditorías de fábrica bienvenidas',
      text: 'Damos la bienvenida a auditorías de fábrica in situ y a inspecciones de terceros (SGS, TÜV, BV o la agencia que designes). Para compradores internacionales que no puedan viajar, ofrecemos recorridos en directo por vídeo de las líneas de producción: puedes reservar uno a través del formulario de contacto.',
      addressLabel: 'Dirección',
    },
    cta: {
      title: 'Reserva una visita por vídeo a la fábrica',
      subtitle: 'Videollámate en directo a nuestras líneas de producción antes de hacer tu pedido.',
    },
  },

  quality: {
    intro: {
      eyebrow: 'Calidad',
      title: 'La calidad es un proceso, no un certificado',
      items: [
        { title: 'Sistema de calidad ISO 9001', text: 'Procesos documentados que cubren diseño, compras, producción y posventa. Auditorías internas periódicas mantienen vivo el sistema, no nos limitamos a la certificación.' },
        { title: 'Pruebas funcionales al 100 %', text: 'Cada unidad se prueba individualmente en cuanto a forma de onda de salida, eficiencia, comportamiento de las protecciones y comunicación antes de salir de la línea. Sin excusas de muestreo por lotes.' },
        { title: 'Prueba de envejecimiento de 8 horas', text: 'Los lotes de producción funcionan a plena carga en nuestra sala de envejecimiento para detectar fallos de vida temprana antes del envío.' },
      ],
    },
    traceability: {
      eyebrow: 'Trazabilidad',
      title: 'Cada unidad puede rastrearse hasta su origen',
      text: 'Cada inversor lleva un número de serie único que lo vincula con la fecha de producción, los registros de pruebas y los lotes de componentes. Si surge algún problema en campo, podemos rastrear el lote afectado en cuestión de horas, no de semanas. Los informes de prueba y los datos de inspección están disponibles para clientes B2B a petición.',
      bullets: [
        'Control de calidad en recepción (IQC) de todos los componentes clave',
        'Control de calidad en proceso (IPQC) en cada etapa de producción',
        'Control de calidad de salida (OQC) con inspección previa al envío',
        'Pruebas de fiabilidad: alta/baja temperatura, humedad, vibración',
        'Inspección de terceros aceptada (SGS / TÜV / BV)',
      ],
    },
    certifications: {
      eyebrow: 'Certificaciones',
      title: 'Conformidad y certificaciones',
      note: 'La disponibilidad de certificaciones varía según el modelo y el mercado de destino. Contacte con nuestro equipo de ventas para confirmar los certificados aplicables a su pedido.',
    },
    cta: {
      title: 'Solicita informes de prueba o una muestra',
      subtitle: 'Comprueba nuestra calidad por ti mismo: proporcionamos informes de prueba y muestras a compradores B2B cualificados.',
    },
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Solicitar presupuesto',
    subtitle: 'Rellena el formulario y cuéntanos tu proyecto: la cantidad, el mercado de destino y los requisitos técnicos nos ayudan a cotizar más rápido.',
    directContact: 'Contacto directo',
    email: 'Correo electrónico',
    whatsapp: 'WhatsApp',
    phone: 'Teléfono',
    responseTime: 'Tiempo de respuesta',
    responseTimeValue: 'En un plazo de 24 horas en días laborables',
    beforeYouWrite: 'Antes de escribirnos',
    tips: [
      '¿Tienes una ficha técnica? Adjúntala en tu correo de respuesta.',
      'Indícanos el país de destino: las certificaciones varían según el mercado.',
      'Compradores de gran volumen: pregunta por la marca OEM y la distribución exclusiva.',
    ],
    linkedin: 'Conecta en LinkedIn',
  },

  form: {
    title: 'Solicitar presupuesto',
    subtitle: 'Cuéntanos qué necesitas. Nuestros ingenieros de ventas responden en un plazo de 24 horas en días laborables.',
    name: 'Nombre',
    company: 'Empresa',
    country: 'País',
    email: 'Correo electrónico',
    phone: 'WhatsApp / Teléfono',
    quantity: 'Cantidad estimada',
    quantityPlaceholder: 'p. ej. 500',
    product: 'Producto de interés',
    productGeneral: 'Consulta general / aún no lo sé',
    message: 'Mensaje',
    messagePlaceholder: 'Requisitos técnicos, mercado de destino, certificaciones necesarias, plazos de entrega...',
    submit: 'Enviar consulta',
    consentPrefix: 'Al enviar el formulario, aceptas nuestra',
    consentLink: 'política de privacidad',
    consentSuffix: '. Tu consulta no es una suscripción de marketing.',
    successTitle: 'Gracias: tu consulta se ha enviado.',
    successText: 'Nuestros ingenieros de ventas se pondrán en contacto contigo en un plazo de 24 horas en días laborables.',
    errorTitle: 'Algo ha ido mal.',
    errorDetail: '{message} Inténtalo de nuevo o escríbenos directamente por correo electrónico.',
    fallbackError: 'Inténtalo de nuevo o escríbenos directamente por correo electrónico.',
    submissionFailed: 'No se pudo enviar el formulario.',
  },

  chat: {
    greeting: '¡Hola! ¿Qué potencia buscas?',
    teaser: '¡Hola! ¿Buscas un inversor off-grid? Puedo ayudarte a encontrar la potencia adecuada.',
    headerTitle: 'Chatea con nosotros',
    headerSubtitle: '{brand} · Asistente de ventas con IA',
    inputPlaceholder: 'Escribe tu mensaje…',
    inputAria: 'Escribe tu mensaje',
    sendAria: 'Enviar mensaje',
    closeAria: 'Cerrar el chat',
    launcherAria: 'Chatea con nosotros',
    launcherUnreadAria: 'Chatea con nosotros, 1 mensaje nuevo',
    dismissAria: 'Descartar mensaje',
    messagesAria: 'Mensajes',
    contactPlaceholder: 'Tu correo electrónico o WhatsApp…',
    contactHint: 'Tus datos van únicamente a nuestro equipo de ventas.',
    optionalNote: 'Opcional: solo necesitamos un correo electrónico o WhatsApp.',
    namePlaceholder: 'Nombre',
    nameAria: 'Tu nombre (opcional)',
    companyPlaceholder: 'Empresa',
    companyAria: 'Tu empresa (opcional)',
    countryPlaceholder: 'País',
    countryAria: 'Tu país (opcional)',
    viewProduct: 'Ver detalles del producto',
    reachUsDirectly: 'También puedes contactarnos directamente:',
    leadThanks: 'Gracias: nuestro equipo de ventas se pondrá en contacto contigo en breve. Aquí tienes nuestros datos por si prefieres contactarnos antes:',
    verificationError: 'No he podido verificar esta sesión. Utiliza el botón de WhatsApp o el formulario de contacto y nuestro equipo te ayudará directamente.',
    genericError: 'Lo siento, algo ha ido mal. Inténtalo de nuevo o utiliza el formulario de contacto.',
    networkError: 'Lo siento, no he podido conectar con el servidor. Inténtalo de nuevo o utiliza el formulario de contacto y nuestro equipo te responderá por correo electrónico.',
    leadError: 'Lo siento, no hemos podido guardar tus datos. Escríbenos por correo electrónico o inténtalo de nuevo.',
    typing: 'Escribiendo…',
    /** Display labels for known English engine chips (the value sent stays English so the engine keeps matching). */
    chipLabels: {
      'I know the power': 'Ya conozco la potencia',
      'Not sure': 'No estoy seguro',
      'Show other models': 'Mostrar otros modelos',
    },
  },

  blog: {
    eyebrow: 'Novedades',
    title: 'Blog y novedades del sector',
    subtitle: 'Conocimientos prácticos para compradores de inversores, instaladores y desarrolladores de proyectos, escritos por nuestro equipo de ingeniería.',
    breadcrumb: 'Blog',
    articleCtaTitle: '¿Necesitas ayuda para elegir un inversor?',
    articleCtaSubtitle: 'Nuestros ingenieros de ventas pueden recomendarte el modelo adecuado para tu proyecto, sin coste.',
    translatedNote: 'Este artículo está disponible actualmente en inglés.',
  },
};
