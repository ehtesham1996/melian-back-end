import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Root } from '@nestjs/graphql';
import { Network } from './model/network.model';
import { CreateNetworkInput } from './dto/create-network.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../user/models/user.model';
import { NetworkService } from './network.service';
import { InvitationsFilter } from './dto/invitation-filter.dto';
import { Sender } from '../network/dto/sender.dto';
import { ResponseTemplate } from '../core/dto/response-template.dto';

@Resolver(() => Network)
export class NetworkResolver {
  constructor(
    private readonly networkService: NetworkService,
  ) { }

  @Mutation(() => Network)
  @UseGuards(AuthGuard)
  async sendInvitation(@Context('user') user: User,
    @Args('createNetworkInput') createNetworkInput: CreateNetworkInput): Promise<Network> {
    return await this.networkService.sendInvite(user, createNetworkInput);
  }

  @Query(() => [Network], { description: 'Query on invitations either sent or received' })
  @UseGuards(AuthGuard)
  async invitations(@Context('user') user: User,
    @Args('filter') filter: InvitationsFilter): Promise<Network[]> {
    return await this.networkService.filterInvitations(user, filter);
  }

  @ResolveField()
  async sender(@Root() network: Network): Promise<Sender> {
    await network.populate('sender').execPopulate();
    const sender: User = <User>(network.sender);
    return {
      firstName: sender.firstName,
      lastName: sender.lastName,
      avatar: sender.profileImage,
      email: sender.email,
      phone: sender.phone
    };
  }

  @Mutation(() => Network)
  @UseGuards(AuthGuard)
  async deleteInvitation(@Context('user') user: User,
    @Args('networkId') networkId: string): Promise<Network> {
    return await this.networkService.deleteInvitation(user, networkId);
  }

  @Query(() => Network, { name: 'network' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.networkService.findOne(id);
  }

  // @Mutation(() => Network)
  // updateNetwork(@Args('updateNetworkInput') updateNetworkInput: UpdateNetworkInput) {
  //   return this.networkService.update(updateNetworkInput.id, updateNetworkInput);
  // }

  @Mutation(() => Network)
  removeNetwork(@Args('id', { type: () => Int }) id: number) {
    return this.networkService.remove(id);
  }
}
