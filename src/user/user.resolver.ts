import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { LoginInput, LoginOutput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
