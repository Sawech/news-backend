import { Controller, Get, Query } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { TickerQueryDto } from './dto/ticker.dto';

@Controller('api/tickers')
export class TickersController {
  constructor(private readonly tickersService: TickersService) {}

  @Get()
  findAll(@Query() query: TickerQueryDto) {
    return this.tickersService.findAll(query);
  }
}
