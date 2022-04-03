import { CreateScenarioDto } from './dto/create-scenario.dto';
import { FindAllScenarioDto } from './dto/find-all-scenario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateScenarioDto } from './dto/update-scenario.dto';

@Injectable()
export class ScenarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createScenarioDto: CreateScenarioDto) {
    const scenario = await this.prismaService.scenario.create({
      data: createScenarioDto,
    });

    return scenario;
  }

  async findAll({ testerId, keyword }: FindAllScenarioDto) {
    const scenarios = await this.prismaService.scenario.findMany({
      where: {
        testerId,
        OR: [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      },
    });

    return scenarios;
  }

  async findOne(id: number) {
    const scenario = await this.prismaService.scenario.findUnique({
      where: { id },
    });

    return scenario;
  }

  async update(id: number, updateScenarioDto: UpdateScenarioDto) {
    const scenario = await this.prismaService.scenario.update({
      where: { id },
      data: updateScenarioDto,
    });

    return scenario;
  }

  async remove(id: number) {
    const scenario = await this.prismaService.scenario.delete({
      where: { id },
    });

    return scenario;
  }
}
