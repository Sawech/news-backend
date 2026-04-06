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

  async create(dto: CreateAuthorDto) {
    const data = await this.prisma.author.create({ data: dto });
    return { data };
  }

  async update(id: string, dto: UpdateAuthorDto) {
    await this.findOneById(id);

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
