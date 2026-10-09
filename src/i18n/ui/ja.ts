/**
 * Site-wide UI dictionary — JAPANESE.
 * Mirrors the Dictionary shape of en.ts key-for-key.
 */
import type { Dictionary } from './en';

export const ja: Dictionary = {
  nav: {
    products: '製品',
    factory: '工場',
    quality: '品質',
    oemOdm: 'OEM / ODM',
    about: '会社情報',
    blog: 'ブログ',
    viewAllProducts: 'すべての製品を見る',
    requestQuote: 'お見積り依頼',
    whatsappUs: 'WhatsAppで問い合わせる',
    mainNavAria: 'メインナビゲーション',
    mobileNavAria: 'モバイルナビゲーション',
    toggleMenuAria: 'ナビゲーションメニューの切り替え',
    languageAria: '言語の変更',
    skipToContent: '本文へスキップ',
  },

  footer: {
    productsHeading: '製品',
    allProducts: '全製品一覧',
    companyHeading: '会社情報',
    aboutUs: '会社概要',
    factoryAndManufacturing: '工場・製造',
    qualityControl: '品質管理',
    blogInsights: 'ブログ・お役立ち情報',
    contactUs: 'お問い合わせ',
    privacyPolicy: 'プライバシーポリシー',
    stayUpdated: '最新情報を受け取る',
    newsletterBlurb: '製品アップデート、技術情報、会社のお知らせをお届けします。',
    blurb: '{year}年創業のインバーター専門メーカー。{countries}か国以上へOEM / ODM対応で供給しています。',
    whatsappLabel: 'WhatsApp',
    emailAria: 'メール',
    rights: '無断転載を禁じます。',
    productCategoriesAria: '製品カテゴリー',
    companyNavAria: '会社情報',
  },

  newsletter: {
    emailLabel: 'メールアドレス',
    subscribe: '登録する',
    consent: '製品アップデート、技術情報、会社のお知らせをメールで受け取ることに同意します。いつでも解除できます。',
    success: '登録が完了しました。ありがとうございます。',
    error: '登録に失敗しました。後ほど再度お試しください。',
  },

  consent: {
    text: '当サイトではCookieを使用して、サイトの利用状況の把握とユーザー体験の向上を図っています。マーケティングCookieは同意があった場合にのみ使用されます。詳しくは',
    privacyLink: 'プライバシーポリシー',
    reject: '必須のみ許可',
    accept: 'すべて許可',
    aria: 'Cookie同意設定',
  },

  cta: {
    defaultTitle: '今すぐお見積りを依頼する',
    defaultSubtitle: 'ご要件をお送りください — 営業担当エンジニアが24時間以内に価格、納期、OEMオプションをご返信します。',
    defaultButton: 'お見積り依頼',
    whatsapp: 'WhatsAppでチャット',
    midTitle: 'お見積りやカスタマイズのご相談はお気軽に',
    midSubtitle: 'ご要件をお送りください — 営業担当エンジニアが24時間以内にご返信します。',
  },

  common: {
    home: 'ホーム',
    viewDetails: '詳細を見る',
    getQuote: 'お見積りを依頼する',
    requestQuote: 'お見積り依頼',
    viewProducts: '製品を見る',
    browseAllProducts: '全製品を見る',
    readAllArticles: 'すべての記事を読む',
    featured: '注目製品',
    ratedOutput: '定格出力',
    contactSales: '営業へ問い合わせる',
    quoteForModel: 'このモデルのお見積りを依頼する',
    productOverview: '製品概要',
    technicalSpecifications: '技術仕様',
    keyFeatures: '主な特長',
    packagingInformation: '梱包情報',
    applications: '適用用途',
    downloads: 'ダウンロード',
    relatedProducts: '関連製品',
    relatedSameCategory: '{category}のその他の製品',
    relatedMoreModels: 'カタログのその他のモデル',
    relatedGuides: '関連ガイド',
    relatedGuidesSubtitle: 'エンジニアリングチームによる技術記事',
    standard: '標準',
    product: '製品',
    viewCertificate: '証明書を見る',
    viewCertificateSr: '（PDFを新しいタブで開きます）',
    specifications: '仕様',
    model: 'モデル',
    models: 'モデル',
    since: '創業',
    oemBullets: [
      '大量注文向けのOEM / ODMブランディングに対応',
      'データシートおよび価格はお問い合わせ時にご提供',
      '営業日は24時間以内にご返信します',
    ],
    pageAria: {
      productCategories: '製品カテゴリー',
    },
  },

  seo: {
    home: {
      title: '{brand} — グローバルB2Bパートナー向けインバーターメーカー',
      description:
        '{year}年創業の太陽光インバーター専門メーカー。ハイブリッド、系統連系、オフグリッドインバーターにOEM/ODMで対応し、ISO 9001品質システムと工場直販価格をご提供。{countries}か国以上へ輸出しています。',
    },
    productsIndex: {
      title: '全製品 — インバーターカタログ',
      description:
        '当社のインバーターカタログをご覧ください：900W〜5000Wのオフグリッドインバーター、OEM/ODM対応。仕様、価格、大量供給についてはお問い合わせください。',
    },
    category: {
      titleSuffix: '— メーカー・OEMサプライヤー',
    },
    factory: {
      title: '工場・製造 — SMT、組立、エージング試験ライン',
      description:
        '延べ{area}㎡のインバーター工場をご案内します：自動SMTライン、組立ライン、エージング試験室、倉庫。海外のお客様向けにビデオ工場監査にも対応しています。',
    },
    quality: {
      title: '品質管理 — ISO 9001体制、100%検査、8時間エージング試験',
      description:
        '当社のインバーター品質管理：ISO 9001認証の品質システム、100%機能検査、8時間エージング試験、完全な生産トレーサビリティ。第三者検査も歓迎します。',
    },
    contact: {
      title: 'お問い合わせ — インバーターのお見積り依頼',
      description:
        '当社インバーターの価格、データシート、OEMオプションのご請求はこちら。営業日は24時間以内に営業担当エンジニアが返信します。メール、WhatsApp、お問い合わせフォームをご利用いただけます。',
    },
    blog: {
      title: 'ブログ・業界インサイト — インバーターナレッジベース',
      description:
        '太陽光インバーターに関する技術ガイドと業界インサイト：ハイブリッド／系統連系／オフグリッドの比較、容量設計、認証、OEM製造など。',
    },
    oemOdm: {
      title: 'OEM / ODM Solar Inverter Manufacturer | Zhongze Huasong',
      description:
        'OEM / ODM solar inverter manufacturing with private label, custom firmware and packaging. Own factory, 200,000 units annual capacity, ISO 9001. Get a quote in 24 hours.',
    },
  },

  home: {
    hero: {
      eyebrow: '{year}年創業のインバーターメーカー',
      title: 'グローバルB2Bパートナー向け 工場直販ソーラーインバーター',
      subtitle:
        '電力網が不安定、電気料金が高い、または信頼性の低い電源環境の地域向けに設計された、ハイブリッド・系統連系・オフグリッドインバーターを工場直販で提供します。自家消費、ピークシフト、バックアップ電源に最適——OEM / ODMプログラム、ISO 9001品質、24時間対応で、販売代理店・施工業者・プロジェクト開発事業者を支援します。',
      heroImageAria: '太陽光発電システムのイラスト',
      bullets: ['OEM / ODM', 'ISO 9001', '24時間以内に返信', '{countries}か国以上へ輸出'],
    },
    trust: {
      manufacturer: '製造元',
      factoryArea: '工場面積',
      unitsPerYear: '年間出荷台数',
      exportCountries: '輸出国',
      oemClients: 'OEM / ODM 顧客',
    },
    categories: {
      eyebrow: '当社の製品',
      title: 'インバーターカテゴリー',
      subtitle: '現在製造しているインバーターのラインナップをご紹介します。新しいモデルが公開され次第、カテゴリーに追加されます。',
    },
    featured: {
      eyebrow: '注目',
      title: '人気モデル',
      subtitle: 'カタログの中から特に人気の高いインバーターです。すべてのモデルでOEMブランディングと仕様カスタマイズに対応しています。',
    },
    advantages: {
      eyebrow: '製品の特長',
      title: '製品の優位性と技術力',
      subtitle: 'オフグリッドインバーターシリーズの主な特徴 — 出力方式とDC入力オプションから定格出力、実用的な製品構成まで。',
      items: [
        {
          title: '正弦波（ピュアサイン波）出力',
          description: 'さまざまな負荷に安定した電力を供給する必要のあるオフグリッド用途向けに設計された、安定した正弦波AC出力です。',
        },
        {
          title: '複数のDC入力オプション',
          description: '製品に応じて、12V、24V、48V、60V、72Vを含む複数のDC入力電圧構成に対応するモデルがあります。',
        },
        {
          title: 'インテリジェント温度制御冷却',
          description: 'インテリジェント温度制御ファン冷却により、さまざまなオフグリッド用途での安定した動作をサポートします。',
        },
        {
          title: '柔軟なAC出力構成',
          description: '市場のニーズに応えられるよう、220V / 110VのAC出力オプションやさまざまなコンセント構成を選択できるモデルがあります。',
        },
        {
          title: '多彩な出力容量',
          description: '現在のオフグリッドインバーターシリーズは900W〜5000Wをカバーし、多様なオフグリッド用途に応じた出力の選択肢を提供します。',
        },
        {
          title: '実用的な製品構成',
          description: '製品ラインナップには、LCDまたはデジタル表示、複数のAC出力コンセント、USB搭載モデルなど、製品に応じたさまざまな構成が含まれます。',
        },
      ],
    },
    whyUs: {
      eyebrow: '選ばれる理由',
      title: '世界中のお客様に選ばれる理由',
      subtitle: '当社は商社ではなくメーカーです — だからこそ、エンジニアリングの直接サポート、管理された品質、そしてより良いマージンをご提供できます。',
      items: [
        {
          title: '自社研究開発',
          description: '{engineers}名のエンジニアがハードウェア、ファームウェア、構造設計を担当。OEM/ODMプロジェクト向けにカスタムファームウェア、ロゴ、梱包、仕様に対応します。',
        },
        {
          title: '製造規模',
          description: '{area}㎡の自社工場にSMT、組立、エージングラインを備え、年間{capacity}台の生産能力を持ちます。',
        },
        {
          title: '監査可能な品質',
          description:
            'ISO 9001品質システム、100%機能検査、梱包前の8時間エージング試験。太陽光インバーターについては、ご要望に応じてCE関連のLVD（EN 62109-1）およびEMC適合文書をご提供できます。第三者検査も歓迎します。',
        },
      ],
    },
    process: {
      eyebrow: 'お取引の流れ',
      title: 'RFQから納品まで',
      subtitle: '海外のB2Bパートナー向けに設計された透明な6ステップのプロセス — ご注文の状況は常にご確認いただけます。',
      steps: [
        { title: 'RFQ', description: 'お問い合わせフォーム、メール、またはWhatsAppからご要件をお送りください。' },
        { title: 'ご提案・お見積り', description: '営業担当エンジニアが24時間以内にご提案と価格をご返信します。' },
        { title: 'サンプル確認', description: 'サンプルをご評価いただき、仕様をご確認のうえ、ご注文内容を確定します。' },
        { title: '試験・認証', description: '必要な試験と輸出先市場への適合対応を生産前に実施します。' },
        { title: '量産', description: '各段階で品質管理を行いながら計画的に生産します。' },
        { title: '納品・アフターサポート', description: '輸出梱包、出荷手配、アフターサポートを行います。' },
      ],
    },
    factory: {
      eyebrow: '自社工場の紹介',
      title: '安定した品質と安定供給のために',
      subtitle: '当社の製造プロセスは、生産、組立、試験、品質管理を一体化し、世界中のお客様へ安定した製品品質と安定供給を提供します。',
      capabilities: [
        { title: '生産・組立', description: '体系的な生産・組立プロセスにより、安定した製造と確実な製品供給を支えます。' },
        { title: '品質試験', description: '製造プロセスに品質管理と機能試験を組み込み、安定した製品品質を支えます。' },
        { title: 'エージング試験', description: '出荷準備前の生産品質プロセスとして、エージング試験を実施しています。' },
        { title: '完成品・物流', description: '完成品は梱包・出荷の準備を行い、効率的な受注対応を支えます。' },
      ],
      bullets: [
        '{employees}名以上のスタッフ、{engineers}名の研究開発エンジニア',
        '体系的な生産・組立プロセス',
        '梱包前の100%機能検査',
        'すべての生産ロットに対する8時間エージング試験',
        '出荷前の第三者検査も歓迎します',
      ],
      cta: '工場を見てみる',
    },
    applications: {
      eyebrow: '適用用途',
      title: '当社インバーターの活用シーン',
      subtitle: '多様な気候条件や系統環境の下、住宅、商用、通信、オフグリッドの各プロジェクトで実績があります。',
      items: [
        { title: '住宅用太陽光', description: '蓄電池バックアップと自家消費の最適化を備えた家庭用屋根設置太陽光発電システム。' },
        { title: '商用・産業用', description: '10kW〜50kWのストリングインバーターを用いた商用・産業用の屋根および地上設置発電所。' },
        { title: '蓄電システム', description: 'LiFePO4蓄電池と連携したハイブリッドシステムで、ピークカットとバックアップに対応します。' },
        { title: '通信基地局', description: '系統電力が不安定または利用できない遠隔の通信塔向けオフグリッド電源。' },
        { title: '農村電化', description: '村落、農場、離島向けの独立マイクログリッドおよびオフグリッド電源。' },
        { title: '非常用電源', description: '停電時の住宅、診療所、小規模事業所向けの無停電電源。' },
      ],
    },
    certifications: {
      eyebrow: '認証・規格',
      title: 'グローバル市場向けコンプライアンス文書',
      subtitle: '当社の太陽光インバーターのコンプライアンス文書は、お客様の審査および製品適合要件をサポートします。文書はご要望に応じてご提供します。',
      items: [
        {
          title: 'CE / LVD',
          description: '太陽光インバーターについては、ご要望に応じてLVD適合文書をご提供できます。',
        },
        {
          title: 'CE / EMC',
          description: '太陽光インバーターについては、ご要望に応じてEMC適合文書をご提供できます。',
        },
      ],
      note: '認証の取得状況はモデルおよび対象市場により異なります。輸出先の国をお知らせいただければ、ご注文に適用される認証をご確認いたします。',
      qualityButton: '品質システムについて詳しく見る',
    },
    testimonials: {
      title: 'パートナーの声',
      items: [
        { quote: '多彩な出力容量の選択肢と明確に定義された製品仕様のおかげで、当社の市場に合ったインバーター構成を評価しやすくなりました。', country: 'ドイツ', customerType: '太陽光卸売業者' },
        { quote: '複数のオフグリッドインバーターの出力バリエーションがあることで、顧客の用途ごとに製品を選定する際の柔軟性が高まりました。', country: 'ナイジェリア', customerType: '太陽光施工業者' },
        { quote: '大容量クラスのインバーターオプションがあることで、さまざまなオフグリッド電力要件を検討する際の柔軟性が高まりました。', country: 'アラブ首長国連邦', customerType: '太陽光卸売業者' },
        { quote: '複数電圧の構成があるため、オフグリッド用途におけるさまざまなDC入力要件を評価する際に有用です。', country: 'ケニア', customerType: '再生可能エネルギー企業' },
        { quote: 'USB搭載のインバーター構成があることで、追加の充電機能が必要な用途にもう一つの選択肢が増えました。', country: 'フィリピン', customerType: '太陽光製品卸売業者' },
        { quote: '小容量から大容量までのオフグリッドインバーターのラインナップにより、用途ごとの製品選定の柔軟性が高まりました。', country: '南アフリカ', customerType: 'オフグリッド電力サプライヤー' },
      ],
    },
    blog: {
      eyebrow: 'お役立ち情報',
      title: 'ブログの最新記事',
    },
  },

  productsIndex: {
    eyebrow: '製品カタログ',
    title: '全製品',
    subtitle: 'すべてのモデルが自社工場で設計・製造・検査されています。データシート、価格、OEMオプションについてはお問い合わせください。',
    viewCategory: 'カテゴリーを見る',
  },

  categoryPage: {
    eyebrow: '製品カテゴリー',
    empty: 'このカテゴリーのモデルは準備中です。最新のカタログについてはお問い合わせください。',
    byPowerTitle: '{category}（定格出力別）',
    byPowerEyebrow: '出力容量で選ぶ',
    byPowerSubtitle: '必要な出力容量をお選びください — 各ページには該当する定格の全モデルが掲載されています。',
    customCtaTitle: 'カスタム仕様が必要ですか？',
    customCtaSubtitle: 'OEM/ODMプロジェクト向けにカスタムインバーターを開発します — 出力容量、ファームウェア、ブランディング、認証をお客様の市場に合わせて対応します。',
  },

  powerPage: {
    empty: 'この出力容量のモデルは準備中です。最新のカタログについてはお問い合わせください。',
    modelsInRating: 'この出力容量には{model}が{count}件あります',
    otherRatings: {
      eyebrow: 'オフグリッドシリーズ',
      title: 'その他の出力容量',
      subtitle: '定格出力からオフグリッドインバーターの全ラインナップをご覧いただけます。',
    },
    chip: '{power} オフグリッド',
    ctaTitle: '{power}オフグリッドインバーターをお探しですか？',
    ctaSubtitle: '対象市場、必要なDC入力電圧、数量をお知らせください — 工場直販の価格と納期をご返信します。',
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
      const seriesNote = facts.series ? `（${facts.series}）` : '';
      const specSentence = facts.dc ? ` 主な仕様：DC入力 ${facts.dc}。` : '';
      return {
        description: `${facts.label}オフグリッドインバーター${facts.count}機種をご用意しています — ${facts.types}${seriesNote}。${specSentence}構成、価格、大量供給についてはお問い合わせください。`,
        seoTitle: `${facts.label}オフグリッドインバーター${seriesNote}`,
        seoDescription: `${facts.label}オフグリッドインバーター：${facts.types}。${
          facts.dc ? ` DC入力 ${facts.dc}。` : ''
        }価格と大量供給についてはお問い合わせください。`,
      };
    },
  },

  specs: {
    ratedPower: '定格出力',
    acOutput: 'AC出力',
    outputSockets: '出力コンセント',
    dcInputVoltage: 'DC入力電圧',
    display: '表示',
    usb: 'USB',
    cooling: '冷却方式',
    dimensions: '外形寸法',
    netWeight: '正味重量',
    groups: {
      acOutput: 'AC出力',
      dcInput: 'DC入力',
      displayCooling: '表示・冷却',
      interface: 'インターフェース',
      physical: '外形',
    },
    packaging: {
      packageDimensions: '梱包寸法',
      grossWeight: '総重量',
      cartonQuantity: 'カートン入数',
      cartonDimensions: 'カートン寸法',
      cartonWeight: 'カートン重量',
      cartonInformation: 'カートン情報',
    },
    /** Translations for recurring specification VALUES. Unlisted values pass through unchanged. */
    values: {
      display: {
        'Digital Display': 'デジタル表示',
        'LCD Display': 'LCDディスプレイ',
        'LCD Smart Display': 'LCDスマートディスプレイ',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'インテリジェント温度制御ファン',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V 選択可能',
        '220V optional': '220V 選択可能',
      },
      usb: {
        Yes: 'あり',
      },
      cartonInformation: {
        'Available in different packing configurations': '異なる梱包構成でご用意可能',
      },
      approx: '約',
      units: '{n}台',
      unitsOr: '{a}台または{b}台',
    },
  },

  factory: {
    glance: {
      eyebrow: '製造体制',
      title: '当社工場の概要',
      items: [
        { title: 'SMTライン', text: '自動実装 + AOI検査' },
        { title: '組立ライン', text: '複数の並行ライン' },
        { title: 'エージング試験室', text: '全ロット100%試験' },
        { title: '倉庫', text: '完成品 + 部品' },
      ],
    },
    process: {
      eyebrow: '製造プロセス',
      title: 'インバーターの製造工程',
      steps: [
        '来料検査（IQC） — 主要部品は認定サプライヤーから調達し、ロット単位でトレーサビリティを管理します。',
        '全てのPCBAにAOI光学検査付きの自動SMT実装を行います。',
        '基板レベルの機能試験とファームウェアの書き込み。',
        'トルク管理された締め付けによる製品組立。',
        '100%機能試験：出力波形、効率、保護機能。',
        'すべての生産ロットに対する負荷条件下での8時間エージング試験。',
        '最終QC検査、シリアル番号登録、梱包。',
      ],
    },
    visits: {
      eyebrow: '見学',
      title: '工場監査を歓迎します',
      text: '現地での工場監査や第三者検査（SGS、TÜV、BVまたはご指定の検査機関）を歓迎します。ご来場が難しい海外のお客様には、生産ラインのライブビデオ見学をご用意しています — お問い合わせフォームからご予約ください。',
      addressLabel: '所在地',
    },
    cta: {
      title: '工場ビデオ見学のご予約',
      subtitle: 'ご発注前に生産ラインをライブでご覧いただけます。',
    },
  },

  quality: {
    intro: {
      eyebrow: '品質',
      title: '品質とは証明書ではなくプロセスである',
      items: [
        { title: 'ISO 9001品質システム', text: '設計、購買、生産、アフターサービスを網羅する文書化されたプロセス。定期的な内部監査により、認証のためだけでなくシステムを運用し続けています。' },
        { title: '100%機能試験', text: 'すべての製品を出荷前に出力波形、効率、保護動作、通信について検査します。抜き取り検査による妥協はありません。' },
        { title: '8時間エージング試験', text: '生産ロットをエージング試験室で全負荷状態で稼働させ、出荷前に初期不良を検出します。' },
      ],
    },
    traceability: {
      eyebrow: 'トレーサビリティ',
      title: 'すべての製品を追跡可能',
      text: '各インバーターには固有のシリアル番号が付与され、生産日、試験記録、部品ロットと紐付いています。万一市場で問題が発生した場合、影響のあるロットを数時間単位で特定できます。試験報告書および検査データはB2Bのお客様にご要望に応じてご提供します。',
      bullets: [
        'すべての主要部品に対する来料品質管理（IQC）',
        '各生産段階での工程内品質管理（IPQC）',
        '出荷前検査を含む出荷品質管理（OQC）',
        '信頼性試験：高低温、湿度、振動',
        '第三者検査（SGS / TÜV / BV）受け入れ可能',
      ],
    },
    certifications: {
      eyebrow: '認証',
      title: 'コンプライアンス・認証',
      note: '認証の適用範囲はモデルと対象市場によって異なります。ご注文に適用される証明書については、営業チームまでお問い合わせください。',
    },
    cta: {
      title: '試験報告書またはサンプルのご請求',
      subtitle: '当社の品質を実際にご確認ください — 条件を満たすB2Bのお客様に試験報告書とサンプルをご提供します。',
    },
  },

  contact: {
    eyebrow: 'お問い合わせ',
    title: 'お見積り依頼',
    subtitle: 'フォームにご記入のうえ、プロジェクトについてお知らせください — 数量、対象市場、技術要件をいただくとより迅速にお見積りできます。',
    directContact: '直接のお問い合わせ',
    email: 'メール',
    whatsapp: 'WhatsApp',
    phone: '電話',
    responseTime: '返信時間',
    responseTimeValue: '営業日24時間以内',
    beforeYouWrite: 'お問い合わせの前に',
    tips: [
      'データシートをお持ちですか？返信メールに添付してください。',
      '輸出先の国をお知らせください — 認証要件は市場ごとに異なります。',
      '大量購入をご検討の方：OEMブランディングや独占販売についてはお問い合わせください。',
    ],
    linkedin: 'LinkedInでつながる',
  },

  form: {
    title: 'お見積り依頼',
    subtitle: 'ご要望をお知らせください。営業日は24時間以内に営業担当エンジニアがご返信します。',
    name: 'お名前',
    company: '会社名',
    country: '国',
    email: 'メールアドレス',
    phone: 'WhatsApp / 電話番号',
    quantity: '想定数量',
    quantityPlaceholder: '例：500',
    product: 'ご関心のある製品',
    productGeneral: '一般的なお問い合わせ / まだ未定',
    message: 'メッセージ',
    messagePlaceholder: '技術要件、対象市場、認証要件、納期など…',
    submit: '問い合わせを送信',
    consentPrefix: '送信により、当社の',
    consentLink: 'プライバシーポリシー',
    consentSuffix: 'に同意したことになります。お問い合わせはマーケティング配信の登録ではありません。',
    successTitle: 'ありがとうございます — お問い合わせを送信しました。',
    successText: '営業日24時間以内に営業担当エンジニアよりご連絡いたします。',
    errorTitle: '問題が発生しました。',
    errorDetail: '{message} 再度お試しいただくか、直接メールでお問い合わせください。',
    fallbackError: '再度お試しいただくか、直接メールでお問い合わせください。',
    submissionFailed: '送信に失敗しました。',
  },

  chat: {
    greeting: 'こんにちは！必要な出力（ワット数）を教えてください。',
    teaser: 'オフグリッドインバーターをお探しですか？適切な出力選びをお手伝いします。',
    headerTitle: 'チャットでのお問い合わせ',
    headerSubtitle: '{brand} · AIセールスアシスタント',
    inputPlaceholder: 'メッセージを入力…',
    inputAria: 'メッセージを入力',
    sendAria: 'メッセージを送信',
    closeAria: 'チャットを閉じる',
    launcherAria: 'チャットでのお問い合わせ',
    launcherUnreadAria: 'チャットでのお問い合わせ、新着メッセージ1件',
    dismissAria: 'メッセージを閉じる',
    messagesAria: 'メッセージ',
    contactPlaceholder: 'メールアドレスまたはWhatsApp…',
    contactHint: 'ご入力いただいた情報は営業チームのみに使用されます。',
    optionalNote: '任意 — メールアドレスまたはWhatsAppのみ必要です。',
    namePlaceholder: 'お名前',
    nameAria: 'お名前（任意）',
    companyPlaceholder: '会社名',
    companyAria: '会社名（任意）',
    countryPlaceholder: '国',
    countryAria: 'お住まいの国（任意）',
    viewProduct: '製品詳細を見る',
    reachUsDirectly: '直接ご連絡いただくことも可能です：',
    leadThanks: 'ありがとうございます — 営業チームより追ってご連絡いたします。先に直接ご連絡をご希望の場合は、以下をご利用ください：',
    verificationError: 'このセッションを確認できませんでした。WhatsAppボタンまたはお問い合わせフォームをご利用ください。チームが直接サポートいたします。',
    genericError: '申し訳ありません、問題が発生しました。もう一度お試しいただくか、お問い合わせフォームをご利用ください。',
    networkError: '申し訳ありません — サーバーに接続できませんでした。もう一度お試しいただくか、お問い合わせフォームをご利用ください。チームがメールで返信いたします。',
    leadError: '申し訳ありません、情報を保存できませんでした。メールでご連絡いただくか、もう一度お試しください。',
    typing: '入力中…',
    /** Display labels for known English engine chips (the value sent stays English so the engine keeps matching). */
    chipLabels: {
      'I know the power': '出力容量はわかる',
      'Not sure': 'まだわからない',
      'Show other models': '他のモデルを見る',
    },
  },

  blog: {
    eyebrow: 'お役立ち情報',
    title: 'ブログ・業界インサイト',
    subtitle: 'インバーター購入担当者、施工業者、プロジェクト開発者向けの実践的ナレッジ — 当社エンジニアリングチームによる執筆です。',
    breadcrumb: 'ブログ',
    articleCtaTitle: 'インバーター選定にお困りですか？',
    articleCtaSubtitle: '営業担当エンジニアがプロジェクトに適したモデルを無料でご提案します。',
    translatedNote: 'この記事は現在英語版のみの提供です。',
  },
  oemOdm: {
    hero: {
      eyebrow: 'OEM / ODM Manufacturing',
      title: 'Your Private-Label Solar Inverter, Built in Our Own Factory',
      intro:
        'We manufacture inverters for distributors, installers and project developers who sell under their own brand. From private-label packaging and firmware to custom specifications — one factory, one accountable partner.',
      primaryCta: 'Request OEM / ODM Quote',
      secondaryCta: 'View Product Catalog',
    },
    stats: {
      eyebrow: 'Factory Capability',
      title: 'A Manufacturing Partner You Can Verify',
      intro: 'Real capacity, real testing, real traceability — every claim backed by our own production lines.',
      items: [
        { value: '12,000 m²', label: 'Factory area (SMT, assembly, aging lines)' },
        { value: '200,000', label: 'Units annual capacity' },
        { value: '120+', label: 'OEM / ODM clients' },
        { value: 'ISO 9001', label: 'Quality system, 100% testing + 8h aging' },
      ],
    },
    services: {
      eyebrow: 'What We Customize',
      title: 'OEM / ODM Services, End to End',
      subtitle: 'Bring your brand to market without building a factory. We handle the rest.',
      items: [
        { title: 'Private Label & Packaging', text: 'Your logo, brand colors, carton and manual — a product that looks like yours.' },
        { title: 'Firmware & Software', text: 'Custom parameters, communication protocols and display language tailored to your market.' },
        { title: 'Specification Tuning', text: 'Adjust output configurations, DC input ranges and socket types for your target region.' },
        { title: 'Quality & Compliance', text: 'ISO 9001 system, 100% functional testing and 8-hour aging before every shipment.' },
      ],
    },
    process: {
      eyebrow: 'How It Works',
      title: 'From Inquiry to Shipment',
      subtitle: 'A transparent process with clear milestones, so your brand launch stays on schedule.',
      steps: [
        'Send your requirements (spec, quantity, target market)',
        'Receive quotation, samples plan and timeline',
        'Approve samples and private-label artwork',
        'Mass production with in-line quality checks',
        'QC, aging test, packing and shipment',
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'OEM / ODM Questions, Answered',
      items: [
        { q: 'What is the minimum order quantity (MOQ)?', a: 'MOQ depends on the model and customization depth. Tell us your plan and we will confirm a realistic MOQ with pricing.' },
        { q: 'Can you put my brand on the inverter?', a: 'Yes — private-label branding covers the enclosure, packaging, manual and display. Firmware can also carry your brand where supported.' },
        { q: 'Can you customize the firmware or parameters?', a: "Yes. Output voltage, frequency, communication protocols and display language are customizable within the model's hardware limits." },
        { q: 'What certifications do your inverters have?', a: 'Our quality system is ISO 9001 certified and products carry CE and RoHS. Specific certifications for your market can be discussed per project.' },
        { q: 'How long does an OEM order take?', a: 'After sample approval, standard production runs typically ship within 30–45 days depending on quantity and customization.' },
      ],
    },
  },
};
