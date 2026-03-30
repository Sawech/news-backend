import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  ArticleQueryDto,
  CreateArticleDto,
  SearchQueryDto,
  UpdateArticleDto,
  AdminArticleQueryDto,
} from './dto/article.dto';

// Single source of truth for which relations are loaded with every article query.
// Keeping this as a const avoids copy-paste drift across findAll / findOne / create.
const ARTICLE_INCLUDE = {
  author: {
    select: { id: true, name: true, slug: true, bio: true, avatarUrl: true },
  },
  category: {
    select: { id: true, name: true, slug: true },
  },
  tags: {
    select: { tag: { select: { name: true, slug: true } } },
  },
} as const;

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Public ─────────────────────────────────────────────────────────────────

  async findAll(query: ArticleQueryDto) {
    const { page = 1, limit = 20, category, featured, trending } = query;
    const skip = (page - 1) * limit;

    const where = {
      status: 'PUBLISHED' as const,
      ...(category ? { category: { slug: category } } : {}),
      ...(featured !== undefined ? { featured } : {}),
      ...(trending !== undefined ? { trending } : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        where,
        include: ARTICLE_INCLUDE,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const article = await this.prisma.article.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: ARTICLE_INCLUDE,
    });

    if (!article) throw new NotFoundException(`Article "${slug}" not found`);

    // Related articles: same category, different id, newest first
    const related = await this.prisma.article.findMany({
      where: {
        categoryId: article.categoryId,
        status: 'PUBLISHED',
        id: { not: article.id },
      },
      include: ARTICLE_INCLUDE,
      orderBy: { publishedAt: 'desc' },
      take: 4,
    });

    return { data: article, related };
  }

  async search(query: SearchQueryDto) {
    const { q, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where = {
      status: 'PUBLISHED' as const,
      OR: [
        { title: { contains: q, mode: 'insensitive' as const } },
        { excerpt: { contains: q, mode: 'insensitive' as const } },
        { body: { contains: q, mode: 'insensitive' as const } },
      ],
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        where,
        include: ARTICLE_INCLUDE,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.article.count({ where }),
    ]);

    return {
      data,
      query: q,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // ── Admin ──────────────────────────────────────────────────────────────────

  async adminFindAll(query: AdminArticleQueryDto) {
    const { page = 1, limit = 20, status, search } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' as const } },
              { excerpt: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        where,
        include: ARTICLE_INCLUDE,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.article.count({ where }),
    ]);

    return { data, meta: { page, limit, total } };
  }

  async adminFindOne(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: ARTICLE_INCLUDE,
    });

    if (!article) throw new NotFoundException(`Article ${id} not found`);
    return { data: article };
  }

  async create(dto: CreateArticleDto, userId: string) {
    const existing = await this.prisma.article.findUnique({
      where: { slug: dto.slug },
      select: { id: true },
    });
    if (existing)
      throw new ConflictException(`Slug "${dto.slug}" already exists`);

    const { tagIds, ...rest } = dto;

    const article = await this.prisma.article.create({
      data: {
        ...rest,
        userId,
        // Stamp publishedAt the moment status becomes PUBLISHED
        publishedAt: dto.status === 'PUBLISHED' ? new Date() : undefined,
        tags: tagIds?.length
          ? {
              create: tagIds.map((tagId) => ({
                tag: { connect: { id: tagId } },
              })),
            }
          : undefined,
      },
      include: ARTICLE_INCLUDE,
    });

    return { data: article };
  }

  async update(id: string, dto: UpdateArticleDto) {
    // Throws 404 if article doesn't exist — reuse adminFindOne
    await this.adminFindOne(id);

    const { tagIds, ...rest } = dto;

    // Only stamp publishedAt when transitioning to PUBLISHED and it's not already set
    const existing = await this.prisma.article.findUnique({
      where: { id },
      select: { status: true, publishedAt: true },
    });
    const shouldStampPublishedAt =
      rest.status === 'PUBLISHED' &&
      existing?.status !== 'PUBLISHED' &&
      !existing?.publishedAt;

    const article = await this.prisma.article.update({
      where: { id },
      data: {
        ...rest,
        ...(shouldStampPublishedAt ? { publishedAt: new Date() } : {}),
        // When tagIds are provided (even empty array), replace all tags atomically
        ...(tagIds !== undefined
          ? {
              tags: {
                deleteMany: {},
                create: tagIds.map((tagId) => ({
                  tag: { connect: { id: tagId } },
                })),
              },
            }
          : {}),
      },
      include: ARTICLE_INCLUDE,
    });

    return { data: article };
  }

  async remove(id: string) {
    await this.adminFindOne(id); // 404 guard
    await this.prisma.article.delete({ where: { id } });
    return { message: 'Article deleted' };
  }
}
