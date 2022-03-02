import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ReverseModule } from './reverse/reverse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.env'],
    }),
    ReverseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
