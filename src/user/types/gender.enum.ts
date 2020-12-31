import { registerEnumType } from "@nestjs/graphql";

export enum GENDER {
    male='male',
    female='female'
  }
  
registerEnumType(GENDER, { name: 'GENDER' })