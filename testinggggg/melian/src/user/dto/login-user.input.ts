import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { PhoneNumberResolver } from 'graphql-scalars';
import { PasswordType } from '../types/password.type';

@InputType()
export class LoginInput {

  @Field(() => PhoneNumberResolver)
  phone: string;

  @Field(() => PasswordType)
  password: string;
}