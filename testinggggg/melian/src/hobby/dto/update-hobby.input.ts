import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreateHobbyInput } from './create-hobby.input';

@InputType()
export class UpdateHobbyInput extends PartialType(CreateHobbyInput) {
  @Field(() => String)
  _id:  Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
}