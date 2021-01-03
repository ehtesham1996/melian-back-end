import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User, UserSchema } from './models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { VerifyOTPGuard } from 'src/auth/verify-otp.guard';
import { NotificationModule } from 'src/notification/notification.module';
import { ProfessionalResolver } from './professional.resolver';
import { UserController } from './user/user.controller';
import { VerifyPasswordResetLinkGuard } from 'src/auth/verify-password-reset-link.guard';
import { ResetPasswordGuard } from 'src/auth/reset-password.guard';
@Module({
  imports: [
    NotificationModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UserResolver,ProfessionalResolver, UserService, AuthGuard, ResetPasswordGuard, VerifyOTPGuard, VerifyPasswordResetLinkGuard],
  controllers: [UserController]
})
export class UserModule {}
