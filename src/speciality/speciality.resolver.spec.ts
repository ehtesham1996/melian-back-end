import { Test, TestingModule } from '@nestjs/testing';
import { SpecialityResolver } from './speciality.resolver';
import { SpecialityService } from './speciality.service';

describe('SpecialityResolver', () => {
  let resolver: SpecialityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialityResolver, SpecialityService],
    }).compile();

    resolver = module.get<SpecialityResolver>(SpecialityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
