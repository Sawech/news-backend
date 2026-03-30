import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAuthorDto, UpdateAuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.author.findMany({
      orderBy: { name: 'asc' },
    });
    return { data };
  }

  async findBySlug(slug: string) {
    const author = await this.prisma.author.findUnique({ where: { slug } });
    if (!author) throw new NotFoundException(`Author "${slug}" not found`);
    return { data: author };
  }

  async create(dto: CreateAuthorDto) {
    const existing = await this.prisma.author.findUnique({
      where: { slug: dto.slug },
      select: { id: true },
    });
    if (existing)
      throw new ConflictException(`Slug "${dto.slug}" already exists`);

    const data = await this.prisma.author.create({ data: dto });
    return { data };
  }

  async update(id: string, dto: UpdateAuthorDto) {
    await this.findOneById(id);

    if (dto.slug) {
      const conflict = await this.prisma.author.findFirst({
        where: { slug: dto.slug, id: { not: id } },
        select: { id: true },
      });
      if (conflict)
        throw new ConflictException(`Slug "${dto.slug}" already exists`);
    }

    const data = await this.prisma.author.update({ where: { id }, data: dto });
    return { data };
  }

  async remove(id: string) {
    await this.findOneById(id);
    await this.prisma.author.delete({ where: { id } });
    return { message: 'Author deleted' };
  }

  private async findOneById(id: string) {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) throw new NotFoundException(`Author ${id} not found`);
    return author;
  }
}
