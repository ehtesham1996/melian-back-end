import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PatientCatalogInput {

  @Field(() => [String], { nullable: true })
  allergies?: string[];

  @Field(() => [String], { nullable: true })
  addictions?: string[];

  @Field(() => [String], { nullable: true })
  pathologies?: string[];

}
