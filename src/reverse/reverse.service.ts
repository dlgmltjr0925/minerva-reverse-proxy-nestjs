import { AxiosResponse, RecordService } from '../record/record.service';
import { Request, Response } from 'express';

import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

@Injectable()
export class ReverseService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prismaService: PrismaService,
    private recordService: RecordService,
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

  async requestForServerData(request: Request): Promise<AxiosResponse> {
    const start = new Date();
    try {
      const response = await this.httpService
        .request(this.getAxiosRequestConfigByRequest(request))
        .toPromise();

      return {
        ...response,
        responseTime: new Date().valueOf() - start.valueOf(),
      };
    } catch (error) {
      if (error.response) {
        error.response.responseTime = new Date().valueOf() - start.valueOf();
      }

      throw error;
    }
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

  async request(testerId: number, request: Request, response: Response) {
    const scenarioResponse = await this.requestForScenario(testerId, request);

    if (scenarioResponse) return scenarioResponse;

    try {
      const AxiosResponse = await this.requestForServerData(request);

      this.recordService.create(testerId, request, AxiosResponse);

      return response.status(AxiosResponse.status).json(AxiosResponse.data);
    } catch (error) {
      if (error.response) {
        this.recordService.create(testerId, request, error.response);

        if (typeof error.response.data === 'string') {
          return response
            .status(error.response.status)
            .send(error.response.data);
        } else {
          return response
            .status(error.response.status)
            .json(error.response.data);
        }
      }

      throw error;
    }
  }

  async get(testerId: number, request: Request, response: Response) {
    return await this.request(testerId, request, response);
  }

  async post(testerId: number, request: Request, response: Response) {
    return await this.request(testerId, request, response);
  }

  async patch(testerId: number, request: Request, response: Response) {
    return await this.request(testerId, request, response);
  }

  async put(testerId: number, request: Request, response: Response) {
    return await this.request(testerId, request, response);
  }

  async delete(testerId: number, request: Request, response: Response) {
    return await this.request(testerId, request, response);
  }
}
