import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { verify } from "jsonwebtoken";
import { UserService } from "./../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly userService: UserService
  ) { }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.headers.authorization) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    ctx.user = await this.validateToken(ctx.headers.authorization);
    if (ctx.user.otp) {
      throw new HttpException('PLease veryify OTP send to your mobile first', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(' ')[1];
    try {
      const decoded: any = await verify(token, process.env.jwt_secret || 'secret');
      const user = await this.userService.findById(decoded._id);
      user.userRole = decoded.userRole;
      return user;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}