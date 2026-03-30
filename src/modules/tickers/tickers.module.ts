import { Module } from '@nestjs/common';
import { TickersService } from './tickers.service';
import { TickersController } from './tickers.controller';
import { AdminTickersController } from './admin-tickers.controller';

@Module({
  controllers: [TickersController, AdminTickersController],
  providers: [TickersService],
})
export class TickersModule {}
