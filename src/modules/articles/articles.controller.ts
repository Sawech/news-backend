import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleQueryDto } from './dto/article.dto';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /**
   * GET /api/articles
   * Query params: page, limit, category (slug), featured, trending
   */
  @Get()
  findAll(@Query() query: ArticleQueryDto) {
    return this.articlesService.findAll(query);
  }

  /**
   * GET /api/articles/:slug
   * Returns article + related articles in same category
   */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }
}
