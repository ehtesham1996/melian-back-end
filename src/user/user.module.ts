import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { VerifyOTPGuard } from 'src/auth/verify-otp.guard';
import { NotificationModule } from 'src/notification/notification.module';
import { ProfessionalResolver } from './professional.resolver';
import { Professional } from './models/professional.model';
@Module({
  imports: [
    NotificationModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UserResolver, ProfessionalResolver, UserService, AuthGuard, VerifyOTPGuard]
})
export class UserModule {}
