import { CanActivate, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { UserService } from "./../user/user.service";

@Injectable()
export class VerifyPasswordResetLinkGuard implements CanActivate {

  constructor(
    private readonly userService: UserService
  ) {}

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();
    context.user = await this.validateToken(request.params.token);
    if (!context.user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  async validateToken(token: string) {
    try{
      const decoded : any = await verify(token, process.env.jwt_secret_for_email || 'secretEMAIL');
      const user  = await this.userService.findById(decoded._id);
      return user;
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}