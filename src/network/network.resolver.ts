import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NetworkService } from './network.service';
import { Network } from './entities/network.entity';
import { CreateNetworkInput } from './dto/create-network.input';
import { UpdateNetworkInput } from './dto/update-network.input';

@Resolver(() => Network)
export class NetworkResolver {
  constructor(private readonly networkService: NetworkService) {}

  @Mutation(() => Network)
  createNetwork(@Args('createNetworkInput') createNetworkInput: CreateNetworkInput) {
    return this.networkService.create(createNetworkInput);
  }

  @Query(() => [Network], { name: 'network' })
  findAll() {
    return this.networkService.findAll();
  }

  @Query(() => Network, { name: 'network' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.networkService.findOne(id);
  }

  @Mutation(() => Network)
  updateNetwork(@Args('updateNetworkInput') updateNetworkInput: UpdateNetworkInput) {
    return this.networkService.update(updateNetworkInput.id, updateNetworkInput);
  }

  @Mutation(() => Network)
  removeNetwork(@Args('id', { type: () => Int }) id: number) {
    return this.networkService.remove(id);
  }
}
