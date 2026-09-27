/**
 * About page — KOREAN dictionary.
 * Mirrors the key-for-key structure of aboutEn.
 * Company names and stat values stay unchanged.
 */

import type { AboutContent } from './types';

export const aboutKo: AboutContent = {
  seo: {
    title: '회사 소개 — 글로벌 신재생에너지 시장의 인버터 공급사',
    description:
      'Zhongze Huasong은 글로벌 신재생에너지 시장을 위한 인버터 공급사입니다: 10년 이상의 경력, 30개국 이상 공급, 연간 50,000대 이상 출하. OEM/ODM 인버터 지원.',
  },

  hero: {
    eyebrow: '인버터 전문 · 글로벌 신재생에너지 시장 서비스',
    heading: '믿을 수 있는 인버터 솔루션으로 글로벌 에너지에 전력을 공급합니다',
    intro:
      'Zhongze Huasong은 인버터 제품에 집중하며 주거용, 태양광 PV, 에너지 저장, 야외, 상업 및 산업용 애플리케이션을 위한 신뢰할 수 있는 전력 변환 솔루션을 제공합니다.',
    primaryCta: '제품 살펴보기',
    secondaryCta: '견적 요청',
    image: {
      alt: 'Zhongze Huasong 인버터 생산 및 운영 시설',
      placeholder: '[공장 이미지 1 제공 예정]',
    },
  },

  glance: {
    eyebrow: 'Zhongze Huasong 소개',
    title: '한눈에 보는 회사',
    stats: [
      { value: '10+', label: '업계 경력 연수' },
      { value: '30+', label: '국가 및 지역' },
      { value: '50,000+', label: '연간 출하 대수' },
      { value: '20+', label: '인버터 제품 및 솔루션' },
      { value: '10,000㎡+', label: '생산 및 운영 공간' },
      { value: '99%+', label: '공장 합격률' },
    ],
  },

  focus: {
    eyebrow: '집중 분야',
    title: '인버터에 대한 깊은 집중',
    intro:
      'Shenzhen Zhongze Huasong Trading Co., Ltd.는 신재생에너지 전력 장비 및 인버터 제품에 집중하며, 전 세계 고객에게 안정적이고 효율적이며 신뢰할 수 있는 전력 변환 솔루션을 제공합니다.',
    points: [
      {
        title: '인버터 중심의 사업',
        text: '당사의 사업은 폭넓은 장비 카탈로그가 아닌 인버터 제품과 전력 변환을 중심으로 구성되어 있어, 파트너는 이 카테고리를 깊이 이해하는 팀과 일하게 됩니다.',
      },
      {
        title: '글로벌 신재생에너지 시장과의 방향 일치',
        text: '당사는 전 세계적인 신재생에너지 전환에 헌신하고 있으며, 제품 선정과 지원을 그 시장의 방향에 맞춰 유지합니다.',
      },
      {
        title: '다양한 적용 시나리오에 대한 이해',
        text: '주거용 옥상, 태양광 PV 시스템, 에너지 저장, 야외 전원, 상업 건물 및 산업 현장은 각각 인버터에 서로 다른 요구를 부과합니다. 당사는 파트너가 앞의 시나리오에 맞는 제품을 선택하도록 돕습니다.',
      },
      {
        title: '안정적이고 효율적이며 신뢰할 수 있는 변환',
        text: '당사가 제공하는 모든 솔루션은 안정적인 출력, 효율적인 변환 및 신뢰할 수 있는 일상 운영을 위해 선정되었습니다 — 시스템이 계속 작동해야 할 때 중요한 기본입니다.',
      },
    ],
  },

  capability: {
    eyebrow: '역량',
    title: 'R&D · 제조 · 품질',
    intro:
      'Zhongze Huasong은 제품 개발, 기술 테스트, 제조, 품질 관리 및 애프터서비스 지원을 포괄하는 사업 시스템을 구축했으며, 전문 제조 팀과 장기적인 협력을 유지합니다.',
    image: {
      alt: 'Zhongze Huasong 인버터 생산을 지원하는 제조 및 테스트 운영',
      placeholder: '[공장 이미지 2 제공 예정]',
    },
    space: { value: '10,000㎡+', label: '생산 및 운영 공간' },
    testing: {
      value: '20+',
      label: '성능 및 안전 테스트',
      areasLabel: '주요 테스트 분야',
      areas: [
        '출력 안정성',
        '변환 효율',
        '온도 상승',
        '과부하 보호',
        '단락 보호',
        '연속 운전 성능',
      ],
    },
    quality: {
      value: '5',
      label: '품질 검사 단계',
      passRate: { value: '99%+', label: '공장 합격률' },
    },
    gallery: {
      label: '제조 역량',
      title: '당사의 생산 시설',
      intro:
        'Zhongze Huasong 인버터를 지원하는 제조 시스템 내 생산 및 테스트 운영의 내부 모습입니다.',
      items: [
        {
          caption: 'SMT 생산 라인',
          image: {
            alt: '인쇄회로기판에 부품을 실장하는 SMT 생산 라인',
            placeholder: '[생산 라인 이미지 01 제공 예정]',
          },
        },
        {
          caption: '자동화 생산 라인',
          image: {
            alt: '제조 작업장 내 자동화 생산 설비',
            placeholder: '[생산 라인 이미지 02 제공 예정]',
          },
        },
        {
          caption: '에이징 테스트 장비',
          image: {
            alt: '연속 운전 테스트에 사용되는 에이징 테스트 챔버',
            placeholder: '[생산 라인 이미지 03 제공 예정]',
          },
        },
        {
          caption: '조립 및 기능 테스트',
          image: {
            alt: '완제품 기능 테스트 스테이션이 있는 조립 라인',
            placeholder: '[생산 라인 이미지 04 제공 예정]',
          },
        },
      ],
    },
  },

  portfolio: {
    eyebrow: '제품',
    title: '성장하는 인버터 포트폴리오',
    intro:
      '다양한 시장과 적용 시나리오의 요구를 충족하기 위해 인버터 포트폴리오를 계속 확장하고 있습니다.',
    applicationsLabel: '적용 분야',
    applications: [
      '주거용',
      '태양광 PV',
      '에너지 저장',
      '야외 전원',
      '상업용',
      '산업용',
    ],
    cta: '제품 살펴보기',
  },

  oem: {
    eyebrow: 'OEM / ODM',
    title: '유연한 OEM / ODM 협력',
    text: '당사는 고객의 시장 포지셔닝, 기술 요구 사항 및 적용 니즈에 기반한 유연한 OEM / ODM 협력을 지원합니다.',
  },

  global: {
    eyebrow: '글로벌 공급 · 서비스',
    title: '글로벌 공급 · 전문 서비스',
    intro:
      'Zhongze Huasong은 30개국 이상의 유통사, 수입사, 시공업체 및 시스템 통합업체에 인버터 제품을 공급하며 연간 50,000대 이상을 출하합니다.',
    image: {
      alt: 'Zhongze Huasong 글로벌 인버터 공급을 지원하는 창고 및 물류 운영',
      placeholder: '[공장 이미지 3 제공 예정]',
    },
    metrics: [
      { value: '30+', label: '국가 및 지역' },
      { value: '50,000+', label: '연간 출하 대수' },
    ],
    flowLabel: '지원 방식',
    flow: [
      '제품 선정',
      '기술 지원',
      '생산',
      '납품',
      '애프터서비스 지원',
    ],
    positioning: [
      '당사는 장기적인 고객 관계를 중요시하며, 제품 선정, 기술 지원, 생산, 납품 및 애프터서비스 전 과정에서 전문적인 지원을 제공합니다.',
      '당사의 목표는 단순히 제품을 공급하는 것이 아니라 고객의 신뢰받는 장기 파트너가 되는 것입니다.',
    ],
  },

  vision: {
    eyebrow: '전망',
    title: '당사의 비전',
    paragraphs: [
      '글로벌 에너지 전환이 계속됨에 따라 Zhongze Huasong은 제품 혁신, 신뢰할 수 있는 품질 및 글로벌 서비스에 초점을 맞춰 인버터 및 신재생에너지 전력 분야에 계속 헌신합니다.',
      '전 세계 파트너와 협력하여 가정, 기업 및 신재생에너지 프로젝트에 효율적이고 신뢰할 수 있는 전력 솔루션을 제공하고자 합니다.',
    ],
  },

  finalCta: {
    title: '당신의 시장을 위한 신뢰할 수 있는 인버터 솔루션',
    subtitle:
      '주거용, 상업용, 산업용, 태양광 PV, 에너지 저장 또는 기타 용도로 인버터 제품을 조달하실 때, 요구 사항을 당사에 말씀해 주세요.',
  },
};
