<<<<<<< HEAD
import { Resolver, ResolveField, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
=======
import { Resolver, Context, ResolveProperty, Query } from '@nestjs/graphql';
>>>>>>> af34b980619a2a2c0a4608e8293e021951044e24
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
