import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityResolver } from './speciality.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Speciality, SpecialitySchema } from './entities/speciality.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Speciality.name, schema: SpecialitySchema }
    ])
  ],
  providers: [SpecialityResolver, SpecialityService],
  exports: [SpecialityService]
})
export class SpecialityModule {}
