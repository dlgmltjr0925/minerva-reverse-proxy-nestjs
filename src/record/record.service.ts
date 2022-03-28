import * as Axios from 'axios';

import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Request } from 'express';

export interface AxiosResponse extends Axios.AxiosResponse<any, any> {
  responseTime: number;
}

@Injectable()
export class RecordService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRequest(testerId: number, request: Request) {
    const { method, originalUrl, params, query, headers, body } = request;

    return await this.prismaService.request.create({
      select: {
        id: true,
      },
      data: {
        method,
        testerId,
        url: originalUrl,
        path: params[0],
        query: JSON.stringify(query),
        headers: JSON.stringify(headers),
        body: JSON.stringify(body),
      },
    });
  }

  async createResponse(
    testerId: number,
    requestId: number,
    response: AxiosResponse,
  ) {
    const { status, headers, data, responseTime } = response;

    await this.prismaService.response.create({
      data: {
        testerId,
        requestId,
        status,
        headers: JSON.stringify(headers),
        body: typeof data === 'string' ? data : JSON.stringify(data),
        responseTime,
      },
    });
  }

  async create(testerId: number, request: Request, response?: AxiosResponse) {
    const { id } = await this.createRequest(testerId, request);
    if (response) this.createResponse(testerId, id, response);
  }
}
