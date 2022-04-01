import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateTesterDto } from './dto/create-tester.dto';
import { ErrorCode } from 'src/error';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTesterDto } from './dto/update-tester.dto';

@Injectable()
export class TesterService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ name }: CreateTesterDto) {
    try {
      const newTester = await this.prismaService.tester.create({
        data: { name },
      });

      return newTester;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            {
              errorCode: ErrorCode.ALREADY_REGISTERED_DATA,
              errorMsg: '중복된 이름입니다.',
            },
            HttpStatus.CONFLICT,
          );
        }
      }

      throw error;
    }
  }

  async findAll(keyword: string) {
    const testers = await this.prismaService.tester.findMany({
      where: {
        name: {
          contains: keyword,
        },
      },
    });

    return testers;
  }

  async findOne(name: string) {
    const tester = await this.prismaService.tester.findUnique({
      where: {
        name,
      },
    });

    if (!tester)
      throw new HttpException(
        {
          errorCode: ErrorCode.NOT_FOUND,
          errorMsg: '테스터를 찾을 수 없습니다.',
        },
        HttpStatus.NOT_FOUND,
      );

    return tester;
  }

  async update(id: number, updateTesterDto: UpdateTesterDto) {
    try {
      const tester = await this.prismaService.tester.update({
        data: updateTesterDto,
        where: { id },
      });

      return tester;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            {
              errorCode: ErrorCode.ALREADY_REGISTERED_DATA,
              errorMsg: '중복된 이름입니다.',
            },
            HttpStatus.CONFLICT,
          );
        }
      }

      throw error;
    }
  }

  async remove(id: number) {
    try {
      const tester = await this.prismaService.tester.delete({
        where: { id },
      });

      return tester;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException(
            {
              errorCode: ErrorCode.NOT_FOUND,
              errorMsg: '테스터를 찾을 수 없습니다.',
            },
            HttpStatus.NOT_FOUND,
          );
        }
      }

      throw error;
    }
  }
}
