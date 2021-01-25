import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PathologyService } from './pathology.service';
import { Pathology } from './entities/pathology.entity';
import { CreatePathologyInput } from './dto/create-pathology.input';
import { UpdatePathologyInput } from './dto/update-pathology.input';

@Resolver(() => Pathology)
export class PathologyResolver {
  constructor(private readonly pathologyService: PathologyService) {}

  @Mutation(() => Pathology)
  createPathology(@Args('createPathologyInput') createPathologyInput: CreatePathologyInput) {
    return this.pathologyService.create(createPathologyInput);
  }

  @Query(() => [Pathology], { name: 'pathology' })
  findAll() {
    return this.pathologyService.findAll();
  }

  // @Query(() => Pathology, { name: 'pathology' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.pathologyService.findOne(id);
  // }

  @Mutation(() => Pathology)
  updatePathology(@Args('updatePathologyInput') updatePathologyInput: UpdatePathologyInput) {
    return {} as Pathology;
    // return this.pathologyService.update(updatePathologyInput.id, updatePathologyInput);
  }

  @Mutation(() => Pathology)
  removePathology(@Args('id', { type: () => Int }) id: number) {
    return this.pathologyService.remove(id);
  }
}
