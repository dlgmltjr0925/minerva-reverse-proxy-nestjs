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
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ReverseService } from './reverse.service';

@Controller('reverse')
export class ReverseController {
  constructor(private readonly reverseService: ReverseService) {}

  @Get(':testerId/*')
  async get(
    @Req() req: Request,
    @Res() res: Response,
    @Param('testerId', ParseIntPipe) testerId: number,
  ) {
    const data = await this.reverseService.get(testerId, req, res);

    return data;
  }

  @Post(':testerId/*')
  post(
    @Req() req: Request,
    @Res() res: Response,
    @Param('testerId', ParseIntPipe) testerId: number,
  ) {
    return this.reverseService.post(testerId, req, res);
  }

  @Patch(':testerId/*')
  patch(
    @Req() req: Request,
    @Res() res: Response,
    @Param('testerId', ParseIntPipe) testerId: number,
  ) {
    return this.reverseService.patch(testerId, req, res);
  }

  @Put(':testerId/*')
  put(
    @Req() req: Request,
    @Res() res: Response,
    @Param('testerId', ParseIntPipe) testerId: number,
  ) {
    return this.reverseService.put(testerId, req, res);
  }

  @Delete(':testerId/*')
  delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('testerId', ParseIntPipe) testerId: number,
  ) {
    return this.reverseService.delete(testerId, req, res);
  }
}
