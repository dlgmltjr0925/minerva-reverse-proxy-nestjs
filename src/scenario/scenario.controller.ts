import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ScenarioService } from './scenario.service';
import { CreateScenarioDto } from './dto/create-scenario.dto';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

@Controller('scenario')
export class ScenarioController {
  constructor(private readonly scenarioService: ScenarioService) {}

  @Post()
  async create(@Body() createScenarioDto: CreateScenarioDto) {
    const scenario = await this.scenarioService.create(createScenarioDto);

    return {
      data: {
        scenario,
      },
      meta: {},
    };
  }

  @Get('search/:keyword')
  async search(@Param('keyword') keyword?: string) {
    const scenarios = await this.scenarioService.findAll({ keyword });

    return {
      data: {
        scenarios,
      },
      meta: {},
    };
  }

  @Get(':testerId')
  async findAll(@Param('testerId', ParseIntPipe) testerId: number) {
    const scenarios = await this.scenarioService.findAll({ testerId });

    return {
      data: {
        scenarios,
      },
      meta: {},
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const scenario = await this.scenarioService.findOne(id);

    return {
      data: {
        scenario,
      },
      meta: {},
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScenarioDto: UpdateScenarioDto,
  ) {
    const scenario = await this.scenarioService.update(+id, updateScenarioDto);

    return {
      data: {
        scenario,
      },
      meta: {},
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const scenario = await this.scenarioService.remove(+id);

    return {
      data: {
        scenario,
      },
      meta: {},
    };
  }
}
