import { Module } from '@nestjs/common';
import { AddictionService } from './addiction.service';
import { AddictionResolver } from './addiction.resolver';

@Module({
  providers: [AddictionResolver, AddictionService]
})
export class AddictionModule {}
