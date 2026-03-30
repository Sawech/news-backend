import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Public ─────────────────────────────────────────────────────────────────

  async findAll() {
    const data = await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return { data };
  }

  async findBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({ where: { slug } });
    if (!category) throw new NotFoundException(`Category "${slug}" not found`);
    return { data: category };
  }

  // ── Admin ──────────────────────────────────────────────────────────────────

  async adminFindAll() {
    const data = await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { articles: true } } },
    });
    return { data };
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
      select: { id: true },
    });
    if (existing)
      throw new ConflictException(`Slug "${dto.slug}" already exists`);

    const data = await this.prisma.category.create({ data: dto });
    return { data };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOneById(id);

    if (dto.slug) {
      const conflict = await this.prisma.category.findFirst({
        where: { slug: dto.slug, id: { not: id } },
        select: { id: true },
      });
      if (conflict)
        throw new ConflictException(`Slug "${dto.slug}" already exists`);
    }

    const data = await this.prisma.category.update({
      where: { id },
      data: dto,
    });
    return { data };
  }

  async remove(id: string) {
    await this.findOneById(id);
    await this.prisma.category.delete({ where: { id } });
    return { message: 'Category deleted' };
  }

  private async findOneById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category ${id} not found`);
    return category;
  }
}
