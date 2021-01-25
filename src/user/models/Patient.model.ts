import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Patient {

  @Prop()
  @Field(() => [String], { nullable: true })
  allergies?: string[];

  @Prop()
  @Field(() => [String], { nullable: true })
  addictions?: string[];

  @Prop()
  @Field(() => [String], { nullable: true })
  pathologies: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
