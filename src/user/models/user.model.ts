import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GENDER } from '../types/gender.enum';
import { DateResolver, PhoneNumberResolver, URLResolver } from 'graphql-scalars';
import { Verify } from 'crypto';
@ObjectType()
@Schema({
  timestamps: true
})
export class User extends Document{

  @Prop({ required: true, index: true })
  @Field(() => String, { description: 'user firstName' })
  firstName: string;

  @Prop({ required: true })
  @Field(() => String)
  lastName: string;

  @Prop({ required: true, index: true, unique: true })
  @Field(() => String)
  email: string;

  @Prop()
  @Field(() => GENDER)
  gender: GENDER;

  @Prop()
  @Field(() => DateResolver)
  birthDate: Date;

  @Prop()
  @Field(() => URLResolver)
  profileImage: string;

  @Prop()
  @Field(() => String)
  country: string;

  @Prop({ required: true, index: true, unique: true })
  @Field(() => PhoneNumberResolver)
  phone: string;

  @Prop()
  @Field(() => String)
  identityDocument: string;

  @Prop()
  @HideField()
  password: string;

  @Prop()
  @Field(() => Boolean)
  termAcceptance: boolean

  @Prop()
  @Field(() => Boolean)
  confidentialityAcceptance: boolean

  @Prop({
    nullable: true
  })
  @Field(() => String)
  professional?: string;

  @Field(() => Boolean)
  professionalAccountExist?: boolean;
}

export type UserDocument = User & Document & { verifyPasswordSync: Function };

export const UserSchema = SchemaFactory.createForClass<UserDocument>(User);

UserSchema.plugin(require('mongoose-bcrypt'));
