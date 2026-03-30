import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { NewsletterService } from './newsletter.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/index';

class NewsletterQueryDto {
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit?: number = 50;
}

@Controller('api/admin/newsletter')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminNewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  /** GET /api/admin/newsletter?page=1&limit=50 */
  @Get()
  findAll(@Query() query: NewsletterQueryDto) {
    return this.newsletterService.findAll(query.page, query.limit);
  }

  /** DELETE /api/admin/newsletter/:id */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsletterService.remove(id);
  }
}
