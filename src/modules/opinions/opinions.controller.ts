import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { OpinionQueryDto, UpdateOpinionDto } from './dto/opinion.dto';

@Controller('api/opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Get()
  findAll(@Query() query: OpinionQueryDto) {
    return this.opinionsService.findAll(query);
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOpinionDto) {
    return this.opinionsService.update(id, dto);
  }
}
