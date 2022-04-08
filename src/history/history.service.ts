import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface FindAllArgs {
  testerId: number;
  keyword?: string;
  prevId?: number;
  nextId?: number;
}

export interface RequestWhere {
  testerId: number;
  url?: { contains: string };
  id?: { lt: number } | { gt: number };
}

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ testerId, keyword, prevId, nextId }: FindAllArgs) {
    const where: RequestWhere = { testerId };

    if (keyword) where.url = { contains: keyword };
    if (prevId) where.id = { lt: prevId };
    if (nextId) where.id = { gt: nextId };

    const histories = await this.prismaService.request.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 20,
      where,
      include: {
        response: true,
      },
    });

    return histories.map((history) => ({
      ...history,
      query: JSON.parse(history.query),
      headers: JSON.parse(history.headers),
      body: JSON.parse(history.body),
      response: history.response
        ? {
            ...history.response,
            headers: JSON.parse(history.response.headers),
            body: JSON.parse(history.response.body),
          }
        : null,
    }));
  }
}
