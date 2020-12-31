import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({autoIndex: true})
export class User extends Document{

  @IsNotEmpty()
  @Prop({ required: true, index: true })
  @Field(() => String, { description: 'user firstName' })
  firstName: string;

  @IsNotEmpty()
  @Prop({ required: true })
  @Field(() => String)
  lastName: string;

  @IsEmail()
  @Prop({ required: true })
  @Field(() => String)
  email: string;

  // @Prop({ required: true })
  // @Field(() => String)
  // email: string;

  // @IsEmail()
  // @Prop({ required: true })
  // @Field(() => String)
  // email: string;

  // @IsEmail()
  // @Prop({ required: true })
  // @Field(() => String)
  // email: string;

  // @IsEmail()
  // @Prop({ required: true })
  // @Field(() => String)
  // email: string;

  // @IsEmail()
  // @Prop({ required: true })
  // @Field(() => String)
  // email: string;

  // @IsEmail()
  // @Prop({ required: true })
  // @Field(() => String)
  // email: string;
}

export type UserDocument = User & Document;

const UserSchema = SchemaFactory.createForClass(User);

  // create this manually for now
  UserSchema.index({
    firstName: 1,
    email: 1,
},{
    unique: true,
});

UserSchema.on('index', function(err) {
  if (err) {
      console.error('User index error: %s', err);
  } else {
      console.info('User indexing complete');
  }
});

export default UserSchema;