import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

export type AxiosRequestHeaders = Record<string, string | number | boolean>;

interface AxiosRequestConfig {
  method: Method;
  baseURL: string;
  url: string;
  params: any;
  data?: any;
  headers: any;
}

interface Response extends AxiosResponse<any, any> {
  responseTime: number;
}

@Injectable()
export class ReverseService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  hasBody(method: Method) {
    return ['put', 'patch', 'post'].includes(method.toLowerCase());
  }

  getAxiosRequestConfigByRequest({
    method,
    params,
    query,
    headers,
    body,
  }: Request): AxiosRequestConfig {
    delete headers.host;

    return {
      method: method as Method,
      baseURL: this.configService.get<string>('BASE_URL'),
      url: params[0],
      params: query,
      data: this.hasBody(method as Method) ? body : undefined,
      headers: {
        via: 'minerva reverse proxy/1.0.0',
        ...headers,
      },
    };
  }

  async requestForServerData(request: Request): Promise<Response> {
    const start = new Date();
    const response = await this.httpService
      .request(this.getAxiosRequestConfigByRequest(request))
      .toPromise();

    return {
      ...response,
      responseTime: new Date().valueOf() - start.valueOf(),
    };
  }

  async requestForScenario(testerId: number, request: Request) {
    const response = await this.prismaService.request.findFirst({
      include: {
        scenario: true,
      },
      where: {
        url: request.originalUrl,
        scenario: {
          active: true,
          tester: {
            id: testerId,
          },
        },
      },
    });

    return response;
  }

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
    response: Response,
  ) {
    const { status, headers, data, responseTime } = response;

    await this.prismaService.response.create({
      data: {
        testerId,
        requestId,
        status,
        headers: JSON.stringify(headers),
        body: JSON.stringify(data),
        responseTime,
      },
    });
  }

  async create(testerId: number, request: Request, response?: Response) {
    const { id } = await this.createRequest(testerId, request);
    if (response) this.createResponse(testerId, id, response);
  }

  async request(testerId: number, request: Request) {
    const scenarioResponse = await this.requestForScenario(testerId, request);

    if (scenarioResponse) return scenarioResponse;

    const response = await this.requestForServerData(request);

    this.create(testerId, request, response);

    return response.data;
  }

  async get(testerId: number, request: Request) {
    return await this.request(testerId, request);
  }

  async post(testerId: number, request: Request) {
    return await this.request(testerId, request);
  }

  async patch(testerId: number, request: Request) {
    return await this.request(testerId, request);
  }

  async put(testerId: number, request: Request) {
    return await this.request(testerId, request);
  }

  async delete(testerId: number, request: Request) {
    return await this.request(testerId, request);
  }
}
