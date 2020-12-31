import { Module } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { HobbyResolver } from './hobby.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Hobby, HobbySchema } from './hobby.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hobby.name, schema: HobbySchema }])
  ],
  providers: [HobbyResolver, HobbyService]
})
export class HobbyModule {}
