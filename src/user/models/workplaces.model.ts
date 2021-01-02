import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ObjectType()
@Schema()
export class WorkPlaces {

    @Field(() => ID, { nullable: true })
    _id?: Types.ObjectId;

    @Prop()
    @Field(() => String)
    name: string;

    @Prop()
    @Field(() => String)
    address: string;

    @Prop()
    @Field(() => String)
    zipCode: string;

    @Prop()
    @Field(() => String)
    country: string;

    @Prop()
    @Field(() => String)
    city: string;
}

export const WorkPlacesSchema = SchemaFactory.createForClass(WorkPlaces);