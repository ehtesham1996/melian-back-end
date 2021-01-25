import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Patient {

  @Prop({
    default: []
  })
  @Field(() => [String], { nullable: true })
  allergies?: string[];

  @Prop({
    default: []
  })
  @Field(() => [String], { nullable: true })
  addictions?: string[];

  @Prop({
    default: []
  })
  @Field(() => [String], { nullable: true })
  pathologies?: string[];

  @Prop()
  @Field(() => String)
  mainPathology: string;

  @Prop()
  @Field(() => String)
  careProvider: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
