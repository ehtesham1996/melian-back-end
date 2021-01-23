import { InputType, Field } from '@nestjs/graphql';
import { EmailAddressResolver,PhoneNumberResolver } from 'graphql-scalars';
import { ROLE } from '../../user/types/user.role.enum';

@InputType()
export class CreateNetworkInput {

  @Field(() => String, { description: 'firstName of the receiver' })
  firstName: string;

  @Field(() => String, { description: 'firstName of the receiver' })
  lastName: string;

  @Field(() => ROLE, { description: 'receiver account type' })
  accountType: ROLE;

  @Field(() => EmailAddressResolver, { description: 'receiver email', nullable: true })
  email: string;

  @Field(() => PhoneNumberResolver, { description: 'receiver phone' })
  phone: string;
}
