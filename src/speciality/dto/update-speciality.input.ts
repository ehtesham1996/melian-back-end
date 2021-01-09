import { CreateSpecialityInput } from './create-speciality.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSpecialityInput extends PartialType(CreateSpecialityInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'speciality name' })
  name: string;
}
