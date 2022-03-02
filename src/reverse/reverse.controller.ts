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
    return this.reverseService.get(req);
  }

  @Post(':name/*')
  post(@Req() req: Request, @Body() body: any, @Param('name') name: string) {
    return this.reverseService.post(req, body);
  }

  @Patch(':name/*')
  patch(@Req() req: Request, @Body() body: any, @Param('name') name: string) {
    return this.reverseService.patch(req, body);
  }

  @Put(':name/*')
  put(@Req() req: Request, @Body() body: any, @Param('name') name: string) {
    return this.reverseService.put(req, body);
  }

  @Delete(':name/*')
  delete(@Req() req: Request, @Param('name') name: string) {
    return this.reverseService.delete(req);
  }
}
