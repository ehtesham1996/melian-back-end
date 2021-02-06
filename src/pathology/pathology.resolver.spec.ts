import { Test, TestingModule } from '@nestjs/testing';
import { PathologyResolver } from './pathology.resolver';
import { PathologyService } from './pathology.service';

describe('PathologyResolver', () => {
  let resolver: PathologyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathologyResolver, PathologyService]
    }).compile();

    resolver = module.get<PathologyResolver>(PathologyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
