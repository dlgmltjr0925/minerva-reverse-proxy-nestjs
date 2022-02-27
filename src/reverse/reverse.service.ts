import { CreateReverseDto } from './dto/create-reverse.dto';
import { Injectable } from '@nestjs/common';
import { UpdateReverseDto } from './dto/update-reverse.dto';

@Injectable()
export class ReverseService {
  create(createReverseDto: CreateReverseDto) {
    return 'This action adds a new reverse';
  }

  findAll() {
    return `This action returns all reverse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reverse`;
  }

  update(id: number, updateReverseDto: UpdateReverseDto) {
    return `This action updates a #${id} reverse`;
  }

  remove(id: number) {
    return `This action removes a #${id} reverse`;
  }
}
