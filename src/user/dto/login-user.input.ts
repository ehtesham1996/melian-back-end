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

@ObjectType()
export class LoginOutput {
  
    @Field(() => Boolean)
    success: boolean;
}