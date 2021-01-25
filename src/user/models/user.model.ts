import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'mongoose-bcrypt'
import { GENDER } from '../types/gender.enum';
import { DateResolver, PhoneNumberResolver, URLResolver } from 'graphql-scalars';
import { Professional, ProfessionalSchema } from './professional.model';
import { ROLE } from '../types/user.role.enum';
import { Connection, ConnectionSchema } from './connection.model';
import { Patient, PatientSchema } from './patient.model';
@ObjectType()
@Schema({
  timestamps: true
})
export class User extends Document {

  @Field(() => String, {name:'userId' , description : 'unique id of the user'})
  _id : string;

  @Prop({ required: true, index: true })
  @Field(() => String, { description: 'user firstName' })
  firstName: string;

  @Prop({ required: true })
  @Field(() => String)
  lastName: string;

  @Prop({ required: true, index: true, unique: true })
  @Field(() => String)
  email: string;

  @Prop({
    type: GENDER
  })
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

  @Field(() => Boolean, { nullable: true })
  accountExists?: boolean;

  @Prop()
  otp: number;

  @Prop()
  otpExpiry: number;

  @Prop()
  emailOtp: number;

  @Prop()
  emailOtpExpiry: number;

  @Prop({
    default: false
  })
  isPhoneVerified: boolean;

  @Prop({
    default: false
  })
  isEmailVerified: boolean;

  @Prop({
    type: ProfessionalSchema
  })
  @Field(() => Professional, { nullable: true })
  professional?: Professional;

  @Prop({
    type: PatientSchema
  })
  @Field(() => Professional, { nullable: true })
  patient?: Patient;

  @Prop({
    type: [ConnectionSchema],
    default: []
  })
  @Field(() => [Connection], { nullable: true })
  connections?: Connection[];

  userRole: ROLE;
}

export type UserDocument = User & Document & { verifyPasswordSync: any };

export const UserSchema = SchemaFactory.createForClass<UserDocument>(User);

UserSchema.plugin(bcrypt);
