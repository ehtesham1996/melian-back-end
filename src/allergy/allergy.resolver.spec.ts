import { Test, TestingModule } from '@nestjs/testing';
import { AllergyResolver } from './allergy.resolver';
import { AllergyService } from './allergy.service';

describe('AllergyResolver', () => {
  let resolver: AllergyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllergyResolver, AllergyService]
    }).compile();

    resolver = module.get<AllergyResolver>(AllergyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
