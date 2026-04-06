import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';

import { TickersModule } from './modules/tickers/tickers.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { TagsModule } from './modules/tags/tags.module';
import { OpinionsModule } from './modules/opinions/opinions.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TickersModule,
    ArticlesModule,
    AuthorsModule,
    CategoriesModule,
    TagsModule,
    OpinionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
