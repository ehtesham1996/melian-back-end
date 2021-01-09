import { Field, ObjectType } from "@nestjs/graphql";
import { EmailAddressResolver, PhoneNumberResolver } from "graphql-scalars";

@ObjectType()
export class Sender {

  @Field(() => String , {description : 'First name of the person who sent the inviation'})
  firstName : string;

  @Field(() => String , {description : 'Last name of the person who sent the inviation'})
  lastName : string;

  @Field(() => PhoneNumberResolver , {description : 'phone of the person who sent the inviation'})
  phone : string;

  @Field(() => EmailAddressResolver , {description : 'email of the person who sent the inviation'})
  email : string;

  @Field(() => String , {description : 'avatar of the person who sent the inviation'})
  avatar : string;
}