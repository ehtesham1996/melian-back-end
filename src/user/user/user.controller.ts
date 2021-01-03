import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import { VerifyPasswordResetLinkGuard } from 'src/auth/verify-password-reset-link.guard';
import { User } from '../models/user.model';
import { UserService } from '../user.service';

@Controller('user')
export class UserController {

     // eslint-disable-next-line no-useless-constructor
  constructor(private userService: UserService) {}

  @UseGuards(VerifyPasswordResetLinkGuard)
  @Get('resetPassword/:token')
  resetPassword(@Param('token') token: string, @Context('user') user: User): string {
      return token;
  }
}
