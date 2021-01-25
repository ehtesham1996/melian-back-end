import { Test, TestingModule } from '@nestjs/testing';
import { AddictionResolver } from './addiction.resolver';
import { AddictionService } from './addiction.service';

describe('AddictionResolver', () => {
  let resolver: AddictionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddictionResolver, AddictionService],
    }).compile();

    resolver = module.get<AddictionResolver>(AddictionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
