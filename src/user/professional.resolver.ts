import { Resolver, Context, ResolveProperty, Query } from '@nestjs/graphql';
import { Professional } from './models/professional.model';
import { User, UserDocument } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Resolver(() => Professional)
export class ProfessionalResolver {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  @ResolveProperty("specialities")
  async specialities(@Context("user") user: User) {
    const response = await user.populate("professional.specialities").execPopulate();
    return [];
  }
}
