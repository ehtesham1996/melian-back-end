import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateSpecialityInput {

  @Field(() => String, { description: 'speciality name' })
  name: string;
}
