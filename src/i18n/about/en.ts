/**
 * About page - English source dictionary (default + fallback locale).
 *
 * Every figure in this file is a verified company figure supplied by the
 * company. Do not add unverified claims, statistics, certifications or
 * technical capabilities here.
 */
import type { AboutContent } from './types';

export const aboutEn: AboutContent = {
  seo: {
    title: 'About Us — Inverter Supplier for the Global Renewable Energy Market',
    description:
      'Zhongze Huasong is an inverter supplier for the global renewable energy market: 10+ years of experience, 30+ countries served, 50,000+ units shipped annually. OEM/ODM inverter support.',
  },

  hero: {
    eyebrow: 'Focused on Inverters · Serving the Global Renewable Energy Market',
    heading: 'Powering Global Energy with Reliable Inverter Solutions',
    intro:
      'Zhongze Huasong focuses on inverter products and provides reliable power conversion solutions for residential, solar PV, energy storage, outdoor, commercial, and industrial applications.',
    primaryCta: 'Explore Our Products',
    secondaryCta: 'Request a Quote',
    image: {
      alt: 'Zhongze Huasong inverter production and operations facility',
      placeholder: '[Factory image 1 to be provided]',
    },
  },

  glance: {
    eyebrow: 'About Zhongze Huasong',
    title: 'Company at a Glance',
    stats: [
      { value: '10+', label: 'Years of Industry Experience' },
      { value: '30+', label: 'Countries & Regions' },
      { value: '50,000+', label: 'Units Shipped Annually' },
      { value: '20+', label: 'Inverter Products & Solutions' },
      { value: '10,000㎡+', label: 'Production & Operations Space' },
      { value: '99%+', label: 'Factory Pass Rate' },
    ],
  },

  focus: {
    eyebrow: 'Focus',
    title: 'Deeply Focused on Inverters',
    intro:
      'Shenzhen Zhongze Huasong Trading Co., Ltd. focuses on renewable energy power equipment and inverter products, providing stable, efficient, and reliable power conversion solutions for customers worldwide.',
    points: [
      {
        title: 'An inverter-led business',
        text: 'Our work is built around inverter products and power conversion rather than a broad equipment catalogue, so partners deal with a team that knows this category in depth.',
      },
      {
        title: 'Aligned with the global renewable energy market',
        text: 'We are committed to the worldwide shift toward renewable power, and we keep our product selection and support aligned with the direction of that market.',
      },
      {
        title: 'Understanding of different application scenarios',
        text: 'Residential rooftops, solar PV systems, energy storage, outdoor power, commercial buildings and industrial sites each place different demands on an inverter. We help partners match products to the scenario in front of them.',
      },
      {
        title: 'Stable, efficient and reliable conversion',
        text: 'Every solution we offer is selected for stable output, efficient conversion and reliable day-to-day operation — the fundamentals that matter when a system has to keep running.',
      },
    ],
  },

  capability: {
    eyebrow: 'Capability',
    title: 'R&D · Manufacturing · Quality',
    intro:
      'Zhongze Huasong has established a business system covering product development, technical testing, manufacturing, quality control and after-sales support, while maintaining long-term cooperation with professional manufacturing teams.',
    image: {
      alt: 'Manufacturing and testing operations supporting Zhongze Huasong inverter production',
      placeholder: '[Factory image 2 to be provided]',
    },
    space: { value: '10,000㎡+', label: 'Production & Operations Space' },
    testing: {
      value: '20+',
      label: 'Performance & Safety Tests',
      areasLabel: 'Key testing areas',
      areas: [
        'Output Stability',
        'Conversion Efficiency',
        'Temperature Rise',
        'Overload Protection',
        'Short-Circuit Protection',
        'Continuous Operation Performance',
      ],
    },
    quality: {
      value: '5',
      label: 'Quality Inspection Stages',
      passRate: { value: '99%+', label: 'Factory Pass Rate' },
    },
    gallery: {
      label: 'Manufacturing capability',
      title: 'Our Production Facility',
      intro:
        'An inside view of the production and testing operations within the manufacturing system supporting Zhongze Huasong inverters.',
      items: [
        {
          caption: 'SMT production line',
          image: {
            alt: 'SMT production line placing components on printed circuit boards',
            placeholder: '[Production line image 01 to be provided]',
          },
        },
        {
          caption: 'Automated production line',
          image: {
            alt: 'Automated production equipment inside the manufacturing workshop',
            placeholder: '[Production line image 02 to be provided]',
          },
        },
        {
          caption: 'Aging test equipment',
          image: {
            alt: 'Aging test chamber used for continuous operation testing',
            placeholder: '[Production line image 03 to be provided]',
          },
        },
        {
          caption: 'Assembly & function testing',
          image: {
            alt: 'Assembly line with function test stations for finished units',
            placeholder: '[Production line image 04 to be provided]',
          },
        },
      ],
    },
  },

  portfolio: {
    eyebrow: 'Products',
    title: 'A Growing Inverter Portfolio',
    intro:
      'We continue to expand our inverter portfolio to meet the needs of different markets and application scenarios.',
    applicationsLabel: 'Application areas',
    applications: [
      'Residential',
      'Solar PV',
      'Energy Storage',
      'Outdoor Power',
      'Commercial',
      'Industrial',
    ],
    cta: 'Explore Our Products',
  },

  oem: {
    eyebrow: 'OEM / ODM',
    title: 'Flexible OEM / ODM Cooperation',
    text: "We support flexible OEM / ODM cooperation based on customers' market positioning, technical requirements, and application needs.",
  },

  global: {
    eyebrow: 'Global Supply · Service',
    title: 'Global Supply · Professional Service',
    intro:
      'Zhongze Huasong supplies inverter products to distributors, importers, installers and system integrators across more than 30 countries and regions, shipping over 50,000 units a year.',
    image: {
      alt: 'Warehouse and logistics operations supporting Zhongze Huasong global inverter supply',
      placeholder: '[Factory image 3 to be provided]',
    },
    metrics: [
      { value: '30+', label: 'Countries & Regions' },
      { value: '50,000+', label: 'Units Shipped Annually' },
    ],
    flowLabel: 'How we support you',
    flow: [
      'Product Selection',
      'Technical Support',
      'Production',
      'Delivery',
      'After-sales Support',
    ],
    positioning: [
      'We value long-term customer relationships and provide professional support throughout product selection, technical support, production, delivery and after-sales service.',
      'Our goal is not only to supply products, but to become a trusted long-term partner for our customers.',
    ],
  },

  vision: {
    eyebrow: 'Outlook',
    title: 'Our Vision',
    paragraphs: [
      'As the global energy transition continues, Zhongze Huasong remains committed to the inverter and renewable energy power sector, with a focus on product innovation, reliable quality and global service.',
      'We look forward to working with partners worldwide to provide efficient and reliable power solutions for homes, businesses and renewable energy projects.',
    ],
  },

  finalCta: {
    title: 'Reliable Inverter Solutions for Your Market',
    subtitle:
      'Whether you are sourcing inverter products for residential, commercial, industrial, solar PV, energy storage or other applications, talk to us about your requirements.',
  },
};
