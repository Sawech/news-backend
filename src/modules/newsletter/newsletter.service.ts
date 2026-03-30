import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(email: string) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('This email is already subscribed');
    }

    await this.prisma.newsletterSubscriber.create({ data: { email } });
    return { message: 'Successfully subscribed to the newsletter' };
  }

  /** Admin-only: list all subscribers with pagination */
  async findAll(page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.newsletterSubscriber.count(),
    ]);

    return { data, meta: { page, limit, total } };
  }

  async remove(id: string) {
    await this.prisma.newsletterSubscriber.delete({ where: { id } });
    return { message: 'Subscriber removed' };
  }
}
