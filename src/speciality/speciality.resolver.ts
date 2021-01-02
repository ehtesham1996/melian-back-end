import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpecialityService } from './speciality.service';
import { Speciality } from './entities/speciality.entity';
import { CreateSpecialityInput } from './dto/create-speciality.input';
import { UpdateSpecialityInput } from './dto/update-speciality.input';

@Resolver(() => Speciality)
export class SpecialityResolver {
  constructor(private readonly specialityService: SpecialityService) {}

  @Mutation(() => Speciality)
  async createSpeciality(@Args('createSpecialityInput') createSpecialityInput: CreateSpecialityInput) {
    return await this.specialityService.create(createSpecialityInput);
  }

  @Query(() => [Speciality], { name: 'speciality' })
  findAll() {
    return this.specialityService.findAll();
  }

  @Query(() => Speciality, { name: 'speciality' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.specialityService.findOne(id);
  }

  @Mutation(() => Speciality)
  updateSpeciality(@Args('updateSpecialityInput') updateSpecialityInput: UpdateSpecialityInput) {
    return this.specialityService.update(updateSpecialityInput.id, updateSpecialityInput);
  }

  @Mutation(() => Speciality)
  removeSpeciality(@Args('id', { type: () => Int }) id: number) {
    return this.specialityService.remove(id);
  }
}
