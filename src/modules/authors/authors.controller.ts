import { Controller, Get, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  /** GET /api/authors */
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  /** GET /api/authors/:slug */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.authorsService.findBySlug(slug);
  }
}
