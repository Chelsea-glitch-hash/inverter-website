/**
 * About page — TRADITIONAL CHINESE (zh-hant) dictionary.
 *
 * Mirrors the English source in src/i18n/about/en.ts structure and key order.
 * Stat values are verified company figures and stay unchanged.
 */
import type { AboutContent } from './types';

export const aboutZhHant: AboutContent = {
  seo: {
    title: '關於我們 — 面向全球再生能源市場的逆變器供應商',
    description:
      '中澤華松是面向全球再生能源市場的逆變器供應商：10+ 年經驗、服務 30+ 個國家、年出貨 50,000+ 台。提供 OEM/ODM 逆變器支援。',
  },

  hero: {
    eyebrow: '專注逆變器 · 服務全球再生能源市場',
    heading: '以可靠的逆變器方案，為全球能源提供動力',
    intro:
      '中澤華松專注於逆變器產品，為住宅、太陽能光電、儲能、戶外、商用與工業應用提供可靠的電力轉換方案。',
    primaryCta: '探索我們的產品',
    secondaryCta: '索取報價',
    image: {
      alt: '中澤華松逆變器生產與營運廠區',
      placeholder: '［待提供工廠圖片 1］',
    },
  },

  glance: {
    eyebrow: '關於中澤華松',
    title: '公司概覽',
    stats: [
      { value: '10+', label: '年產業經驗' },
      { value: '30+', label: '服務國家與地區' },
      { value: '50,000+', label: '年出貨台數' },
      { value: '20+', label: '逆變器產品與方案' },
      { value: '10,000㎡+', label: '生產與營運空間' },
      { value: '99%+', label: '工廠直通率' },
    ],
  },

  focus: {
    eyebrow: '專注',
    title: '深耕專注於逆變器',
    intro:
      '深圳市中澤華松貿易有限公司專注於再生能源電力設備與逆變器產品，為全球客戶提供穩定、高效且可靠的電力轉換方案。',
    points: [
      {
        title: '以逆變器為核心的業務',
        text: '我們的業務圍繞逆變器產品與電力轉換展開，而非包羅萬象的設備目錄，因此合作夥伴面對的是深入了解這個品類的團隊。',
      },
      {
        title: '緊跟全球再生能源市場',
        text: '我們致力於配合全球轉向再生能源的趨勢，並使我們的產品選型與支援始終與該市場的方向保持一致。',
      },
      {
        title: '理解不同的應用場景',
        text: '住宅屋頂、太陽能光電系統、儲能、戶外電源、商用建築與工業場所，對逆變器各有不同的要求。我們協助合作夥伴為眼前的場景選對產品。',
      },
      {
        title: '穩定、高效、可靠的轉換',
        text: '我們提供的每一套方案都以穩定輸出、高效轉換與可靠的日常運轉為選擇標準 — 這正是系統必須持續運作時最重要的基本面。',
      },
    ],
  },

  capability: {
    eyebrow: '能力',
    title: '研發 · 製造 · 品質',
    intro:
      '中澤華松建立了涵蓋產品開發、技術測試、製造、品質管制與售後支援的業務體系，並與專業製造團隊保持長期合作。',
    image: {
      alt: '支援中澤華松逆變器生產的製造與測試作業',
      placeholder: '［待提供工廠圖片 2］',
    },
    space: { value: '10,000㎡+', label: '生產與營運空間' },
    testing: {
      value: '20+',
      label: '性能與安全測試',
      areasLabel: '重點測試項目',
      areas: [
        '輸出穩定性',
        '轉換效率',
        '溫升',
        '過載保護',
        '短路保護',
        '連續運轉性能',
      ],
    },
    quality: {
      value: '5',
      label: '品質檢驗環節',
      passRate: { value: '99%+', label: '工廠直通率' },
    },
    gallery: {
      label: '製造能力',
      title: '我們的生產廠區',
      intro:
        '支援中澤華松逆變器的製造體系中，生產與測試作業的內部實景。',
      items: [
        {
          caption: 'SMT 生產線',
          image: {
            alt: 'SMT 生產線將電子元件貼裝到印刷電路板上',
            placeholder: '［待提供產線圖片 01］',
          },
        },
        {
          caption: '自動化生產線',
          image: {
            alt: '製造車間內的自動化生產設備',
            placeholder: '［待提供產線圖片 02］',
          },
        },
        {
          caption: '老化測試設備',
          image: {
            alt: '用於連續運轉測試的老化測試櫃',
            placeholder: '［待提供產線圖片 03］',
          },
        },
        {
          caption: '組裝與功能測試',
          image: {
            alt: '設有成品功能測試工位的組裝線',
            placeholder: '［待提供產線圖片 04］',
          },
        },
      ],
    },
  },

  portfolio: {
    eyebrow: '產品',
    title: '持續成長的逆變器產品組合',
    intro:
      '我們持續擴充逆變器產品組合，以滿足不同市場與應用場景的需求。',
    applicationsLabel: '應用領域',
    applications: [
      '住宅',
      '太陽能光電',
      '儲能',
      '戶外電源',
      '商用',
      '工業',
    ],
    cta: '探索我們的產品',
  },

  oem: {
    eyebrow: 'OEM / ODM',
    title: '靈活的 OEM / ODM 合作',
    text: '我們依據客戶的市場定位、技術要求與應用需求，提供靈活的 OEM / ODM 合作。',
  },

  global: {
    eyebrow: '全球供應 · 服務',
    title: '全球供應 · 專業服務',
    intro:
      '中澤華松為 30 多個國家與地區的經銷商、進口商、安裝商與系統整合商供應逆變器產品，年出貨量超過 50,000 台。',
    image: {
      alt: '支援中澤華松全球逆變器供應的倉儲與物流作業',
      placeholder: '［待提供工廠圖片 3］',
    },
    metrics: [
      { value: '30+', label: '服務國家與地區' },
      { value: '50,000+', label: '年出貨台數' },
    ],
    flowLabel: '我們如何支援您',
    flow: [
      '產品選型',
      '技術支援',
      '生產製造',
      '交付出貨',
      '售後支援',
    ],
    positioning: [
      '我們重視長期的客戶關係，並在產品選型、技術支援、生產製造、交付出貨與售後服務的全過程提供專業支援。',
      '我們的目標不僅是供應產品，更是成為客戶值得信賴的長期夥伴。',
    ],
  },

  vision: {
    eyebrow: '展望',
    title: '我們的願景',
    paragraphs: [
      '隨著全球能源轉型持續推進，中澤華松將持續深耕逆變器與再生能源電力領域，專注於產品創新、可靠的品質與全球服務。',
      '我們期待與全球夥伴攜手，為家庭、企業與再生能源專案提供高效可靠的電力方案。',
    ],
  },

  finalCta: {
    title: '為您的市場提供可靠的逆變器方案',
    subtitle:
      '無論您是為住宅、商用、工業、太陽能光電、儲能或其他應用採購逆變器產品，都歡迎與我們洽談您的需求。',
  },
};
