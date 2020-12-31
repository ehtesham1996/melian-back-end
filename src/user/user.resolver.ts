import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput, LoginOutput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SignedUrlResponse } from './types/signed-url-response.type';
import { S3 } from 'aws-sdk';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async signup(@Args('User') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => LoginOutput)
  async login(@Args('User') loginInput: LoginInput) {
    return await this.userService.login(loginInput);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  profile(@Context('user') user: User) {
    return user;
  }

  @Mutation(() => SignedUrlResponse)
  async getSignedUrlForUpload(
    @Args('filename') filename: string,
    @Args('filetype') filetype: string
  ): Promise<SignedUrlResponse> {

    const s3 = new S3({
      signatureVersion: 'v4',
      region: 'us-east-2',
    });

    const s3Params = {
      Bucket: process.env.S3_BUCKET || 'com.serverless.hazree.deploys',
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: 'public-read',
    };

    const signedRequest = await s3.getSignedUrl('putObject', s3Params);
    const url = `https://${process.env.S3_BUCKET ||  'com.serverless.hazree.deploys' }.s3.amazonaws.com/${filename}`;

    return {
      signedRequest,
      url
    };
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
