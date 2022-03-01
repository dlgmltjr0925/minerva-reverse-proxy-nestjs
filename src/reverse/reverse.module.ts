import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ReverseController } from './reverse.controller';
import { ReverseService } from './reverse.service';

@Module({
  imports: [HttpModule],
  controllers: [ReverseController],
  providers: [ReverseService],
})
export class ReverseModule {}
