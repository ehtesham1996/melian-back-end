import { Resolver, Mutation, Args, Context, Query, Root, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SignedUrlResponse } from './types/signed-url-response.type';
import { ResponseTemplate, ResponseTokenTemplate } from './dto/response-template.response';
import { VerifyOTPGuard } from 'src/auth/verify-otp.guard';
import { WorkPlaces } from './models/workplaces.model';
import { Professional } from './models/professional.model';
import { WorkPlacesInput, WorkPlaceUpdateInput } from './dto/workplaces.input';
import { ProfessionalInput } from './dto/professional.input';

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

  @Mutation(() => WorkPlaces)
  @UseGuards(AuthGuard)
  async addWorkplaces(@Args('Workplace') workplace: WorkPlacesInput, @Context('user') user: User) {
    return await this.userService.addWorkplace(user, workplace);
  }

  @Mutation(() => WorkPlaces)
  @UseGuards(AuthGuard)
  async updateWorkplace(@Args('Workplace') workplace: WorkPlaceUpdateInput, @Context('user') user: User) {
    return await this.userService.updateWorkplace(user, workplace);
  }

  @Mutation(() => ResponseTemplate)
  @UseGuards(AuthGuard)
  async removeWorkplace(@Args('id') id: string, @Context('user') user: User) {
    return await this.userService.removeWorkplace(id, user);
  }

  @Mutation(() => Professional)
  @UseGuards(AuthGuard)
  async addProfessionalDetail(@Args('professional') professional: ProfessionalInput, @Context('user') user: User) {
    return await this.userService.addProfessionalDetail(professional, user);
  }


  @Query(() => User)
  @UseGuards(AuthGuard)
  profile(@Context('user') user: User) {
    return user;
  }

  @Query(() => [WorkPlaces])
  @UseGuards(AuthGuard)
  workplaces(@Context('user') user: User) {
    return user.professional.workplaces || [];
  }

  @ResolveField()
  professional(@Root() user: User) : Professional {
    console.log('inside professional resolver');
    return user.professional
  }
}

