import { InputType, Field } from '@nestjs/graphql';
import { PhoneNumberResolver } from 'graphql-scalars';
import { PasswordType } from '../types/password.type';
import { ROLE } from '../types/user.role.enum';
@InputType()
export class LoginInput {

  @Field(() => PhoneNumberResolver)
  phone: string;

  @Field(() => PasswordType)
  password: string;

  @Field(() => ROLE)
  userRole: ROLE;
}