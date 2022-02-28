import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Put,
  Delete,
  Body,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ReverseService } from './reverse.service';

@Controller('reverse')
export class ReverseController {
  constructor(private readonly reverseService: ReverseService) {}

  @Get(':name/*')
  get(@Req() req: Request, @Param('name') name: string) {
    console.log(req.url);
    return this.reverseService.get();
  }

  @Post(':name/*')
  post(@Req() req: Request, @Body() body: any, @Param('name') name: string) {
    console.log(req);
    return this.reverseService.post();
  }

  @Patch(':name/*')
  patch(@Req() req: Request, @Body() body: any, @Param('name') name: string) {
    console.log(req);
    return this.reverseService.patch();
  }

  @Put(':name/*')
  put(@Req() req: Request, @Body() body: any, @Param('name') name: string) {
    console.log(req);
    return this.reverseService.put();
  }

  @Delete(':name/*')
  delete(@Req() req: Request, @Param('name') name: string) {
    console.log(req);
    return this.reverseService.delete();
  }
}
