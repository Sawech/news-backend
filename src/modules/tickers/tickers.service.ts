import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTickerDto, UpdateTickerDto } from './dto/ticker.dto';

@Injectable()
export class TickersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.ticker.findMany({
      orderBy: { createdAt: 'asc' },
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
    await this.findOne(id); // 404 guard
    const data = await this.prisma.ticker.update({ where: { id }, data: dto });
    return { data };
  }

  async remove(id: string) {
    await this.findOne(id); // 404 guard
    await this.prisma.ticker.delete({ where: { id } });
    return { message: 'Ticker deleted' };
  }
}
