import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

  // @Field(() => String)
  // id: Types.ObjectId;

  // @IsNotEmpty()
  // @Field(() => String, { description: 'user firstName' })
  // firstName?: string;

  // @IsNotEmpty()
  // @Field(() => String, { description: 'user firstName' })
  // lastName?: string;

  // @IsEmail()
  // @Field(() => String, { description: 'user firstName' })
  // email?: string;
}
