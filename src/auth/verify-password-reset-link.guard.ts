import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { verify } from "jsonwebtoken";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";

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
            const decoded : any = await verify(token, process.env.JWT_SECRET_FOR_EMAIL || 'secretEMAIL');
            const user  = await this.userService.findById(decoded._id);
            return user;
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}