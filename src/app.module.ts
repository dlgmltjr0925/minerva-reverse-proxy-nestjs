import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReverseModule } from './reverse/reverse.module';

@Module({
  imports: [ReverseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
