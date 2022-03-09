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
@Injectable()
export class ReverseService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prismaService: PrismaService,
  ) {}

  getAxiosRequestConfigByRequest(
    { method, params, query, headers }: Request,
    body?: any,
  ): AxiosRequestConfig {
    delete headers.host;

    console.log({
      method: method as Method,
      baseURL: this.configService.get<string>('BASE_URL'),
      url: params[0],
      params: query,
      data: body,
      headers: {
        via: 'minerva reverse proxy/1.0.0',
        ...headers,
      },
    });

    return {
      method: method as Method,
      baseURL: this.configService.get<string>('BASE_URL'),
      url: params[0],
      params: query,
      data: body,
      headers: {
        via: 'minerva reverse proxy/1.0.0',
        ...headers,
      },
    };
  }

  async request(req: Request, body?: any) {
    const { data } = await this.httpService
      .request(this.getAxiosRequestConfigByRequest(req, body))
      .toPromise();

    return data;
  }

  async requestScenario(req: Request, body?: any) {
    const response = await this.prismaService.request.findFirst({
      where: {
        url: req.originalUrl,
      },
      include: {
        scenario: true,
      },
    });

    return response;
  }

  async get(req: Request): Promise<any> {
    console.log(await this.requestScenario(req));
    return await this.request(req);
  }

  async post(req: Request, body: any) {
    return await this.request(req, body);
  }

  async patch(req: Request, body: any) {
    return await this.request(req, body);
  }

  async put(req: Request, body: any) {
    return await this.request(req, body);
  }

  async delete(req: Request) {
    return await this.request(req);
  }
}
