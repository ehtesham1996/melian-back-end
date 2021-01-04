import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ResponseTemplate {

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string
}

@ObjectType()
export class ResponseTokenTemplate extends ResponseTemplate {

  @Field(() => String)
  token: string;
}
