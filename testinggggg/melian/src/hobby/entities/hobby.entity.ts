import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class Hobby {
  @Field(() => String, { description: 'String id field' })
  _id: Types.ObjectId;

  @Field(() => String)
  name: string
}
