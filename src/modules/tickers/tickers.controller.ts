import { Controller, Get } from '@nestjs/common';
import { TickersService } from './tickers.service';

/** GET /api/tickers — public, used by the news ticker banner */
@Controller('api/tickers')
export class TickersController {
  constructor(private readonly tickersService: TickersService) {}

  @Get()
  findAll() {
    return this.tickersService.findAll();
  }
}
