import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module'; // ← This was missing

// Import other modules you have created (add them here as you build)
import { TickersModule } from './modules/tickers/tickers.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { TagsModule } from './modules/tags/tags.module';

// etc.

@Module({
  imports: [
    PrismaModule,
    AuthModule, // ← Critical for login to work
    TickersModule,
    ArticlesModule,
    AuthorsModule,
    NewsletterModule,
    CategoriesModule,
    TagsModule,
    // ... add all your other feature modules here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
