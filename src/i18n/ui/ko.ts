/**
 * Site-wide UI dictionary — KOREAN.
 * Mirrors the key-for-key structure of src/i18n/ui/en.ts.
 * Placeholders ({name} style tokens) are filled at render time and stay unchanged.
 */

import type { Dictionary } from './en';

export const ko: Dictionary = {
  nav: {
    products: '제품',
    factory: '공장',
    quality: '품질',
    about: '회사 소개',
    blog: '블로그',
    viewAllProducts: '전체 제품 보기',
    requestQuote: '견적 요청',
    whatsappUs: 'WhatsApp 문의',
    mainNavAria: '메인 내비게이션',
    mobileNavAria: '모바일 내비게이션',
    toggleMenuAria: '내비게이션 메뉴 열기/닫기',
    languageAria: '언어 변경',
    skipToContent: '본문으로 건너뛰기',
  },

  footer: {
    productsHeading: '제품',
    allProducts: '전체 제품',
    companyHeading: '회사',
    aboutUs: '회사 소개',
    factoryAndManufacturing: '공장 및 제조',
    qualityControl: '품질 관리',
    blogInsights: '블로그 및 인사이트',
    contactUs: '문의하기',
    privacyPolicy: '개인정보 처리방침',
    stayUpdated: '최신 소식 받기',
    newsletterBlurb: '제품 업데이트, 기술 인사이트 및 회사 소식.',
    blurb: '{year}년부터 이어져 온 전문 인버터 제조업체. {countries}개국 이상에 OEM / ODM 파트너로 활동합니다.',
    whatsappLabel: 'WhatsApp',
    emailAria: '이메일',
    rights: '모든 권리 보유.',
    productCategoriesAria: '제품 카테고리',
    companyNavAria: '회사',
  },

  newsletter: {
    emailLabel: '이메일 주소',
    subscribe: '구독하기',
    consent: '제품 업데이트, 기술 정보 및 회사 소식을 이메일로 수신하는 것에 동의합니다. 언제든지 구독을 취소할 수 있습니다.',
    success: '구독이 완료되었습니다 — 환영합니다.',
    error: '구독에 실패했습니다. 나중에 다시 시도해 주세요.',
  },

  consent: {
    text: '당사는 웹사이트 이용 현황을 파악하고 사용자 경험을 개선하기 위해 쿠키를 사용합니다. 마케팅 쿠키는 사용자의 동의가 있을 때만 사용됩니다. 자세한 내용은 당사의',
    privacyLink: '개인정보 처리방침',
    reject: '필수 쿠키만',
    accept: '모두 허용',
    aria: '쿠키 동의',
  },

  cta: {
    defaultTitle: '지금 견적을 요청하세요',
    defaultSubtitle: '요구 사항을 보내주시면 영업일 기준 24시간 이내에 영업 엔지니어가 가격, 납기 및 OEM 옵션을 안내해 드립니다.',
    defaultButton: '견적 요청',
    whatsapp: 'WhatsApp으로 상담하기',
    midTitle: '가격 또는 맞춤 솔루션이 필요하신가요?',
    midSubtitle: '요구 사항을 보내주시면 영업일 기준 24시간 이내에 영업 엔지니어가 답변해 드립니다.',
  },

  common: {
    home: '홈',
    viewDetails: '자세히 보기',
    getQuote: '견적 받기',
    requestQuote: '견적 요청',
    viewProducts: '제품 보기',
    browseAllProducts: '전체 제품 둘러보기',
    readAllArticles: '전체 아티클 읽기',
    featured: '추천',
    ratedOutput: '정격 출력',
    contactSales: '영업팀 문의',
    quoteForModel: '이 모델 견적 받기',
    productOverview: '제품 개요',
    technicalSpecifications: '기술 사양',
    keyFeatures: '주요 특징',
    packagingInformation: '포장 정보',
    applications: '적용 분야',
    downloads: '다운로드',
    relatedProducts: '관련 제품',
    relatedSameCategory: '{category}의 다른 옵션',
    relatedMoreModels: '카탈로그의 다른 모델',
    relatedGuides: '관련 가이드',
    relatedGuidesSubtitle: '엔지니어링 팀의 기술 아티클',
    standard: '표준',
    product: '제품',
    viewCertificate: '인증서 보기',
    viewCertificateSr: '(새 탭에서 PDF를 엽니다)',
    specifications: '사양',
    model: '모델',
    models: '모델',
    since: '설립',
    oemBullets: [
      '대량 주문 시 OEM / ODM 브랜딩 가능',
      '데이터시트 및 가격은 요청 시 제공',
      '영업일 기준 24시간 이내 답변',
    ],
    pageAria: {
      productCategories: '제품 카테고리',
    },
  },

  seo: {
    home: {
      title: '{brand} — 글로벌 B2B 파트너를 위한 인버터 제조업체',
      description:
        '{year}년부터 이어져 온 전문 태양광 인버터 제조업체. OEM/ODM 지원, ISO 9001 품질 시스템, 공장 직공 가격으로 하이브리드, 계통연계 및 오프그리드 인버터를 제공합니다. {countries}개국 이상에 수출합니다.',
    },
    productsIndex: {
      title: '전체 제품 — 인버터 카탈로그',
      description:
        '현재 인버터 카탈로그를 둘러보세요: 900W~5000W 오프그리드 전원 인버터, OEM/ODM 지원. 사양, 가격 및 대량 공급은 문의해 주세요.',
    },
    category: {
      titleSuffix: '— 제조업체 및 OEM 공급사',
    },
    factory: {
      title: '공장 및 제조 — SMT, 조립 및 에이징 테스트 라인',
      description:
        '{area}m² 규모의 당사 인버터 공장을 둘러보세요: 자동화 SMT 라인, 조립 라인, 에이징 테스트룸 및 창고. 해외 바이어를 위한 영상 공장 실사도 가능합니다.',
    },
    quality: {
      title: '품질 관리 — ISO 9001 시스템, 100% 테스트, 8시간 에이징',
      description:
        '당사의 인버터 품질 관리: ISO 9001 인증 품질 시스템, 100% 기능 테스트, 8시간 에이징 테스트 및 전 생산 공정 추적성. 제3자 검사를 환영합니다.',
    },
    contact: {
      title: '문의하기 — 인버터 견적 요청',
      description:
        '인버터의 가격, 데이터시트 및 OEM 옵션을 요청하세요. 영업일 기준 24시간 이내에 영업 엔지니어가 답변합니다. 이메일, WhatsApp 및 문의 양식을 이용하실 수 있습니다.',
    },
    blog: {
      title: '블로그 및 업계 인사이트 — 인버터 지식 베이스',
      description:
        '태양광 인버터에 대한 기술 가이드 및 업계 인사이트: 하이브리드 vs 계통연계 vs 오프그리드, 용량 산정, 인증 및 OEM 제조.',
    },
  },

  home: {
    hero: {
      eyebrow: '{year}년부터의 인버터 제조업체',
      title: '글로벌 B2B 파트너를 위한 공장 직공 태양광 인버터',
      subtitle:
        '자체 공장에서 설계·제조된 하이브리드, 계통연계 및 오프그리드 인버터. 유통사, 시공업체 및 프로젝트 개발사를 위한 OEM / ODM 프로그램, 인증된 품질, 경쟁력 있는 공장 직공 가격을 제공합니다.',
      heroImageAria: '태양에너지 시스템 일러스트',
      bullets: ['OEM / ODM', 'ISO 9001', '24시간 내 응답', '{countries}개국 이상 수출'],
    },
    trust: {
      manufacturer: '제조업체',
      factoryArea: '공장 면적',
      unitsPerYear: '연간 생산 대수',
      exportCountries: '수출 국가',
      oemClients: 'OEM / ODM 고객',
    },
    categories: {
      eyebrow: '당사 제품',
      title: '인버터 카테고리',
      subtitle: '현재 당사가 제조 중인 인버터 라인업을 살펴보세요. 카테고리는 첫 모델이 공개되는 즉시 여기에 추가됩니다.',
    },
    featured: {
      eyebrow: '추천',
      title: '인기 모델',
      subtitle: '카탈로그에서 가장 많이 팔리는 인버터입니다. 모든 모델은 OEM 브랜딩 및 사양 커스터마이징을 지원합니다.',
    },
    advantages: {
      eyebrow: '제품 장점',
      title: '제품 장점 및 기술 역량',
      subtitle: '오프그리드 인버터 라인업의 주요 특성 — 출력 방식과 DC 입력 옵션부터 정격 출력과 실용적인 제품 구성까지.',
      items: [
        {
          title: '순수 정현파 출력',
          description: '다양한 부하에 안정적인 전원이 필요한 오프그리드 애플리케이션을 위해 설계된 안정적인 순수 정현파 AC 출력입니다.',
        },
        {
          title: '다양한 DC 입력 옵션',
          description: '제품에 따라 일부 모델은 12V, 24V, 48V, 60V, 72V를 포함한 다양한 DC 입력 전압 구성을 지원합니다.',
        },
        {
          title: '지능형 온도 제어 냉각',
          description: '지능형 온도 제어 팬 냉각이 다양한 오프그리드 애플리케이션에서 안정적인 작동을 지원합니다.',
        },
        {
          title: '유연한 AC 출력 구성',
          description: '제품에 따라 일부 모델은 220V / 110V AC 출력 옵션과 다양한 소켓 구성으로 서로 다른 시장의 요구를 충족합니다.',
        },
        {
          title: '다양한 출력 옵션',
          description: '현재 오프그리드 인버터 라인업은 900W~5000W를 커버하며, 다양한 오프그리드 애플리케이션에 맞는 출력 옵션을 제공합니다.',
        },
        {
          title: '실용적인 제품 구성',
          description: '제품에 따라 LCD 또는 디지털 디스플레이, 다양한 AC 출력 소켓, USB 탑재 모델 등 다양한 구성이 라인업에 포함되어 있습니다.',
        },
      ],
    },
    whyUs: {
      eyebrow: '당사를 선택하는 이유',
      title: '글로벌 바이어가 당사를 선택하는 이유',
      subtitle: '당사는 트레이딩 회사가 아닌 제조업체입니다. 그래서 직접적인 엔지니어링 지원, 관리되는 품질, 더 나은 마진을 제공할 수 있습니다.',
      items: [
        {
          title: '자체 R&D',
          description: '{engineers}명의 엔지니어가 하드웨어, 펌웨어 및 구조 설계를 담당합니다. OEM/ODM 프로젝트를 위한 맞춤 펌웨어, 로고, 포장 및 사양을 지원합니다.',
        },
        {
          title: '제조 규모',
          description: '{area}m² 규모의 시설에 SMT, 조립 및 에이징 라인을 갖추고 있습니다 — 연간 {capacity}대의 생산 능력.',
        },
        {
          title: '감사 가능한 품질',
          description:
            'ISO 9001 품질 시스템, 100% 기능 테스트 및 포장 전 8시간 에이징 테스트. 요청 시 태양광 인버터에 대한 CE 관련 LVD(EN 62109-1) 및 EMC 적합성 문서를 제공합니다. 제3자 검사를 환영합니다.',
        },
      ],
    },
    process: {
      eyebrow: '작업 방식',
      title: 'RFQ부터 납품까지',
      subtitle: '해외 B2B 파트너를 위해 설계된 투명한 6단계 프로세스 — 주문 진행 상황을 항상 확인할 수 있습니다.',
      steps: [
        { title: 'RFQ', description: '문의 양식, 이메일 또는 WhatsApp으로 요구 사항을 보내주세요.' },
        { title: '솔루션 및 견적', description: '영업일 기준 24시간 이내에 영업 엔지니어가 제안과 가격을 답변합니다.' },
        { title: '샘플 확인', description: '샘플을 평가하고 사양을 확정하며 주문 세부 사항을 최종 확정합니다.' },
        { title: '테스트 및 인증', description: '생산 전에 필요한 테스트와 목적지 시장 규격 적합성을 처리합니다.' },
        { title: '양산', description: '모든 단계에서 품질 관리를 적용한 계획 생산을 진행합니다.' },
        { title: '납품 및 지원', description: '수출 포장, 선적 준비 및 애프터서비스 지원을 제공합니다.' },
      ],
    },
    factory: {
      eyebrow: '공장 내부',
      title: '일관된 품질과 안정적인 공급을 위한 제조',
      subtitle: '당사의 제조 프로세스는 생산, 조립, 테스트 및 품질 관리를 결합하여 글로벌 고객에게 일관된 제품 품질과 안정적인 공급을 지원합니다.',
      capabilities: [
        { title: '생산 및 조립', description: '체계적인 생산 및 조립 공정이 일관된 제조와 안정적인 제품 공급을 지원합니다.' },
        { title: '품질 테스트', description: '품질 관리와 기능 테스트가 제조 공정에 통합되어 일관된 제품 품질을 지원합니다.' },
        { title: '에이징 테스트', description: '에이징 테스트는 납품 준비 전 제품 품질 프로세스의 일부입니다.' },
        { title: '완제품 및 물류', description: '완제품은 포장 및 선적을 위해 준비되어 효율적인 주문 이행을 지원합니다.' },
      ],
      bullets: [
        '{employees}명 이상의 직원, {engineers}명의 R&D 엔지니어',
        '체계적인 생산 및 조립 공정',
        '포장 전 100% 기능 테스트',
        '모든 생산 배치에 8시간 에이징 테스트',
        '제3자 선적 전 검사 환영',
      ],
      cta: '공장 둘러보기',
    },
    applications: {
      eyebrow: '적용 분야',
      title: '당사 인버터가 사용되는 곳',
      subtitle: '다양한 기후와 계통 조건에서 주거용, 상업용, 통신 및 오프그리드 프로젝트에서 입증되었습니다.',
      items: [
        { title: '주거용 태양광', description: '배터리 백업과 자가 소비 최적화를 갖춘 가정용 옥상 PV 시스템.' },
        { title: '상업 및 산업용', description: '10~50kW 스트링 인버터를 갖춘 상업·산업용 옥상 및 지면 설치형 발전소.' },
        { title: '에너지 저장', description: 'LiFePO4 배터리 연동 하이브리드 시스템으로 부하 피크 절감과 백업을 지원합니다.' },
        { title: '통신 기지국', description: '계통 접속이 불안정하거나 없는 원격 통신타워를 위한 오프그리드 전원.' },
        { title: '농촌 전기화', description: '마을, 농장 및 도서 지역 사회를 위한 독립형 마이크로그리드 및 오프그리드 전원.' },
        { title: '백업 전원', description: '정전 시 가정, 클리닉 및 소규모 사업장에 끊김 없는 전원 공급.' },
      ],
    },
    certifications: {
      eyebrow: '인증 및 표준',
      title: '글로벌 시장을 위한 적합성 문서',
      subtitle: '당사의 태양광 인버터 적합성 문서는 고객 검토 및 제품 인증 요건을 지원합니다. 문서는 요청 시 제공됩니다.',
      items: [
        {
          title: 'CE / LVD',
          description: '요청 시 태양광 인버터에 대한 LVD 적합성 문서를 제공합니다.',
        },
        {
          title: 'CE / EMC',
          description: '요청 시 태양광 인버터에 대한 EMC 적합성 문서를 제공합니다.',
        },
      ],
      note: '인증 가용 여부는 모델 및 대상 시장에 따라 다릅니다. 목적지 국가를 알려주시면 해당 주문에 적용되는 인증을 확인해 드립니다.',
      qualityButton: '품질 시스템 알아보기',
    },
    testimonials: {
      title: '파트너들의 평가',
      items: [
        { quote: '다양한 출력 옵션과 명확히 정의된 제품 사양 덕분에 당사 시장에 맞는 여러 인버터 구성을 더 쉽게 평가할 수 있습니다.', country: '독일', customerType: '태양광 유통사' },
        { quote: '여러 오프그리드 인버터 출력 옵션이 있어 다양한 고객 애플리케이션에 맞는 제품을 선택할 때 유연성이 높아집니다.', country: '나이지리아', customerType: '태양광 시공업체' },
        { quote: '고출력 인버터 옵션이 있어 다양한 오프그리드 전원 요구 사항을 검토할 때 더 큰 유연성을 얻을 수 있습니다.', country: 'UAE', customerType: '태양광 유통사' },
        { quote: '멀티 전압 구성은 오프그리드 애플리케이션의 다양한 DC 입력 요구 사항을 평가할 때 유용합니다.', country: '케냐', customerType: '신재생에너지 기업' },
        { quote: 'USB 탑재 인버터 구성은 추가 충전 기능이 필요한 애플리케이션에 또 하나의 옵션을 제공합니다.', country: '필리핀', customerType: '태양광 제품 유통사' },
        { quote: '저출력부터 고출력까지의 오프그리드 인버터 라인업 덕분에 다양한 용도에 맞는 제품을 선택할 때 더 큰 유연성을 얻을 수 있습니다.', country: '남아프리카공화국', customerType: '오프그리드 에너지 공급사' },
      ],
    },
    blog: {
      eyebrow: '인사이트',
      title: '블로그의 최신 글',
    },
  },

  productsIndex: {
    eyebrow: '제품 카탈로그',
    title: '전체 제품',
    subtitle: '모든 모델은 자체 공장에서 설계, 제조 및 테스트됩니다. 데이터시트, 가격 및 OEM 옵션은 문의해 주세요.',
    viewCategory: '카테고리 보기',
  },

  categoryPage: {
    eyebrow: '제품 카테고리',
    empty: '이 카테고리의 모델을 준비 중입니다. 최신 카탈로그는 문의해 주세요.',
    byPowerTitle: '{category} 정격 출력별',
    byPowerEyebrow: '출력별로 찾기',
    byPowerSubtitle: '필요한 출력을 선택하세요 — 각 페이지에는 해당 정격에서 이용 가능한 모든 모델이 나열됩니다.',
    customCtaTitle: '맞춤 사양이 필요하신가요?',
    customCtaSubtitle: 'OEM/ODM 프로젝트를 위한 맞춤 인버터를 개발합니다 — 정격 출력, 펌웨어, 브랜딩 및 인증을 시장에 맞게 제공합니다.',
  },

  powerPage: {
    empty: '이 출력 등급의 모델을 준비 중입니다. 최신 카탈로그는 문의해 주세요.',
    modelsInRating: '이 출력 등급의 {model} {count}개',
    otherRatings: {
      eyebrow: '오프그리드 라인업',
      title: '다른 출력 등급',
      subtitle: '정격 출력별로 전체 오프그리드 인버터 라인업을 둘러보세요.',
    },
    chip: '{power} 오프그리드',
    ctaTitle: '{power} 오프그리드 인버터가 필요하신가요?',
    ctaSubtitle: '목표 시장, 필요한 DC 입력 전압과 수량을 알려주시면 공장 직공 가격과 납기를 안내해 드립니다.',
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
      const seriesNote = facts.series ? ` (${facts.series})` : '';
      const specSentence = facts.dc ? ` 주요 사양: DC 입력 ${facts.dc}.` : '';
      return {
        description: `${facts.count}개의 ${facts.label} 오프그리드 인버터가 제공됩니다 — ${facts.types}${seriesNote}.${specSentence} 구성, 가격 및 대량 공급은 문의해 주세요.`,
        seoTitle: `${facts.label} 오프그리드 인버터${seriesNote}`,
        seoDescription: `${facts.label} 오프그리드 인버터: ${facts.types}.${
          facts.dc ? ` DC 입력 ${facts.dc}.` : ''
        } 가격 및 대량 공급은 문의해 주세요.`,
      };
    },
  },

  specs: {
    ratedPower: '정격 출력',
    acOutput: 'AC 출력',
    outputSockets: '출력 소켓',
    dcInputVoltage: 'DC 입력 전압',
    display: '디스플레이',
    usb: 'USB',
    cooling: '냉각',
    dimensions: '치수',
    netWeight: '순중량',
    groups: {
      acOutput: 'AC 출력',
      dcInput: 'DC 입력',
      displayCooling: '디스플레이 및 냉각',
      interface: '인터페이스',
      physical: '물리적 사양',
    },
    packaging: {
      packageDimensions: '포장 치수',
      grossWeight: '총중량',
      cartonQuantity: '카톤 수량',
      cartonDimensions: '카톤 치수',
      cartonWeight: '카톤 중량',
      cartonInformation: '카톤 정보',
    },
    /** Recurring specification VALUE translations. Unlisted values pass through unchanged. */
    values: {
      display: {
        'Digital Display': '디지털 디스플레이',
        'LCD Display': 'LCD 디스플레이',
        'LCD Smart Display': 'LCD 스마트 디스플레이',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': '지능형 온도 제어 팬',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V 선택 가능',
        '220V optional': '220V 선택 가능',
      },
      usb: {
        Yes: '예',
      },
      cartonInformation: {
        'Available in different packing configurations': '다양한 포장 구성으로 제공',
      },
      approx: '약',
      units: '{n}대',
      unitsOr: '{a}대 또는 {b}대',
    },
  },

  factory: {
    glance: {
      eyebrow: '제조',
      title: '한눈에 보는 당사 공장',
      items: [
        { title: 'SMT 라인', text: '자동 부품 실장 + AOI' },
        { title: '조립 라인', text: '다중 병렬 라인' },
        { title: '에이징 테스트룸', text: '100% 배치 테스트' },
        { title: '창고', text: '완제품 + 부품' },
      ],
    },
    process: {
      eyebrow: '공정',
      title: '인버터 제조 과정',
      steps: [
        '입고 부품 검사(IQC) — 배치 추적성을 갖춘 공인 공급사의 핵심 부품 사용.',
        '모든 PCBA에 AOI 광학 검사를 적용한 자동화 SMT 실장.',
        '기판 단위 기능 테스트 및 펌웨어 플래싱.',
        '토크 제어 체결을 적용한 완제품 조립.',
        '100% 기능 테스트: 출력 파형, 효율, 보호 기능.',
        '모든 생산 배치에 부하 상태의 8시간 에이징 테스트.',
        '최종 QC 검사, 시리얼 번호 등록 및 포장.',
      ],
    },
    visits: {
      eyebrow: '방문',
      title: '공장 실사 환영',
      text: '당사는 온사이트 공장 실사와 제3자 검사(SGS, TÜV, BV 또는 지정 검증 기관)를 환영합니다. 방문이 어려운 해외 바이어에게는 생산 라인의 실시간 영상 투어를 제공합니다 — 문의 양식을 통해 예약해 주세요.',
      addressLabel: '주소',
    },
    cta: {
      title: '공장 영상 투어 예약하기',
      subtitle: '주문 전에 생산 라인을 실시간으로 확인해 보세요.',
    },
  },

  quality: {
    intro: {
      eyebrow: '품질',
      title: '품질은 인증서가 아니라 프로세스입니다',
      items: [
        { title: 'ISO 9001 품질 시스템', text: '설계, 구매, 생산 및 애프터서비스를 포괄하는 문서화된 프로세스. 정기적인 내부 감사로 시스템이 단순한 인증이 아니라 실제로 작동하도록 유지합니다.' },
        { title: '100% 기능 테스트', text: '모든 단품은 라인을 떠나기 전에 출력 파형, 효율, 보호 동작 및 통신에 대해 테스트됩니다. 배치 샘플링으로 넘기는 일은 없습니다.' },
        { title: '8시간 에이징 테스트', text: '생산 배치는 에이징룸에서 풀 부하로 구동되어 출하 전 초기 고장을 걸러냅니다.' },
      ],
    },
    traceability: {
      eyebrow: '추적성',
      title: '모든 제품을 추적할 수 있습니다',
      text: '각 인버터는 생산일, 테스트 기록 및 부품 배치와 연결된 고유 시리얼 번호를 갖습니다. 현장 문제가 발생하면 몇 주가 아닌 몇 시간 내에 해당 배치를 추적할 수 있습니다. 테스트 보고서와 검사 데이터는 B2B 고객의 요청 시 제공됩니다.',
      bullets: [
        '모든 핵심 부품에 대한 입고 품질 관리(IQC)',
        '각 생산 단계의 공정 내 품질 관리(IPQC)',
        '선적 전 검사를 포함한 출하 품질 관리(OQC)',
        '신뢰성 테스트: 고/저온, 습도, 진동',
        '제3자 검사(SGS / TÜV / BV) 수용',
      ],
    },
    certifications: {
      eyebrow: '인증',
      title: '적합성 및 인증',
      note: '인증 적용 범위는 모델과 대상 시장에 따라 다릅니다. 주문에 적용되는 인증서는 영업팀에 문의하여 확인해 주세요.',
    },
    cta: {
      title: '테스트 보고서 또는 샘플 요청',
      subtitle: '당사 품질을 직접 검증하세요 — 자격을 갖춘 B2B 바이어에게 테스트 보고서와 샘플을 제공합니다.',
    },
  },

  contact: {
    eyebrow: '문의',
    title: '견적 요청',
    subtitle: '양식을 작성하여 프로젝트를 알려주세요 — 수량, 목표 시장 및 기술 요구 사항이 있으면 더 빠르게 견적할 수 있습니다.',
    directContact: '직접 문의',
    email: '이메일',
    whatsapp: 'WhatsApp',
    phone: '전화',
    responseTime: '응답 시간',
    responseTimeValue: '영업일 기준 24시간 이내',
    beforeYouWrite: '문의 전 참고 사항',
    tips: [
      '데이터시트가 있으신가요? 답장 이메일에 첨부해 주세요.',
      '목적지 국가를 알려주세요 — 인증은 시장마다 다릅니다.',
      '대량 구매 고객: OEM 브랜딩 및 독점 유통을 문의해 보세요.',
    ],
    linkedin: 'LinkedIn에서 연결하기',
  },

  form: {
    title: '견적 요청',
    subtitle: '필요하신 내용을 알려주세요. 영업일 기준 24시간 이내에 영업 엔지니어가 답변합니다.',
    name: '이름',
    company: '회사',
    country: '국가',
    email: '이메일',
    phone: 'WhatsApp / 전화',
    quantity: '예상 수량',
    quantityPlaceholder: '예: 500',
    product: '관심 제품',
    productGeneral: '일반 문의 / 아직 미정',
    message: '메시지',
    messagePlaceholder: '기술 요구 사항, 목표 시장, 인증 필요 사항, 납기 일정...',
    submit: '문의 보내기',
    consentPrefix: '제출하면 당사의',
    consentLink: '개인정보 처리방침',
    consentSuffix: '에 동의하게 됩니다. 문의 내용은 마케팅 구독이 아닙니다.',
    successTitle: '감사합니다 — 문의가 전송되었습니다.',
    successText: '영업일 기준 24시간 이내에 영업 엔지니어가 답변드립니다.',
    errorTitle: '문제가 발생했습니다.',
    errorDetail: '{message} 다시 시도하거나 이메일로 직접 문의해 주세요.',
    fallbackError: '다시 시도하거나 이메일로 직접 문의해 주세요.',
    submissionFailed: '제출에 실패했습니다.',
  },

  chat: {
    greeting: '안녕하세요! 필요한 출력(와트)을 알려주세요.',
    teaser: '오프그리드 인버터를 찾고 계신가요? 적합한 출력을 찾도록 도와드리겠습니다.',
    headerTitle: '상담하기',
    headerSubtitle: '{brand} · AI 영업 어시스턴트',
    inputPlaceholder: '메시지를 입력하세요…',
    inputAria: '메시지 입력',
    sendAria: '메시지 보내기',
    closeAria: '채팅 닫기',
    launcherAria: '상담하기',
    launcherUnreadAria: '상담하기, 새 메시지 1건',
    dismissAria: '메시지 닫기',
    messagesAria: '메시지',
    contactPlaceholder: '이메일 또는 WhatsApp…',
    contactHint: '입력하신 정보는 영업팀에만 전달됩니다.',
    optionalNote: '선택 사항 — 이메일 또는 WhatsApp만 있으면 됩니다.',
    namePlaceholder: '이름',
    nameAria: '이름(선택)',
    companyPlaceholder: '회사',
    companyAria: '회사(선택)',
    countryPlaceholder: '국가',
    countryAria: '국가(선택)',
    viewProduct: '제품 자세히 보기',
    reachUsDirectly: '직접 문의하실 수도 있습니다:',
    leadThanks: '감사합니다 — 영업팀이 곧 연락드리겠습니다. 먼저 연락하고 싶으시면 아래 정보를 이용해 주세요:',
    verificationError: '이 세션을 확인할 수 없습니다. WhatsApp 버튼 또는 문의 양식을 이용해 주시면 팀이 직접 도와드리겠습니다.',
    genericError: '죄송합니다, 문제가 발생했습니다. 다시 시도하거나 문의 양식을 이용해 주세요.',
    networkError: '죄송합니다 — 서버에 연결할 수 없습니다. 다시 시도하거나 문의 양식을 이용해 주시면 팀이 이메일로 답변드립니다.',
    leadError: '죄송합니다, 정보를 저장하지 못했습니다. 이메일로 문의하거나 다시 시도해 주세요.',
    typing: '입력 중…',
    /** Display labels for known English engine chips (the value sent stays English so the engine keeps matching). */
    chipLabels: {
      'I know the power': '출력(용량)을 알고 있습니다',
      'Not sure': '잘 모릅니다',
      'Show other models': '다른 모델 보기',
    },
  },

  blog: {
    eyebrow: '인사이트',
    title: '블로그 및 업계 인사이트',
    subtitle: '인버터 구매자, 시공업체 및 프로젝트 개발자를 위한 실용적인 지식 — 당사 엔지니어링 팀이 작성합니다.',
    breadcrumb: '블로그',
    articleCtaTitle: '인버터 선택에 도움이 필요하신가요?',
    articleCtaSubtitle: '영업 엔지니어가 프로젝트에 맞는 모델을 무료로 추천해 드립니다.',
    translatedNote: '이 기사는 현재 영어로 제공됩니다.',
  },
};
