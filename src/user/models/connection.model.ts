import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { userInfo } from 'os';
import { ROLE } from '../types/user.role.enum';
import { User } from './user.model';

@ObjectType()
@Schema()
export class Connection {

  @Prop({
    type : MongooseSchema.Types.ObjectId,
    ref : 'User'
  })
  @Field(() => User)
  connectedTo?: string | User;

  @Prop(
    {type : ROLE}
  )
  @Field(() => ROLE)
  connectedToType?: ROLE;

  @Prop(
    {type : ROLE}
  )
  connectedAsType?: ROLE;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
