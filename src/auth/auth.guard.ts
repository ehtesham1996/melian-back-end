import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { verify } from "jsonwebtoken";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context).getContext();

        if (!ctx.headers.authorization) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        ctx.user = await this.validateToken(ctx.headers.authorization);
        return true;
    }

    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        const token = auth.split(' ')[1];
        try{ 
            const decoded : any = await verify(token, process.env.JWT_SECRET || 'secret');
            const user  = await this.userService.findById(decoded._id);
            console.log(user);
            return user;
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}