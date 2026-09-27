/**
 * About page - Spanish (international) dictionary.
 *
 * Same structure and key order as aboutEn (src/i18n/about/en.ts).
 * Stat values, company names and figures stay exactly as supplied.
 */
import type { AboutContent } from './types';

export const aboutEs: AboutContent = {
  seo: {
    title: 'Sobre nosotros — Proveedor de inversores para el mercado global de energías renovables',
    description:
      'Zhongze Huasong es un proveedor de inversores para el mercado global de energías renovables: más de 10 años de experiencia, más de 30 países atendidos y más de 50.000 unidades enviadas al año. Soporte de inversores OEM/ODM.',
  },

  hero: {
    eyebrow: 'Especializados en inversores · Al servicio del mercado global de energías renovables',
    heading: 'Impulsando la energía global con soluciones de inversores fiables',
    intro:
      'Zhongze Huasong se especializa en productos de inversores y ofrece soluciones fiables de conversión de potencia para aplicaciones residenciales, solares FV, de almacenamiento de energía, exteriores, comerciales e industriales.',
    primaryCta: 'Explorar nuestros productos',
    secondaryCta: 'Solicitar presupuesto',
    image: {
      alt: 'Instalaciones de producción y operaciones de inversores de Zhongze Huasong',
      placeholder: '[Imagen de fábrica 1 pendiente de aportar]',
    },
  },

  glance: {
    eyebrow: 'Sobre Zhongze Huasong',
    title: 'La empresa de un vistazo',
    stats: [
      { value: '10+', label: 'Años de experiencia en el sector' },
      { value: '30+', label: 'Países y regiones' },
      { value: '50,000+', label: 'Unidades enviadas al año' },
      { value: '20+', label: 'Productos y soluciones de inversores' },
      { value: '10,000㎡+', label: 'Superficie de producción y operaciones' },
      { value: '99%+', label: 'Tasa de aprobación en fábrica' },
    ],
  },

  focus: {
    eyebrow: 'Especialización',
    title: 'Un enfoque profundo en los inversores',
    intro:
      'Shenzhen Zhongze Huasong Trading Co., Ltd. se dedica a los equipos de energía renovable y a los productos de inversores, ofreciendo soluciones de conversión de potencia estables, eficientes y fiables para clientes de todo el mundo.',
    points: [
      {
        title: 'Un negocio centrado en los inversores',
        text: 'Nuestra actividad gira en torno a los productos de inversores y la conversión de potencia, no a un catálogo amplio de equipos, de modo que los partners tratan con un equipo que conoce esta categoría en profundidad.',
      },
      {
        title: 'En sintonía con el mercado global de energías renovables',
        text: 'Estamos comprometidos con la transición mundial hacia la energía renovable y mantenemos nuestra selección de productos y nuestro soporte alineados con la dirección de ese mercado.',
      },
      {
        title: 'Comprensión de los distintos escenarios de aplicación',
        text: 'Los tejados residenciales, los sistemas solares FV, el almacenamiento de energía, la energía exterior, los edificios comerciales y los emplazamientos industriales imponen exigencias diferentes a un inversor. Ayudamos a los partners a adaptar los productos al escenario que tienen delante.',
      },
      {
        title: 'Conversión estable, eficiente y fiable',
        text: 'Cada solución que ofrecemos se selecciona por su salida estable, su conversión eficiente y su funcionamiento diario fiable: los fundamentos que importan cuando un sistema debe mantenerse en marcha.',
      },
    ],
  },

  capability: {
    eyebrow: 'Capacidades',
    title: 'I+D · Fabricación · Calidad',
    intro:
      'Zhongze Huasong ha establecido un sistema empresarial que cubre el desarrollo de producto, las pruebas técnicas, la fabricación, el control de calidad y el soporte posventa, manteniendo a la vez una cooperación a largo plazo con equipos profesionales de fabricación.',
    image: {
      alt: 'Operaciones de fabricación y pruebas que apoyan la producción de inversores de Zhongze Huasong',
      placeholder: '[Imagen de fábrica 2 pendiente de aportar]',
    },
    space: { value: '10,000㎡+', label: 'Superficie de producción y operaciones' },
    testing: {
      value: '20+',
      label: 'Pruebas de rendimiento y seguridad',
      areasLabel: 'Áreas clave de prueba',
      areas: [
        'Estabilidad de salida',
        'Eficiencia de conversión',
        'Elevación de temperatura',
        'Protección contra sobrecarga',
        'Protección contra cortocircuito',
        'Rendimiento en funcionamiento continuo',
      ],
    },
    quality: {
      value: '5',
      label: 'Etapas de inspección de calidad',
      passRate: { value: '99%+', label: 'Tasa de aprobación en fábrica' },
    },
    gallery: {
      label: 'Capacidad de fabricación',
      title: 'Nuestras instalaciones de producción',
      intro:
        'Una vista interior de las operaciones de producción y pruebas dentro del sistema de fabricación que da soporte a los inversores de Zhongze Huasong.',
      items: [
        {
          caption: 'Línea de producción SMT',
          image: {
            alt: 'Línea de producción SMT colocando componentes en placas de circuito impreso',
            placeholder: '[Imagen de línea de producción 01 pendiente de aportar]',
          },
        },
        {
          caption: 'Línea de producción automatizada',
          image: {
            alt: 'Equipos de producción automatizados dentro del taller de fabricación',
            placeholder: '[Imagen de línea de producción 02 pendiente de aportar]',
          },
        },
        {
          caption: 'Equipos de prueba de envejecimiento',
          image: {
            alt: 'Cámara de prueba de envejecimiento utilizada para pruebas de funcionamiento continuo',
            placeholder: '[Imagen de línea de producción 03 pendiente de aportar]',
          },
        },
        {
          caption: 'Montaje y pruebas funcionales',
          image: {
            alt: 'Línea de montaje con puestos de prueba funcional para unidades terminadas',
            placeholder: '[Imagen de línea de producción 04 pendiente de aportar]',
          },
        },
      ],
    },
  },

  portfolio: {
    eyebrow: 'Productos',
    title: 'Una cartera de inversores en constante crecimiento',
    intro:
      'Seguimos ampliando nuestra cartera de inversores para responder a las necesidades de distintos mercados y escenarios de aplicación.',
    applicationsLabel: 'Áreas de aplicación',
    applications: [
      'Residencial',
      'Solar FV',
      'Almacenamiento de energía',
      'Energía exterior',
      'Comercial',
      'Industrial',
    ],
    cta: 'Explorar nuestros productos',
  },

  oem: {
    eyebrow: 'OEM / ODM',
    title: 'Cooperación OEM / ODM flexible',
    text: 'Damos soporte a una cooperación OEM / ODM flexible basada en el posicionamiento de mercado, los requisitos técnicos y las necesidades de aplicación de cada cliente.',
  },

  global: {
    eyebrow: 'Suministro global · Servicio',
    title: 'Suministro global · Servicio profesional',
    intro:
      'Zhongze Huasong suministra productos de inversores a distribuidores, importadores, instaladores e integradores de sistemas en más de 30 países y regiones, enviando más de 50.000 unidades al año.',
    image: {
      alt: 'Operaciones de almacén y logística que dan soporte al suministro global de inversores de Zhongze Huasong',
      placeholder: '[Imagen de fábrica 3 pendiente de aportar]',
    },
    metrics: [
      { value: '30+', label: 'Países y regiones' },
      { value: '50,000+', label: 'Unidades enviadas al año' },
    ],
    flowLabel: 'Cómo te apoyamos',
    flow: [
      'Selección de producto',
      'Soporte técnico',
      'Producción',
      'Entrega',
      'Soporte posventa',
    ],
    positioning: [
      'Valoramos las relaciones comerciales a largo plazo y ofrecemos soporte profesional durante toda la selección de producto, el soporte técnico, la producción, la entrega y el servicio posventa.',
      'Nuestro objetivo no es solo suministrar productos, sino convertirnos en un partner de confianza y de largo plazo para nuestros clientes.',
    ],
  },

  vision: {
    eyebrow: 'Perspectiva',
    title: 'Nuestra visión',
    paragraphs: [
      'A medida que avanza la transición energética global, Zhongze Huasong mantiene su compromiso con el sector de los inversores y de la energía renovable, con foco en la innovación de producto, la calidad fiable y el servicio global.',
      'Esperamos colaborar con partners de todo el mundo para aportar soluciones de energía eficientes y fiables a hogares, empresas y proyectos de energías renovables.',
    ],
  },

  finalCta: {
    title: 'Soluciones de inversores fiables para tu mercado',
    subtitle:
      'Ya sea que compres productos de inversores para aplicaciones residenciales, comerciales, industriales, solares FV, de almacenamiento de energía u otras, cuéntanos tus requisitos.',
  },
};
