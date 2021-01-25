import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Addiction {

  @Field(() => String, { name: "addictionId", description: 'id', nullable: true })
  _id?: string;

  @Prop()
  @Field(() => String, { description: 'Addiction Name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Addiction locale name' })
  locale: string;
}