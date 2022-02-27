import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReverseService } from './reverse.service';
import { CreateReverseDto } from './dto/create-reverse.dto';
import { UpdateReverseDto } from './dto/update-reverse.dto';

@Controller('reverse')
export class ReverseController {
  constructor(private readonly reverseService: ReverseService) {}

  @Post()
  create(@Body() createReverseDto: CreateReverseDto) {
    return this.reverseService.create(createReverseDto);
  }

  @Get()
  findAll() {
    return this.reverseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reverseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReverseDto: UpdateReverseDto) {
    return this.reverseService.update(+id, updateReverseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reverseService.remove(+id);
  }
}
