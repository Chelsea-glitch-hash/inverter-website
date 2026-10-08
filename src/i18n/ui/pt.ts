/**
 * Site-wide UI dictionary — BRAZILIAN PORTUGUESE.
 * Same structure as en.ts; powerPage.copy keeps the exact same signature.
 */
import type { Dictionary } from './en';

export const pt: Dictionary = {
  nav: {
    products: 'Produtos',
    factory: 'Fábrica',
    quality: 'Qualidade',
    about: 'Sobre nós',
    blog: 'Blog',
    viewAllProducts: 'Ver todos os produtos',
    requestQuote: 'Solicitar Orçamento',
    whatsappUs: 'Fale conosco no WhatsApp',
    mainNavAria: 'Navegação principal',
    mobileNavAria: 'Navegação móvel',
    toggleMenuAria: 'Alternar menu de navegação',
    languageAria: 'Alterar idioma',
    skipToContent: 'Ir para o conteúdo',
  },

  footer: {
    productsHeading: 'Produtos',
    allProducts: 'Todos os produtos',
    companyHeading: 'Empresa',
    aboutUs: 'Sobre nós',
    factoryAndManufacturing: 'Fábrica e Manufatura',
    qualityControl: 'Controle de Qualidade',
    blogInsights: 'Blog e Insights',
    contactUs: 'Fale conosco',
    privacyPolicy: 'Política de Privacidade',
    stayUpdated: 'Fique por dentro',
    newsletterBlurb: 'Atualizações de produtos, insights técnicos e notícias da empresa.',
    blurb: 'fabricante profissional de inversores desde {year}. Parceiro OEM / ODM para {countries}+ países.',
    whatsappLabel: 'WhatsApp',
    emailAria: 'E-mail',
    rights: 'Todos os direitos reservados.',
    productCategoriesAria: 'Categorias de produtos',
    companyNavAria: 'Empresa',
  },

  newsletter: {
    emailLabel: 'Endereço de e-mail',
    subscribe: 'Assinar',
    consent: 'Concordo em receber atualizações de produtos, informações técnicas e notícias da empresa por e-mail. Posso cancelar a assinatura a qualquer momento.',
    success: 'Assinatura confirmada — seja bem-vindo.',
    error: 'Falha na assinatura. Tente novamente mais tarde.',
  },

  consent: {
    text: 'Usamos cookies para entender como o site é utilizado e melhorar sua experiência. Os cookies de marketing são usados apenas com o seu consentimento. Consulte nossa',
    privacyLink: 'política de privacidade',
    reject: 'Apenas necessários',
    accept: 'Aceitar todos',
    aria: 'Consentimento de cookies',
  },

  cta: {
    defaultTitle: 'Solicite um Orçamento Hoje',
    defaultSubtitle: 'Envie-nos seus requisitos — nossos engenheiros de vendas respondem em até 24 horas com preços, prazos e opções OEM.',
    defaultButton: 'Solicitar Orçamento',
    whatsapp: 'Conversar no WhatsApp',
    midTitle: 'Precisa de preços ou de uma solução personalizada?',
    midSubtitle: 'Envie-nos seus requisitos — nossos engenheiros de vendas respondem em até 24 horas.',
  },

  common: {
    home: 'Início',
    viewDetails: 'Ver detalhes',
    getQuote: 'Solicitar orçamento',
    requestQuote: 'Solicitar Orçamento',
    viewProducts: 'Ver Produtos',
    browseAllProducts: 'Ver todos os produtos',
    readAllArticles: 'Ler todos os artigos',
    featured: 'Destaque',
    ratedOutput: 'potência de saída nominal',
    contactSales: 'Falar com Vendas',
    quoteForModel: 'Solicitar Orçamento para Este Modelo',
    productOverview: 'Visão Geral do Produto',
    technicalSpecifications: 'Especificações Técnicas',
    keyFeatures: 'Destaques do Produto',
    packagingInformation: 'Informações de Embalagem',
    applications: 'Aplicações',
    downloads: 'Downloads',
    relatedProducts: 'Produtos Relacionados',
    relatedSameCategory: 'Mais opções em {category}',
    relatedMoreModels: 'Mais modelos do nosso catálogo',
    relatedGuides: 'Guias relacionados',
    relatedGuidesSubtitle: 'Artigos técnicos da nossa equipe de engenharia',
    standard: 'Padrão',
    product: 'Produto',
    viewCertificate: 'Ver Certificado',
    viewCertificateSr: '(abre o PDF em uma nova aba)',
    specifications: 'Especificações',
    model: 'modelo',
    models: 'modelos',
    since: 'Desde',
    oemBullets: [
      'Marca própria OEM / ODM disponível para pedidos em volume',
      'Datasheet e preços mediante solicitação',
      'Resposta em até 24 horas em dias úteis',
    ],
    pageAria: {
      productCategories: 'Categorias de produtos',
    },
  },

  seo: {
    home: {
      title: '{brand} — Fabricante de Inversores para Parceiros B2B Globais',
      description:
        'Fabricante profissional de inversores solares desde {year}. Inversores híbridos, grid-tie e off-grid com suporte OEM/ODM, sistema de qualidade ISO 9001 e preços diretos de fábrica. Exportação para {countries}+ países.',
    },
    productsIndex: {
      title: 'Todos os Produtos — Catálogo de Inversores',
      description:
        'Conheça nosso catálogo atual de inversores: inversores de potência off-grid de 900W a 5000W, com suporte OEM/ODM. Fale conosco para especificações, preços e fornecimento em volume.',
    },
    category: {
      titleSuffix: '— Fabricante e Fornecedor OEM',
    },
    factory: {
      title: 'Fábrica e Manufatura — Linhas de SMT, Montagem e Teste de Envelhecimento',
      description:
        'Conheça nossa fábrica de inversores de {area} m²: linhas de SMT automatizadas, linhas de montagem, salas de teste de envelhecimento e armazém. Auditorias de fábrica por vídeo disponíveis para compradores no exterior.',
    },
    quality: {
      title: 'Controle de Qualidade — Sistema ISO 9001, 100% de Testes, Envelhecimento de 8 Horas',
      description:
        'Nosso controle de qualidade de inversores: sistema de qualidade certificado ISO 9001, testes funcionais de 100%, testes de envelhecimento de 8 horas e rastreabilidade completa da produção. Inspeção de terceiros é bem-vinda.',
    },
    contact: {
      title: 'Fale Conosco — Solicite um Orçamento de Inversores',
      description:
        'Solicite preços, datasheets e opções OEM para nossos inversores. Engenheiros de vendas respondem em até 24 horas em dias úteis. E-mail, WhatsApp e formulário de consulta disponíveis.',
    },
    blog: {
      title: 'Blog e Insights do Setor — Base de Conhecimento sobre Inversores',
      description:
        'Guias técnicos e insights do setor sobre inversores solares: híbrido vs grid-tie vs off-grid, dimensionamento, certificações e manufatura OEM.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Fabricante de Inversores desde {year}',
      title: 'Inversores Solares Diretos da Fábrica para Parceiros B2B Globais',
      subtitle:
        'Inversores híbridos, grid-tie e off-grid projetados e fabricados em nossa própria fábrica. Programas OEM / ODM, qualidade certificada e preços competitivos diretos da fábrica para distribuidores, instaladores e desenvolvedores de projetos.',
      heroImageAria: 'Ilustração de sistema de energia solar',
      bullets: ['OEM / ODM', 'ISO 9001', 'Resposta em 24h', '{countries}+ países de exportação'],
    },
    trust: {
      manufacturer: 'Fabricante',
      factoryArea: 'Área da fábrica',
      unitsPerYear: 'Unidades / ano',
      exportCountries: 'Países de exportação',
      oemClients: 'Clientes OEM / ODM',
    },
    categories: {
      eyebrow: 'Nossos Produtos',
      title: 'Categorias de Inversores',
      subtitle: 'Explore as linhas de inversores que fabricamos atualmente. As categorias são adicionadas aqui assim que o primeiro modelo é publicado.',
    },
    featured: {
      eyebrow: 'Destaques',
      title: 'Modelos Populares',
      subtitle: 'Os inversores mais vendidos do nosso catálogo. Todos os modelos aceitam marca própria OEM e personalização de especificações.',
    },
    advantages: {
      eyebrow: 'Vantagens do Produto',
      title: 'Vantagens do Produto e Força Técnica',
      subtitle: 'Características principais da nossa linha de inversores off-grid — do tipo de saída e opções de entrada CC às potências nominais e configurações práticas do produto.',
      items: [
        {
          title: 'Saída de Onda Senoidal Pura',
          description: 'Saída CA de onda senoidal pura e estável, projetada para aplicações off-grid que exigem energia confiável para diferentes tipos de cargas.',
        },
        {
          title: 'Múltiplas Opções de Entrada CC',
          description: 'Modelos selecionados suportam múltiplas configurações de tensão de entrada CC, incluindo 12V, 24V, 48V, 60V e 72V, dependendo do produto.',
        },
        {
          title: 'Resfriamento Inteligente com Controle de Temperatura',
          description: 'O resfriamento por ventilador com controle inteligente de temperatura ajuda a garantir a operação confiável em diferentes aplicações off-grid.',
        },
        {
          title: 'Configurações Flexíveis de Saída CA',
          description: 'Modelos selecionados estão disponíveis com opções de saída CA de 220V / 110V e diferentes configurações de tomadas para atender às exigências de diferentes mercados.',
        },
        {
          title: 'Múltiplas Opções de Potência',
          description: 'A linha atual de inversores off-grid cobre de 900W a 5000W, oferecendo diferentes opções de potência para uma variedade de aplicações off-grid.',
        },
        {
          title: 'Configurações Práticas de Produto',
          description: 'A linha de produtos inclui diferentes configurações, como displays LCD ou digitais, várias tomadas de saída CA e modelos com USB, dependendo do produto.',
        },
      ],
    },
    whyUs: {
      eyebrow: 'Por Que Nós',
      title: 'Por Que Compradores Globais nos Escolhem',
      subtitle: 'Somos um fabricante, não uma trading company — o que significa suporte direto de engenharia, qualidade controlada e melhores margens.',
      items: [
        {
          title: 'P&D Interno',
          description: '{engineers} engenheiros cobrindo design de hardware, firmware e estrutura. Firmware personalizado, logotipos, embalagens e especificações para projetos OEM/ODM.',
        },
        {
          title: 'Escala de Manufatura',
          description: 'Instalação de {area} m² com linhas de SMT, montagem e envelhecimento — capacidade anual de {capacity} unidades.',
        },
        {
          title: 'Qualidade que você pode auditar',
          description:
            'Sistema de qualidade ISO 9001, testes funcionais de 100% e teste de envelhecimento de 8 horas antes do empacotamento. Documentação de conformidade LVD (EN 62109-1) e EMC relacionada ao CE está disponível para nossos inversores solares mediante solicitação. Inspeção de terceiros é bem-vinda.',
        },
      ],
    },
    process: {
      eyebrow: 'Como Trabalhamos',
      title: 'Da RFQ à Entrega',
      subtitle: 'Um processo transparente de seis etapas, projetado para parceiros B2B no exterior — você sempre sabe em que etapa está o seu pedido.',
      steps: [
        { title: 'RFQ', description: 'Envie seus requisitos pelo formulário de consulta, e-mail ou WhatsApp.' },
        { title: 'Solução e Cotação', description: 'Nossos engenheiros de vendas respondem em até 24 horas com uma proposta e preços.' },
        { title: 'Confirmação de Amostra', description: 'Avalie amostras, confirme as especificações e finalize os detalhes do pedido.' },
        { title: 'Testes e Certificação', description: 'Testes necessários e conformidade com o mercado de destino tratados antes da produção.' },
        { title: 'Produção em Lote', description: 'Produção programada com controle de qualidade em cada etapa.' },
        { title: 'Entrega e Suporte', description: 'Embalagem de exportação, organização de frete e suporte pós-venda.' },
      ],
    },
    factory: {
      eyebrow: 'Dentro da Nossa Fábrica',
      title: 'Feito para Qualidade Consistente e Fornecimento Confiável',
      subtitle: 'Nosso processo de manufatura reúne produção, montagem, testes e controle de qualidade para garantir qualidade consistente dos produtos e fornecimento confiável para clientes globais.',
      capabilities: [
        { title: 'Produção e Montagem', description: 'Processos estruturados de produção e montagem garantem manufatura consistente e fornecimento confiável de produtos.' },
        { title: 'Testes de Qualidade', description: 'Controle de qualidade e testes funcionais estão integrados ao processo de manufatura para garantir qualidade consistente dos produtos.' },
        { title: 'Teste de Envelhecimento', description: 'O teste de envelhecimento faz parte do processo de qualidade da produção antes que os produtos sejam preparados para entrega.' },
        { title: 'Produtos Acabados e Logística', description: 'Os produtos acabados são preparados para embalagem e envio, garantindo um atendimento eficiente dos pedidos.' },
      ],
      bullets: [
        '{employees}+ colaboradores, {engineers} engenheiros de P&D',
        'Processos estruturados de produção e montagem',
        'Testes funcionais de 100% antes do empacotamento',
        'Teste de envelhecimento de 8 horas em cada lote de produção',
        'Inspeção de terceiros pré-embarque é bem-vinda',
      ],
      cta: 'Conheça nossa fábrica',
    },
    applications: {
      eyebrow: 'Aplicações',
      title: 'Onde Nossos Inversores Funcionam',
      subtitle: 'Comprovados em projetos residenciais, comerciais, de telecomunicações e off-grid, em diversos climas e condições de rede.',
      items: [
        { title: 'Energia Solar Residencial', description: 'Sistemas fotovoltaicos em telhados residenciais com banco de baterias e otimização de autoconsumo.' },
        { title: 'Comercial e Industrial', description: 'Usinas comerciais e industriais em telhados e solo com inversores string de 10 a 50 kW.' },
        { title: 'Armazenamento de Energia', description: 'Sistemas híbridos com integração de baterias LiFePO4 para gerenciamento de picos e backup.' },
        { title: 'Estações-Base de Telecomunicações', description: 'Energia off-grid para torres de comunicação remotas com rede elétrica instável ou inexistente.' },
        { title: 'Eletrificação Rural', description: 'Microrredes autônomas e energia off-grid para vilarejos, fazendas e comunidades insulares.' },
        { title: 'Energia de Backup', description: 'Fornecimento ininterrupto para residências, clínicas e pequenas empresas durante quedas de energia.' },
      ],
    },
    certifications: {
      eyebrow: 'Certificações e Normas',
      title: 'Documentação de Conformidade para Mercados Globais',
      subtitle: 'Nossa documentação de conformidade de inversores solares apoia a análise do cliente e os requisitos de qualificação do produto. A documentação está disponível mediante solicitação.',
      items: [
        {
          title: 'CE / LVD',
          description: 'A documentação de conformidade LVD está disponível para nossos inversores solares mediante solicitação.',
        },
        {
          title: 'CE / EMC',
          description: 'A documentação de conformidade EMC está disponível para nossos inversores solares mediante solicitação.',
        },
      ],
      note: 'A disponibilidade de certificações varia conforme o modelo e o mercado de destino. Informe-nos o país de destino e confirmaremos as certificações aplicáveis ao seu pedido.',
      qualityButton: 'Conheça nosso sistema de qualidade',
    },
    testimonials: {
      title: 'O Que Nossos Parceiros Dizem',
      items: [
        { quote: 'A gama de opções de potência e as especificações de produto bem definidas facilitam a avaliação de diferentes configurações de inversores para o nosso mercado.', country: 'Alemanha', customerType: 'Distribuidor de Produtos Solares' },
        { quote: 'Ter várias opções de potência de inversores off-grid nos dá mais flexibilidade ao selecionar produtos para diferentes aplicações de clientes.', country: 'Nigéria', customerType: 'Instalador Solar' },
        { quote: 'As opções de inversores de maior potência nos dão mais flexibilidade ao analisar diferentes requisitos de potência off-grid.', country: 'Emirados Árabes Unidos', customerType: 'Distribuidor de Produtos Solares' },
        { quote: 'As configurações multitensão são úteis quando precisamos avaliar diferentes requisitos de entrada CC para aplicações off-grid.', country: 'Quênia', customerType: 'Empresa de Energia Renovável' },
        { quote: 'As configurações de inversores com USB nos dão mais uma opção para aplicações que exigem funcionalidade adicional de carregamento.', country: 'Filipinas', customerType: 'Distribuidor de Produtos Solares' },
        { quote: 'A linha de inversores off-grid de menor a maior potência nos dá mais flexibilidade ao selecionar produtos para diferentes aplicações.', country: 'África do Sul', customerType: 'Fornecedor de Energia Off-Grid' },
      ],
    },
    blog: {
      eyebrow: 'Insights',
      title: 'Últimas do Nosso Blog',
    },
  },

  productsIndex: {
    eyebrow: 'Catálogo de Produtos',
    title: 'Todos os Produtos',
    subtitle: 'Todos os modelos são projetados, fabricados e testados em nossa própria fábrica. Fale conosco para datasheets, preços e opções OEM.',
    viewCategory: 'Ver categoria',
  },

  categoryPage: {
    eyebrow: 'Categoria de Produtos',
    empty: 'Os modelos desta categoria estão sendo preparados. Fale conosco para receber o catálogo mais recente.',
    byPowerTitle: '{category} por potência nominal',
    byPowerEyebrow: 'Escolha por Potência',
    byPowerSubtitle: 'Escolha a potência de saída de que você precisa — cada página lista todos os modelos disponíveis nessa potência.',
    customCtaTitle: 'Precisa de uma Especificação Personalizada?',
    customCtaSubtitle: 'Desenvolvemos inversores personalizados para projetos OEM/ODM — potência nominal, firmware, marca e certificações adequadas ao seu mercado.',
  },

  powerPage: {
    empty: 'Os modelos desta potência estão sendo preparados. Fale conosco para receber o catálogo mais recente.',
    modelsInRating: '{count} {model} nesta faixa de potência',
    otherRatings: {
      eyebrow: 'Linha Off-Grid',
      title: 'Outras Potências',
      subtitle: 'Navegue pela linha completa de inversores off-grid por potência nominal.',
    },
    chip: '{power} Off-Grid',
    ctaTitle: 'Precisa de um Inversor Off-Grid de {power}?',
    ctaSubtitle: 'Conte-nos seu mercado de destino, a tensão de entrada CC necessária e a quantidade — respondemos com preços diretos de fábrica e prazo de entrega.',
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
      const noun = facts.count > 1 ? 'inversores off-grid' : 'inversor off-grid';
      const available = facts.count > 1 ? 'disponíveis' : 'disponível';
      const pluralSuffix = facts.count > 1 ? 'es' : '';
      const seriesNote = facts.series ? ` (${facts.series})` : '';
      const specSentence = facts.dc ? ` Especificações principais: entrada CC ${facts.dc}.` : '';
      return {
        description: `${facts.count} ${noun} de ${facts.label} ${available} — ${facts.types}${seriesNote}.${specSentence} Fale conosco sobre configurações, preços e fornecimento em volume.`,
        seoTitle: `Inversor${pluralSuffix} Off-Grid de ${facts.label}${seriesNote}`,
        seoDescription: `Inversor${pluralSuffix} Off-Grid de ${facts.label}: ${facts.types}.${
          facts.dc ? ` Entrada CC ${facts.dc}.` : ''
        } Fale conosco para preços e fornecimento em volume.`,
      };
    },
  },

  specs: {
    ratedPower: 'Potência Nominal',
    acOutput: 'Saída CA',
    outputSockets: 'Tomadas de Saída',
    dcInputVoltage: 'Tensão de Entrada CC',
    display: 'Display',
    usb: 'USB',
    cooling: 'Resfriamento',
    dimensions: 'Dimensões',
    netWeight: 'Peso Líquido',
    groups: {
      acOutput: 'Saída CA',
      dcInput: 'Entrada CC',
      displayCooling: 'Display e Resfriamento',
      interface: 'Interface',
      physical: 'Físicas',
    },
    packaging: {
      packageDimensions: 'Dimensões da Embalagem',
      grossWeight: 'Peso Bruto',
      cartonQuantity: 'Quantidade por Caixa',
      cartonDimensions: 'Dimensões da Caixa',
      cartonWeight: 'Peso da Caixa',
      cartonInformation: 'Informações da Caixa',
    },
    /** Translations for recurring specification VALUES. Unlisted values pass through unchanged. */
    values: {
      display: {
        'Digital Display': 'Display Digital',
        'LCD Display': 'Display LCD',
        'LCD Smart Display': 'Display LCD Inteligente',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'Ventilador com Controle Inteligente de Temperatura',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V opcional',
        '220V optional': '220V opcional',
      },
      usb: {
        Yes: 'Sim',
      },
      cartonInformation: {
        'Available in different packing configurations': 'Disponível em diferentes configurações de embalagem',
      },
      approx: 'Aprox.',
      units: '{n} unidades',
      unitsOr: '{a} ou {b} unidades',
    },
  },

  factory: {
    glance: {
      eyebrow: 'Manufatura',
      title: 'Nossa Fábrica de Perto',
      items: [
        { title: 'Linhas de SMT', text: 'Montagem automatizada + AOI' },
        { title: 'Linhas de montagem', text: 'Múltiplas linhas em paralelo' },
        { title: 'Sala de teste de envelhecimento', text: 'Testes de 100% dos lotes' },
        { title: 'Armazém', text: 'Produtos acabados + componentes' },
      ],
    },
    process: {
      eyebrow: 'Processo',
      title: 'Como Cada Inversor É Fabricado',
      steps: [
        'Inspeção de componentes na entrada (IQC) — componentes principais de fornecedores qualificados, com rastreabilidade por lote.',
        'Montagem SMT automatizada com inspeção óptica AOI para todas as placas de circuito.',
        'Teste funcional de placa e gravação de firmware.',
        'Montagem completa do produto com fixação de torque controlado.',
        'Teste funcional de 100%: forma de onda de saída, eficiência, funções de proteção.',
        'Teste de envelhecimento de 8 horas sob carga para cada lote de produção.',
        'Inspeção final de QC, registro do número de série e embalagem.',
      ],
    },
    visits: {
      eyebrow: 'Visitas',
      title: 'Auditorias de Fábrica São Bem-Vindas',
      text: 'Recebemos auditorias de fábrica presenciais e inspeções de terceiros (SGS, TÜV, BV ou a agência que você indicar). Para compradores no exterior que não podem viajar, oferecemos tours por vídeo ao vivo das linhas de produção — agende pelo formulário de contato.',
      addressLabel: 'Endereço',
    },
    cta: {
      title: 'Agende um Tour em Vídeo pela Fábrica',
      subtitle: 'Veja nossas linhas de produção ao vivo antes de fazer um pedido.',
    },
  },

  quality: {
    intro: {
      eyebrow: 'Qualidade',
      title: 'Qualidade É um Processo, Não um Certificado',
      items: [
        { title: 'Sistema de qualidade ISO 9001', text: 'Processos documentados cobrem design, compras, produção e pós-venda. Auditorias internas regulares mantêm o sistema vivo, e não apenas certificado.' },
        { title: 'Testes funcionais de 100%', text: 'Cada unidade é testada quanto à forma de onda de saída, eficiência, comportamento das proteções e comunicação antes de deixar a linha. Sem exceções de amostragem por lote.' },
        { title: 'Teste de envelhecimento de 8 horas', text: 'Os lotes de produção operam sob carga total em nossa sala de envelhecimento para detectar falhas precoces antes do envio.' },
      ],
    },
    traceability: {
      eyebrow: 'Rastreabilidade',
      title: 'Cada Unidade Pode Ser Rastreada',
      text: 'Cada inversor possui um número de série exclusivo que o vincula à data de produção, aos registros de teste e aos lotes de componentes. Se surgir algum problema em campo, rastreamos o lote afetado em horas — não em semanas. Relatórios de teste e dados de inspeção estão disponíveis para clientes B2B mediante solicitação.',
      bullets: [
        'Controle de qualidade na entrada (IQC) de todos os componentes principais',
        'Controle de qualidade em processo (IPQC) em cada etapa da produção',
        'Controle de qualidade na saída (OQC) com inspeção pré-embarque',
        'Testes de confiabilidade: alta/baixa temperatura, umidade, vibração',
        'Inspeção de terceiros (SGS / TÜV / BV) aceita',
      ],
    },
    certifications: {
      eyebrow: 'Certificações',
      title: 'Conformidade e Certificações',
      note: 'A disponibilidade de certificações varia conforme o modelo e o mercado de destino. Entre em contato com nossa equipe de vendas para confirmar os certificados aplicáveis ao seu pedido.',
    },
    cta: {
      title: 'Solicite Relatórios de Teste ou uma Amostra',
      subtitle: 'Comprove nossa qualidade você mesmo — fornecemos relatórios de teste e amostras para compradores B2B qualificados.',
    },
  },

  contact: {
    eyebrow: 'Contato',
    title: 'Solicitar Orçamento',
    subtitle: 'Preencha o formulário e conte-nos sobre o seu projeto — quantidade, mercado de destino e requisitos técnicos nos ajudam a cotar mais rápido.',
    directContact: 'Contato direto',
    email: 'E-mail',
    whatsapp: 'WhatsApp',
    phone: 'Telefone',
    responseTime: 'Tempo de resposta',
    responseTimeValue: 'Em até 24 horas em dias úteis',
    beforeYouWrite: 'Antes de escrever',
    tips: [
      'Tem um datasheet? Anexe-o no e-mail de resposta.',
      'Informe o seu país de destino — as certificações variam por mercado.',
      'Compradores em volume: pergunte sobre marca OEM e distribuição exclusiva.',
    ],
    linkedin: 'Conecte-se no LinkedIn',
  },

  form: {
    title: 'Solicitar Orçamento',
    subtitle: 'Conte-nos o que você precisa. Nossos engenheiros de vendas respondem em até 24 horas em dias úteis.',
    name: 'Nome',
    company: 'Empresa',
    country: 'País',
    email: 'E-mail',
    phone: 'WhatsApp / Telefone',
    quantity: 'Quantidade Estimada',
    quantityPlaceholder: 'ex.: 500',
    product: 'Produto de Interesse',
    productGeneral: 'Consulta geral / ainda não sei',
    message: 'Mensagem',
    messagePlaceholder: 'Requisitos técnicos, mercado de destino, necessidades de certificação, cronograma de entrega...',
    submit: 'Enviar consulta',
    consentPrefix: 'Ao enviar, você concorda com nossa',
    consentLink: 'política de privacidade',
    consentSuffix: '. A sua consulta não é uma assinatura de marketing.',
    successTitle: 'Obrigado — a sua consulta foi enviada.',
    successText: 'Nossos engenheiros de vendas entrarão em contato em até 24 horas em dias úteis.',
    errorTitle: 'Algo deu errado.',
    errorDetail: '{message} Tente novamente, ou envie-nos um e-mail diretamente.',
    fallbackError: 'Tente novamente, ou envie-nos um e-mail diretamente.',
    submissionFailed: 'Falha no envio.',
  },

  chat: {
    greeting: 'Olá! Qual potência você procura?',
    teaser: 'Olá! Procurando um inversor off-grid? Posso ajudar a encontrar a potência certa.',
    headerTitle: 'Converse conosco',
    headerSubtitle: '{brand} · assistente de vendas com IA',
    inputPlaceholder: 'Digite sua mensagem…',
    inputAria: 'Digite sua mensagem',
    sendAria: 'Enviar mensagem',
    closeAria: 'Fechar conversa',
    launcherAria: 'Converse conosco',
    launcherUnreadAria: 'Converse conosco, 1 nova mensagem',
    dismissAria: 'Dispensar mensagem',
    messagesAria: 'Mensagens',
    contactPlaceholder: 'Seu e-mail ou WhatsApp…',
    contactHint: 'Seus dados vão apenas para a nossa equipe de vendas.',
    optionalNote: 'Opcional — precisamos apenas de um e-mail ou WhatsApp.',
    namePlaceholder: 'Nome',
    nameAria: 'Seu nome (opcional)',
    companyPlaceholder: 'Empresa',
    companyAria: 'Sua empresa (opcional)',
    countryPlaceholder: 'País',
    countryAria: 'Seu país (opcional)',
    viewProduct: 'Ver detalhes do produto',
    reachUsDirectly: 'Você também pode falar conosco diretamente:',
    leadThanks: 'Obrigado — nossa equipe de vendas entrará em contato em breve. Aqui estão os nossos dados, caso prefira nos contatar primeiro:',
    verificationError: 'Não consegui verificar esta sessão. Use o botão do WhatsApp ou o formulário de contato e a nossa equipe atenderá você diretamente.',
    genericError: 'Desculpe, algo deu errado. Tente novamente ou use o formulário de contato.',
    networkError: 'Desculpe — não consegui acessar o servidor. Tente novamente, ou use o formulário de contato e a nossa equipe responderá por e-mail.',
    leadError: 'Desculpe, não foi possível salvar os seus dados. Envie-nos um e-mail ou tente novamente.',
    typing: 'Digitando…',
    /** Display labels for known English engine chips (the value sent stays English so the engine keeps matching). */
    chipLabels: {
      'I know the power': 'Sei a potência',
      'Not sure': 'Não sei',
      'Show other models': 'Mostrar outros modelos',
    },
  },

  blog: {
    eyebrow: 'Insights',
    title: 'Blog e Insights do Setor',
    subtitle: 'Conhecimento prático para compradores de inversores, instaladores e desenvolvedores de projetos — escrito pela nossa equipe de engenharia.',
    breadcrumb: 'Blog',
    articleCtaTitle: 'Precisa de Ajuda para Escolher um Inversor?',
    articleCtaSubtitle: 'Nossos engenheiros de vendas podem recomendar o modelo certo para o seu projeto — gratuitamente.',
    translatedNote: 'Este artigo está disponível atualmente em inglês.',
  },
};
