import { RegularExpression } from "graphql-scalars";

export const PasswordType = new RegularExpression('PasswordType', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);