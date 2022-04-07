import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';

import { HistoryService } from './history.service';

interface FindAllQuery {
  keyword?: string;
  prevId?: string;
  nextId?: string;
}

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':testerId')
  async findAll(
    @Param('testerId', ParseIntPipe) testerId: number,
    @Query() query: FindAllQuery,
  ) {
    const { keyword } = query;
    const prevId = query.prevId ? parseInt(query.prevId) : undefined;
    const nextId = query.nextId ? parseInt(query.nextId) : undefined;

    const histories = await this.historyService.findAll({
      testerId,
      keyword,
      prevId,
      nextId,
    });

    return {
      data: {
        histories,
      },
      meta: {},
    };
  }
}
