import { Resolver, Context, ResolveProperty, Query, ResolveField } from '@nestjs/graphql';
import { Professional } from './models/professional.model';
import { User, UserDocument } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Resolver(() => Professional)
export class ProfessionalResolver {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  @ResolveField()
  async specialities(@Context('user') user: User) {

    await user.populate('professional.specialities').execPopulate();
    return user.professional.specialities
  }
}
