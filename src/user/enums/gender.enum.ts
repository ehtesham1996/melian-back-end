import { registerEnumType } from "@nestjs/graphql";

export enum GENDER {
    male,
    female
  }
  
registerEnumType(GENDER, { name: 'GENDER' })