import { registerEnumType } from "@nestjs/graphql";

export enum PatientCatalogType {
  Addiction='addiction',
  Allergy='allergy',
  Pathology='pathology'
}

registerEnumType(PatientCatalogType, { name: 'PatientCatalogType' })