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

const ARTICLE_INCLUDE = {
  author: {
    select: { id: true, name: true, bio: true, avatarUrl: true },
  },
  category: {
    select: { id: true, name: true, slug: true },
  },
  tags: {
    select: { tag: { select: { name: true, locale: true } } },
  },
} as const;

function sanitizeQuery(q: string): string {
  return q.replace(/[\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g, '').trim();
}

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: ArticleQueryDto) {
    const {
      page = 1,
      limit = 20,
      category,
      featured,
      trending,
      year,
      month,
      week,
      locale,
    } = query;
    const skip = (page - 1) * limit;

    let dateFilter = {};
    const now = new Date();
    if (year) {
      const y = parseInt(year, 10);
      if (!isNaN(y)) {
        dateFilter = {
          updatedAt: {
            gte: new Date(y, 0, 1),
            lt: new Date(y + 1, 0, 1),
          },
        };
      }
    }

    if (month) {
      const from = new Date(now);
      from.setMonth(now.getMonth() - 1);
      dateFilter = { updatedAt: { lt: from } };
    }

    if (week) {
      const from = new Date(now);
      from.setDate(now.getDate() - 7);
      dateFilter = { updatedAt: { lt: from } };
    }
    const where = {
      status: 'PUBLISHED' as const,
      ...(category ? { category: { slug: category } } : {}),
      ...(featured !== undefined ? { featured } : {}),
      ...(trending !== undefined ? { trending } : {}),
      ...(locale ? { locale } : {}),
      ...dateFilter,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        where,
        include: ARTICLE_INCLUDE,
        orderBy: { updatedAt: 'desc' },
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

    const related = await this.prisma.article.findMany({
      where: {
        categoryId: article.categoryId,
        status: 'PUBLISHED',
        id: { not: article.id },
      },
      include: ARTICLE_INCLUDE,
      orderBy: { updatedAt: 'desc' },
      take: 4,
    });

    return { data: article, related };
  }

  async search(query: SearchQueryDto) {
    const { q, page = 1, limit = 20, locale } = query;
    const skip = (page - 1) * limit;

    // Sanitize to strip invisible Unicode characters that break Arabic matching
    const cleanQ = sanitizeQuery(q);

    if (!cleanQ) {
      return {
        data: [],
        query: q,
        meta: { page, limit, total: 0, totalPages: 0 },
      };
    }

    const where = {
      status: 'PUBLISHED' as const,
      ...(locale ? { locale } : {}),
      OR: [
        // Scalar fields on Article — safe to use mode: insensitive
        { title: { contains: cleanQ, mode: 'insensitive' as const } },
        { excerpt: { contains: cleanQ, mode: 'insensitive' as const } },
        { body: { contains: cleanQ, mode: 'insensitive' as const } },
        // Relation fields — mode: insensitive is NOT supported here; omit it
        { category: { name: { contains: cleanQ } } },
        {
          tags: {
            some: {
              tag: { name: { contains: cleanQ } },
            },
          },
        },
        { author: { name: { contains: cleanQ } } },
      ],
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.article.findMany({
        where,
        include: ARTICLE_INCLUDE,
        orderBy: { updatedAt: 'desc' },
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
    await this.adminFindOne(id);

    const { tagIds, ...rest } = dto;

    const article = await this.prisma.article.update({
      where: { id },
      data: {
        ...rest,
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
    await this.adminFindOne(id);
    await this.prisma.article.delete({ where: { id } });
    return { message: 'Article deleted' };
  }
}
