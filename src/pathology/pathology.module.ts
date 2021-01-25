import { Module } from '@nestjs/common';
import { PathologyService } from './pathology.service';
import { PathologyResolver } from './pathology.resolver';

@Module({
  providers: [PathologyResolver, PathologyService]
})
export class PathologyModule {}
