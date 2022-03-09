import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { ReverseController } from './reverse.controller';
import { ReverseService } from './reverse.service';

@Module({
  imports: [HttpModule],
  controllers: [ReverseController],
  providers: [ReverseService, PrismaService],
})
export class ReverseModule {}
