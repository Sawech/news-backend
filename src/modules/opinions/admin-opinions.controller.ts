import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/index';
import { CreateOpinionDto, UpdateOpinionDto } from './dto/opinion.dto';

@Controller('api/admin/opinions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'EDITOR')
export class AdminOpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Get()
  findAll() {
    return this.opinionsService.adminFindAll();
  }

  @Post()
  create(@Body() dto: CreateOpinionDto) {
    return this.opinionsService.create(dto);
  }

  @Put(':id')
  @Roles('ADMIN')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOpinionDto) {
    return this.opinionsService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.opinionsService.remove(id);
  }
}
