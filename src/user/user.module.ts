import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { VerifyOTPGuard } from '../auth/verify-otp.guard';
import { NotificationModule } from '../notification/notification.module';
import { UserController } from './user/user.controller';
import { VerifyPasswordResetLinkGuard } from '../auth/verify-password-reset-link.guard';
import { ResetPasswordGuard } from '../auth/reset-password.guard';
@Module({
  imports: [
    NotificationModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  providers: [UserResolver, UserService, AuthGuard, ResetPasswordGuard, VerifyOTPGuard, VerifyPasswordResetLinkGuard],
  controllers: [UserController],
  exports : [UserService]
})
export class UserModule {}
