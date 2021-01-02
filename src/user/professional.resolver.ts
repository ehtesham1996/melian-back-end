import { Resolver, ResolveField, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Professional } from './models/professional.model';
import { User } from './models/user.model';


@Resolver(() => Professional)
export class ProfessionalResolver {
  constructor(private readonly userService: UserService) { }

  @ResolveField()
  async specialities(@Context('user') user: User) {
   
   
    await user.populate('professional.specialities').execPopulate();
    return user.professional.specialities
  }

}

