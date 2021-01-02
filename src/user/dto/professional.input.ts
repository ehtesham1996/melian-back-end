import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProfessionalInput {

    @Field(() => String, { nullable: true })
    credential?: string;

    @Field(() => String, { nullable: true })
    credentialType?: string;

    @Field(() => [String], {nullable : true})
    specialities?:  [String]
}