import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class WorkPlacesInput {

    @Field(() => String)
    name: string;

    @Field(() => String)
    address: string;

    @Field(() => String)
    zipCode: string;

    @Field(() => String)
    country: string;

    @Field(() => String)
    city: string;
}

@InputType()
export class WorkPlaceUpdateInput extends WorkPlacesInput{

    @Field(() => String)
    _id : string
}