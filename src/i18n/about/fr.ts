/**
 * Page À propos — dictionnaire FRANÇAIS.
 *
 * Même forme et même ordre de clés que aboutEn. Les valeurs statistiques
 * ('10+', '30+', '50,000+', '20+', '10,000㎡+', '99%+', '5') restent
 * inchangées ; seuls les libellés sont traduits. Ne jamais ajouter de
 * chiffres ou d’affirmations non vérifiés.
 */
import type { AboutContent } from './types';

export const aboutFr: AboutContent = {
  seo: {
    title: 'À Propos — Fournisseur d’Onduleurs pour le Marché Mondial des Énergies Renouvelables',
    description:
      'Zhongze Huasong est un fournisseur d’onduleurs pour le marché mondial des énergies renouvelables : plus de 10 ans d’expérience, plus de 30 pays servis, plus de 50 000 unités expédiées par an. Support OEM/ODM pour onduleurs.',
  },

  hero: {
    eyebrow: 'Spécialisés dans les Onduleurs · Au Service du Marché Mondial des Énergies Renouvelables',
    heading: 'Alimenter l’énergie mondiale avec des solutions d’onduleurs fiables',
    intro:
      'Zhongze Huasong se consacre aux produits onduleurs et fournit des solutions fiables de conversion de puissance pour les applications résidentielles, solaires PV, de stockage d’énergie, extérieures, commerciales et industrielles.',
    primaryCta: 'Découvrir nos produits',
    secondaryCta: 'Demander un devis',
    image: {
      alt: 'Site de production et d’exploitation d’onduleurs Zhongze Huasong',
      placeholder: '[Image d’usine 1 à fournir]',
    },
  },

  glance: {
    eyebrow: 'À propos de Zhongze Huasong',
    title: 'L’entreprise en un coup d’œil',
    stats: [
      { value: '10+', label: 'Années d’expérience dans le secteur' },
      { value: '30+', label: 'Pays & Régions' },
      { value: '50,000+', label: 'Unités expédiées par an' },
      { value: '20+', label: 'Produits & Solutions onduleurs' },
      { value: '10,000㎡+', label: 'Surface de production & d’exploitation' },
      { value: '99%+', label: 'Taux de conformité en usine' },
    ],
  },

  focus: {
    eyebrow: 'Spécialisation',
    title: 'Une spécialisation approfondie dans les onduleurs',
    intro:
      'Shenzhen Zhongze Huasong Trading Co., Ltd. se consacre aux équipements d’énergie renouvelable et aux produits onduleurs, en fournissant des solutions de conversion de puissance stables, efficaces et fiables pour des clients dans le monde entier.',
    points: [
      {
        title: 'Une activité centrée sur les onduleurs',
        text: 'Notre travail s’articule autour des produits onduleurs et de la conversion de puissance plutôt que d’un large catalogue d’équipements : nos partenaires traitent ainsi avec une équipe qui connaît cette catégorie en profondeur.',
      },
      {
        title: 'Alignés sur le marché mondial des énergies renouvelables',
        text: 'Nous sommes engagés dans la transition mondiale vers les énergies renouvelables, et nous maintenons notre sélection de produits et notre support alignés sur la direction de ce marché.',
      },
      {
        title: 'Compréhension des différents scénarios d’application',
        text: 'Toitures résidentielles, systèmes solaires PV, stockage d’énergie, alimentation extérieure, bâtiments commerciaux et sites industriels imposent chacun des exigences différentes à un onduleur. Nous aidons les partenaires à associer les produits au scénario qui leur fait face.',
      },
      {
        title: 'Une conversion stable, efficace et fiable',
        text: 'Chaque solution que nous proposons est sélectionnée pour une sortie stable, une conversion efficace et un fonctionnement quotidien fiable — les fondamentaux qui comptent lorsqu’un système doit continuer à fonctionner.',
      },
    ],
  },

  capability: {
    eyebrow: 'Capacités',
    title: 'R&D · Fabrication · Qualité',
    intro:
      'Zhongze Huasong a mis en place un système d’activité couvrant le développement produit, les tests techniques, la fabrication, le contrôle qualité et le support après-vente, tout en entretenant des coopérations de long terme avec des équipes de fabrication professionnelles.',
    image: {
      alt: 'Opérations de fabrication et de test soutenant la production d’onduleurs Zhongze Huasong',
      placeholder: '[Image d’usine 2 à fournir]',
    },
    space: { value: '10,000㎡+', label: 'Surface de production & d’exploitation' },
    testing: {
      value: '20+',
      label: 'Tests de Performance & de Sécurité',
      areasLabel: 'Domaines de test clés',
      areas: [
        'Stabilité de sortie',
        'Rendement de conversion',
        'Échauffement',
        'Protection contre les surcharges',
        'Protection contre les courts-circuits',
        'Performance en fonctionnement continu',
      ],
    },
    quality: {
      value: '5',
      label: 'Étapes d’Inspection Qualité',
      passRate: { value: '99%+', label: 'Taux de conformité en usine' },
    },
    gallery: {
      label: 'Capacité de fabrication',
      title: 'Notre site de production',
      intro:
        'Un aperçu intérieur des opérations de production et de test au sein du système de fabrication qui soutient les onduleurs Zhongze Huasong.',
      items: [
        {
          caption: 'Ligne de production SMT',
          image: {
            alt: 'Ligne de production SMT plaçant des composants sur des circuits imprimés',
            placeholder: '[Image de ligne de production 01 à fournir]',
          },
        },
        {
          caption: 'Ligne de production automatisée',
          image: {
            alt: 'Équipement de production automatisé dans l’atelier de fabrication',
            placeholder: '[Image de ligne de production 02 à fournir]',
          },
        },
        {
          caption: 'Équipement de test de vieillissement',
          image: {
            alt: 'Enceinte de test de vieillissement utilisée pour les tests de fonctionnement continu',
            placeholder: '[Image de ligne de production 03 à fournir]',
          },
        },
        {
          caption: 'Assemblage & tests fonctionnels',
          image: {
            alt: 'Ligne d’assemblage avec postes de test fonctionnel pour les unités finies',
            placeholder: '[Image de ligne de production 04 à fournir]',
          },
        },
      ],
    },
  },

  portfolio: {
    eyebrow: 'Produits',
    title: 'Une gamme d’onduleurs en pleine croissance',
    intro:
      'Nous continuons d’élargir notre gamme d’onduleurs pour répondre aux besoins de différents marchés et scénarios d’application.',
    applicationsLabel: 'Domaines d’application',
    applications: [
      'Résidentiel',
      'Solaire PV',
      'Stockage d’énergie',
      'Alimentation extérieure',
      'Commercial',
      'Industriel',
    ],
    cta: 'Découvrir nos produits',
  },

  oem: {
    eyebrow: 'OEM / ODM',
    title: 'Une Coopération OEM / ODM Flexible',
    text: 'Nous prenons en charge une coopération OEM / ODM flexible, fondée sur le positionnement de marché, les exigences techniques et les besoins applicatifs de nos clients.',
  },

  global: {
    eyebrow: 'Approvisionnement Mondial · Service',
    title: 'Approvisionnement Mondial · Service Professionnel',
    intro:
      'Zhongze Huasong fournit des produits onduleurs à des distributeurs, importateurs, installateurs et intégrateurs de systèmes dans plus de 30 pays et régions, avec plus de 50 000 unités expédiées par an.',
    image: {
      alt: 'Opérations d’entrepôt et de logistique soutenant l’approvisionnement mondial d’onduleurs Zhongze Huasong',
      placeholder: '[Image d’usine 3 à fournir]',
    },
    metrics: [
      { value: '30+', label: 'Pays & Régions' },
      { value: '50,000+', label: 'Unités expédiées par an' },
    ],
    flowLabel: 'Comment nous vous accompagnons',
    flow: [
      'Sélection des produits',
      'Support technique',
      'Production',
      'Livraison',
      'Support après-vente',
    ],
    positioning: [
      'Nous accordons de l’importance aux relations clients de long terme et apportons un support professionnel tout au long de la sélection des produits, du support technique, de la production, de la livraison et du service après-vente.',
      'Notre objectif n’est pas seulement de fournir des produits, mais de devenir un partenaire de long terme de confiance pour nos clients.',
    ],
  },

  vision: {
    eyebrow: 'Perspectives',
    title: 'Notre Vision',
    paragraphs: [
      'Alors que la transition énergétique mondiale se poursuit, Zhongze Huasong reste engagé dans le secteur des onduleurs et de l’énergie renouvelable, avec un focus sur l’innovation produit, une qualité fiable et un service mondial.',
      'Nous nous réjouissons de travailler avec des partenaires du monde entier pour fournir des solutions énergétiques efficaces et fiables aux foyers, aux entreprises et aux projets d’énergies renouvelables.',
    ],
  },

  finalCta: {
    title: 'Des solutions d’onduleurs fiables pour votre marché',
    subtitle:
      'Que vous cherchiez des produits onduleurs pour des applications résidentielles, commerciales, industrielles, solaires PV, de stockage d’énergie ou autres, parlons de vos besoins.',
  },
};
