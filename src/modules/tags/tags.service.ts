import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTagDto } from './dto/tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.tag.findMany({ orderBy: { name: 'asc' } });
    return { data };
  }

  async create(dto: CreateTagDto) {
    const existing = await this.prisma.tag.findUnique({
      where: { slug: dto.slug },
      select: { id: true },
    });
    if (existing)
      throw new ConflictException(`Slug "${dto.slug}" already exists`);

    const data = await this.prisma.tag.create({ data: dto });
    return { data };
  }

  async remove(id: string) {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundException(`Tag ${id} not found`);

    await this.prisma.tag.delete({ where: { id } });
    return { message: 'Tag deleted' };
  }
}
