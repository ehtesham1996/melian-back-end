import { registerEnumType } from "@nestjs/graphql";

export enum GENDER {
  male='male',
  female='female',
  other='other'
}

registerEnumType(GENDER, { name: 'GENDER' })