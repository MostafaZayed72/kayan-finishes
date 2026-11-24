export interface BilingualText {
  ar: string
  en: string
}

export interface ServiceItem {
  slug: string
  icon: string
  title: BilingualText
  shortDesc: BilingualText
  fullDesc: BilingualText
  image: string
  duration: BilingualText
  warranty: BilingualText
  deliverables: { ar: string[]; en: string[] }
}

export interface FinishingPackage {
  id: string
  name: BilingualText
  badge?: BilingualText
  percentage: number
  pricePerSqm: number
  popular?: boolean
  desc: BilingualText
  specs: { ar: string[]; en: string[] }
}

export interface ProjectItem {
  slug: string
  category: 'apartment' | 'villa' | 'commercial'
  categoryLabel: BilingualText
  title: BilingualText
  location: BilingualText
  locationSlug: string
  area: number
  durationDays: number
  packageName: BilingualText
  style: BilingualText
  coverImage: string
  beforeImage: string
  afterImage: string
  gallery: string[]
  summary: BilingualText
  highlights: { ar: string[]; en: string[] }
  coords: { x: number; y: number }
}

export interface BlogSection {
  id: string
  heading: BilingualText
  body: BilingualText
}

export interface BlogPost {
  slug: string
  category: BilingualText
  title: BilingualText
  excerpt: BilingualText
  coverImage: string
  readTime: number
  date: string
  author: BilingualText
  sections: BlogSection[]
}

export interface LocationItem {
  slug: string
  name: BilingualText
  headline: BilingualText
  description: BilingualText
  projectsCount: number
  avgDuration: BilingualText
  popularCompounds: { ar: string[]; en: string[] }
  image: string
  coords: { x: number; y: number }
}

