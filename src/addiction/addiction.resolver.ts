import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddictionService } from './addiction.service';
import { Addiction } from './entities/addiction.entity';
import { CreateAddictionInput } from './dto/create-addiction.input';
import { UpdateAddictionInput } from './dto/update-addiction.input';

@Resolver(() => Addiction)
export class AddictionResolver {
  constructor(private readonly addictionService: AddictionService) {}

  @Mutation(() => Addiction)
  createAddiction(@Args('createAddictionInput') createAddictionInput: CreateAddictionInput) {
    return this.addictionService.create(createAddictionInput);
  }

  @Query(() => [Addiction], { name: 'addiction' })
  findAll() {
    return this.addictionService.findAll();
  }

  // @Query(() => Addiction, { name: 'addiction' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.addictionService.findOne(id);
  // }

  @Mutation(() => Addiction)
  updateAddiction(@Args('updateAddictionInput') updateAddictionInput: UpdateAddictionInput) {
    return {} as Addiction;
    //  return this.addictionService.update(updateAddictionInput.id, updateAddictionInput);
  }

  @Mutation(() => Addiction)
  removeAddiction(@Args('id', { type: () => Int }) id: number) {
    return this.addictionService.remove(id);
  }
}
