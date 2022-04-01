import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TesterController } from './tester.controller';
import { TesterService } from './tester.service';

@Module({
  controllers: [TesterController],
  providers: [TesterService, PrismaService],
})
export class TesterModule {}
