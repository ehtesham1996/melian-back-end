import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePathologyInput {
  @Field(() => String)
  icdCode: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  locale: string;
}
