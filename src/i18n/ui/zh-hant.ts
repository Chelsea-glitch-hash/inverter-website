/**
 * Site-wide UI dictionary — TRADITIONAL CHINESE (zh-hant).
 *
 * Mirrors the English source in src/i18n/ui/en.ts key-for-key.
 * Placeholder tokens ({year}, {countries}, ...) are filled at render time
 * with fill() and are identical in every language.
 */

import type { Dictionary } from './en';

export const zhHant: Dictionary = {
  nav: {
    products: '產品',
    factory: '工廠',
    quality: '品質',
    about: '關於我們',
    blog: '部落格',
    viewAllProducts: '查看全部產品',
    requestQuote: '索取報價',
    whatsappUs: 'WhatsApp 聯絡我們',
    mainNavAria: '主導覽',
    mobileNavAria: '行動版導覽',
    toggleMenuAria: '切換導覽選單',
    languageAria: '切換語言',
    skipToContent: '跳至主要內容',
  },

  footer: {
    productsHeading: '產品',
    allProducts: '全部產品',
    companyHeading: '公司',
    aboutUs: '關於我們',
    factoryAndManufacturing: '工廠與製造',
    qualityControl: '品質管制',
    blogInsights: '部落格與洞察',
    contactUs: '聯絡我們',
    privacyPolicy: '隱私權政策',
    stayUpdated: '掌握最新動態',
    newsletterBlurb: '產品更新、技術洞察與公司動態。',
    blurb: '自 {year} 年起的專業逆變器製造商。{countries}+ 個國家的 OEM / ODM 合作夥伴。',
    whatsappLabel: 'WhatsApp',
    emailAria: '電子郵件',
    rights: '版權所有。',
    productCategoriesAria: '產品類別',
    companyNavAria: '公司',
  },

  newsletter: {
    emailLabel: '電子郵件地址',
    subscribe: '訂閱',
    consent: '我同意透過電子郵件接收產品更新、技術資訊與公司動態，並可隨時取消訂閱。',
    success: '訂閱成功 — 歡迎加入。',
    error: '訂閱失敗，請稍後再試。',
  },

  consent: {
    text: '我們使用 Cookie 以了解網站的使用情況並改善您的體驗。行銷 Cookie 僅在取得您的同意後使用。詳見我們的',
    privacyLink: '隱私權政策',
    reject: '僅必要 Cookie',
    accept: '全部接受',
    aria: 'Cookie 同意聲明',
  },

  cta: {
    defaultTitle: '立即索取報價',
    defaultSubtitle: '告訴我們您的需求 — 我們的業務工程師將於 24 小時內回覆價格、交期與 OEM 選項。',
    defaultButton: '索取報價',
    whatsapp: '透過 WhatsApp 洽談',
    midTitle: '需要報價或客製化方案？',
    midSubtitle: '告訴我們您的需求 — 我們的業務工程師將於 24 小時內回覆。',
  },

  common: {
    home: '首頁',
    viewDetails: '查看詳情',
    getQuote: '索取報價',
    requestQuote: '索取報價',
    viewProducts: '查看產品',
    browseAllProducts: '瀏覽全部產品',
    readAllArticles: '閱讀全部文章',
    featured: '精選',
    ratedOutput: '額定輸出',
    contactSales: '聯絡業務',
    quoteForModel: '為此型號索取報價',
    productOverview: '產品概述',
    technicalSpecifications: '技術規格',
    keyFeatures: '主要特點',
    packagingInformation: '包裝資訊',
    applications: '應用領域',
    downloads: '下載',
    relatedProducts: '相關產品',
    relatedSameCategory: '{category} 的更多選擇',
    relatedMoreModels: '更多產品型號',
    standard: '標準',
    product: '產品',
    viewCertificate: '查看證書',
    viewCertificateSr: '（於新分頁開啟 PDF）',
    specifications: '規格',
    model: '個型號',
    models: '個型號',
    since: '自',
    oemBullets: [
      '大量訂單可提供 OEM / ODM 品牌代工',
      '規格書與價格依需求提供',
      '營業日 24 小時內回覆',
    ],
    pageAria: {
      productCategories: '產品類別',
    },
  },

  seo: {
    home: {
      title: '{brand} — 面向全球 B2B 夥伴的逆變器製造商',
      description:
        '自 {year} 年起的專業太陽能逆變器製造商。混合型、併網型與離網型逆變器，提供 OEM/ODM 支援、ISO 9001 品質系統與工廠直營價格，外銷 {countries}+ 個國家。',
    },
    productsIndex: {
      title: '全部產品 — 逆變器產品目錄',
      description:
        '瀏覽我們目前的逆變器產品目錄：900W 至 5000W 的離網型電源逆變器，並提供 OEM/ODM 支援。歡迎洽詢規格、價格與批量供應。',
    },
    category: {
      titleSuffix: '— 製造商與 OEM 供應商',
    },
    factory: {
      title: '工廠與製造 — SMT、組裝與老化測試產線',
      description:
        '參觀我們 {area} 平方公尺的逆變器工廠：自動化 SMT 產線、組裝線、老化測試室與倉庫。海外買家可預約視訊工廠稽核。',
    },
    quality: {
      title: '品質管制 — ISO 9001 系統、100% 測試、8 小時老化',
      description:
        '我們的逆變器品質管制：ISO 9001 認證品質系統、100% 功能測試、8 小時老化測試與完整的生產可追溯性。歡迎第三方驗貨。',
    },
    contact: {
      title: '聯絡我們 — 索取逆變器報價',
      description:
        '洽詢我們逆變器的價格、規格書與 OEM 選項。業務工程師於營業日 24 小時內回覆。提供電子郵件、WhatsApp 與詢問表單。',
    },
    blog: {
      title: '部落格與產業洞察 — 逆變器知識庫',
      description:
        '太陽能逆變器技術指南與產業洞察：混合型、併網型與離網型的比較、系統配置、認證與 OEM 製造。',
    },
  },

  home: {
    hero: {
      eyebrow: '自 {year} 年起的逆變器製造商',
      title: '工廠直營太陽能逆變器，服務全球 B2B 夥伴',
      subtitle:
        '混合型、併網型與離網型逆變器，皆由自有工廠設計與製造。為經銷商、安裝商與專案開發商提供 OEM / ODM 代工、認證品質與具競爭力的工廠直營價格。',
      heroImageAria: '太陽能系統示意圖',
      bullets: ['OEM / ODM', 'ISO 9001', '24 小時回覆', '{countries}+ 個外銷國家'],
    },
    trust: {
      manufacturer: '製造商',
      factoryArea: '工廠面積',
      unitsPerYear: '年產量（台）',
      exportCountries: '出口國家',
      oemClients: 'OEM / ODM 客戶',
    },
    categories: {
      eyebrow: '我們的產品',
      title: '逆變器產品類別',
      subtitle: '探索我們目前生產的逆變器產品線。各類別的首款型號一經發布，即會在此列出。',
    },
    featured: {
      eyebrow: '精選',
      title: '熱門型號',
      subtitle: '產品目錄中的暢銷逆變器。每款型號皆支援 OEM 品牌代工與規格客製化。',
    },
    advantages: {
      eyebrow: '產品優勢',
      title: '產品優勢與技術實力',
      subtitle: '我們離網型逆變器產品線的主要特點 — 從輸出類型、直流輸入選項到功率等級與實用的產品配置。',
      items: [
        {
          title: '純正弦波輸出',
          description: '穩定的純正弦波交流輸出，專為需要可靠電力的各類負載之離網型應用而設計。',
        },
        {
          title: '多種直流輸入選項',
          description: '部分型號支援多種直流輸入電壓配置，依產品不同，包括 12V、24V、48V、60V 與 72V。',
        },
        {
          title: '智慧溫控散熱',
          description: '智慧溫控風扇散熱，有助於在各種離網型應用中維持可靠運轉。',
        },
        {
          title: '靈活的交流輸出配置',
          description: '部分型號提供 220V / 110V 交流輸出選項與不同的插座配置，以滿足不同市場需求。',
        },
        {
          title: '多種功率選擇',
          description: '目前的離網型逆變器產品線涵蓋 900W 至 5000W，為各類離網型應用提供不同的功率選擇。',
        },
        {
          title: '實用的產品配置',
          description: '產品線依產品不同，提供多種配置，例如 LCD 或數位顯示幕、多種交流輸出插座以及配備 USB 的型號。',
        },
      ],
    },
    whyUs: {
      eyebrow: '為何選擇我們',
      title: '全球買家選擇我們的原因',
      subtitle: '我們是製造商，而非貿易公司 — 這代表直接的工程支援、可控的品質與更佳的利潤空間。',
      items: [
        {
          title: '自有研發',
          description: '{engineers} 名研發工程師，涵蓋硬體、韌體與結構設計。為 OEM/ODM 專案提供客製化韌體、Logo、包裝與規格。',
        },
        {
          title: '製造規模',
          description: '{area} 平方公尺廠區，設有 SMT、組裝與老化產線 — 年產能 {capacity} 台。',
        },
        {
          title: '可稽核的品質',
          description:
            'ISO 9001 品質系統、100% 功能測試與包裝前 8 小時老化測試。我們的太陽能逆變器可依需求提供 CE 相關 LVD（EN 62109-1）與 EMC 符合性文件。歡迎第三方驗貨。',
        },
      ],
    },
    process: {
      eyebrow: '合作流程',
      title: '從詢價到出貨',
      subtitle: '專為海外 B2B 夥伴設計的透明六步流程 — 您隨時掌握訂單進度。',
      steps: [
        { title: '詢價（RFQ）', description: '透過詢問表單、電子郵件或 WhatsApp 告知您的需求。' },
        { title: '方案與報價', description: '我們的業務工程師於 24 小時內回覆方案與價格。' },
        { title: '樣品確認', description: '評估樣品、確認規格並敲定訂單細節。' },
        { title: '測試與認證', description: '於量產前完成所需測試與目標市場法規符合性。' },
        { title: '批量生產', description: '排程生產，每個階段皆執行品質管制。' },
        { title: '出貨與支援', description: '出口包裝、運輸安排與售後支援。' },
      ],
    },
    factory: {
      eyebrow: '工廠實景',
      title: '為穩定品質與可靠供貨而建',
      subtitle: '我們的製造流程整合生產、組裝、測試與品質管制，為全球客戶提供穩定的產品品質與可靠的供貨。',
      capabilities: [
        { title: '生產與組裝', description: '結構化的生產與組裝流程，支援穩定製造與可靠的產品供應。' },
        { title: '品質測試', description: '品質管制與功能測試融入製造流程，確保穩定的產品品質。' },
        { title: '老化測試', description: '老化測試是產品出貨前生產品質流程的一環。' },
        { title: '成品與物流', description: '成品完成包裝與出貨準備，支援高效率的訂單履約。' },
      ],
      bullets: [
        '{employees}+ 名員工，{engineers} 名研發工程師',
        '結構化的生產與組裝流程',
        '包裝前 100% 功能測試',
        '每個生產批次皆進行 8 小時老化測試',
        '歡迎第三方出貨前驗貨',
      ],
      cta: '探索我們的工廠',
    },
    applications: {
      eyebrow: '應用領域',
      title: '我們的逆變器應用場景',
      subtitle: '在多種氣候與電網條件下，於住宅、商用、通訊與離網型專案中經過驗證。',
      items: [
        { title: '住宅太陽能', description: '家用屋頂光電系統，具備電池備援與自發自用最佳化。' },
        { title: '工商業應用', description: '採用 10 至 50 kW 組串型逆變器的工商業屋頂與地面型電站。' },
        { title: '儲能系統', description: '整合磷酸鋰鐵（LiFePO4）電池的混合型系統，適用於削峰填谷與備援。' },
        { title: '通訊基地台', description: '為電網不可靠或無電網的偏遠通訊塔提供離網型電力。' },
        { title: '農村電氣化', description: '為村莊、農場與離島社區提供獨立微電網與離網型電力。' },
        { title: '備援電力', description: '停電時為家庭、診所與小型企業提供不間斷電力。' },
      ],
    },
    certifications: {
      eyebrow: '認證與標準',
      title: '面向全球市場的法規文件',
      subtitle: '我們的太陽能逆變器法規符合性文件可支援客戶審查與產品認證需求。文件依需求提供。',
      items: [
        {
          title: 'CE / LVD',
          description: '我們的太陽能逆變器可依需求提供 LVD 符合性文件。',
        },
        {
          title: 'CE / EMC',
          description: '我們的太陽能逆變器可依需求提供 EMC 符合性文件。',
        },
      ],
      note: '認證的適用性因型號與目標市場而異。請告知您的目標國家，我們將為您的訂單確認適用的認證。',
      qualityButton: '了解我們的品質系統',
    },
    testimonials: {
      title: '合作夥伴的評價',
      items: [
        { quote: '多元的功率選擇與清晰的產品規格，讓我們更容易為自己的市場評估不同的逆變器配置。', country: '德國', customerType: '太陽能經銷商' },
        { quote: '多種離網型逆變器功率選項，讓我們在為不同客戶應用選擇產品時更具彈性。', country: '奈及利亞', customerType: '太陽能安裝商' },
        { quote: '較高功率的逆變器選項，讓我們在評估不同的離網型電力需求時更有彈性。', country: '阿拉伯聯合大公國', customerType: '太陽能經銷商' },
        { quote: '多電壓配置在我們需要評估離網型應用的不同直流輸入需求時非常實用。', country: '肯亞', customerType: '再生能源公司' },
        { quote: '配備 USB 的逆變器配置，為需要額外充電功能的應用提供了另一種選擇。', country: '菲律賓', customerType: '太陽能產品經銷商' },
        { quote: '從較低功率到較高功率的離網型逆變器產品線，讓我們在為不同應用選擇產品時更具彈性。', country: '南非', customerType: '離網型能源供應商' },
      ],
    },
    blog: {
      eyebrow: '洞察',
      title: '部落格最新文章',
    },
  },

  productsIndex: {
    eyebrow: '產品目錄',
    title: '全部產品',
    subtitle: '每款型號皆由自有工廠設計、製造與測試。歡迎洽詢規格書、價格與 OEM 選項。',
    viewCategory: '查看類別',
  },

  categoryPage: {
    eyebrow: '產品類別',
    empty: '此類別的型號正在準備中。歡迎洽詢最新產品目錄。',
    byPowerTitle: '{category}（依額定功率瀏覽）',
    byPowerEyebrow: '依功率選購',
    byPowerSubtitle: '選擇您需要的輸出功率 — 每個頁面列出該功率等級的所有型號。',
    customCtaTitle: '需要客製化規格？',
    customCtaSubtitle: '我們為 OEM/ODM 專案開發客製化逆變器 — 功率等級、韌體、品牌與認證均可依您的市場量身打造。',
  },

  powerPage: {
    empty: '此功率等級的型號正在準備中。歡迎洽詢最新產品目錄。',
    modelsInRating: '此功率等級共有 {count} {model}',
    otherRatings: {
      eyebrow: '離網型產品線',
      title: '其他功率等級',
      subtitle: '依額定功率瀏覽完整的離網型逆變器產品線。',
    },
    chip: '{power} 離網型',
    ctaTitle: '需要 {power} 離網型逆變器？',
    ctaSubtitle: '告訴我們您的目標市場、所需直流輸入電壓與數量 — 我們將回覆工廠直營價格與交期。',
    /**
     * 功率頁的在地化文案，僅由產品目錄事實組合而成。
     * `facts.dc` / `facts.ac` 為原始規格值清單（與語言無關）；
     * 當該功率等級沒有型號聲明此欄位時，facts 可能為 null。
     */
    copy: (facts: {
      label: string;
      count: number;
      types: string;
      series: string | null;
      dc: string | null;
      ac: string | null;
    }) => {
      const seriesNote = facts.series ? `（${facts.series}）` : '';
      const specSentence = facts.dc ? ` 主要規格：直流輸入 ${facts.dc}。` : '';
      return {
        description: `現有 ${facts.count} 款 ${facts.label} 離網型逆變器 — ${facts.types}${seriesNote}。${specSentence}歡迎洽詢配置、價格與批量供應。`,
        seoTitle: `${facts.label} 離網型逆變器${seriesNote}`,
        seoDescription: `${facts.label} 離網型逆變器：${facts.types}。${
          facts.dc ? ` 直流輸入 ${facts.dc}。` : ''
        }歡迎洽詢價格與批量供應。`,
      };
    },
  },

  specs: {
    ratedPower: '額定功率',
    acOutput: '交流輸出',
    outputSockets: '輸出插座',
    dcInputVoltage: '直流輸入電壓',
    display: '顯示幕',
    usb: 'USB',
    cooling: '散熱方式',
    dimensions: '尺寸',
    netWeight: '淨重',
    groups: {
      acOutput: '交流輸出',
      dcInput: '直流輸入',
      displayCooling: '顯示與散熱',
      interface: '介面',
      physical: '實體規格',
    },
    packaging: {
      packageDimensions: '包裝尺寸',
      grossWeight: '毛重',
      cartonQuantity: '每箱數量',
      cartonDimensions: '外箱尺寸',
      cartonWeight: '外箱重量',
      cartonInformation: '外箱資訊',
    },
    /** 常見規格「值」的翻譯。未列出的值原樣顯示。 */
    values: {
      display: {
        'Digital Display': '數位顯示幕',
        'LCD Display': 'LCD 顯示幕',
        'LCD Smart Display': 'LCD 智慧型顯示幕',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': '智慧溫控風扇',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V 可選',
        '220V optional': '220V 可選',
      },
      usb: {
        Yes: '有',
      },
      cartonInformation: {
        'Available in different packing configurations': '提供不同的包裝配置',
      },
      approx: '約',
      units: '{n} 台',
      unitsOr: '{a} 或 {b} 台',
    },
  },

  factory: {
    glance: {
      eyebrow: '製造',
      title: '我們的工廠一覽',
      items: [
        { title: 'SMT 產線', text: '自動化貼片 + AOI 光學檢測' },
        { title: '組裝線', text: '多條平行產線' },
        { title: '老化測試室', text: '100% 批次測試' },
        { title: '倉庫', text: '成品 + 零組件' },
      ],
    },
    process: {
      eyebrow: '製程',
      title: '每台逆變器的誕生流程',
      steps: [
        '來料檢驗（IQC）— 關鍵零組件來自合格供應商，並具批次可追溯性。',
        '所有 PCBA 皆以自動化 SMT 貼片，並經 AOI 光學檢測。',
        '板級功能測試與韌體燒錄。',
        '整機組裝，鎖附扭力全程受控。',
        '100% 功能測試：輸出波形、效率、保護功能。',
        '每個生產批次皆於負載下進行 8 小時老化測試。',
        '最終 QC 檢驗、序號登錄與包裝。',
      ],
    },
    visits: {
      eyebrow: '參訪',
      title: '歡迎工廠稽核',
      text: '我們歡迎現場工廠稽核，也接受第三方驗貨（SGS、TÜV、BV 或您指定的機構）。無法親臨的海外買家，我們提供產線即時視訊導覽 — 可透過聯絡表單預約。',
      addressLabel: '地址',
    },
    cta: {
      title: '預約工廠視訊導覽',
      subtitle: '在下單之前，即時參觀我們的產線。',
    },
  },

  quality: {
    intro: {
      eyebrow: '品質',
      title: '品質是流程，而不只是一張證書',
      items: [
        { title: 'ISO 9001 品質系統', text: '文件化流程涵蓋設計、採購、生產與售後。定期的內部稽核讓系統持續運作，而不只是拿到認證而已。' },
        { title: '100% 功能測試', text: '每一台產品在離開產線前，皆針對輸出波形、效率、保護行為與通訊進行測試，不以抽樣代替全檢。' },
        { title: '8 小時老化測試', text: '生產批次在我們的老化室中滿載運轉，以在出貨前攔截早期失效。' },
      ],
    },
    traceability: {
      eyebrow: '可追溯性',
      title: '每一台產品皆可追溯',
      text: '每台逆變器皆有唯一序號，對應生產日期、測試紀錄與零組件批次。一旦現場發生問題，我們能在數小時內（而非數週）追蹤到受影響的批次。測試報告與檢驗數據可依需求提供給 B2B 客戶。',
      bullets: [
        '所有關鍵零組件執行來料品質檢驗（IQC）',
        '每個生產階段執行製程品質檢驗（IPQC）',
        '出貨品質檢驗（OQC）含出貨前檢驗',
        '可靠度測試：高／低溫、濕度、振動',
        '接受第三方驗貨（SGS / TÜV / BV）',
      ],
    },
    certifications: {
      eyebrow: '認證',
      title: '法規符合性與認證',
      note: 'TODO: 認證標誌與型號專屬證書 — 請與我們的業務團隊確認您的目標市場適用的認證組合。',
    },
    cta: {
      title: '索取測試報告或樣品',
      subtitle: '親自驗證我們的品質 — 我們為合格的 B2B 買家提供測試報告與樣品。',
    },
  },

  contact: {
    eyebrow: '聯絡',
    title: '索取報價',
    subtitle: '填寫表單並告訴我們您的專案 — 數量、目標市場與技術需求能幫助我們更快報價。',
    directContact: '直接聯絡',
    email: '電子郵件',
    whatsapp: 'WhatsApp',
    phone: '電話',
    responseTime: '回覆時間',
    responseTimeValue: '營業日 24 小時內回覆',
    beforeYouWrite: '來信之前',
    tips: [
      '手上有規格書嗎？請在回信時附上。',
      '告訴我們您的目標國家 — 各市場的認證要求不同。',
      '大量採購客戶：歡迎洽詢 OEM 品牌代工與獨家經銷。',
    ],
    linkedin: '在 LinkedIn 上與我們聯繫',
  },

  form: {
    title: '索取報價',
    subtitle: '告訴我們您的需求。我們的業務工程師將於營業日 24 小時內回覆。',
    name: '姓名',
    company: '公司',
    country: '國家',
    email: '電子郵件',
    phone: 'WhatsApp / 電話',
    quantity: '預估數量',
    quantityPlaceholder: '例如：500',
    product: '感興趣的產品',
    productGeneral: '一般詢問／尚未確定',
    message: '訊息',
    messagePlaceholder: '技術需求、目標市場、認證要求、交期安排……',
    submit: '送出詢問',
    consentPrefix: '送出即表示您同意我們的',
    consentLink: '隱私權政策',
    consentSuffix: '。您的詢問並非行銷訂閱。',
    successTitle: '感謝您 — 您的詢問已送出。',
    successText: '我們的業務工程師將於營業日 24 小時內回覆您。',
    errorTitle: '發生錯誤。',
    errorDetail: '{message} 請再試一次，或直接來信給我們。',
    fallbackError: '請再試一次，或直接來信給我們。',
    submissionFailed: '送出失敗。',
  },

  chat: {
    greeting: '您好！請問您需要多大的功率？',
    teaser: '您好！在找離網型逆變器嗎？我可以幫您找到合適的功率。',
    headerTitle: '與我們線上洽談',
    headerSubtitle: '{brand} · AI 業務助理',
    inputPlaceholder: '輸入您的訊息……',
    inputAria: '輸入您的訊息',
    sendAria: '傳送訊息',
    closeAria: '關閉對話',
    launcherAria: '與我們線上洽談',
    launcherUnreadAria: '與我們線上洽談，1 則新訊息',
    dismissAria: '關閉訊息',
    messagesAria: '訊息',
    contactPlaceholder: '您的電子郵件或 WhatsApp……',
    contactHint: '您的資料僅提供給我們的業務團隊。',
    optionalNote: '選填 — 我們只需要電子郵件或 WhatsApp。',
    namePlaceholder: '姓名',
    nameAria: '您的姓名（選填）',
    companyPlaceholder: '公司',
    companyAria: '您的公司（選填）',
    countryPlaceholder: '國家',
    countryAria: '您的國家（選填）',
    viewProduct: '查看產品詳情',
    reachUsDirectly: '您也可以直接聯絡我們：',
    leadThanks: '感謝您 — 我們的業務團隊將盡快與您聯繫。若您想先聯絡我們，以下是您的聯絡方式：',
    verificationError: '我無法驗證此對話。請使用 WhatsApp 按鈕或聯絡表單，我們的團隊將直接為您服務。',
    genericError: '抱歉，發生錯誤。請再試一次，或使用聯絡表單。',
    networkError: '抱歉 — 我無法連上伺服器。請再試一次，或使用聯絡表單，我們的團隊將以電子郵件回覆您。',
    leadError: '抱歉，我們無法儲存您的資料。請來信給我們或再試一次。',
    typing: '正在輸入……',
    /** 已知英文引擎選項的顯示標籤（送出的值維持英文，讓引擎持續比對）。 */
    chipLabels: {
      'I know the power': '我知道所需功率',
      'Not sure': '不確定',
      'Show other models': '顯示其他型號',
    },
  },

  blog: {
    eyebrow: '洞察',
    title: '部落格與產業洞察',
    subtitle: '為逆變器買家、安裝商與專案開發商提供的實用知識 — 由我們的工程團隊撰寫。',
    breadcrumb: '部落格',
    articleCtaTitle: '需要協助挑選逆變器？',
    articleCtaSubtitle: '我們的業務工程師可免費為您的專案推薦合適的型號。',
    translatedNote: '本文目前僅提供英文版。',
  },
};
