import { Controller, Get } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Controller('api/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }
}
