import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateAddictionInput } from './create-addiction.input';

@InputType()
export class UpdateAddictionInput extends PartialType(CreateAddictionInput) {
  @Field(() => String, { description: 'Addiction Name' })
  name: string;

  @Field(() => String, { description: 'Addiction Name' })
  locale: string;
}
