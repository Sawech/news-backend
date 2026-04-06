/**
 * prisma/seed.ts
 *
 * Run with:  npm run db:seed
 *
 * Idempotent — safe to run multiple times.
 * All upserts use unique fields as the `where` condition.
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─────────────────────────────────────────────
  // ADMIN USER
  // ─────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@chronicler.com' },
    update: {},
    create: {
      email: 'admin@chronicler.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user: ${admin.email}`);

  // ─────────────────────────────────────────────
  // CATEGORIES  (en · fr · ar)
  // ─────────────────────────────────────────────
  const categories = await Promise.all([
    // ── English ──
    prisma.category.upsert({
      where: { slug: 'world' },
      update: {},
      create: {
        name: 'World',
        slug: 'world',
        description: 'Global news and international affairs',
        locale: 'en',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'politics' },
      update: {},
      create: {
        name: 'Politics',
        slug: 'politics',
        description: 'Political analysis and commentary',
        locale: 'en',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tech' },
      update: {},
      create: {
        name: 'Tech',
        slug: 'tech',
        description: 'Technology, innovation, and digital culture',
        locale: 'en',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business' },
      update: {},
      create: {
        name: 'Business',
        slug: 'business',
        description: 'Markets, economics, and corporate news',
        locale: 'en',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'culture' },
      update: {},
      create: {
        name: 'Culture',
        slug: 'culture',
        description: 'Arts, entertainment, and society',
        locale: 'en',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'science' },
      update: {},
      create: {
        name: 'Science',
        slug: 'science',
        description: 'Scientific discovery and research',
        locale: 'en',
      },
    }),

    // ── French ──
    prisma.category.upsert({
      where: { slug: 'world-fr' },
      update: {},
      create: {
        name: 'Monde',
        slug: 'world-fr',
        description: 'Actualités mondiales et affaires internationales',
        locale: 'fr',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'politics-fr' },
      update: {},
      create: {
        name: 'Politique',
        slug: 'politics-fr',
        description: 'Analyse politique et commentaires',
        locale: 'fr',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tech-fr' },
      update: {},
      create: {
        name: 'Tech',
        slug: 'tech-fr',
        description: 'Technologie, innovation et culture numérique',
        locale: 'fr',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business-fr' },
      update: {},
      create: {
        name: 'Économie',
        slug: 'business-fr',
        description: 'Marchés, économie et actualités des entreprises',
        locale: 'fr',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'culture-fr' },
      update: {},
      create: {
        name: 'Culture',
        slug: 'culture-fr',
        description: 'Arts, divertissement et société',
        locale: 'fr',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'science-fr' },
      update: {},
      create: {
        name: 'Sciences',
        slug: 'science-fr',
        description: 'Découvertes scientifiques et recherche',
        locale: 'fr',
      },
    }),

    // ── Arabic ──
    prisma.category.upsert({
      where: { slug: 'world-ar' },
      update: {},
      create: {
        name: 'العالم',
        slug: 'world-ar',
        description: 'أخبار عالمية وشؤون دولية',
        locale: 'ar',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'politics-ar' },
      update: {},
      create: {
        name: 'السياسة',
        slug: 'politics-ar',
        description: 'تحليلات سياسية وتعليقات',
        locale: 'ar',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tech-ar' },
      update: {},
      create: {
        name: 'التكنولوجيا',
        slug: 'tech-ar',
        description: 'التكنولوجيا والابتكار والثقافة الرقمية',
        locale: 'ar',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business-ar' },
      update: {},
      create: {
        name: 'الأعمال',
        slug: 'business-ar',
        description: 'الأسواق والاقتصاد وأخبار الشركات',
        locale: 'ar',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'culture-ar' },
      update: {},
      create: {
        name: 'الثقافة',
        slug: 'culture-ar',
        description: 'الفنون والترفيه والمجتمع',
        locale: 'ar',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'science-ar' },
      update: {},
      create: {
        name: 'العلوم',
        slug: 'science-ar',
        description: 'الاكتشافات العلمية والبحوث',
        locale: 'ar',
      },
    }),
  ]);
  console.log(`✅ ${categories.length} categories (en/fr/ar)`);

  // Handy index helpers
  // EN: indices 0–5  |  FR: 6–11  |  AR: 12–17
  // [0/6/12]=world  [1/7/13]=politics  [2/8/14]=tech
  // [3/9/15]=business  [4/10/16]=culture  [5/11/17]=science
  const cat = {
    en: {
      world: categories[0],
      politics: categories[1],
      tech: categories[2],
      business: categories[3],
      culture: categories[4],
      science: categories[5],
    },
    fr: {
      world: categories[6],
      politics: categories[7],
      tech: categories[8],
      business: categories[9],
      culture: categories[10],
      science: categories[11],
    },
    ar: {
      world: categories[12],
      politics: categories[13],
      tech: categories[14],
      business: categories[15],
      culture: categories[16],
      science: categories[17],
    },
  };

  // ─────────────────────────────────────────────
  // OPINIONS  (3 per locale — already correct)
  // ─────────────────────────────────────────────
  const opinions = await Promise.all([
    // ── English ──
    prisma.opinion.upsert({
      where: { id: 1 },
      update: {},
      create: {
        pubName: 'Elena Thorne',
        content:
          'The race for AI supremacy is no longer between companies — it is between nations. We need a global treaty before it is too late.',
        subject: 'The Geopolitics of Artificial Intelligence',
        linkUrl: 'http://example.com/opinion/ai-geopolitics',
        locale: 'en',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 2 },
      update: {},
      create: {
        pubName: 'Julian Marsh',
        content:
          'Digital borders are the new iron curtain. Sovereign internet policies fragment the commons and ultimately hurt the citizens they claim to protect.',
        subject: 'Data Sovereignty Is a False Promise',
        linkUrl: 'http://example.com/opinion/data-sovereignty',
        locale: 'en',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 3 },
      update: {},
      create: {
        pubName: 'Sara Okonkwo',
        content:
          'Climate finance pledges at COP summits are not worth the paper they are printed on until wealthier nations deliver on their overdue commitments.',
        subject: 'Empty Pledges, Rising Seas',
        linkUrl: 'http://example.com/opinion/climate-finance',
        locale: 'en',
      },
    }),

    // ── French ──
    prisma.opinion.upsert({
      where: { id: 4 },
      update: {},
      create: {
        pubName: 'Claire Fontaine',
        content:
          "La course à la suprématie de l'IA n'oppose plus seulement des entreprises, mais des nations entières. Un traité mondial s'impose avant qu'il ne soit trop tard.",
        subject: "La géopolitique de l'intelligence artificielle",
        linkUrl: 'http://example.com/opinion/ia-geopolitique',
        locale: 'fr',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 5 },
      update: {},
      create: {
        pubName: 'Marc Delacroix',
        content:
          "Les frontières numériques sont le nouveau rideau de fer. La souveraineté des données fragmente les biens communs et nuit en fin de compte aux citoyens qu'elle prétend protéger.",
        subject: 'La souveraineté des données, une fausse promesse',
        linkUrl: 'http://example.com/opinion/souverainete-donnees',
        locale: 'fr',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 6 },
      update: {},
      create: {
        pubName: 'Amina Rousseau',
        content:
          "Les promesses de financement climatique lors des sommets de la COP ne valent rien tant que les pays riches n'honorent pas leurs engagements en retard.",
        subject: 'Promesses creuses, mers montantes',
        linkUrl: 'http://example.com/opinion/financement-climatique',
        locale: 'fr',
      },
    }),

    // ── Arabic ──
    prisma.opinion.upsert({
      where: { id: 7 },
      update: {},
      create: {
        pubName: 'ليلى الأمين',
        content:
          'لم يعد السباق نحو الهيمنة في مجال الذكاء الاصطناعي بين الشركات فحسب، بل بين الدول. نحن بحاجة إلى معاهدة دولية قبل فوات الأوان.',
        subject: 'الجيوسياسية للذكاء الاصطناعي',
        linkUrl: 'http://example.com/opinion/ai-geopolitics-ar',
        locale: 'ar',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 8 },
      update: {},
      create: {
        pubName: 'كريم منصور',
        content:
          'الحدود الرقمية هي ستار الحديد الجديد. سياسات السيادة على الإنترنت تُجزّئ الفضاء المشترك وتضر في نهاية المطاف بالمواطنين الذين تدّعي حمايتهم.',
        subject: 'سيادة البيانات وهمٌ زائف',
        linkUrl: 'http://example.com/opinion/data-sovereignty-ar',
        locale: 'ar',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 9 },
      update: {},
      create: {
        pubName: 'نور الحسن',
        content:
          'تعهدات تمويل المناخ في قمم مؤتمر الأطراف لا قيمة لها ما لم تفِ الدول الغنية بالتزاماتها المتأخرة.',
        subject: 'وعود فارغة وبحار مرتفعة',
        linkUrl: 'http://example.com/opinion/climate-finance-ar',
        locale: 'ar',
      },
    }),
  ]);
  console.log(`✅ ${opinions.length} opinions (3 × en/fr/ar)`);

  // ─────────────────────────────────────────────
  // TAGS  (en · fr · ar)
  // ─────────────────────────────────────────────
  const tags = await Promise.all([
    // ── English ──
    prisma.tag.upsert({
      where: { id: '1' },
      update: {},
      create: { name: 'Artificial Intelligence', locale: 'en' },
    }),
    prisma.tag.upsert({
      where: { id: '2' },
      update: {},
      create: { name: 'Climate', locale: 'en' },
    }),
    prisma.tag.upsert({
      where: { id: '3' },
      update: {},
      create: { name: 'Markets', locale: 'en' },
    }),
    prisma.tag.upsert({
      where: { id: '4' },
      update: {},
      create: { name: 'Geopolitics', locale: 'en' },
    }),

    // ── French ──
    prisma.tag.upsert({
      where: { id: '5' },
      update: {},
      create: { name: 'Intelligence Artificielle', locale: 'fr' },
    }),
    prisma.tag.upsert({
      where: { id: '6' },
      update: {},
      create: { name: 'Climat', locale: 'fr' },
    }),
    prisma.tag.upsert({
      where: { id: '7' },
      update: {},
      create: { name: 'Marchés', locale: 'fr' },
    }),
    prisma.tag.upsert({
      where: { id: '8' },
      update: {},
      create: { name: 'Géopolitique', locale: 'fr' },
    }),

    // ── Arabic ──
    prisma.tag.upsert({
      where: { id: '9' },
      update: {},
      create: { name: 'الذكاء الاصطناعي', locale: 'ar' },
    }),
    prisma.tag.upsert({
      where: { id: '10' },
      update: {},
      create: { name: 'المناخ', locale: 'ar' },
    }),
    prisma.tag.upsert({
      where: { id: '11' },
      update: {},
      create: { name: 'الأسواق', locale: 'ar' },
    }),
    prisma.tag.upsert({
      where: { id: '12' },
      update: {},
      create: { name: 'الجيوسياسية', locale: 'ar' },
    }),
  ]);
  console.log(`✅ ${tags.length} tags (en/fr/ar)`);

  // Tag index helpers
  const tag = {
    en: { ai: tags[0], climate: tags[1], markets: tags[2], geo: tags[3] },
    fr: { ai: tags[4], climate: tags[5], markets: tags[6], geo: tags[7] },
    ar: { ai: tags[8], climate: tags[9], markets: tags[10], geo: tags[11] },
  };

  // ─────────────────────────────────────────────
  // AUTHORS
  // ─────────────────────────────────────────────
  const author1 = await prisma.author.upsert({
    where: { id: '1' },
    update: {},
    create: {
      name: 'Elena Thorne',
      bio: 'Technology Editor with 12 years covering Silicon Valley and emerging tech.',
      avatarUrl: 'https://i.pravatar.cc/120?u=elena-thorne',
    },
  });
  const author2 = await prisma.author.upsert({
    where: { id: '2' },
    update: {},
    create: {
      name: 'Julian Marsh',
      bio: 'Senior Correspondent, World Affairs.',
      avatarUrl: 'https://i.pravatar.cc/120?u=julian-marsh',
    },
  });
  console.log('✅ Authors created');

  // ─────────────────────────────────────────────
  // TICKERS  (en · fr · ar)
  // ─────────────────────────────────────────────
  const tickerData = [
    // English
    {
      content: 'G7 summit concludes with landmark digital trade agreement',
      locale: 'en',
    },
    {
      content: 'Markets rally as inflation data comes in below expectations',
      locale: 'en',
    },
    {
      content: 'New climate report warns of accelerating sea level rise',
      locale: 'en',
    },
    {
      content: 'Tech giants face fresh antitrust scrutiny in Brussels',
      locale: 'en',
    },
    // French
    {
      content:
        "Le sommet du G7 s'achève sur un accord commercial numérique historique",
      locale: 'fr',
    },
    {
      content:
        "Les marchés rebondissent après des données d'inflation inférieures aux attentes",
      locale: 'fr',
    },
    {
      content:
        'Un nouveau rapport climatique alerte sur la montée accélérée du niveau des mers',
      locale: 'fr',
    },
    {
      content:
        'Les géants de la tech font face à un nouvel examen antitrust à Bruxelles',
      locale: 'fr',
    },
    // Arabic
    {
      content: 'قمة مجموعة السبع تختتم بإبرام اتفاقية تجارة رقمية تاريخية',
      locale: 'ar',
    },
    { content: 'الأسواق ترتفع بعد بيانات تضخم أقل من التوقعات', locale: 'ar' },
    {
      content: 'تقرير مناخي جديد يحذر من تسارع ارتفاع مستوى سطح البحر',
      locale: 'ar',
    },
    {
      content:
        'عمالقة التكنولوجيا يواجهون تدقيقاً جديداً بشأن مكافحة الاحتكار في بروكسل',
      locale: 'ar',
    },
  ];

  const tickerCount = await prisma.ticker.count();
  if (tickerCount === 0) {
    await prisma.ticker.createMany({ data: tickerData });
    console.log(`✅ ${tickerData.length} tickers created (en/fr/ar)`);
  } else {
    console.log(`⏩ Tickers already seeded (${tickerCount} found), skipping`);
  }

  // ─────────────────────────────────────────────
  // ARTICLES  (en · fr · ar)
  // ─────────────────────────────────────────────

  // ── Article 1 — EN ──────────────────────────
  const article1En = await prisma.article.upsert({
    where: { slug: 'architecture-of-silence-global-data-sovereignty' },
    update: {},
    create: {
      title:
        'The Architecture of Silence: Navigating the New Global Data Sovereignty',
      slug: 'architecture-of-silence-global-data-sovereignty',
      locale: 'en',
      excerpt:
        'As nations construct digital borders with physical precision, the dream of a borderless internet faces its most significant structural challenge since inception.',
      body: `<p>The boundaries of the internet as we know it are dissolving at the seams. For three decades, the promise of a global, frictionless network of information underpinned entire economies and democratic movements. That promise is now under siege.</p>
<h2>Digital Borders, Physical Consequences</h2>
<p>From the Great Firewall of China to the European GDPR regime, the fragmentation of the internet into sovereign digital territories is accelerating. What was once dismissed as authoritarian overreach is now a bipartisan consensus in democracies around the world.</p>
<blockquote>We are no longer debating whether data sovereignty will happen. We are debating how fast, and who will be left behind.</blockquote>
<p>The cascading effect on global commerce is profound. Multinationals now navigate a patchwork of data localisation laws that require them to store citizen data within national borders, fragmenting what were once unified cloud architectures into costly, siloed regional deployments.</p>
<h2>The Quiet Redistribution of Power</h2>
<p>What's most striking is not the technological implications, but the geopolitical ones. Control over data infrastructure has become the new petroleum — the defining resource of 21st century statecraft.</p>`,
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
      status: 'PUBLISHED',
      featured: true,
      trending: true,
      readTime: 8,
      authorId: author2.id,
      categoryId: cat.en.world.id,
      userId: admin.id,
    },
  });
  await prisma.articleTag.upsert({
    where: {
      articleId_tagId: { articleId: article1En.id, tagId: tag.en.geo.id },
    },
    update: {},
    create: { articleId: article1En.id, tagId: tag.en.geo.id },
  });

  // ── Article 1 — FR ──────────────────────────
  const article1Fr = await prisma.article.upsert({
    where: { slug: 'architecture-du-silence-souverainete-donnees' },
    update: {},
    create: {
      title:
        "L'Architecture du silence : naviguer dans la nouvelle souveraineté mondiale des données",
      slug: 'architecture-du-silence-souverainete-donnees',
      locale: 'fr',
      excerpt:
        "Alors que les nations construisent des frontières numériques avec une précision physique, le rêve d'un internet sans frontières fait face à son défi structurel le plus important depuis sa création.",
      body: `<p>Les frontières de l'internet tel que nous le connaissons se dissolvent. Pendant trois décennies, la promesse d'un réseau mondial d'information sans friction a soutenu des économies entières et des mouvements démocratiques. Cette promesse est désormais assiégée.</p>
<h2>Frontières numériques, conséquences physiques</h2>
<p>Du Grand Pare-feu de Chine au régime européen du RGPD, la fragmentation d'internet en territoires numériques souverains s'accélère. Ce qui était autrefois considéré comme un abus autoritaire est désormais un consensus bipartisan dans les démocraties du monde entier.</p>
<blockquote>Nous ne débattons plus de savoir si la souveraineté des données va se produire. Nous débattons de la vitesse à laquelle elle progresse, et de qui sera laissé pour compte.</blockquote>
<p>L'effet en cascade sur le commerce mondial est profond. Les multinationales naviguent désormais dans un patchwork de lois sur la localisation des données qui les obligent à stocker les données des citoyens à l'intérieur des frontières nationales.</p>
<h2>La redistribution silencieuse du pouvoir</h2>
<p>Ce qui est le plus frappant n'est pas les implications technologiques, mais les implications géopolitiques. Le contrôle de l'infrastructure des données est devenu le nouveau pétrole — la ressource définissante de la politique d'État du XXIe siècle.</p>`,
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
      status: 'PUBLISHED',
      featured: true,
      trending: true,
      readTime: 8,
      authorId: author2.id,
      categoryId: cat.fr.world.id,
      userId: admin.id,
    },
  });
  await prisma.articleTag.upsert({
    where: {
      articleId_tagId: { articleId: article1Fr.id, tagId: tag.fr.geo.id },
    },
    update: {},
    create: { articleId: article1Fr.id, tagId: tag.fr.geo.id },
  });

  // ── Article 1 — AR ──────────────────────────
  const article1Ar = await prisma.article.upsert({
    where: { slug: 'mimarat-alsamt-siadat-albianat' },
    update: {},
    create: {
      title: 'معمارية الصمت: التنقل في سيادة البيانات العالمية الجديدة',
      slug: 'mimarat-alsamt-siadat-albianat',
      locale: 'ar',
      excerpt:
        'مع إنشاء الدول حدوداً رقمية بدقة فائقة، يواجه حلم الإنترنت عديم الحدود أكبر تحدياته الهيكلية منذ نشأته.',
      body: `<p>حدود الإنترنت كما نعرفه تتلاشى. على مدى ثلاثة عقود، دعمت وعود الشبكة العالمية السلسة اقتصادات بأكملها وحركات ديمقراطية. هذا الوعد بات تحت الحصار.</p>
<h2>حدود رقمية، عواقب مادية</h2>
<p>من جدار الحماية الصيني العظيم إلى نظام اللائحة الأوروبية العامة لحماية البيانات، يتسارع تفتت الإنترنت إلى أقاليم رقمية ذات سيادة. ما كان يُعتبر تجاوزاً استبدادياً أصبح اليوم توافقاً يتجاوز الحزبية في الديمقراطيات حول العالم.</p>
<blockquote>لم نعد نناقش ما إذا كانت سيادة البيانات ستحدث. نناقش مدى سرعتها، ومن سيتخلف عنها.</blockquote>
<p>التأثير المتسلسل على التجارة العالمية عميق. تتنقل الشركات متعددة الجنسيات الآن في شبكة من قوانين توطين البيانات التي تلزمها بتخزين بيانات المواطنين داخل الحدود الوطنية.</p>
<h2>إعادة التوزيع الهادئة للسلطة</h2>
<p>الأكثر لفتاً للانتباه ليس التداعيات التكنولوجية، بل الجيوسياسية. أصبح التحكم في البنية التحتية للبيانات النفطَ الجديد — المورد المحدِّد لفن الحكم في القرن الحادي والعشرين.</p>`,
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
      status: 'PUBLISHED',
      featured: true,
      trending: true,
      readTime: 8,
      authorId: author2.id,
      categoryId: cat.ar.world.id,
      userId: admin.id,
    },
  });
  await prisma.articleTag.upsert({
    where: {
      articleId_tagId: { articleId: article1Ar.id, tagId: tag.ar.geo.id },
    },
    update: {},
    create: { articleId: article1Ar.id, tagId: tag.ar.geo.id },
  });

  // ── Article 2 — EN ──────────────────────────
  const article2En = await prisma.article.upsert({
    where: { slug: 'silicon-horizon-biological-computing' },
    update: {},
    create: {
      title:
        'The Silicon Horizon: Why the Next Era of Computing Will Be Biological',
      slug: 'silicon-horizon-biological-computing',
      locale: 'en',
      excerpt:
        "As Moore's Law hits physical limits, the industry is looking at DNA and synthetic neural paths to redefine what intelligence looks like.",
      body: `<p>The boundaries of what we define as a computer are dissolving. For seven decades, we have relied on the elegant, binary simplicity of silicon transistors. We grew them smaller, packed them tighter, and pushed them faster until we arrived at the current era of generative intelligence. But the wall is looming.</p>
<h2>Beyond the Binary Gate</h2>
<p>Enter biological computing. While traditional chips operate on high and low voltages, the biological systems of the human brain operate on chemical gradients and synaptic plasticity. A single human brain performs 10^16 operations per second while consuming roughly 20 watts.</p>
<blockquote>We are no longer building machines that mimic life; we are teaching life to perform logic. The future is not in the metal, but in the marrow.</blockquote>
<p>Researchers at the Zurich Institute for Bio-Digital systems have successfully integrated live neuron clusters onto traditional substrate. These organoid chips aren't just processing data; they are learning from it in real-time without the need for traditional backpropagation algorithms.</p>`,
      imageUrl:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      status: 'PUBLISHED',
      featured: false,
      trending: true,
      readTime: 12,
      authorId: author1.id,
      categoryId: cat.en.tech.id,
      userId: admin.id,
    },
  });
  await prisma.articleTag.upsert({
    where: {
      articleId_tagId: { articleId: article2En.id, tagId: tag.en.ai.id },
    },
    update: {},
    create: { articleId: article2En.id, tagId: tag.en.ai.id },
  });

  // ── Article 2 — FR ──────────────────────────
  const article2Fr = await prisma.article.upsert({
    where: { slug: 'horizon-silicium-informatique-biologique' },
    update: {},
    create: {
      title:
        "L'Horizon de silicium : pourquoi la prochaine ère informatique sera biologique",
      slug: 'horizon-silicium-informatique-biologique',
      locale: 'fr',
      excerpt:
        "Alors que la loi de Moore atteint ses limites physiques, l'industrie se tourne vers l'ADN et les voies neurales synthétiques pour redéfinir l'intelligence.",
      body: `<p>Les frontières de ce que nous définissons comme un ordinateur se dissolvent. Pendant sept décennies, nous avons compté sur la simplicité binaire des transistors en silicium. Nous les avons rendus plus petits, plus denses et plus rapides jusqu'à atteindre l'ère actuelle de l'intelligence générative. Mais le mur approche.</p>
<h2>Au-delà de la porte binaire</h2>
<p>Bienvenue dans l'informatique biologique. Alors que les puces traditionnelles fonctionnent sur des tensions hautes et basses, les systèmes biologiques du cerveau humain fonctionnent sur des gradients chimiques et la plasticité synaptique. Un seul cerveau humain effectue 10^16 opérations par seconde en consommant environ 20 watts.</p>
<blockquote>Nous ne construisons plus des machines qui imitent la vie ; nous apprenons à la vie à effectuer de la logique. Le futur n'est pas dans le métal, mais dans la moelle.</blockquote>
<p>Des chercheurs de l'Institut zurichois des systèmes bio-numériques ont réussi à intégrer des clusters de neurones vivants sur un substrat traditionnel. Ces puces organoïdes n'apprennent pas seulement les données ; elles apprennent d'elles en temps réel.</p>`,
      imageUrl:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      status: 'PUBLISHED',
      featured: false,
      trending: true,
      readTime: 12,
      authorId: author1.id,
      categoryId: cat.fr.tech.id,
      userId: admin.id,
    },
  });
  await prisma.articleTag.upsert({
    where: {
      articleId_tagId: { articleId: article2Fr.id, tagId: tag.fr.ai.id },
    },
    update: {},
    create: { articleId: article2Fr.id, tagId: tag.fr.ai.id },
  });

  // ── Article 2 — AR ──────────────────────────
  const article2Ar = await prisma.article.upsert({
    where: { slug: 'ufuq-alsilikun-alhawsaba-albiulujia' },
    update: {},
    create: {
      title: 'أفق السيليكون: لماذا ستكون الحقبة القادمة من الحوسبة بيولوجية',
      slug: 'ufuq-alsilikun-alhawsaba-albiulujia',
      locale: 'ar',
      excerpt:
        'مع اصطدام قانون مور بحدوده المادية، يتجه القطاع نحو الحمض النووي والمسارات العصبية الاصطناعية لإعادة تعريف الذكاء.',
      body: `<p>حدود ما نعرّفه بالحاسوب تتلاشى. على مدى سبعة عقود، اعتمدنا على البساطة الثنائية الأنيقة لترانزستورات السيليكون. جعلناها أصغر، وضغطناها بشكل أكثر إحكاماً، ودفعناها بشكل أسرع حتى وصلنا إلى حقبة الذكاء التوليدي الحالية. لكن الجدار يلوح في الأفق.</p>
<h2>ما وراء البوابة الثنائية</h2>
<p>مرحباً بكم في الحوسبة البيولوجية. في حين تعمل الرقائق التقليدية على جهود عالية ومنخفضة، تعمل الأنظمة البيولوجية للدماغ البشري على التدرجات الكيميائية والمرونة التشابكية. يُجري الدماغ البشري الواحد 10^16 عملية في الثانية مع استهلاك نحو 20 واط فقط.</p>
<blockquote>لم نعد نبني آلات تحاكي الحياة؛ بل نُعلّم الحياة كيف تؤدي المنطق. المستقبل ليس في المعدن، بل في النخاع.</blockquote>
<p>نجح باحثون في معهد زيورخ للأنظمة الحيوية الرقمية في دمج مجموعات من الخلايا العصبية الحية على ركيزة تقليدية. هذه الرقائق العضوية لا تعالج البيانات فحسب؛ بل تتعلم منها في الوقت الفعلي.</p>`,
      imageUrl:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      status: 'PUBLISHED',
      featured: false,
      trending: true,
      readTime: 12,
      authorId: author1.id,
      categoryId: cat.ar.tech.id,
      userId: admin.id,
    },
  });
  await prisma.articleTag.upsert({
    where: {
      articleId_tagId: { articleId: article2Ar.id, tagId: tag.ar.ai.id },
    },
    update: {},
    create: { articleId: article2Ar.id, tagId: tag.ar.ai.id },
  });

  console.log('✅ Sample articles seeded (en/fr/ar)');
  console.log('\n🎉 Database seed complete!\n');
  console.log('  Admin → email: admin@chronicler.com  |  password: admin123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
