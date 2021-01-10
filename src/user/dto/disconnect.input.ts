import { InputType, Field } from '@nestjs/graphql';
import { ROLE } from '../types/user.role.enum';

@InputType()
export class DisconnectInput {

  @Field(() => String)
  userId: string;

  @Field(() => ROLE)
  connectedToType: ROLE;

}