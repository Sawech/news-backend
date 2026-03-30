import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { AdminArticlesController } from './admin-articles.controller';
import { SearchController } from './search.controller';

@Module({
  controllers: [ArticlesController, AdminArticlesController, SearchController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
