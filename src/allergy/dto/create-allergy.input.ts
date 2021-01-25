import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAllergyInput {
  @Field(() => String, { description: 'Allergy Name' })
  name: string;

  @Field(() => String, { description: 'Locale Name' })
  locale: string;
}
