import {
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Put,
  Delete,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { ReverseService } from './reverse.service';

@Controller('reverse')
export class ReverseController {
  constructor(private readonly reverseService: ReverseService) {}

  @Get(':testerId/*')
  get(@Req() req: Request, @Param('testerId', ParseIntPipe) testerId: number) {
    return this.reverseService.get(testerId, req);
  }

  @Post(':testerId/*')
  post(@Req() req: Request, @Param('testerId', ParseIntPipe) testerId: number) {
    return this.reverseService.post(testerId, req);
  }

  @Patch(':testerId/*')
  patch(
    @Req() req: Request,
    @Param('testerId', ParseIntPipe) testerId: number,
  ) {
    return this.reverseService.patch(testerId, req);
  }

  @Put(':testerId/*')
  put(@Req() req: Request, @Param('testerId', ParseIntPipe) testerId: number) {
    return this.reverseService.put(testerId, req);
  }

  @Delete(':testerId/*')
  delete(
    @Req() req: Request,
    @Param('testerId', ParseIntPipe) testerId: number,
  ) {
    return this.reverseService.delete(testerId, req);
  }
}
