import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ReverseModule } from './reverse/reverse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
    }),
    ReverseModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
