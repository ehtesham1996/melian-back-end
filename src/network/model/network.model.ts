import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { ROLE } from '../../user/types/user.role.enum';
import { EmailAddressResolver, PhoneNumberResolver } from 'graphql-scalars';
import { Schema as MongooseSchema, Document} from 'mongoose';
import { User } from '../../user/models/user.model';
import { Sender } from '@src/network/dto/sender.dto';

@ObjectType()
@Schema({
  timestamps: true
})
export class Network extends Document {

  @Field(() => String, {name : 'networkId' , description : 'unique id of the network type'})
  _id : MongooseSchema.Types.ObjectId

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    index: true
  })
  @Field(() => Sender, { description: 'person who sent the invitation' })
  sender: string | User;

  @Prop({ index: true })
  @Field(() => EmailAddressResolver, { description: 'email of the receiver', nullable: true })
  receiverEmail: string;

  @Prop({ index: true })
  @Field(() => PhoneNumberResolver, { description: 'phone number of the receiver' })
  receiverPhone: string;

  @Prop()
  @Field(() => String, { description: 'firstName of receiver' })
  receiverFirstName: string;

  @Prop()
  @Field(() => String, { description: 'lastname of receiver' })
  receiverLastName: string;

  @Prop()
  @Field(() => ROLE, { description: 'account type of the receiver' })
  receiverAccountType: ROLE;

}


export type NetworkDocument = Network & Document;

export const NetworkSchema = SchemaFactory.createForClass<NetworkDocument>(Network);
