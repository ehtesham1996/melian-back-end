import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SpecialityService } from './speciality.service';
import { Speciality } from './entities/speciality.entity';
import { CreateSpecialityInput } from './dto/create-speciality.input';

@Resolver(() => Speciality)
export class SpecialityResolver {
  constructor(private readonly specialityService: SpecialityService) {}

  @Mutation(() => Speciality)
  async addSpecialityType(@Args('createSpecialityInput') createSpecialityInput: CreateSpecialityInput) {
    return await this.specialityService.create(createSpecialityInput);
  }

  @Query(() => [Speciality])
  async specialities() {
    return this.specialityService.findAll();
  }

  @Query(() => Speciality)
  async specialityById(@Args('id', { type: () => ID }) id: string) {
    return this.specialityService.findOne(id);
  }

  // @Mutation(() => Speciality)
  // updateSpeciality(@Args('updateSpecialityInput') updateSpecialityInput: UpdateSpecialityInput) {
  //   return this.specialityService.update(updateSpecialityInput.id, updateSpecialityInput);
  // }

  @Mutation(() => Speciality)
  removeSpecialityType(@Args('id', { type: () => ID }) id: string) {
    return this.specialityService.remove(id);
  }
}
