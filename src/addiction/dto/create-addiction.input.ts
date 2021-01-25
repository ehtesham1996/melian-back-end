import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAddictionInput {
  @Field(() => String, { description: 'Addiction Name' })
  name: string;

  @Field(() => String, { description: 'Locale Name' })
  locale: string;
}
