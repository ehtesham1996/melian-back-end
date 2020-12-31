import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignedUrlResponse {

    @Field(() => String)
    signedRequest: string;

    @Field(() => String)
    url: string;
}