import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ReverseModule } from './reverse/reverse.module';
import { RecordService } from './record/record.service';
import { RecordModule } from './record/record.module';
import { ScenarioModule } from './scenario/scenario.module';
import { TesterModule } from './tester/tester.module';
import { HistoryModule } from './history/history.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    ReverseModule,
    RecordModule,
    ScenarioModule,
    TesterModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, RecordService],
})
export class AppModule {}
