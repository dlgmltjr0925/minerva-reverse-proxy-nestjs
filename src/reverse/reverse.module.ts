import { Module } from '@nestjs/common';
import { ReverseController } from './reverse.controller';
import { ReverseService } from './reverse.service';

@Module({
  controllers: [ReverseController],
  providers: [ReverseService],
})
export class ReverseModule {}
