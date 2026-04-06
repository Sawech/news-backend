import { Controller, Get, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagQueryDto } from './dto/tag.dto';

@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@Query() query: TagQueryDto) {
    return this.tagsService.findAll(query);
  }
}
