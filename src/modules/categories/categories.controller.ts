import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryQueryDto } from './dto/category.dto';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoriesService.findAll(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.categoriesService.findBySlug(slug);
  }
}
