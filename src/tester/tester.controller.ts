import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TesterService } from './tester.service';
import { CreateTesterDto } from './dto/create-tester.dto';
import { UpdateTesterDto } from './dto/update-tester.dto';

@Controller('tester')
export class TesterController {
  constructor(private readonly testerService: TesterService) {}

  @Post()
  async create(@Body() createTesterDto: CreateTesterDto) {
    const tester = await this.testerService.create(createTesterDto);

    return {
      data: {
        tester,
      },
      meta: {},
    };
  }

  @Get('search/:keyword')
  async findAll(@Param('keyword') keyword: string) {
    const testers = await this.testerService.findAll(keyword);

    return {
      data: {
        testers,
      },
      meta: {},
    };
  }

  @Get(':name')
  @HttpCode(200)
  async findOne(@Param('name') name: string) {
    const tester = await this.testerService.findOne(name);

    return {
      data: {
        tester,
      },
      meta: {},
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTesterDto: UpdateTesterDto,
  ) {
    const tester = await this.testerService.update(+id, updateTesterDto);

    return {
      data: {
        tester,
      },
      meta: {},
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const tester = await this.testerService.remove(+id);

    return {
      data: {
        tester,
      },
      meta: {},
    };
  }
}
