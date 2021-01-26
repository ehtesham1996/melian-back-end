import { InputType, Field } from '@nestjs/graphql';
import { PasswordType } from '../types/password.type';

@InputType()
export class UpdatePasswordInput {

  @Field(() => PasswordType)
  newpassword: string;


  @Field(() => String)
  currentPassword: string;
}

@InputType()
export class UpdateEmailInput {

  @Field(() => PasswordType)
  email: string;


  @Field(() => String)
  currentEmail: string;
}
