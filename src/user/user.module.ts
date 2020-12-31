import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UserResolver, UserService, AuthGuard]
})
export class UserModule {}
