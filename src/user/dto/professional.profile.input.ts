import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WorkPlaces, WorkplacesSchema } from './workplaces-professional.input';

@InputType("ProfessionalInput")
@ObjectType("ProfessionalType")
@Schema()
export class Professional {

    @Prop()
    @Field(() => String, { nullable: true })
    credential?: string;

    @Prop()
    @Field(() => String, { nullable: true })
    credentialType?: string;

    @Prop({
        type: [WorkplacesSchema],
        default: []
    })
    @Field(() => [WorkPlaces], { nullable: true })
    workplaces?: [WorkPlaces];
}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);