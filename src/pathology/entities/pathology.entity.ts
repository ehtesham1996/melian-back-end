import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Pathology {

  @Field(() => String, { name: "pathologyId", description: 'id', nullable: true })
  _id?: string;

  @Prop()
  @Field(() => String, { description: 'Pathology Name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Pathology locale name' })
  locale: string;
}
