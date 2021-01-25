import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Allergy {

  @Field(() => String, { name: "allergyId", description: 'id', nullable: true })
  _id?: string;

  @Prop()
  @Field(() => String, { description: 'Allergy Name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Allergy locale name' })
  locale: string;
}