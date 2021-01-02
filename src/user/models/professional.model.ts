import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as sc } from 'mongoose';
import { Speciality } from 'src/speciality/entities/speciality.entity';
import { WorkPlacesSchema, WorkPlaces } from './workplaces.model';

@ObjectType()
@Schema()
export class Professional {

    @Prop()
    @Field(() => String, { nullable: true })
    credential?: string;

    @Prop()
    @Field(() => String, { nullable: true })
    credentialType?: string;

    @Prop({
        type: [WorkPlacesSchema],
        default: []
    })
    @Field(() => [WorkPlaces], { nullable: true })
    workplaces?: [WorkPlaces];

    @Prop([{
        type: sc.Types.ObjectId, ref: Speciality.name, default: []
    }])
    @Field(() => [Speciality], { nullable: true })
    specialities?: [String]

}

export const ProfessionalSchema = SchemaFactory.createForClass(Professional);
