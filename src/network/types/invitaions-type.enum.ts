import { registerEnumType } from "@nestjs/graphql";

export enum INVITATION_TYPE {
  received = 'received',
  sent = 'sent'
}

registerEnumType(INVITATION_TYPE, {
  name: 'INVITATION_TYPE',
  description: 'Filter invitation based on sent and received type'
})