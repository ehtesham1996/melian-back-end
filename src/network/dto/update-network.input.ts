import { CreateNetworkInput } from './create-network.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNetworkInput extends PartialType(CreateNetworkInput) {
  @Field(() => Int)
  id: number;
}
