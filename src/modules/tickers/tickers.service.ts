import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateTickerDto,
  TickerQueryDto,
  UpdateTickerDto,
} from './dto/ticker.dto';

@Injectable()
export class TickersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: TickerQueryDto = {}) {
    const data = await this.prisma.ticker.findMany({
      orderBy: { createdAt: 'asc' },
      where: query.locale ? { locale: query.locale } : undefined,
    });
    return { data };
  }

  async findOne(id: string) {
    const ticker = await this.prisma.ticker.findUnique({ where: { id } });
    if (!ticker) throw new NotFoundException(`Ticker ${id} not found`);
    return { data: ticker };
  }

  async create(dto: CreateTickerDto) {
    const data = await this.prisma.ticker.create({ data: dto });
    return { data };
  }

  async update(id: string, dto: UpdateTickerDto) {
    await this.findOne(id);
    const data = await this.prisma.ticker.update({ where: { id }, data: dto });
    return { data };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.ticker.delete({ where: { id } });
    return { message: 'Ticker deleted' };
  }
}
