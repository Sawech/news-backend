import { Module } from '@nestjs/common';
import { OpinionsController } from './opinions.controller';
import { AdminOpinionsController } from './admin-opinions.controller';
import { OpinionsService } from './opinions.service';

@Module({
  controllers: [OpinionsController, AdminOpinionsController],
  providers: [OpinionsService],
  exports: [OpinionsService],
})
export class OpinionsModule {}
