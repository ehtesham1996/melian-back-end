import { Resolver, Mutation, Args, Context, Query, ResolveField, Root, Int, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './../auth/auth.guard';
import { SignedUrlResponse } from './types/signed-url-response.type';
import { ResponseTemplate, ResponseTokenTemplate } from '../core/dto/response-template.dto';
import { VerifyOTPGuard } from './../auth/verify-otp.guard';
import { WorkPlaces } from './models/workplaces.model';
import { Professional } from './models/professional.model';
import { WorkPlacesInput, WorkPlaceUpdateInput } from './dto/workplaces.input';
import { ProfessionalInput } from './dto/professional.input';
import { ResetPasswordGuard } from './../auth/reset-password.guard';
import { ROLE } from './types/user.role.enum';
import { Connection } from './models/connection.model';
import { DisconnectInput } from './dto/disconnect.input';
import { PatientInput } from './dto/patient.input';
import { Patient } from './models/patient.model';
import { PatientCatalogType } from './types/patient-catalog.type';

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

  @Mutation(() => ResponseTemplate)
  async sendPasswordResetLink(@Args('email') email: string) {
    return await this.userService.sendPasswordResetLink(email);
  }

  @Mutation(() => ResponseTemplate)
  @UseGuards(ResetPasswordGuard)
  async passwordReset(@Args('password') password: string, @Context('user') user: User) {
    return await this.userService.passwordReset(user, password);
  }


  @Mutation(() => ResponseTokenTemplate)
  @UseGuards(VerifyOTPGuard)
  async verifyOTP(@Args({name: 'otp',  type: () => Int}) otp: number, @Context('user') user: User) {
    return await this.userService.verifyOTP(user, otp);
  }

  @Mutation(() => SignedUrlResponse)
  async getSignedUrlForUpload(@Args('filename') filename: string,
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

  @Mutation(() => Patient)
  @UseGuards(AuthGuard)
  async addPatientDetail(@Args('patient') patient: PatientInput, @Context('user') user: User) {
    // return await this.userService.addPatientDetail(patient, user);
    return {} as Patient;
  }

  @Mutation(() => Patient)
  @UseGuards(AuthGuard)
  async addPatientCatalogInfo(@Args('string') patientCatalogType: PatientCatalogType, @Args('string') name: string, @Context('user') user: User) {
    // return await this.userService.addPatientCatalogInfo(patientCatalogType, name, user);
    return {} as Patient;
  }


  @Query(() => User)
  @UseGuards(AuthGuard)
  profile(@Context('user') user: User) {
    return user;
  }

  @Mutation(() => ResponseTemplate)
  @UseGuards(AuthGuard)
  async disconnectConnection(@Args('disconnectInput') disconnectInput: DisconnectInput,
    @Context('user') user: User) {
    return await this.userService.disconnect(disconnectInput, user);
  }

  @Query(() => [WorkPlaces])
  @UseGuards(AuthGuard)
  workplaces(@Context('user') user: User) {
    return user.professional?.workplaces || [];
  }

  @ResolveField()
  accountExists(@Root() user: User): boolean {
    console.log('Resolving account exists field');
    if (user.userRole === ROLE.professional) {
      console.log('User role is professional');
      // Returning true if professional and professional credentials exists
      return user.professional
        ? user.professional.credential && user.professional.credentialType ? true : false
        : false;
    } else if (user.userRole === ROLE.patient) {
      // Returning true if patient account exists for time being returning false
      return false;
    } else return false;
  }

  @ResolveField()
  async connections(@Root() user: User): Promise<Connection[]> {
    user.connections = (user.connections
      && user.connections.filter(connection => connection.connectedAsType === user.userRole)) || [];

    await user.populate('connections.connectedTo').execPopulate();
    return user.connections;
  }

  @ResolveField()
  userId(@Parent() user: User): string {
    return user._id.toString();
  }

}

