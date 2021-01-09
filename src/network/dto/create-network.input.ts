import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNetworkInput {

  @Field(() => String, { description: 'firstName of conectee' })
  firstName: string;

  @Field(() => String, { description: 'firstName of conectee' })
  lastName: string;

  @Field(() => String, { description: 'firstName of conectee' })
  accountType: string;

  @Field(() => String, { description: 'connection email', nullable: true })
  email: string;

  @Field(() => String, { description: 'connection phone' })
  phone: string;
}
