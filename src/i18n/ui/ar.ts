/**
 * Site-wide UI dictionary — ARABIC (Modern Standard Arabic).
 * Mirrors the key structure of en.ts key-for-key.
 * Placeholder tokens ({year}, {countries}, ...) stay exactly as in English.
 */
import type { Dictionary } from './en';

export const ar: Dictionary = {
  nav: {
    products: 'المنتجات',
    factory: 'المصنع',
    quality: 'الجودة',
    oemOdm: 'OEM / ODM',
    about: 'من نحن',
    blog: 'المدونة',
    viewAllProducts: 'عرض جميع المنتجات',
    requestQuote: 'اطلب عرض سعر',
    whatsappUs: 'تواصل عبر واتساب',
    mainNavAria: 'التنقل الرئيسي',
    mobileNavAria: 'تنقل الجوال',
    toggleMenuAria: 'تبديل قائمة التنقل',
    languageAria: 'تغيير اللغة',
    skipToContent: 'الانتقال إلى المحتوى',
  },

  footer: {
    productsHeading: 'المنتجات',
    allProducts: 'جميع المنتجات',
    companyHeading: 'الشركة',
    aboutUs: 'من نحن',
    factoryAndManufacturing: 'المصنع والتصنيع',
    qualityControl: 'مراقبة الجودة',
    blogInsights: 'المدونة والرؤى',
    contactUs: 'اتصل بنا',
    privacyPolicy: 'سياسة الخصوصية',
    stayUpdated: 'ابقَ على اطلاع',
    newsletterBlurb: 'تحديثات المنتجات، والمعلومات التقنية، وأخبار الشركة.',
    blurb: 'مُصنِّع محترف للعاكسات منذ {year}. شريك OEM / ODM لأكثر من {countries} دولة.',
    whatsappLabel: 'واتساب',
    emailAria: 'البريد الإلكتروني',
    rights: 'جميع الحقوق محفوظة.',
    productCategoriesAria: 'فئات المنتجات',
    companyNavAria: 'الشركة',
  },

  newsletter: {
    emailLabel: 'البريد الإلكتروني',
    subscribe: 'اشترك',
    consent: 'أوافق على استلام تحديثات المنتجات والمعلومات التقنية وأخبار الشركة عبر البريد الإلكتروني. يمكنني إلغاء الاشتراك في أي وقت.',
    success: 'تم الاشتراك — أهلاً بك.',
    error: 'فشل الاشتراك. يُرجى المحاولة مرة أخرى لاحقاً.',
  },

  consent: {
    text: 'نستخدم ملفات تعريف الارتباط لفهم كيفية استخدام الموقع وتحسين تجربتك. تُستخدم ملفات تعريف الارتباط التسويقية فقط بموافقتك. راجع',
    privacyLink: 'سياسة الخصوصية',
    reject: 'الضرورية فقط',
    accept: 'قبول الكل',
    aria: 'الموافقة على ملفات تعريف الارتباط',
  },

  cta: {
    defaultTitle: 'اطلب عرض سعر اليوم',
    defaultSubtitle: 'أرسل لنا متطلباتك — يرد مهندسو المبيعات لدينا خلال 24 ساعة بالأسعار ومدد التسليم وخيارات OEM.',
    defaultButton: 'اطلب عرض سعر',
    whatsapp: 'الدردشة عبر واتساب',
    midTitle: 'هل تحتاج أسعاراً أو حلاً مخصصاً؟',
    midSubtitle: 'أرسل لنا متطلباتك — يرد مهندسو المبيعات لدينا خلال 24 ساعة.',
  },

  common: {
    home: 'الرئيسية',
    viewDetails: 'عرض التفاصيل',
    getQuote: 'اطلب عرض سعر',
    requestQuote: 'اطلب عرض سعر',
    viewProducts: 'عرض المنتجات',
    browseAllProducts: 'تصفح جميع المنتجات',
    readAllArticles: 'اقرأ جميع المقالات',
    featured: 'مميز',
    ratedOutput: 'القدرة المقننة',
    contactSales: 'تواصل مع المبيعات',
    quoteForModel: 'اطلب عرض سعر لهذا الطراز',
    productOverview: 'نظرة عامة على المنتج',
    technicalSpecifications: 'المواصفات الفنية',
    keyFeatures: 'المزايا الرئيسية',
    packagingInformation: 'معلومات التغليف',
    applications: 'التطبيقات',
    downloads: 'التنزيلات',
    relatedProducts: 'منتجات ذات صلة',
    relatedSameCategory: 'خيارات أخرى في {category}',
    relatedMoreModels: 'طرازات أخرى من كتالوجنا',
    relatedGuides: 'أدلة ذات صلة',
    relatedGuidesSubtitle: 'مقالات تقنية من فريقنا الهندسي',
    standard: 'قياسي',
    product: 'المنتج',
    viewCertificate: 'عرض الشهادة',
    viewCertificateSr: '(يفتح ملف PDF في علامة تبويب جديدة)',
    specifications: 'المواصفات',
    model: 'طراز',
    models: 'طرازات',
    since: 'منذ',
    oemBullets: [
      'علامة OEM / ODM متاحة للطلبات بالكميات الكبيرة',
      'ورقة البيانات والأسعار عند الطلب',
      'الرد خلال 24 ساعة في أيام العمل',
    ],
    pageAria: {
      productCategories: 'فئات المنتجات',
    },
  },

  seo: {
    home: {
      title: '{brand} — مُصنِّع عاكسات لشركاء الأعمال حول العالم',
      description:
        'مُصنِّع محترف للعاكسات الشمسية منذ {year}. عاكسات هجينة ومتصلة بالشبكة وخارج الشبكة مع دعم OEM/ODM ونظام جودة ISO 9001 وأسعار مباشرة من المصنع. تصدير إلى أكثر من {countries} دولة.',
    },
    productsIndex: {
      title: 'جميع المنتجات — كتالوج العاكسات',
      description:
        'تصفح كتالوج عاكساتنا الحالي: عاكسات طاقة خارج الشبكة من 900W إلى 5000W، مع دعم OEM/ODM. اتصل بنا للحصول على المواصفات والأسعار والتوريد بالجملة.',
    },
    category: {
      titleSuffix: '— المُصنِّع ومورّد OEM',
    },
    factory: {
      title: 'المصنع والتصنيع — خطوط SMT والتجميع واختبار التقادم',
      description:
        'تجول في مصنع عاكساتنا بمساحة {area} متر مربع: خطوط SMT المؤتمتة، وخطوط التجميع، وغرف اختبار التقادم، والمستودع. تتوفر تدقيقات مصنعية بالفيديو للمشترين من الخارج.',
    },
    quality: {
      title: 'مراقبة الجودة — نظام ISO 9001، واختبار 100%، وتقادم لمدة 8 ساعات',
      description:
        'مراقبة جودة العاكسات لدينا: نظام جودة معتمد وفق ISO 9001، واختبار وظيفي بنسبة 100%، واختبارات تقادم لمدة 8 ساعات، وتتبع كامل للإنتاج. نرحب بفحص الطرف الثالث.',
    },
    contact: {
      title: 'اتصل بنا — اطلب عرض سعر للعاكسات',
      description:
        'اطلب الأسعار وأوراق البيانات وخيارات OEM لعاكساتنا. يرد مهندسو المبيعات خلال 24 ساعة في أيام العمل. البريد الإلكتروني وواتساب ونموذج الاستفسار متاحة.',
    },
    blog: {
      title: 'المدونة ورؤى الصناعة — قاعدة معرفة العاكسات',
      description:
        'أدلة تقنية ورؤى صناعية حول العاكسات الشمسية: الهجين مقابل المتصل بالشبكة مقابل خارج الشبكة، وحساب القدرات، والشهادات، وتصنيع OEM.',
    },
    oemOdm: {
      title: 'OEM / ODM Solar Inverter Manufacturer | Zhongze Huasong',
      description:
        'OEM / ODM solar inverter manufacturing with private label, custom firmware and packaging. Own factory, 200,000 units annual capacity, ISO 9001. Get a quote in 24 hours.',
    },
  },

  home: {
    hero: {
      eyebrow: 'مُصنِّع عاكسات منذ {year}',
      title: 'عاكسات شمسية بأسعار مباشرة من المصنع لشركاء الأعمال حول العالم',
      subtitle:
        'عاكسات هجينة ومتصلة بالشبكة وخارج الشبكة مباشرة من المصنع، مصمَّمة للمناطق ذات الشبكات الضعيفة أو أسعار الكهرباء المرتفعة أو الإمداد غير الموثوق. مخصَّصة للاستهلاك الذاتي، وتحويل أحمال الذروة، والطاقة الاحتياطية — مع برامج OEM / ODM، وجودة ISO 9001، واستجابة خلال 24 ساعة للموزعين والمُركِّبين ومطوري المشاريع.',
      heroImageAria: 'رسم توضيحي لنظام الطاقة الشمسية',
      bullets: ['OEM / ODM', 'ISO 9001', 'رد خلال 24 ساعة', 'أكثر من {countries} دولة تصدير'],
    },
    trust: {
      manufacturer: 'الشركة المصنِّعة',
      factoryArea: 'مساحة المصنع',
      unitsPerYear: 'وحدة / سنة',
      exportCountries: 'دول التصدير',
      oemClients: 'عملاء OEM / ODM',
    },
    categories: {
      eyebrow: 'منتجاتنا',
      title: 'فئات العاكسات',
      subtitle: 'استكشف سلاسل العاكسات التي نصنعها حالياً. تُضاف الفئات هنا بمجرد نشر أول طراز فيها.',
    },
    featured: {
      eyebrow: 'مميز',
      title: 'الطرازات الشائعة',
      subtitle: 'العاكسات الأكثر مبيعاً من كتالوجنا. يدعم كل طراز علامة OEM وتخصيص المواصفات.',
    },
    advantages: {
      eyebrow: 'مزايا المنتج',
      title: 'مزايا المنتج والقوة الفنية',
      subtitle: 'الخصائص الرئيسية لسلسلة العاكسات خارج الشبكة لدينا — من نوع الخرج وخيارات إدخال التيار المستمر إلى القدرات المقننة والتكوينات العملية للمنتجات.',
      items: [
        {
          title: 'خرج بموجة جيبية نقية',
          description: 'خرج تيار متردد بموجة جيبية نقية ومستقر مصمم للتطبيقات خارج الشبكة التي تتطلب طاقة موثوقة لأنواع مختلفة من الأحمال.',
        },
        {
          title: 'خيارات متعددة لإدخال التيار المستمر',
          description: 'تدعم طرازات مختارة تكوينات متعددة لجهد إدخال التيار المستمر، تشمل 12V و24V و48V و60V و72V، حسب المنتج.',
        },
        {
          title: 'تبريد ذكي متحكم به بالحرارة',
          description: 'يساعد التبريد الذكي بواسطة مراوح متحكم بها بالحرارة على دعم التشغيل الموثوق عبر تطبيقات مختلفة خارج الشبكة.',
        },
        {
          title: 'تكوينات مرنة لخرج التيار المتردد',
          description: 'تتوفر طرازات مختارة بخيارات خرج تيار متردد 220V / 110V وتكوينات مقابس مختلفة لتلبية متطلبات الأسواق المختلفة.',
        },
        {
          title: 'خيارات قدرة متعددة',
          description: 'تغطي سلسلة العاكسات الحالية خارج الشبكة من 900W إلى 5000W، ما يوفر خيارات قدرة مختلفة لمجموعة متنوعة من التطبيقات خارج الشبكة.',
        },
        {
          title: 'تكوينات عملية للمنتجات',
          description: 'تشمل سلسلة المنتجات تكوينات مختلفة مثل شاشات LCD أو شاشات رقمية، ومقابس خرج تيار متردد متعددة، وطرازات مزودة بمنفذ USB، حسب المنتج.',
        },
      ],
    },
    whyUs: {
      eyebrow: 'لماذا نحن',
      title: 'لماذا يختارنا المشترون حول العالم',
      subtitle: 'نحن مُصنِّع وليس شركة تجارية — ما يعني دعماً هندسياً مباشراً، وجودة تحت السيطرة، وهوامش أفضل.',
      items: [
        {
          title: 'بحث وتطوير داخلي',
          description: '{engineers} مهندس بحث وتطوير يغطون تصميم الأجهزة والبرامج الثابتة والهيكل. برامج ثابتة وشعارات وتغليف ومواصفات مخصصة لمشاريع OEM/ODM.',
        },
        {
          title: 'حجم التصنيع',
          description: 'منشأة بمساحة {area} متر مربع مع خطوط SMT والتجميع والتقادم — طاقة إنتاجية سنوية تبلغ {capacity} وحدة.',
        },
        {
          title: 'جودة قابلة للتدقيق',
          description:
            'نظام جودة ISO 9001، واختبار وظيفي بنسبة 100%، واختبار تقادم لمدة 8 ساعات قبل التغليف. تتوفر عند الطلب وثائق الامتثال للمتطلبات الكهربائية منخفضة الجهد (EN 62109-1) المرتبطة بعلامة CE ووثائق التوافق الكهرومغناطيسي لعاكساتنا الشمسية. نرحب بفحص الطرف الثالث.',
        },
      ],
    },
    process: {
      eyebrow: 'كيف نعمل',
      title: 'من طلب عرض السعر إلى التسليم',
      subtitle: 'عملية شفافة من ست خطوات مصممة لشركاء الأعمال في الخارج — تعرف دائماً أين يقف طلبك.',
      steps: [
        { title: 'طلب عرض السعر', description: 'أرسل متطلباتك عبر نموذج الاستفسار أو البريد الإلكتروني أو واتساب.' },
        { title: 'الحل وعرض السعر', description: 'يرد مهندسو المبيعات لدينا خلال 24 ساعة بمقترح وأسعار.' },
        { title: 'تأكيد العينة', description: 'قيّم العينات، وأكّد المواصفات، وأتمم تفاصيل الطلب.' },
        { title: 'الاختبار والشهادات', description: 'يُنجز الاختبار المطلوب والامتثال لسوق الوجهة قبل الإنتاج.' },
        { title: 'الإنتاج بالدفعات', description: 'إنتاج مجدول مع مراقبة الجودة في كل مرحلة.' },
        { title: 'التسليم والدعم', description: 'تغليف التصدير، وترتيب الشحن، ودعم ما بعد البيع.' },
      ],
    },
    factory: {
      eyebrow: 'داخل مصنعنا',
      title: 'مصمم للجودة المتسقة والإمداد الموثوق',
      subtitle: 'تجمع عملية التصنيع لدينا بين الإنتاج والتجميع والاختبار ومراقبة الجودة لدعم جودة منتج متسقة وإمداد موثوق للعملاء حول العالم.',
      capabilities: [
        { title: 'الإنتاج والتجميع', description: 'تدعم عمليات الإنتاج والتجميع المنظمة تصنيعاً متسقاً وإمداداً موثوقاً بالمنتجات.' },
        { title: 'اختبار الجودة', description: 'تُدمج مراقبة الجودة والاختبار الوظيفي في عملية التصنيع لدعم جودة منتج متسقة.' },
        { title: 'اختبار التقادم', description: 'يُعد اختبار التقادم جزءاً من عملية جودة الإنتاج قبل تجهيز المنتجات للتسليم.' },
        { title: 'المنتجات النهائية والخدمات اللوجستية', description: 'تُجهَّز المنتجات النهائية للتغليف والشحن لدعم تنفيذ الطلبات بكفاءة.' },
      ],
      bullets: [
        '{employees}+ موظفاً و{engineers} مهندس بحث وتطوير',
        'عمليات إنتاج وتجميع منظمة',
        'اختبار وظيفي بنسبة 100% قبل التغليف',
        'اختبار تقادم لمدة 8 ساعات لكل دفعة إنتاج',
        'نرحب بفحص ما قبل الشحن من طرف ثالث',
      ],
      cta: 'استكشف مصنعنا',
    },
    applications: {
      eyebrow: 'التطبيقات',
      title: 'أين تعمل عاكساتنا',
      subtitle: 'مثبتة في مشاريع سكنية وتجارية واتصالات وخارج الشبكة عبر مناخات وظروف شبكة متنوعة.',
      items: [
        { title: 'الطاقة الشمسية السكنية', description: 'أنظمة كهروضوئية على أسطح المنازل مع بطارية احتياطية وتحسين الاستهلاك الذاتي.' },
        { title: 'التجاري والصناعي', description: 'محطات على الأسطح وعلى الأرض للتطبيقات التجارية والصناعية مع عاكسات سلسلة من 10 إلى 50 كيلوواط.' },
        { title: 'تخزين الطاقة', description: 'أنظمة هجينة مع تكامل بطاريات LiFePO4 لتسنين القمم والاحتياط.' },
        { title: 'محطات الاتصالات', description: 'طاقة خارج الشبكة لأبراج الاتصالات البعيدة ذات وصول شبكة غير موثوق أو منعدم.' },
        { title: 'كهربة الريف', description: 'شبكات مصغرة مستقلة وطاقة خارج الشبكة للقرى والمزارع والمجتمعات الجزرية.' },
        { title: 'الطاقة الاحتياطية', description: 'إمداد غير منقطع للمنازل والعيادات والشركات الصغيرة أثناء انقطاع التيار.' },
      ],
    },
    certifications: {
      eyebrow: 'الشهادات والمعايير',
      title: 'وثائق الامتثال للأسواق العالمية',
      subtitle: 'تدعم وثائق امتثال عاكساتنا الشمسية متطلبات المراجعة والتأهيل لدى العملاء. تتوفر الوثائق عند الطلب.',
      items: [
        {
          title: 'CE / LVD',
          description: 'تتوفر وثائق الامتثال للمتطلبات الكهربائية منخفضة الجهد (LVD) لعاكساتنا الشمسية عند الطلب.',
        },
        {
          title: 'CE / EMC',
          description: 'تتوفر وثائق الامتثال للتوافق الكهرومغناطيسي (EMC) لعاكساتنا الشمسية عند الطلب.',
        },
      ],
      note: 'يختلف توفر الشهادات حسب الطراز والسوق المستهدف. أخبرنا ببلد الوجهة وسنؤكد الشهادات المنطبقة على طلبك.',
      qualityButton: 'تعرف على نظام الجودة لدينا',
    },
    testimonials: {
      title: 'ماذا يقول شركاؤنا',
      items: [
        { quote: 'إن مجموعة خيارات القدرة والمواصفات الواضحة للمنتجات تسهل علينا تقييم تكوينات العاكسات المختلفة لسوقنا.', country: 'ألمانيا', customerType: 'موزع منتجات شمسية' },
        { quote: 'توفر لنا خيارات القدرة المتعددة للعاكسات خارج الشبكة مرونة أكبر عند اختيار المنتجات لتطبيقات العملاء المختلفة.', country: 'نيجيريا', customerType: 'مُركِّب أنظمة شمسية' },
        { quote: 'تمنحنا خيارات العاكسات الأعلى قدرة مرونة أكبر عند دراسة متطلبات الطاقة المختلفة خارج الشبكة.', country: 'الإمارات العربية المتحدة', customerType: 'موزع منتجات شمسية' },
        { quote: 'تكوينات الجهد المتعددة مفيدة عندما نحتاج إلى تقييم متطلبات إدخال التيار المستمر المختلفة للتطبيقات خارج الشبكة.', country: 'كينيا', customerType: 'شركة طاقة متجددة' },
        { quote: 'توفر لنا تكوينات العاكسات المزودة بمنفذ USB خياراً إضافياً للتطبيقات التي تتطلب وظيفة شحن إضافية.', country: 'الفلبين', customerType: 'موزع منتجات شمسية' },
        { quote: 'تمنحنا السلسلة الممتدة من العاكسات خارج الشبكة من القدرة الأقل إلى الأعلى مرونة أكبر عند اختيار المنتجات للتطبيقات المختلفة.', country: 'جنوب أفريقيا', customerType: 'مورّد طاقة خارج الشبكة' },
      ],
    },
    blog: {
      eyebrow: 'رؤى',
      title: 'أحدث ما في مدونتنا',
    },
  },

  productsIndex: {
    eyebrow: 'كتالوج المنتجات',
    title: 'جميع المنتجات',
    subtitle: 'كل طراز مصمم ومصنع ومختبَر في مصنعنا الخاص. اتصل بنا للحصول على أوراق البيانات والأسعار وخيارات OEM.',
    viewCategory: 'عرض الفئة',
  },

  categoryPage: {
    eyebrow: 'فئة المنتجات',
    empty: 'الطرازات الخاصة بهذه الفئة قيد الإعداد. اتصل بنا للحصول على أحدث كتالوج.',
    byPowerTitle: '{category} حسب القدرة المقننة',
    byPowerEyebrow: 'تسوق حسب القدرة',
    byPowerSubtitle: 'اختر قدرة الخرج التي تحتاجها — تعرض كل صفحة جميع الطرازات المتاحة عند تلك القدرة.',
    customCtaTitle: 'هل تحتاج مواصفات مخصصة؟',
    customCtaSubtitle: 'نطور عاكسات مخصصة لمشاريع OEM/ODM — قدرة مقننة وبرامج ثابتة وعلامة تجارية وشهادات مصممة لسوقك.',
  },

  powerPage: {
    empty: 'الطرازات الخاصة بهذه القدرة قيد الإعداد. اتصل بنا للحصول على أحدث كتالوج.',
    modelsInRating: '{count} {model} عند هذه القدرة',
    otherRatings: {
      eyebrow: 'سلسلة خارج الشبكة',
      title: 'قدرات أخرى',
      subtitle: 'تصفح سلسلة العاكسات الكاملة خارج الشبكة حسب القدرة المقننة.',
    },
    chip: 'خارج الشبكة {power}',
    ctaTitle: 'هل تحتاج عاكساً خارج الشبكة بقدرة {power}؟',
    ctaSubtitle: 'أخبرنا بسوقك المستهدف وجهد إدخال التيار المستمر المطلوب والكمية — نرد بأسعار مباشرة من المصنع ومدة التسليم.',
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
      const specSentence = facts.dc ? ` المواصفات الرئيسية: جهد إدخال التيار المستمر ${facts.dc}.` : '';
      return {
        description: `تتوفر ${facts.count} من عاكسات ${facts.label} خارج الشبكة — ${facts.types}${seriesNote}.${specSentence} اتصل بنا للحصول على التكوينات والأسعار والتوريد بالجملة.`,
        seoTitle: `عاكس خارج الشبكة ${facts.label}${seriesNote}`,
        seoDescription: `عاكس خارج الشبكة ${facts.label}: ${facts.types}.${
          facts.dc ? ` جهد إدخال التيار المستمر ${facts.dc}.` : ''
        } اتصل بنا للأسعار والتوريد بالجملة.`,
      };
    },
  },

  specs: {
    ratedPower: 'القدرة المقننة',
    acOutput: 'خرج التيار المتردد',
    outputSockets: 'مقابس الخرج',
    dcInputVoltage: 'جهد إدخال التيار المستمر',
    display: 'الشاشة',
    usb: 'USB',
    cooling: 'التبريد',
    dimensions: 'الأبعاد',
    netWeight: 'الوزن الصافي',
    groups: {
      acOutput: 'خرج التيار المتردد',
      dcInput: 'إدخال التيار المستمر',
      displayCooling: 'الشاشة والتبريد',
      interface: 'الواجهة',
      physical: 'الخصائص الفيزيائية',
    },
    packaging: {
      packageDimensions: 'أبعاد العبوة',
      grossWeight: 'الوزن القائم',
      cartonQuantity: 'الكمية في الكرتون',
      cartonDimensions: 'أبعاد الكرتون',
      cartonWeight: 'وزن الكرتون',
      cartonInformation: 'معلومات الكرتون',
    },
    /** Translations for recurring specification VALUES. Unlisted values pass through unchanged. */
    values: {
      display: {
        'Digital Display': 'شاشة رقمية',
        'LCD Display': 'شاشة LCD',
        'LCD Smart Display': 'شاشة LCD ذكية',
      },
      cooling: {
        'Intelligent Temperature-Controlled Fan': 'مروحة ذكية متحكم بها بالحرارة',
      },
      acOutput: {
        '220V / 110V optional': '220V / 110V اختياري',
        '220V optional': '220V اختياري',
      },
      usb: {
        Yes: 'نعم',
      },
      cartonInformation: {
        'Available in different packing configurations': 'متوفر بتكوينات تغليف مختلفة',
      },
      approx: 'نحو',
      units: '{n} وحدات',
      unitsOr: '{a} أو {b} وحدات',
    },
  },

  factory: {
    glance: {
      eyebrow: 'التصنيع',
      title: 'مصنعنا في لمحة',
      items: [
        { title: 'خطوط SMT', text: 'تركيب مؤتمت + فحص AOI' },
        { title: 'خطوط التجميع', text: 'خطوط متوازية متعددة' },
        { title: 'غرفة اختبار التقادم', text: 'اختبار 100% للدفعات' },
        { title: 'المستودع', text: 'المنتجات النهائية + المكونات' },
      ],
    },
    process: {
      eyebrow: 'العملية',
      title: 'كيف يُصنع كل عاكس',
      steps: [
        'فحص المكونات الواردة (IQC) — مكونات رئيسية من موردين مؤهلين مع تتبع الدفعات.',
        'تركيب SMT مؤتمت مع فحص بصري AOI لجميع لوحات الدوائر المطبوعة.',
        'اختبار وظيفي على مستوى اللوحة وتحميل البرامج الثابتة.',
        'تجميع كامل للمنتج مع شدّ براغي متحكم به بالعزم.',
        'اختبار وظيفي بنسبة 100%: شكل موجة الخرج، والكفاءة، ووظائف الحماية.',
        'اختبار تقادم لمدة 8 ساعات تحت الحمل لكل دفعة إنتاج.',
        'فحص نهائي لمراقبة الجودة، وتسجيل الأرقام التسلسلية، والتغليف.',
      ],
    },
    visits: {
      eyebrow: 'الزيارات',
      title: 'نرحب بتدقيق المصنع',
      text: 'نرحب بتدقيق المصنع على الموقع وبالفحص من طرف ثالث (SGS أو TÜV أو BV أو الجهة التي تعينها). للمشترين في الخارج الذين لا يستطيعون السفر، نقدم جولات فيديو مباشرة لخطوط الإنتاج — حدد موعداً عبر نموذج الاتصال.',
      addressLabel: 'العنوان',
    },
    cta: {
      title: 'حدد موعد جولة فيديو للمصنع',
      subtitle: 'شاهد خطوط الإنتاج لدينا مباشرة قبل تقديم طلبك.',
    },
  },

  quality: {
    intro: {
      eyebrow: 'الجودة',
      title: 'الجودة عملية، وليست شهادة',
      items: [
        { title: 'نظام جودة ISO 9001', text: 'تغطي العمليات الموثقة التصميم والمشتريات والإنتاج وخدمة ما بعد البيع. تحافظ عمليات التدقيق الداخلي المنتظمة على بقاء النظام حياً، وليس مجرد شهادة.' },
        { title: 'اختبار وظيفي بنسبة 100%', text: 'يُختبر كل وحدة على حدة من حيث شكل موجة الخرج والكفاءة وسلوك الحماية والاتصالات قبل مغادرتها خط الإنتاج. لا مجال لأعذار أخذ عينات من الدفعات.' },
        { title: 'اختبار تقادم لمدة 8 ساعات', text: 'تشغَّل دفعات الإنتاج تحت حمل كامل في غرفة التقادم لدينا لاكتشاف الأعطال المبكرة قبل الشحن.' },
      ],
    },
    traceability: {
      eyebrow: 'إمكانية التتبع',
      title: 'يمكن تتبع كل وحدة',
      text: 'يحمل كل عاكس رقماً تسلسلياً فريداً يربطه بتاريخ الإنتاج وسجلات الاختبار ودفعات المكونات. إذا حدثت مشكلة في الميدان، يمكننا تتبع الدفعة المتأثرة خلال ساعات — وليس أسابيع. تتوفر تقارير الاختبار وبيانات الفحص لعملاء الأعمال عند الطلب.',
      bullets: [
        'مراقبة جودة المدخلات (IQC) لجميع المكونات الرئيسية',
        'مراقبة الجودة أثناء العملية (IPQC) في كل مرحلة إنتاج',
        'مراقبة جودة المخرجات (OQC) مع فحص ما قبل الشحن',
        'اختبارات الموثوقية: درجات الحرارة المرتفعة/المنخفضة، والرطوبة، والاهتزاز',
        'يُقبل الفحص من طرف ثالث (SGS / TÜV / BV)',
      ],
    },
    certifications: {
      eyebrow: 'الشهادات',
      title: 'الامتثال والشهادات',
      note: 'يختلف توفر الشهادات حسب الطراز وسوق الوجهة. تواصل مع فريق المبيعات لدينا لتأكيد الشهادات المنطبقة على طلبك.',
    },
    cta: {
      title: 'اطلب تقارير الاختبار أو عينة',
      subtitle: 'تحقق من جودتنا بنفسك — نوفر تقارير اختبار وعينات لمشتري الأعمال المؤهلين.',
    },
  },

  contact: {
    eyebrow: 'اتصل',
    title: 'اطلب عرض سعر',
    subtitle: 'املأ النموذج وأخبرنا عن مشروعك — الكمية والسوق المستهدف والمتطلبات الفنية تساعدنا على تقديم عرض أسرع.',
    directContact: 'تواصل مباشر',
    email: 'البريد الإلكتروني',
    whatsapp: 'واتساب',
    phone: 'الهاتف',
    responseTime: 'وقت الاستجابة',
    responseTimeValue: 'خلال 24 ساعة في أيام العمل',
    beforeYouWrite: 'قبل أن تكتب',
    tips: [
      'لديك ورقة بيانات؟ أرفقها في بريد الرد.',
      'أخبرنا ببلد الوجهة — تختلف الشهادات حسب السوق.',
      'المشترون بالكميات: اسأل عن علامة OEM والتوزيع الحصري.',
    ],
    linkedin: 'تواصل عبر LinkedIn',
  },

  form: {
    title: 'اطلب عرض سعر',
    subtitle: 'أخبرنا بما تحتاجه. يرد مهندسو المبيعات خلال 24 ساعة في أيام العمل.',
    name: 'الاسم',
    company: 'الشركة',
    country: 'الدولة',
    email: 'البريد الإلكتروني',
    phone: 'واتساب / الهاتف',
    quantity: 'الكمية التقديرية',
    quantityPlaceholder: 'مثال: 500',
    product: 'المنتج المطلوب',
    productGeneral: 'استفسار عام / غير متأكد بعد',
    message: 'الرسالة',
    messagePlaceholder: 'المتطلبات الفنية، والسوق المستهدف، واحتياجات الشهادات، وجدول التسليم...',
    submit: 'إرسال الاستفسار',
    consentPrefix: 'بالإرسال، فإنك توافق على',
    consentLink: 'سياسة الخصوصية',
    consentSuffix: '. استفسارك ليس اشتراكاً تسويقياً.',
    successTitle: 'شكراً لك — تم إرسال استفسارك.',
    successText: 'سيتم التواصل معك من قبل مهندسي المبيعات خلال 24 ساعة في أيام العمل.',
    errorTitle: 'حدث خطأ ما.',
    errorDetail: '{message} يُرجى المحاولة مرة أخرى، أو راسلنا مباشرة عبر البريد الإلكتروني.',
    fallbackError: 'يُرجى المحاولة مرة أخرى، أو راسلنا مباشرة عبر البريد الإلكتروني.',
    submissionFailed: 'فشل الإرسال.',
  },

  chat: {
    greeting: 'مرحباً! ما القدرة التي تبحث عنها؟',
    teaser: 'مرحباً! هل تبحث عن عاكس خارج الشبكة؟ يمكنني مساعدتك في تحديد القدرة المناسبة.',
    headerTitle: 'تحدث معنا',
    headerSubtitle: '{brand} · مساعد مبيعات ذكي',
    inputPlaceholder: 'اكتب رسالتك…',
    inputAria: 'اكتب رسالتك',
    sendAria: 'إرسال الرسالة',
    closeAria: 'إغلاق الدردشة',
    launcherAria: 'تحدث معنا',
    launcherUnreadAria: 'تحدث معنا، رسالة جديدة واحدة',
    dismissAria: 'تجاهل الرسالة',
    messagesAria: 'الرسائل',
    contactPlaceholder: 'بريدك الإلكتروني أو واتساب…',
    contactHint: 'تذهب بياناتك إلى فريق المبيعات لدينا فقط.',
    optionalNote: 'اختياري — نحتاج فقط بريداً إلكترونياً أو واتساب.',
    namePlaceholder: 'الاسم',
    nameAria: 'اسمك (اختياري)',
    companyPlaceholder: 'الشركة',
    companyAria: 'اسم شركتك (اختياري)',
    countryPlaceholder: 'الدولة',
    countryAria: 'دولتك (اختياري)',
    viewProduct: 'عرض تفاصيل المنتج',
    reachUsDirectly: 'يمكنك أيضاً التواصل معنا مباشرة:',
    leadThanks: 'شكراً لك — سيتابع فريق المبيعات معك قريباً. وإليك بياناتنا إذا كنت تفضل التواصل معنا أولاً:',
    verificationError: 'لم أتمكن من التحقق من هذه الجلسة. يُرجى استخدام زر واتساب أو نموذج الاتصال وسيساعدك فريقنا مباشرة.',
    genericError: 'عذراً، حدث خطأ ما. يُرجى المحاولة مرة أخرى أو استخدام نموذج الاتصال.',
    networkError: 'عذراً — لم أتمكن من الوصول إلى الخادم. يُرجى المحاولة مرة أخرى، أو استخدام نموذج الاتصال وسيرد فريقنا عبر البريد الإلكتروني.',
    leadError: 'عذراً، لم نتمكن من حفظ بياناتك. يُرجى مراسلتنا عبر البريد الإلكتروني أو المحاولة مرة أخرى.',
    typing: 'يكتب…',
    /** Display labels for known English engine chips (the value sent stays English so the engine keeps matching). */
    chipLabels: {
      'I know the power': 'أعرف القدرة',
      'Not sure': 'غير متأكد',
      'Show other models': 'اعرض طرازات أخرى',
    },
  },

  blog: {
    eyebrow: 'رؤى',
    title: 'المدونة ورؤى الصناعة',
    subtitle: 'معرفة عملية لمشتري العاكسات والمُركِّبين ومطوري المشاريع — من فريقنا الهندسي.',
    breadcrumb: 'المدونة',
    articleCtaTitle: 'تحتاج مساعدة في اختيار عاكس؟',
    articleCtaSubtitle: 'يمكن لمهندسي المبيعات لدينا التوصية بالطراز المناسب لمشروعك — مجاناً.',
    translatedNote: 'هذه المقالة متاحة حالياً باللغة الإنجليزية.',
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
