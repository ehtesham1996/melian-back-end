import { Test, TestingModule } from '@nestjs/testing';
import { AddictionService } from './addiction.service';

describe('AddictionService', () => {
  let service: AddictionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddictionService]
    }).compile();

    service = module.get<AddictionService>(AddictionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
