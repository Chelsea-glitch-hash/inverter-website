/**
 * About page — BRAZILIAN PORTUGUESE dictionary.
 * Same structure as aboutEn. Stat values stay exactly as in English.
 */
import type { AboutContent } from './types';

export const aboutPt: AboutContent = {
  seo: {
    title: 'Sobre Nós — Fornecedor de Inversores para o Mercado Global de Energia Renovável',
    description:
      'A Zhongze Huasong é uma fornecedora de inversores para o mercado global de energia renovável: 10+ anos de experiência, 30+ países atendidos, 50,000+ unidades enviadas por ano. Suporte OEM/ODM para inversores.',
  },

  hero: {
    eyebrow: 'Focados em Inversores · Atendendo o Mercado Global de Energia Renovável',
    heading: 'Levando Energia ao Mundo com Soluções Confiáveis de Inversores',
    intro:
      'A Zhongze Huasong é focada em produtos de inversores e fornece soluções confiáveis de conversão de energia para aplicações residenciais, solares fotovoltaicas, de armazenamento de energia, externas, comerciais e industriais.',
    primaryCta: 'Conheça Nossos Produtos',
    secondaryCta: 'Solicitar Orçamento',
    image: {
      alt: 'Instalação de produção e operações de inversores da Zhongze Huasong',
      placeholder: '[Imagem da fábrica 1 a ser fornecida]',
    },
  },

  glance: {
    eyebrow: 'Sobre a Zhongze Huasong',
    title: 'A Empresa em Números',
    stats: [
      { value: '10+', label: 'Anos de Experiência no Setor' },
      { value: '30+', label: 'Países e Regiões' },
      { value: '50,000+', label: 'Unidades Enviadas por Ano' },
      { value: '20+', label: 'Produtos e Soluções de Inversores' },
      { value: '10,000㎡+', label: 'Área de Produção e Operações' },
      { value: '99%+', label: 'Índice de Aprovação na Fábrica' },
    ],
  },

  focus: {
    eyebrow: 'Foco',
    title: 'Foco Profundo em Inversores',
    intro:
      'A Shenzhen Zhongze Huasong Trading Co., Ltd. é focada em equipamentos de energia renovável e produtos de inversores, fornecendo soluções estáveis, eficientes e confiáveis de conversão de energia para clientes em todo o mundo.',
    points: [
      {
        title: 'Um negócio centrado em inversores',
        text: 'Nosso trabalho é construído em torno de produtos de inversores e conversão de energia, e não de um catálogo amplo de equipamentos, de modo que os parceiros lidam com uma equipe que conhece esta categoria em profundidade.',
      },
      {
        title: 'Alinhados com o mercado global de energia renovável',
        text: 'Estamos comprometidos com a transição mundial em direção à energia renovável e mantemos a nossa seleção de produtos e o suporte alinhados com a direção desse mercado.',
      },
      {
        title: 'Compreensão de diferentes cenários de aplicação',
        text: 'Telhados residenciais, sistemas solares fotovoltaicos, armazenamento de energia, energia externa, edifícios comerciais e sites industriais impõem demandas diferentes a um inversor. Ajudamos os parceiros a adequar os produtos ao cenário em questão.',
      },
      {
        title: 'Conversão estável, eficiente e confiável',
        text: 'Cada solução que oferecemos é selecionada por saída estável, conversão eficiente e operação diária confiável — os fundamentos que importam quando um sistema precisa continuar funcionando.',
      },
    ],
  },

  capability: {
    eyebrow: 'Capacidade',
    title: 'P&D · Manufatura · Qualidade',
    intro:
      'A Zhongze Huasong estabeleceu um sistema de negócios que cobre desenvolvimento de produto, testes técnicos, manufatura, controle de qualidade e suporte pós-venda, mantendo cooperação de longo prazo com equipes profissionais de manufatura.',
    image: {
      alt: 'Operações de manufatura e testes que apoiam a produção de inversores da Zhongze Huasong',
      placeholder: '[Imagem da fábrica 2 a ser fornecida]',
    },
    space: { value: '10,000㎡+', label: 'Área de Produção e Operações' },
    testing: {
      value: '20+',
      label: 'Testes de Desempenho e Segurança',
      areasLabel: 'Principais áreas de teste',
      areas: [
        'Estabilidade de Saída',
        'Eficiência de Conversão',
        'Elevação de Temperatura',
        'Proteção contra Sobrecarga',
        'Proteção contra Curto-Circuito',
        'Desempenho em Operação Contínua',
      ],
    },
    quality: {
      value: '5',
      label: 'Etapas de Inspeção de Qualidade',
      passRate: { value: '99%+', label: 'Índice de Aprovação na Fábrica' },
    },
    gallery: {
      label: 'Capacidade de manufatura',
      title: 'Nossa Instalação de Produção',
      intro:
        'Um olhar por dentro das operações de produção e testes do sistema de manufatura que apoia os inversores Zhongze Huasong.',
      items: [
        {
          caption: 'Linha de produção SMT',
          image: {
            alt: 'Linha de produção SMT posicionando componentes em placas de circuito impresso',
            placeholder: '[Imagem da linha de produção 01 a ser fornecida]',
          },
        },
        {
          caption: 'Linha de produção automatizada',
          image: {
            alt: 'Equipamento de produção automatizado dentro da oficina de manufatura',
            placeholder: '[Imagem da linha de produção 02 a ser fornecida]',
          },
        },
        {
          caption: 'Equipamento de teste de envelhecimento',
          image: {
            alt: 'Câmara de teste de envelhecimento usada para testes de operação contínua',
            placeholder: '[Imagem da linha de produção 03 a ser fornecida]',
          },
        },
        {
          caption: 'Montagem e testes funcionais',
          image: {
            alt: 'Linha de montagem com estações de teste funcional para unidades acabadas',
            placeholder: '[Imagem da linha de produção 04 a ser fornecida]',
          },
        },
      ],
    },
  },

  portfolio: {
    eyebrow: 'Produtos',
    title: 'Um Portfólio de Inversores em Expansão',
    intro:
      'Continuamos a expandir o nosso portfólio de inversores para atender às necessidades de diferentes mercados e cenários de aplicação.',
    applicationsLabel: 'Áreas de aplicação',
    applications: [
      'Residencial',
      'Solar Fotovoltaica',
      'Armazenamento de Energia',
      'Energia Externa',
      'Comercial',
      'Industrial',
    ],
    cta: 'Conheça Nossos Produtos',
  },

  oem: {
    eyebrow: 'OEM / ODM',
    title: 'Cooperação Flexível OEM / ODM',
    text: 'Apoiamos cooperação flexível OEM / ODM com base no posicionamento de mercado, nos requisitos técnicos e nas necessidades de aplicação dos clientes.',
  },

  global: {
    eyebrow: 'Fornecimento Global · Serviço',
    title: 'Fornecimento Global · Serviço Profissional',
    intro:
      'A Zhongze Huasong fornece inversores para distribuidores, importadores, instaladores e integradores de sistemas em mais de 30 países e regiões, enviando mais de 50.000 unidades por ano.',
    image: {
      alt: 'Operações de armazém e logística que apoiam o fornecimento global de inversores da Zhongze Huasong',
      placeholder: '[Imagem da fábrica 3 a ser fornecida]',
    },
    metrics: [
      { value: '30+', label: 'Países e Regiões' },
      { value: '50,000+', label: 'Unidades Enviadas por Ano' },
    ],
    flowLabel: 'Como apoiamos você',
    flow: [
      'Seleção de Produtos',
      'Suporte Técnico',
      'Produção',
      'Entrega',
      'Suporte Pós-Venda',
    ],
    positioning: [
      'Valorizamos relacionamentos de longo prazo com os clientes e oferecemos suporte profissional ao longo da seleção de produtos, do suporte técnico, da produção, da entrega e do serviço pós-venda.',
      'O nosso objetivo não é apenas fornecer produtos, mas nos tornar um parceiro de longo prazo confiável para os nossos clientes.',
    ],
  },

  vision: {
    eyebrow: 'Perspectiva',
    title: 'Nossa Visão',
    paragraphs: [
      'Enquanto a transição energética global avança, a Zhongze Huasong permanece comprometida com o setor de inversores e energia renovável, com foco em inovação de produtos, qualidade confiável e serviço global.',
      'Esperamos trabalhar com parceiros em todo o mundo para fornecer soluções de energia eficientes e confiáveis para residências, empresas e projetos de energia renovável.',
    ],
  },

  finalCta: {
    title: 'Soluções Confiáveis de Inversores para o Seu Mercado',
    subtitle:
      'Se você está buscando produtos de inversores para aplicações residenciais, comerciais, industriais, solares fotovoltaicas, de armazenamento de energia ou outras, fale conosco sobre os seus requisitos.',
  },
};
