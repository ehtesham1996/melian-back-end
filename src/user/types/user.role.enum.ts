import { registerEnumType } from "@nestjs/graphql";

export enum ROLE {
  professional='professional',
  patient='patient'
}

registerEnumType(ROLE, { name: 'ROLE' })