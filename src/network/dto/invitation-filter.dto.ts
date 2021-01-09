import { Field, InputType } from "@nestjs/graphql";
import { INVITATION_TYPE } from "../types/invitaions-type.enum";

@InputType()
export class InvitationsFilter {

  @Field(() => INVITATION_TYPE)
  invitationType: INVITATION_TYPE;

}

