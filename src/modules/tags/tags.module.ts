import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { AdminTagsController } from './admin-tags.controller';

@Module({
  controllers: [TagsController, AdminTagsController],
  providers: [TagsService],
})
export class TagsModule {}
