import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SignedUrlResponse } from './types/signed-url-response.type';
import { ResponseTemplate, ResponseTokenTemplate } from './dto/response-template.response';
import { VerifyOTPGuard } from 'src/auth/verify-otp.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => ResponseTokenTemplate)
  async signup(@Args('User') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => ResponseTokenTemplate)
  async login(@Args('User') loginInput: LoginInput) {
    return await this.userService.login(loginInput);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  profile(@Context('user') user: User) {
    return user;
  }

  @Mutation(() => ResponseTemplate)
  @UseGuards(VerifyOTPGuard)
  async resendOTP(@Context('user') user: User) {
    return await this.userService.resendOTP(user);
  }

  @Mutation(() => ResponseTokenTemplate)
  @UseGuards(VerifyOTPGuard)
  async verifyOTP(@Args('otp') otp: number, @Context('user') user: User) {
    return await this.userService.verifyOTP(user, otp);
  }

  @Mutation(() => SignedUrlResponse)
  async getSignedUrlForUpload(
    @Args('filename') filename: string,
    @Args('filetype') filetype: string
  ): Promise<SignedUrlResponse> {
    return await this.userService.getProfileImageUploadUrl(filename, filetype);
  }
  // @Query(() => [User], { name: 'user' })
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: Types.ObjectId) {
  //   return this.userService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: Types.ObjectId) {
  //   return this.userService.remove(id);
  // }

}
