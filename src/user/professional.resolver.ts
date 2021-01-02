import { Resolver, ResolveField, Root } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Professional } from './models/professional.model';
import { User } from './models/user.model';


@Resolver(() => Professional)
export class ProfessionalResolver {
  constructor(private readonly userService: UserService) { }

  @ResolveField()
  async specialities(@Root() user: User) {
    console.log('herererer');
    
    return await user.populate('professional.specialities').execPopulate();
  }

}

