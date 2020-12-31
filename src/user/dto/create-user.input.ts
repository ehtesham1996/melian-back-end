import { InputType, Field } from '@nestjs/graphql';
import { EmailAddressResolver, DateResolver, URLResolver, PhoneNumberResolver, RegularExpression } from 'graphql-scalars';
import { GENDER } from '../enums/gender.enum';

const PasswordType = new RegularExpression('PasswordType', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user firstName' })
  firstName: string;

  @Field(() => String, { description: 'user lastName' })
  lastName: string;

  @Field(() => EmailAddressResolver, { description: 'user email' })
  email: string;

  @Field(() => GENDER)
  gender: GENDER;

  @Field(() => DateResolver)
  birthDate: string;

  @Field(() => URLResolver)
  profileImage: string;

  @Field(() => String)
  country: string;

  @Field(() => PhoneNumberResolver)
  phone: string;

  @Field(() => String)
  identityDocument: string;

  @Field(() => PasswordType)
  password: string;

  @Field(() => Boolean)
  termAcceptance: boolean

  @Field(() => Boolean)
  confidentialityAcceptance: boolean
}