import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ObjectType()
@Schema({
  timestamps: true
})
export class Speciality {

  @Field(() => ID)
  _id: Types.ObjectId;

  @Prop({ required: true, index: true })
  @Field(() => String, { description: 'speciality name' })
  name: string;
}


export type SpecialityDocument = Speciality & Document;

export const SpecialitySchema = SchemaFactory.createForClass<SpecialityDocument>(Speciality);
