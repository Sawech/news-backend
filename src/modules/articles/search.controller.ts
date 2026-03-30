import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { SearchQueryDto } from './dto/article.dto';

/**
 * GET /api/search?q=climate&page=1&limit=20
 * Full-text search across title, excerpt, and body of published articles.
 */
@Controller('api/search')
export class SearchController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  search(@Query() query: SearchQueryDto) {
    return this.articlesService.search(query);
  }
}
