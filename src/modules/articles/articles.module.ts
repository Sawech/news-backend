import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { SearchController } from './search.controller';

@Module({
  controllers: [ArticlesController, SearchController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
