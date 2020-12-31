import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHobbyInput {
  @Field(() => String, { description: 'name of hobby' })
  name: string;
}
