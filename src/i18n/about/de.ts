/**
 * Über-uns-Seite — deutsches Wörterbuch.
 * Gleiche Struktur und Schlüsselreihenfolge wie aboutEn. Alle Zahlenwerte
 * sind verifizierte Unternehmenszahlen und bleiben unverändert.
 */
import type { AboutContent } from './types';

export const aboutDe: AboutContent = {
  seo: {
    title: 'Über uns — Wechselrichterlieferant für den globalen Markt für erneuerbare Energien',
    description:
      'Zhongze Huasong ist ein Wechselrichterlieferant für den globalen Markt für erneuerbare Energien: über 10 Jahre Erfahrung, über 30 belieferte Länder, jährlich über 50.000 ausgelieferte Geräte. OEM/ODM-Wechselrichter-Unterstützung.',
  },

  hero: {
    eyebrow: 'Fokus auf Wechselrichter · Aktiv im globalen Markt für erneuerbare Energien',
    heading: 'Zuverlässige Wechselrichterlösungen für die weltweite Energieversorgung',
    intro:
      'Zhongze Huasong konzentriert sich auf Wechselrichterprodukte und bietet zuverlässige Stromwandlungslösungen für Wohnanwendungen, Photovoltaik, Energiespeicherung, Outdoor-, Gewerbe- und Industrie-Anwendungen.',
    primaryCta: 'Unsere Produkte entdecken',
    secondaryCta: 'Angebot anfordern',
    image: {
      alt: 'Produktions- und Betriebsanlagen von Zhongze Huasong für Wechselrichter',
      placeholder: '[Fabrikbild 1 wird nachgereicht]',
    },
  },

  glance: {
    eyebrow: 'Über Zhongze Huasong',
    title: 'Das Unternehmen auf einen Blick',
    stats: [
      { value: '10+', label: 'Jahre Branchenerfahrung' },
      { value: '30+', label: 'Länder & Regionen' },
      { value: '50,000+', label: 'Ausgelieferte Geräte pro Jahr' },
      { value: '20+', label: 'Wechselrichter-Produkte & Lösungen' },
      { value: '10,000㎡+', label: 'Produktions- & Betriebsfläche' },
      { value: '99%+', label: 'Fabrik-Quote der bestandenen Prüfungen' },
    ],
  },

  focus: {
    eyebrow: 'Fokus',
    title: 'Tief konzentriert auf Wechselrichter',
    intro:
      'Shenzhen Zhongze Huasong Trading Co., Ltd. konzentriert sich auf Stromversorgungsgeräte für erneuerbare Energien und Wechselrichterprodukte und bietet Kunden weltweit stabile, effiziente und zuverlässige Stromwandlungslösungen.',
    points: [
      {
        title: 'Ein auf Wechselrichter ausgerichtetes Geschäft',
        text: 'Unsere Arbeit dreht sich um Wechselrichterprodukte und Stromwandlung statt um einen breiten Geräte-Katalog — Partner arbeiten daher mit einem Team, das diese Produktkategorie im Detail kennt.',
      },
      {
        title: 'Am globalen Markt für erneuerbare Energien ausgerichtet',
        text: 'Wir sind der weltweiten Wende zu erneuerbarer Energie verpflichtet und halten unsere Produktauswahl und Unterstützung an der Entwicklung dieses Marktes aus.',
      },
      {
        title: 'Verständnis unterschiedlicher Anwendungsszenarien',
        text: 'Wohngebäude-Dächer, Photovoltaikanlagen, Energiespeicherung, Outdoor-Stromversorgung, Gewerbegebäude und Industriestandorte stellen jeweils unterschiedliche Anforderungen an einen Wechselrichter. Wir helfen Partnern, Produkte auf ihr konkretes Szenario abzustimmen.',
      },
      {
        title: 'Stabile, effiziente und zuverlässige Wandlung',
        text: 'Jede von uns angebotene Lösung ist auf stabile Ausgangsleistung, effiziente Wandlung und zuverlässigen Alltagsbetrieb ausgewählt — die Grundlagen, die zählen, wenn ein System dauerhaft laufen muss.',
      },
    ],
  },

  capability: {
    eyebrow: 'Kompetenz',
    title: 'F&E · Fertigung · Qualität',
    intro:
      'Zhongze Huasong hat ein Geschäftssystem etabliert, das Produktentwicklung, technische Prüfung, Fertigung, Qualitätskontrolle und After-Sales-Support umfasst, und pflegt langfristige Kooperationen mit professionellen Fertigungsteams.',
    image: {
      alt: 'Fertigungs- und Prüfbetriebe, die die Wechselrichterproduktion von Zhongze Huasong unterstützen',
      placeholder: '[Fabrikbild 2 wird nachgereicht]',
    },
    space: { value: '10,000㎡+', label: 'Produktions- & Betriebsfläche' },
    testing: {
      value: '20+',
      label: 'Leistungs- & Sicherheitsprüfungen',
      areasLabel: 'Zentrale Prüfbereiche',
      areas: [
        'Ausgangsstabilität',
        'Wandlungswirkungsgrad',
        'Temperaturanstieg',
        'Überlastschutz',
        'Kurzschlussschutz',
        'Dauerbetriebsverhalten',
      ],
    },
    quality: {
      value: '5',
      label: 'Qualitätsprüfstufen',
      passRate: { value: '99%+', label: 'Fabrik-Quote der bestandenen Prüfungen' },
    },
    gallery: {
      label: 'Fertigungskompetenz',
      title: 'Unser Produktionsstandort',
      intro:
        'Ein Blick in die Produktions- und Prüfbetriebe innerhalb des Fertigungssystems, das die Wechselrichter von Zhongze Huasong unterstützt.',
      items: [
        {
          caption: 'SMT-Produktionslinie',
          image: {
            alt: 'SMT-Produktionslinie, die Bauteile auf Leiterplatten bestückt',
            placeholder: '[Produktionslinienbild 01 wird nachgereicht]',
          },
        },
        {
          caption: 'Automatisierte Produktionslinie',
          image: {
            alt: 'Automatisierte Produktionsanlagen in der Fertigungshalle',
            placeholder: '[Produktionslinienbild 02 wird nachgereicht]',
          },
        },
        {
          caption: 'Dauertest-Anlage (Aging-Test)',
          image: {
            alt: 'Dauertest-Kammer für Dauerbetriebsprüfungen',
            placeholder: '[Produktionslinienbild 03 wird nachgereicht]',
          },
        },
        {
          caption: 'Montage & Funktionstest',
          image: {
            alt: 'Montagelinie mit Funktionstestplätzen für fertige Geräte',
            placeholder: '[Produktionslinienbild 04 wird nachgereicht]',
          },
        },
      ],
    },
  },

  portfolio: {
    eyebrow: 'Produkte',
    title: 'Ein wachsendes Wechselrichter-Portfolio',
    intro:
      'Wir bauen unser Wechselrichter-Portfolio kontinuierlich aus, um den Bedarf unterschiedlicher Märkte und Anwendungsszenarien zu erfüllen.',
    applicationsLabel: 'Anwendungsbereiche',
    applications: [
      'Wohngebäude',
      'Photovoltaik',
      'Energiespeicherung',
      'Outdoor-Stromversorgung',
      'Gewerbe',
      'Industrie',
    ],
    cta: 'Unsere Produkte entdecken',
  },

  oem: {
    eyebrow: 'OEM / ODM',
    title: 'Flexible OEM-/ODM-Kooperation',
    text: 'Wir unterstützen eine flexible OEM-/ODM-Kooperation, abgestimmt auf die Marktpositionierung, technischen Anforderungen und Anwendungsbedürfnisse unserer Kunden.',
  },

  global: {
    eyebrow: 'Globale Versorgung · Service',
    title: 'Globale Versorgung · Professioneller Service',
    intro:
      'Zhongze Huasong beliefert Händler, Importeure, Installateure und Systemintegratoren in mehr als 30 Ländern und Regionen mit Wechselrichterprodukten — mit über 50.000 ausgelieferten Geräten pro Jahr.',
    image: {
      alt: 'Lager- und Logistikbetriebe, die die globale Wechselrichterversorgung von Zhongze Huasong unterstützen',
      placeholder: '[Fabrikbild 3 wird nachgereicht]',
    },
    metrics: [
      { value: '30+', label: 'Länder & Regionen' },
      { value: '50,000+', label: 'Ausgelieferte Geräte pro Jahr' },
    ],
    flowLabel: 'So unterstützen wir Sie',
    flow: [
      'Produktauswahl',
      'Technische Unterstützung',
      'Produktion',
      'Lieferung',
      'After-Sales-Support',
    ],
    positioning: [
      'Wir legen Wert auf langfristige Kundenbeziehungen und bieten professionelle Unterstützung über die gesamte Strecke — von der Produktauswahl über technische Unterstützung, Produktion und Lieferung bis zum After-Sales-Service.',
      'Unser Ziel ist es nicht nur, Produkte zu liefern, sondern ein vertrauensvoller langfristiger Partner unserer Kunden zu werden.',
    ],
  },

  vision: {
    eyebrow: 'Ausblick',
    title: 'Unsere Vision',
    paragraphs: [
      'Während die globale Energiewende voranschreitet, bleibt Zhongze Huasong dem Wechselrichter- und Sektor für erneuerbare Energien verpflichtet — mit Fokus auf Produktinnovation, zuverlässige Qualität und globalen Service.',
      'Wir freuen uns auf die Zusammenarbeit mit Partnern weltweit, um effiziente und zuverlässige Energielösungen für Haushalte, Unternehmen und Projekte der erneuerbaren Energien bereitzustellen.',
    ],
  },

  finalCta: {
    title: 'Zuverlässige Wechselrichterlösungen für Ihren Markt',
    subtitle:
      'Ob Sie Wechselrichterprodukte für Wohn-, Gewerbe-, Industrie-, Photovoltaik-, Energiespeicher- oder andere Anwendungen beschaffen — sprechen Sie mit uns über Ihre Anforderungen.',
  },
};
