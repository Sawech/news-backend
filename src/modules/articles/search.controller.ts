import { Controller, Get, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { SearchQueryDto } from './dto/article.dto';

@Controller('api/search')
export class SearchController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  search(@Query() query: SearchQueryDto) {
    return this.articlesService.search(query);
  }
}
