import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateOpinionDto,
  OpinionQueryDto,
  UpdateOpinionDto,
} from './dto/opinion.dto';

@Injectable()
export class OpinionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: OpinionQueryDto = {}) {
    const data = await this.prisma.opinion.findMany({
      orderBy: { pubName: 'asc' },
      where: query.locale ? { locale: query.locale } : undefined,
    });
    return { data };
  }

  // async findBySlug(slug: string) {
  //   const opinion = await this.prisma.opinion.findUnique({ where: { slug } });
  //   if (!opinion) throw new NotFoundException(`Opinion "${slug}" not found`);
  //   return { data: opinion };
  // }

  async adminFindAll() {
    const data = await this.prisma.opinion.findMany({
      orderBy: { pubName: 'asc' },
    });
    return { data };
  }

  async create(dto: CreateOpinionDto) {
    const data = await this.prisma.opinion.create({ data: dto });
    return { data };
  }

  async update(id: number, dto: UpdateOpinionDto) {
    await this.findOneById(id);

    const data = await this.prisma.opinion.update({
      where: { id },
      data: dto,
    });
    return { data };
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.prisma.opinion.delete({ where: { id } });
    return { message: 'Opinion deleted' };
  }

  private async findOneById(id: number) {
    const opinion = await this.prisma.opinion.findUnique({ where: { id } });
    if (!opinion) throw new NotFoundException(`Opinion ${id} not found`);
    return opinion;
  }
}
