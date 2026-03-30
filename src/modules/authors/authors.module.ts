import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AdminAuthorsController } from './admin-authors.controller';

@Module({
  controllers: [AuthorsController, AdminAuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
