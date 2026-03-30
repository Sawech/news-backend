import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';

/** GET /api/tags — public, used by article editor dropdowns */
@Controller('api/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }
}
