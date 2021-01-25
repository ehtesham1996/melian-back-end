import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePathologyInput } from './create-pathology.input';

@InputType()
export class UpdatePathologyInput extends PartialType(CreatePathologyInput) {
  @Field(() => String)
  icdCode: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  locale: string;
}