export const servicesData: ServiceItem[] = [
  {
    slug: 'apartments-finishing',
    icon: 'building',
    title: { ar: 'تشطيب الشقق السكنية', en: 'Apartment Turnkey Finishing' },
    shortDesc: {
      ar: 'تحويل الشقق من الطوب الأحمر إلى مسكن عصري متكامل بإشراف هندسي يومي.',
      en: 'Transforming raw brick apartments into modern turnkey homes with daily engineering supervision.'
    },
    fullDesc: {
      ar: 'نقدم خدمة تشطيب متكاملة للشقق والدوبلكس تبدأ من المعاينة الهندسية والرسومات التنفيذية ثلاثية الأبعاد، مروراً بأعمال التأسيس (السباكة والكهرباء والتكييفات والعزل) وحتى التسليم النهائي على المفتاح بضمان 10 سنوات.',
      en: 'We deliver complete turnkey finishing for apartments and duplexes, starting from site inspection and 3D executive drawings, through MEP rough-ins and waterproofing, to final handover backed by a 10-year warranty.'
    },
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    duration: { ar: '60 – 90 يوم', en: '60 – 90 Days' },
    warranty: { ar: 'ضمان 10 سنوات', en: '10-Year Warranty' },
    deliverables: {
      ar: [
        'رفع مساحي وتصميم 3D كامل قبل التنفيذ',
        'تأسيس سباكة بضمان معتمد وكهرباء سمارت هوم',
        'أعمال الجبسون بورد والإضاءة المخفية الحديثة',
        'تركيب الأرضيات (بورسلين / HDF / رخام) والدهانات'
      ],
      en: [
        'Laser site survey and full 3D visualization prior to execution',
        'Certified plumbing and smart-ready electrical infrastructure',
        'Modern gypsum board ceilings and concealed architectural lighting',
        'Porcelain, HDF, or marble flooring and premium washable paints'
      ]
    }
  },
  {
    slug: 'villas-finishing',
    icon: 'home',
    title: { ar: 'تشطيب الفلل والقصور', en: 'Luxury Villa Finishing' },
    shortDesc: {
      ar: 'تشطيبات فاخرة للفلل تشمل الواجهات، اللاندسكيب، والمساحات الداخلية.',
      en: 'Bespoke luxury villa finishing covering facades, landscaping, and grand interiors.'
    },
    fullDesc: {
      ar: 'تحتاج الفلل إلى إدارة هندسية دقيقة تجمع بين الفخامة المعمارية والعملية. فريق كيان يتولى تنفيذ الواجهات الحجرية والزجاجية، حمامات السباحة، الأنظمة الذكية، والتشطيبات الداخلية الفائقة.',
      en: 'Villas require precise engineering orchestration combining architectural luxury with functionality. Kayan executes stone and glass facades, swimming pools, smart automation, and bespoke interiors.'
    },
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    duration: { ar: '120 – 180 يوم', en: '120 – 180 Days' },
    warranty: { ar: 'ضمان 10 سنوات', en: '10-Year Warranty' },
    deliverables: {
      ar: [
        'تصميم وتنفيذ الواجهات الخارجية واللاندسكيب',
        'أنظمة التكييف المركزي والكونسيلد والمنزل الذكي',
        'توريد وتركيب الرخام المستورد والأخشاب الطبيعية',
        'جدول زمني وتقارير أسبوعية مصورة للعميل'
      ],
      en: [
        'Exterior facade design, stone cladding, and landscape execution',
        'Central/concealed HVAC and full KNX/smart home integration',
        'Imported marble slabs and natural solid wood joinery',
        'Weekly photo & milestone progress reports'
      ]
    }
  },
  {
    slug: 'interior-design-3d',
    icon: 'cube',
    title: { ar: 'التصميم الداخلي 3D', en: '3D Interior Design' },
    shortDesc: {
      ar: 'تصورات واقعية ثلاثية الأبعاد ورسومات تنفيذية دقيقة قبل صرف جنيه واحد.',
      en: 'Photorealistic 3D renders and exact shop drawings before spending a single pound.'
    },
    fullDesc: {
      ar: 'نساعدك ترى بيتك قبل ما يبدأ التنفيذ بتصميمات مطابقة للواقع بنسبة 100% مع لوحات توزيع الكهرباء والسباكة والفرش وجدول كميات ومواصفات (BOQ) واضح.',
      en: 'See your future home before construction begins with 100% realistic 3D renders, complete MEP shop drawings, furniture layouts, and an itemized Bill of Quantities (BOQ).'
    },
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    duration: { ar: '14 – 21 يوم', en: '14 – 21 Days' },
    warranty: { ar: 'مطابقة تنفيذية 100%', en: '100% Build Accuracy' },
    deliverables: {
      ar: [
        'لقطات 3D واقعية لكل فراغ في الوحدة',
        'لوحات تنفيذية (كهرباء، سباكة، أسقف، أرضيات)',
        'ترشيح الخامات والألوان وأماكن الشراء المعتمدة',
        'مقايسة هندسية تقديرية دقيقة للتنفيذ'
      ],
      en: [
        'Photorealistic 3D renders for every room and zone',
        'Complete executive shop drawings (MEP, ceiling, flooring)',
        'Material moodboards and curated supplier specifications',
        'Accurate itemized execution cost estimate'
      ]
    }
  },
  {
    slug: 'commercial-offices',
    icon: 'briefcase',
    title: { ar: 'التشطيب التجاري والإداري', en: 'Commercial & Office Fit-Out' },
    shortDesc: {
      ar: 'تجهيز العيادات والمكاتب والمحلات التجارية بهوية بصرية ترفع قيمة علامتك.',
      en: 'Turnkey fit-outs for offices, clinics, and retail spaces tailored to your brand identity.'
    },
    fullDesc: {
      ar: 'ننفذ المقرات الإدارية والعيادات الطبية والمطاعم بسرعة قياسية تراعي اشتراطات الدفاع المدني، عزل الصوت، شبكات البيانات، وتوزيع الإضاءة العملية.',
      en: 'We deliver corporate offices, medical clinics, and retail spaces at record speed with full compliance for acoustic insulation, data networking, fire safety, and ergonomic lighting.'
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    duration: { ar: '45 – 75 يوم', en: '45 – 75 Days' },
    warranty: { ar: 'ضمان 5 سنوات', en: '5-Year Warranty' },
    deliverables: {
      ar: [
        'تأسيس شبكات الإنترنت والكاميرات وأنظمة الدخول',
        'قواطيع زجاجية مزدوجة وعوازل صوت للمكاتب',
        'تنفيذ الواجهات الزجاجية واللافتات المضيئة',
        'تسليم سريع لتقليل فترة توقف النشاط التجاري'
      ],
      en: [
        'Structured data cabling, CCTV, and access control systems',
        'Double-glazed acoustic office partitions',
        'Storefront glazing and illuminated brand signage',
        'Fast-track delivery to minimize business downtime'
      ]
    }
  }
]

export const packagesData: FinishingPackage[] = [
  {
    id: 'periodic',
    name: { ar: 'الإشراف الهندسي الدوري', en: 'Periodic Engineering Supervision' },
    percentage: 10,
    pricePerSqm: 6000,
    desc: {
      ar: 'مثالي لمن لديه مقاولون ويرغب في مراجعة الجودة والاستلام الهندسي لكل مرحلة.',
      en: 'Ideal if you have your own contractors and need scheduled quality inspections and BOQ audits.'
    },
    specs: {
      ar: [
        'زيارتان هندسيتان أسبوعياً لمتابعة التنفيذ بالموقع',
        'مراجعة فواتير الخامات ومقايسات الصنايعية',
        'استلام كل بند هندسياً قبل سداد أي دفعة',
        'توصية بأفضل الموردين بأسعار الجملة',
        'تقارير ملاحظات مصورة بعد كل زيارة'
      ],
      en: [
        '2 scheduled on-site engineering inspections weekly',
        'Audit of material invoices and contractor quotations',
        'Technical sign-off before releasing any payment',
        'Access to wholesale supplier recommendations',
        'Illustrated inspection report after every visit'
      ]
    }
  },
  {
    id: 'full-supervision',
    name: { ar: 'الإشراف والتنفيذ الكامل + 3D', en: 'Full Supervision & 3D Execution' },
    badge: { ar: 'الأكثر طلباً', en: 'Most Popular' },
    popular: true,
    percentage: 15,
    pricePerSqm: 8500,
    desc: {
      ar: 'ندير مشروعك بالكامل بالتكلفة الفعلية للخامات والمصنعيات مع فواتير معتمدة وخصومات المصانع.',
      en: 'We manage your entire project at actual material & labor cost with verified invoices and factory discounts.'
    },
    specs: {
      ar: [
        'تصميم ثلاثي الأبعاد 3D ولوحات تنفيذية كاملة',
        'إدارة يومية كاملة للصنايعية والمقاولين بالموقع',
        'شراء الخامات بخصومات الشركات وتقديم فواتير أصلية',
        'تقارير مالية ومصورة أسبوعية بشفافية 100%',
        'ضمان هندسي شامل لمدة 10 سنوات على التأسيس'
      ],
      en: [
        'Full 3D interior design and executive shop drawings',
        'Daily site management of all trades and contractors',
        'Factory-direct material procurement with original receipts',
        'Weekly transparent financial & photo progress reports',
        'Comprehensive 10-year warranty on MEP & structural work'
      ]
    }
  },
  {
    id: 'vip-turnkey',
    name: { ar: 'إدارة المشاريع الفاخرة VIP', en: 'VIP Luxury Project Management' },
    percentage: 18,
    pricePerSqm: 12000,
    desc: {
      ar: 'مخصص للفلل والوحدات الذكية التي تتطلب مدير مشروع متفرغ وتوريدات مخصصة.',
      en: 'Tailored for villas and smart homes requiring a dedicated project manager and bespoke sourcing.'
    },
    specs: {
      ar: [
        'مدير مشروع مهندس متفرغ لموقعك حتى التسليم',
        'إشراف على أنظمة المنزل الذكي والتكييف المركزي',
        'تصميم وتنفيذ الأثاث والتجاليد الخشبية المخصصة',
        'تنسيق كامل لتصاريح الكمبوند والمرافق',
        'تسليم على المفتاح مع خدمة صيانة مجانية لأول عام'
      ],
      en: [
        'Dedicated full-time site project manager until handover',
        'Supervision of smart home automation & concealed HVAC',
        'Custom furniture, marble, and bespoke joinery sourcing',
        'Complete compound permit & utility coordination',
        'Turnkey handover with 1-year complimentary maintenance'
      ]
    }
  }
]

export const projectsData: ProjectItem[] = [
  {
    slug: 'mivida-modern-villa',
    category: 'villa',
    categoryLabel: { ar: 'فيلا مستقلة', en: 'Standalone Villa' },
    title: { ar: 'فيلا مودرن — كمبوند ميفيدا', en: 'Modern Villa — Mivida Compound' },
    location: { ar: 'التجمع الخامس، القاهرة الجديدة', en: 'Fifth Settlement, New Cairo' },
    locationSlug: 'new-cairo',
    area: 420,
    durationDays: 145,
    packageName: { ar: 'الباقة الملكية', en: 'Royal Smart Turnkey' },
    style: { ar: 'مودرن دافئ', en: 'Warm Modern' },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: {
      ar: 'تشطيب متكامل لفيلا بمساحة 420 م² مع أنظمة منزل ذكي، رخام كرارة، وتكييف مركزي كونسيلد في وقت قياسي.',
      en: 'Complete turnkey finishing for a 420 m² villa featuring smart home automation, Carrara marble, and concealed HVAC.'
    },
    highlights: {
      ar: ['نظام إضاءة ذكي بالكامل', 'واجهات زجاجية عازلة للحرارة والصوت', 'مطبخ مفتوح بجزيرة رخام طبيعي'],
      en: ['Full smart lighting & climate control', 'Thermal & acoustic double-glazed facades', 'Open kitchen with natural marble island']
    },
    coords: { x: 68, y: 45 }
  },
  {
    slug: 'zayed-duplex-luxury',
    category: 'apartment',
    categoryLabel: { ar: 'دوبلكس', en: 'Duplex' },
    title: { ar: 'دوبلكس بحديقة — الشيخ زايد', en: 'Garden Duplex — El Sheikh Zayed' },
    location: { ar: 'الشيخ زايد، الجيزة', en: 'El Sheikh Zayed, Giza' },
    locationSlug: 'sheikh-zayed',
    area: 265,
    durationDays: 85,
    packageName: { ar: 'الباقة الفاخرة', en: 'Signature Luxury' },
    style: { ar: 'نيوكلاسيك عصري', en: 'Modern Neoclassic' },
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: {
      ar: 'تصميم وتنفيذ دوبلكس 265 م² بأسلوب نيوكلاسيك هادئ مع سلم رخام داخلي وتجاليد بانوهات أنيقة.',
      en: 'Design and execution of a 265 m² duplex in calm neoclassic style with a marble staircase and wall paneling.'
    },
    highlights: {
      ar: ['بانوهات حوائط وإضاءة مخفية', 'تدفئة أرضية في الحمامات الرئيسية', 'تراس خارجي بخشب معالج'],
      en: ['Architectural wall moldings & cove lighting', 'Heated master bathroom floors', 'Weather-treated wood outdoor terrace']
    },
    coords: { x: 25, y: 42 }
  },
  {
    slug: 'new-capital-tech-office',
    category: 'commercial',
    categoryLabel: { ar: 'مقر إداري', en: 'Corporate Office' },
    title: { ar: 'مقر شركة تقنية — العاصمة الإدارية', en: 'Tech HQ — New Administrative Capital' },
    location: { ar: 'حي المال والأعمال، العاصمة الإدارية', en: 'CBD, New Administrative Capital' },
    locationSlug: 'new-capital',
    area: 310,
    durationDays: 55,
    packageName: { ar: 'الباقة الفاخرة', en: 'Signature Luxury' },
    style: { ar: 'صناعي حديث', en: 'Modern Industrial' },
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: {
      ar: 'تجهيز مقر إداري متكامل يشمل قاعات اجتماعات عازلة للصوت وشبكة بيانات فائقة السرعة.',
      en: 'Turnkey corporate headquarters featuring acoustic meeting rooms and high-speed structured cabling.'
    },
    highlights: {
      ar: ['قواطيع زجاجية عازلة للصوت', 'توزيع إضاءة مضادة للتوهج للمكاتب', 'منطقة استقبال فخمة بهوية الشركة'],
      en: ['Acoustic double-glazed partitions', 'Anti-glare linear office lighting', 'Branded luxury reception lounge']
    },
    coords: { x: 85, y: 52 }
  },
  {
    slug: 'madinaty-family-apartment',
    category: 'apartment',
    categoryLabel: { ar: 'شقة سكنية', en: 'Apartment' },
    title: { ar: 'شقة عائلية — مدينتي', en: 'Family Apartment — Madinaty' },
    location: { ar: 'مدينتي، شرق القاهرة', en: 'Madinaty, East Cairo' },
    locationSlug: 'madinaty',
    area: 185,
    durationDays: 68,
    packageName: { ar: 'الباقة الفاخرة', en: 'Signature Luxury' },
    style: { ar: 'مينيمال عصري', en: 'Minimalist' },
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: {
      ar: 'استغلال ذكي لكل متر في شقة 185 م² مع ألوان فاتحة تمنح اتساعاً وبورسلين لامع.',
      en: 'Smart space optimization for a 185 m² apartment using airy tones and large-format porcelain.'
    },
    highlights: {
      ar: ['تعديل معماري لفتح المطبخ على الريسبشن', 'وحدات تخزين مدمجة في الحوائط', 'تسليم خلال 68 يوماً فقط'],
      en: ['Architectural open-kitchen layout', 'Built-in flush storage cabinetry', 'Handed over in just 68 days']
    },
    coords: { x: 78, y: 36 }
  },
  {
    slug: 'north-coast-chalet',
    category: 'villa',
    categoryLabel: { ar: 'شاليه ساحلي', en: 'Coastal Chalet' },
    title: { ar: 'شاليه بوهيمي — الساحل الشمالي', en: 'Boho Coastal Chalet — North Coast' },
    location: { ar: 'سيدي عبد الرحمن، الساحل الشمالي', en: 'Sidi Abdelrahman, North Coast' },
    locationSlug: 'north-coast',
    area: 160,
    durationDays: 60,
    packageName: { ar: 'الباقة الفاخرة', en: 'Signature Luxury' },
    style: { ar: 'ساحلي بوهيمي', en: 'Coastal Boho' },
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: {
      ar: 'تشطيب مقاوم للرطوبة والأملاح الساحلية بتفاصيل خشبية دافئة وألوان طبيعية.',
      en: 'Humidity- and salt-resistant coastal finishing with warm wood accents and organic textures.'
    },
    highlights: {
      ar: ['دهانات وأخشاب مقاومة للرطوبة العالية', 'قطاعات ألوميتال عازلة للأتربة', 'تراس مطل على اللاجون'],
      en: ['Marine-grade humidity-resistant finishes', 'Dust-proof thermal aluminum frames', 'Lagoon-facing outdoor lounge']
    },
    coords: { x: 15, y: 18 }
  },
  {
    slug: 'october-medical-clinic',
    category: 'commercial',
    categoryLabel: { ar: 'عيادة طبية', en: 'Medical Clinic' },
    title: { ar: 'مركز طبي متخصص — 6 أكتوبر', en: 'Medical Center — 6th of October' },
    location: { ar: 'محور 26 يوليو، 6 أكتوبر', en: '26th of July Axis, 6th of October' },
    locationSlug: '6th-of-october',
    area: 210,
    durationDays: 50,
    packageName: { ar: 'الباقة الاقتصادية', en: 'Essential Package' },
    style: { ar: 'كلينيكال عصري', en: 'Modern Clinical' },
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: {
      ar: 'تنفيذ عيادات طبية بأرضيات مضادة للبكتيريا ودهانات سهلة التعقيم مطابق لاشتراطات وزارة الصحة.',
      en: 'Medical clinic fit-out with antibacterial flooring and washable hygiene-grade coatings.'
    },
    highlights: {
      ar: ['أرضيات فينيل طبي مضاد للبكتيريا', 'تأسيس شبكة غازات طبية وتكييف معقم', 'منطقة انتظار مريحة للمرضى'],
      en: ['Antibacterial medical vinyl flooring', 'Medical utility & HVAC infrastructure', 'Calming patient reception zone']
    },
    coords: { x: 30, y: 58 }
  }
]

export const blogPostsData: BlogPost[] = [
  {
    slug: 'finishing-cost-guide-egypt-2026',
    category: { ar: 'الأسعار والميزانية', en: 'Pricing & Budget' },
    title: {
      ar: 'دليل تكلفة تشطيب الشقق في مصر 2026: كيف تحسب ميزانيتك بدقة؟',
      en: 'Apartment Finishing Cost Guide in Egypt 2026: How to Budget Accurately'
    },
    excerpt: {
      ar: 'تعرف على أسعار المتر المربع للتشطيب الاقتصادي والفاخر وأهم البنود التي تؤثر على الميزانية النهائية.',
      en: 'Discover per-square-meter finishing costs for essential and luxury tiers and the key factors shaping your budget.'
    },
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    readTime: 6,
    date: '2026-11-10',
    author: { ar: 'م. أحمد كمال — مدير المشاريع', en: 'Eng. Ahmed Kamal — Project Director' },
    sections: [
      {
        id: 'cost-factors',
        heading: { ar: '1. العوامل الأساسية التي تحدد سعر المتر', en: '1. Core Factors Determining Cost Per Meter' },
        body: {
          ar: 'تختلف تكلفة التشطيب بناءً على حالة التسليم (طوب أحمر أم نصف تشطيب)، نوعية خامات التأسيس في السباكة والكهرباء، ومستوى الأرضيات سواء سيراميك أو بورسلين أو رخام طبيعي.',
          en: 'Finishing costs vary depending on handover condition (raw brick vs. semi-finished), MEP rough-in brands, and flooring choices ranging from ceramic to imported marble.'
        }
      },
      {
        id: 'package-comparison',
        heading: { ar: '2. الفرق بين الباقة الاقتصادية والفاخرة', en: '2. Essential vs. Luxury Package Breakdown' },
        body: {
          ar: 'الباقة الاقتصادية تركز على المتانة والعملية بتكلفة تبدأ من 5,500 ج.م للمتر، بينما تضيف الباقة الفاخرة التصميم ثلاثي الأبعاد والبورسلين المستورد وإضاءة البروفايل بسعر يبدأ من 8,500 ج.م.',
          en: 'Our Essential tier focuses on durability starting at 5,500 EGP/m², while the Signature Luxury tier adds 3D design, imported porcelain, and architectural lighting from 8,500 EGP/m².'
        }
      },
      {
        id: 'hidden-costs',
        heading: { ar: '3. كيف تتجنب التكاليف المفاجئة أثناء التنفيذ؟', en: '3. Avoiding Hidden Costs During Execution' },
        body: {
          ar: 'وجود مقايسة هندسية معتمدة (BOQ) قبل البدء مع تصميم 3D واضح يمنع التكسير أو التعديل العشوائي، وهو ما يضمن لك الالتزام الكامل بالميزانية المتفق عليها.',
          en: 'Having an approved itemized BOQ alongside clear 3D shop drawings eliminates mid-project rework and guarantees zero budget surprises.'
        }
      }
    ]
  },
  {
    slug: 'porcelain-vs-marble-guide',
    category: { ar: 'الخامات والديكور', en: 'Materials & Decor' },
    title: {
      ar: 'البورسلين أم الرخام الطبيعي؟ مقارنة شاملة لاختيار أرضية منزلك',
      en: 'Porcelain vs. Natural Marble: A Complete Guide for Your Home Floors'
    },
    excerpt: {
      ar: 'مقارنة عملية بين البورسلين والرخام من حيث السعر، التحمل، الصيانة، والشكل الجمالي.',
      en: 'A practical comparison between porcelain tiles and natural marble covering cost, durability, and maintenance.'
    },
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    readTime: 5,
    date: '2026-11-02',
    author: { ar: 'م. سارة منصور — رئيسة قسم التصميم', en: 'Arch. Sara Mansour — Head of Design' },
    sections: [
      {
        id: 'durability',
        heading: { ar: '1. التحمل ومقاومة البقع والخدوش', en: '1. Durability and Stain Resistance' },
        body: {
          ar: 'البورسلين يتميز بامتصاص شبه معدوم للسوائل ومقاومة عالية للخدش، بينما يحتاج الرخام الطبيعي إلى عناية دورية وتلميع بالكريستال للحفاظ على لمعانه.',
          en: 'Porcelain offers near-zero water absorption and high scratch resistance, whereas natural marble requires periodic sealing and polishing.'
        }
      },
      {
        id: 'aesthetics',
        heading: { ar: '2. الفخامة والشكل المعماري', en: '2. Architectural Luxury & Aesthetics' },
        body: {
          ar: 'الرغم من تطور طباعة البورسلين بمقاسات 120×240 سم، يظل للرخام الطبيعي عروقه الفريدة التي تمنح مساحات الاستقبال والفلل طابعاً استثنائياً.',
          en: 'While large-format 120x240 cm porcelain mimics stone brilliantly, natural marble retains unique veining ideal for grand villa receptions.'
        }
      }
    ]
  },
  {
    slug: 'smart-home-wiring-essentials',
    category: { ar: 'التأسيس الذكي', en: 'Smart Systems' },
    title: {
      ar: 'أساسيات تجهيز شقتك بنظام المنزل الذكي أثناء مرحلة الكهرباء',
      en: 'Smart Home Wiring Essentials During the Electrical Rough-In Phase'
    },
    excerpt: {
      ar: 'خطوات بسيطة في تأسيس الكهرباء تجعل منزلك جاهزاً للتحكم الصوتي وتوفير الطاقة بدون تكسير لاحقاً.',
      en: 'Simple electrical rough-in steps that make your apartment ready for voice control and energy automation.'
    },
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    readTime: 4,
    date: '2026-10-21',
    author: { ar: 'م. كريم طارق — مهندس كهرباء وتحكم', en: 'Eng. Karim Tarek — MEP Lead' },
    sections: [
      {
        id: 'neutral-wire',
        heading: { ar: '1. توفير خط النيوترال في علب المفاتيح', en: '1. Provisioning Neutral Wires at Switch Boxes' },
        body: {
          ar: 'أهم قاعدة لتشغيل أي مفتاح ذكي بثبات هي سحب خط نيوترال داخل كل علبة ماجيك مع استخدام علب عميقة تسمح بتركيب الموديولات.',
          en: 'The golden rule for reliable smart switches is pulling a neutral wire into deep back-boxes during the rough-in stage.'
        }
      },
      {
        id: 'wifi-mesh',
        heading: { ar: '2. نقاط توزيع الإنترنت المخفية في الأسقف', en: '2. Ceiling Access Points for Seamless Coverage' },
        body: {
          ar: 'تأسيس كابلات شبكة من نوع CAT6 داخل الأسقف الجبسية يضمن تغطية إنترنت قوية لكل الأجهزة الذكية في الغرف.',
          en: 'Running CAT6 cables to ceiling access points ensures rock-solid Wi-Fi coverage for all connected devices.'
        }
      }
    ]
  }
]

export const locationsData: LocationItem[] = [
  {
    slug: 'new-cairo',
    name: { ar: 'التجمع الخامس والقاهرة الجديدة', en: 'Fifth Settlement & New Cairo' },
    headline: {
      ar: 'شركة تشطيبات في التجمع الخامس — خبرة في جميع كمبوندات القاهرة الجديدة',
      en: 'Finishing Company in New Cairo — Experts Across All Major Compounds'
    },
    description: {
      ar: 'فريق كيان متواجد يومياً في التجمع الخامس لتنفيذ تشطيبات الشقق والفلل في ميفيدا، ماونتن فيو، بالم هيلز، وهايد بارك مع إنهاء كافة تصاريح الكمبوندات.',
      en: 'Kayan teams operate daily in New Cairo delivering villas and apartments in Mivida, Mountain View, Palm Hills, and Hyde Park with full compound permit handling.'
    },
    projectsCount: 54,
    avgDuration: { ar: '65 – 120 يوم', en: '65 – 120 Days' },
    popularCompounds: {
      ar: ['ميفيدا', 'ماونتن فيو آي سيتي', 'هايد بارك', 'بالم هيلز قطامية', 'أزاد'],
      en: ['Mivida', 'Mountain View iCity', 'Hyde Park', 'Palm Hills Katameya', 'Azad']
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    coords: { x: 68, y: 45 }
  },
  {
    slug: 'sheikh-zayed',
    name: { ar: 'الشيخ زايد ونيو زايد', en: 'El Sheikh Zayed & New Zayed' },
    headline: {
      ar: 'تشطيب فلل وشقق في الشيخ زايد بأعلى معايير الجودة الهندسية',
      en: 'Luxury Villa & Apartment Finishing in El Sheikh Zayed'
    },
    description: {
      ar: 'نغطي كافة أحياء الشيخ زايد وكمبوندات سوديك، بيفرلي هيلز، أليجريا، وزيد بارك بمقر فني قريب لسرعة المعاينة والمتابعة.',
      en: 'Covering all Sheikh Zayed districts including SODIC West, Beverly Hills, Allegria, and ZED Park with rapid site supervision.'
    },
    projectsCount: 42,
    avgDuration: { ar: '70 – 140 يوم', en: '70 – 140 Days' },
    popularCompounds: {
      ar: ['سوديك ويست', 'بيفرلي هيلز', 'زيد إيست وويست', 'أركان بلازا', 'رويال سيتي'],
      en: ['SODIC West', 'Beverly Hills', 'ZED Park', 'Arkan Plaza', 'Royal City']
    },
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    coords: { x: 25, y: 42 }
  },
  {
    slug: 'new-capital',
    name: { ar: 'العاصمة الإدارية الجديدة', en: 'New Administrative Capital' },
    headline: {
      ar: 'تشطيب الوحدات السكنية والإدارية في العاصمة الإدارية الجديدة',
      en: 'Residential & Commercial Fit-Out in New Administrative Capital'
    },
    description: {
      ar: 'متخصصون في تشطيب الوحدات السكنية في R7 و R8 والمقرات الإدارية والعيادات في حي المال والأعمال والداون تاون.',
      en: 'Specialized in residential finishing in R7 & R8 as well as corporate offices and clinics in the CBD and Downtown.'
    },
    projectsCount: 28,
    avgDuration: { ar: '55 – 90 يوم', en: '55 – 90 Days' },
    popularCompounds: {
      ar: ['المقصد', 'إل بوسكو', 'سيليا', 'حي المال والأعمال', 'فينشي'],
      en: ['Al Maqsad', 'Il Bosco', 'Celia', 'CBD Towers', 'Vinci']
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    coords: { x: 85, y: 52 }
  },
  {
    slug: 'north-coast',
    name: { ar: 'الساحل الشمالي والعلمين الجديدة', en: 'North Coast & New Alamein' },
    headline: {
      ar: 'تشطيب شاليهات وفيلات الساحل الشمالي بخامات مقاومة للرطوبة',
      en: 'Coastal Chalet & Villa Finishing in North Coast & New Alamein'
    },
    description: {
      ar: 'ننفذ تشطيبات ساحلية متكاملة قبل موسم الصيف بخامات خاصة مقاومة للرطوبة والأملاح مع تسليم بالفرش إذا رغبت.',
      en: 'Delivering coastal finishing ahead of the summer season with marine-grade moisture-resistant materials.'
    },
    projectsCount: 19,
    avgDuration: { ar: '50 – 80 يوم', en: '50 – 80 Days' },
    popularCompounds: {
      ar: ['مراسي', 'هاسيندا باي', 'ماونتن فيو رأس الحكمة', 'أبراج العلمين', 'تلال'],
      en: ['Marassi', 'Hacienda Bay', 'Mountain View Ras El Hekma', 'Alamein Towers', 'Telal']
    },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    coords: { x: 15, y: 18 }
  },
  {
    slug: 'madinaty',
    name: { ar: 'مدينتي والشروق', en: 'Madinaty & El Shorouk' },
    headline: {
      ar: 'تشطيب شقق وفيلات مدينتي والشروق بأسرع جدول زمني',
      en: 'Apartment & Villa Finishing in Madinaty & El Shorouk'
    },
    description: {
      ar: 'خبرة واسعة في تعديل التقسيمات الداخلية لنماذج شقق مدينتي المختلفة واستخراج تصاريح الجهاز بسهولة.',
      en: 'Deep expertise in optimizing Madinaty apartment floor plans and handling all local authority permits smoothly.'
    },
    projectsCount: 31,
    avgDuration: { ar: '60 – 90 يوم', en: '60 – 90 Days' },
    popularCompounds: {
      ar: ['B1 - B12 مدينتي', 'مجموعة الفيلات', 'سوديك إيست', 'البروج', 'الشروق'],
      en: ['Madinaty B1-B12', 'Madinaty Villas', 'SODIC East', 'Al Burouj', 'El Shorouk']
    },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    coords: { x: 78, y: 36 }
  },
  {
    slug: '6th-of-october',
    name: { ar: 'مدينة 6 أكتوبر وحدائق أكتوبر', en: '6th of October City' },
    headline: {
      ar: 'تشطيبات سكنية وطبية متكاملة في 6 أكتوبر',
      en: 'Residential & Commercial Finishing in 6th of October'
    },
    description: {
      ar: 'خدمات تشطيب متكاملة للشقق والعيادات والمراكز التجارية في التوسعات الشمالية والمحور المركزي.',
      en: 'Comprehensive finishing services for apartments, clinics, and commercial hubs across 6th of October.'
    },
    projectsCount: 24,
    avgDuration: { ar: '50 – 85 يوم', en: '50 – 85 Days' },
    popularCompounds: {
      ar: ['بالم باركس', 'ماونتن فيو تشيل أوت', 'او ويست', 'بالم هيلز أكتوبر', 'بادية'],
      en: ['Palm Parks', 'MV Chillout Park', 'O West', 'Palm Hills October', 'Badya']
    },
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    coords: { x: 30, y: 58 }
  }
]
