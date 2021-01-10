import { registerEnumType } from "@nestjs/graphql";

export enum INVITATION_ACTION {
  accept = 'accept',
  reject = 'reject'
}

registerEnumType(INVITATION_ACTION, {
  name: 'INVITATION_ACTION',
  description: 'Either accept or reject an invitation'
})