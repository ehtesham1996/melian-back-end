import { Resolver, Query, Mutation, Args, Context, ResolveField, Root, Parent } from '@nestjs/graphql';
import { Network } from './model/network.model';
import { CreateNetworkInput } from './dto/create-network.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../user/models/user.model';
import { NetworkService } from './network.service';
import { InvitationsFilter } from './dto/invitation-filter.input';
import { Sender } from '../network/dto/sender.dto';
import { AcceptRejectInvitation } from './dto/accept-reject-invitation.input';

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

  @Query(() => [Network], { nullable: true, description: 'Query on invitations either sent or received' })
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

  @Mutation(() => Network)
  @UseGuards(AuthGuard)
  async acceptRejectInvitation(@Context('user') user: User,
    @Args('acceptRejectInvitationInput') input: AcceptRejectInvitation ): Promise<Network> {
    return await this.networkService.acceptRejectInvitation(user, input);
  }

  @ResolveField()
  networkId(@Parent() network: Network): string {
    return network._id.toString();
  }
}
