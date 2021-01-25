import { Test, TestingModule } from '@nestjs/testing';
import { PathologyService } from './pathology.service';

describe('PathologyService', () => {
  let service: PathologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathologyService],
    }).compile();

    service = module.get<PathologyService>(PathologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
