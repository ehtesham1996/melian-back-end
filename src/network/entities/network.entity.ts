import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({
  timestamps: true
})
export class Network {

  @Prop()
  @Field(() => String, { description: 'firstName of conectee' })
  firstName: string;

  @Prop()
  @Field(() => String, { description: 'firstName of conectee' })
  lastName: string;

  @Prop()
  @Field(() => String, { description: 'firstName of conectee' })
  accountType: string;

  @Prop()
  @Field(() => String, { description: 'connection email', nullable: true })
  email: string;

  @Prop()
  @Field(() => String, { description: 'connection phone' })
  phone: string;

  @Prop()
  @Field(() => ID, { description: 'connected to ID (whom one send connection request, if found)', nullable: true })
  connectedTo: string;

  @Prop()
  @Field(() => ID, { description: 'whom send connection request' })
  connectedFrom: string;
}


export type NetworkDocument = Network & Document;

export const NetworkSchema = SchemaFactory.createForClass<NetworkDocument>(Network);
