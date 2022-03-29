import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ReverseModule } from './reverse/reverse.module';
import { RecordService } from './record/record.service';
import { RecordModule } from './record/record.module';
import { ScenarioModule } from './scenario/scenario.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    ReverseModule,
    RecordModule,
    ScenarioModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, RecordService],
})
export class AppModule {}
