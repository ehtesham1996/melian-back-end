import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';

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
