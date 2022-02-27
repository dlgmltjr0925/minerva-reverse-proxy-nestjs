import { Test, TestingModule } from '@nestjs/testing';

import { ReverseService } from './reverse.service';

describe('ReverseService', () => {
  let service: ReverseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReverseService],
    }).compile();

    service = module.get<ReverseService>(ReverseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
