import { registerEnumType } from "@nestjs/graphql";

export enum PROCESS_TYPE {
  approved = 'approved',
  refused = 'refused'
}

registerEnumType(PROCESS_TYPE, {
  name: 'PROCESS_TYPE',
  description: 'Process type referes to approval and refusal of connection invites'
})