import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ROLE } from '../types/user.role.enum';

@ObjectType()
@Schema()
export class Connection {

    @Prop({
        unique: true,
        sparse: true
    })
    @Field(() => String, { nullable: true })
    _id?: Types.ObjectId;

    @Prop()
    @Field(() => String, { nullable: true })
    connectedTo?: string;

    @Prop()
    @Field(() => ROLE, { nullable: true })
    connectedAs?: ROLE;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
