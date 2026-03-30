import { Controller, Get } from '@nestjs/common';
import { TickersService } from './tickers.service';

@Controller('api/tickers')
export class TickersController {
  constructor(private readonly tickersService: TickersService) {}

  @Get()
  findAll() {
    return this.tickersService.findAll();
  }
}
