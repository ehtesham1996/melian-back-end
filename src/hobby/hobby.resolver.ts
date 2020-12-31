import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HobbyService } from './hobby.service';
import { Hobby } from './entities/hobby.entity';
import { CreateHobbyInput } from './dto/create-hobby.input';
import { UpdateHobbyInput } from './dto/update-hobby.input';
import { Type } from '@nestjs/common';
import { Types } from 'mongoose';

@Resolver(() => Hobby)
export class HobbyResolver {
  constructor(private readonly hobbyService: HobbyService) {}

  @Mutation(() => Hobby)
  createHobby(@Args('createHobbyInput') createHobbyInput: CreateHobbyInput) {
    return this.hobbyService.create(createHobbyInput);
  }

  @Query(() => [Hobby], { name: 'hobby' })
  findAll() {
    return this.hobbyService.findAll();
  }

  @Query(() => Hobby, { name: 'hobby' })
  findOne(@Args('id', { type: () => Int }) id: Types.ObjectId) {
    return this.hobbyService.findOne(id);
  }

  @Mutation(() => Hobby)
  updateHobby(@Args('updateHobbyInput') updateHobbyInput: UpdateHobbyInput) {
    return this.hobbyService.update(updateHobbyInput._id, updateHobbyInput);
  }

  @Mutation(() => Hobby)
  removeHobby(@Args('id', { type: () => Int }) _id: Types.ObjectId) {
    return this.hobbyService.remove(_id);
  }
}
