import { Test, TestingModule } from '@nestjs/testing';

import { ReverseController } from './reverse.controller';
import { ReverseService } from './reverse.service';

describe('ReverseController', () => {
  let controller: ReverseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReverseController],
      providers: [ReverseService],
    }).compile();

    controller = module.get<ReverseController>(ReverseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
