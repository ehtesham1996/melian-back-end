import { CreateAllergyInput } from './create-allergy.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAllergyInput extends PartialType(CreateAllergyInput) {
  @Field(() => String, { description: 'Allergy Name' })
  name: string;

  @Field(() => String, { description: 'Locale Name' })
  locale: string;
}
