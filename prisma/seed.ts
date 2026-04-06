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

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'world' },
      update: {},
      create: {
        name: 'World',
        slug: 'world',
        description: 'Global news and international affairs',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'politics' },
      update: {},
      create: {
        name: 'Politics',
        slug: 'politics',
        description: 'Political analysis and commentary',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'tech' },
      update: {},
      create: {
        name: 'Tech',
        slug: 'tech',
        description: 'Technology, innovation, and digital culture',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'business' },
      update: {},
      create: {
        name: 'Business',
        slug: 'business',
        description: 'Markets, economics, and corporate news',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'culture' },
      update: {},
      create: {
        name: 'Culture',
        slug: 'culture',
        description: 'Arts, entertainment, and society',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'science' },
      update: {},
      create: {
        name: 'Science',
        slug: 'science',
        description: 'Scientific discovery and research',
      },
    }),
  ]);
  console.log(`✅ ${categories.length} categories`);

  const opinions = await Promise.all([
    prisma.opinion.upsert({
      where: { id: 1 },
      update: {},
      create: {
        pubName: 'Ali',
        content: 'Ali Opinion',
        subject: 'Subject 1',
        linkUrl: 'http://example.com/opinion1',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 2 },
      update: {},
      create: {
        pubName: 'Bob',
        content: 'Bob Opinion',
        subject: 'Subject 2',
        linkUrl: 'http://example.com/opinion2',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 3 },
      update: {},
      create: {
        pubName: 'Mohammed',
        content: 'Mohammed Opinion',
        subject: 'Subject 3',
        linkUrl: 'http://example.com/opinion3',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 4 },
      update: {},
      create: {
        pubName: 'Ali FR',
        content: 'Ali FR Opinion',
        subject: 'Subject 1 FR',
        linkUrl: 'http://example.com/opinion1-fr',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 5 },
      update: {},
      create: {
        pubName: 'Bob FR',
        content: 'Bob FR Opinion',
        subject: 'Subject 2 FR',
        linkUrl: 'http://example.com/opinion2-fr',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 6 },
      update: {},
      create: {
        pubName: 'Mohammed FR',
        content: 'Mohammed FR Opinion',
        subject: 'Subject 3 FR',
        linkUrl: 'http://example.com/opinion3-fr',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 7 },
      update: {},
      create: {
        pubName: 'Ali AR',
        content: 'Ali AR Opinion',
        subject: 'Subject 1 AR',
        linkUrl: 'http://example.com/opinion1-ar',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 8 },
      update: {},
      create: {
        pubName: 'Bob AR',
        content: 'Bob AR Opinion',
        subject: 'Subject 2 AR',
        linkUrl: 'http://example.com/opinion2-ar',
      },
    }),
    prisma.opinion.upsert({
      where: { id: 9 },
      update: {},
      create: {
        pubName: 'Mohammed AR',
        content: 'Mohammed AR Opinion',
        subject: 'Subject 3 AR',
        linkUrl: 'http://example.com/opinion3-ar',
      },
    }),
  ]);
  console.log(`✅ ${opinions.length} opinions`);

  const tags = await Promise.all([
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
  ]);
  console.log(`✅ ${tags.length} tags`);

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

  const tickerContents = [
    'G7 summit concludes with landmark digital trade agreement',
    'Markets rally as inflation data comes in below expectations',
    'New climate report warns of accelerating sea level rise',
    'Tech giants face fresh antitrust scrutiny in Brussels',
  ];

  const tickerCount = await prisma.ticker.count();
  if (tickerCount === 0) {
    await prisma.ticker.createMany({
      data: tickerContents.map((content) => ({ content })),
    });
    console.log(`✅ ${tickerContents.length} tickers created`);
  } else {
    console.log(`⏩ Tickers already seeded (${tickerCount} found), skipping`);
  }

  const article1 = await prisma.article.upsert({
    where: { slug: 'architecture-of-silence-global-data-sovereignty' },
    update: {},
    create: {
      title:
        'The Architecture of Silence: Navigating the New Global Data Sovereignty',
      slug: 'architecture-of-silence-global-data-sovereignty',
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
      // publishedAt: new Date('2024-10-24'),
      authorId: author2.id,
      categoryId: categories[0].id,
      userId: admin.id,
    },
  });

  await prisma.articleTag.upsert({
    where: { articleId_tagId: { articleId: article1.id, tagId: tags[3].id } },
    update: {},
    create: { articleId: article1.id, tagId: tags[3].id },
  });

  const article2 = await prisma.article.upsert({
    where: { slug: 'silicon-horizon-biological-computing' },
    update: {},
    create: {
      title:
        'The Silicon Horizon: Why the Next Era of Computing Will Be Biological',
      slug: 'silicon-horizon-biological-computing',
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
      // publishedAt: new Date('2024-10-20'),
      authorId: author1.id,
      categoryId: categories[2].id,
      userId: admin.id,
    },
  });

  await prisma.articleTag.upsert({
    where: { articleId_tagId: { articleId: article2.id, tagId: tags[0].id } },
    update: {},
    create: { articleId: article2.id, tagId: tags[0].id },
  });

  console.log('✅ Sample articles seeded');
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
