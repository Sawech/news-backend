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

  /** GET /api/admin/tickers */
  @Get()
  findAll() {
    return this.tickersService.findAll();
  }

  /** GET /api/admin/tickers/:id */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tickersService.findOne(id);
  }

  /** POST /api/admin/tickers */
  @Post()
  create(@Body() dto: CreateTickerDto) {
    return this.tickersService.create(dto);
  }

  /** PUT /api/admin/tickers/:id */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTickerDto) {
    return this.tickersService.update(id, dto);
  }

  /** DELETE /api/admin/tickers/:id */
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.tickersService.remove(id);
  }
}
