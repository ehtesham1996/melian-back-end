import { Field, InputType } from "@nestjs/graphql";
import { INVITATION_ACTION } from "../types/invitations-action.enum";

@InputType()
export class AcceptRejectInvitation {

  @Field(() => String)
  networkId: string;

  @Field(() => INVITATION_ACTION)
  action: INVITATION_ACTION;

}

