import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TickersService } from './tickers.service';
import { CreateTickerDto, UpdateTickerDto } from './dto/ticker.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/index';

@Controller('api/admin/tickers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'EDITOR')
export class AdminTickersController {
  constructor(private readonly tickersService: TickersService) {}

  @Get()
  findAll() {
    return this.tickersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tickersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTickerDto) {
    return this.tickersService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTickerDto) {
    return this.tickersService.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.tickersService.remove(id);
  }
}
