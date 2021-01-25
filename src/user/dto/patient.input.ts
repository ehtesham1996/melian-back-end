import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PatientInput {

  @Field(() => String)
  mainPathology: string;

  @Field(() => String)
  careProvider: string;
}
