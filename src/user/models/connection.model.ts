import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
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

  @Prop()
  @Field(() => ROLE)
  connectedToType?: ROLE;

  @Prop()
  connectedAsType?: ROLE;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
