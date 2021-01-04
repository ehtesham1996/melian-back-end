
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum GENDER {
    male = "male",
    female = "female"
}

export class CreateHobbyInput {
    name: string;
}

export class UpdateHobbyInput {
    name?: string;
    _id: string;
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: EmailAddress;
    gender: GENDER;
    birthDate: Date;
    profileImage: URL;
    country: string;
    phone: PhoneNumber;
    identityDocument: string;
    password: PasswordType;
    termAcceptance: boolean;
    confidentialityAcceptance: boolean;
}

export class LoginInput {
    phone: PhoneNumber;
    password: PasswordType;
}

export class WorkPlacesInput {
    name: string;
    address: string;
    zipCode: string;
    country: string;
    city: string;
}

export class WorkPlaceUpdateInput {
    name: string;
    address: string;
    zipCode: string;
    country: string;
    city: string;
    _id: string;
}

export class ProfessionalInput {
    credential?: string;
    credentialType?: string;
    specialities?: string[];
}

export class CreateSpecialityInput {
    name: string;
}

export class Speciality {
    _id: string;
    name: string;
}

export class WorkPlaces {
    _id?: string;
    name: string;
    address: string;
    zipCode: string;
    country: string;
    city: string;
}

export class Professional {
    credential?: string;
    credentialType?: string;
    workplaces?: WorkPlaces[];
    specialities?: Speciality[];
}

export class User {
    firstName: string;
    lastName: string;
    email: string;
    gender: GENDER;
    birthDate: Date;
    profileImage: URL;
    country: string;
    phone: PhoneNumber;
    identityDocument: string;
    termAcceptance: boolean;
    confidentialityAcceptance: boolean;
    professionalAccountExist?: boolean;
    professional?: Professional;
}

export class SignedUrlResponse {
    signedRequest: string;
    url: string;
}

export class ResponseTemplate {
    success: boolean;
    message: string;
}

export class ResponseTokenTemplate {
    success: boolean;
    message: string;
    token: string;
}

export class Hobby {
    _id: string;
    name: string;
}

export abstract class IQuery {
    abstract hobby(id: number): Hobby | Promise<Hobby>;

    abstract profile(): User | Promise<User>;

    abstract workplaces(): WorkPlaces[] | Promise<WorkPlaces[]>;

    abstract specialities(): Speciality[] | Promise<Speciality[]>;

    abstract specialityById(id: string): Speciality | Promise<Speciality>;
}

export abstract class IMutation {
    abstract createHobby(createHobbyInput: CreateHobbyInput): Hobby | Promise<Hobby>;

    abstract updateHobby(updateHobbyInput: UpdateHobbyInput): Hobby | Promise<Hobby>;

    abstract removeHobby(id: number): Hobby | Promise<Hobby>;

    abstract signup(User: CreateUserInput): ResponseTokenTemplate | Promise<ResponseTokenTemplate>;

    abstract login(User: LoginInput): ResponseTokenTemplate | Promise<ResponseTokenTemplate>;

    abstract resendOTP(): ResponseTemplate | Promise<ResponseTemplate>;

    abstract sendPasswordResetLink(email: string): ResponseTemplate | Promise<ResponseTemplate>;

    abstract passwordReset(password: string): ResponseTemplate | Promise<ResponseTemplate>;

    abstract verifyOTP(otp: number): ResponseTokenTemplate | Promise<ResponseTokenTemplate>;

    abstract getSignedUrlForUpload(filetype: string, filename: string): SignedUrlResponse | Promise<SignedUrlResponse>;

    abstract addWorkplaces(Workplace: WorkPlacesInput): WorkPlaces | Promise<WorkPlaces>;

    abstract updateWorkplace(Workplace: WorkPlaceUpdateInput): WorkPlaces | Promise<WorkPlaces>;

    abstract removeWorkplace(id: string): ResponseTemplate | Promise<ResponseTemplate>;

    abstract addProfessionalDetail(professional: ProfessionalInput): Professional | Promise<Professional>;

    abstract addSpecialityType(createSpecialityInput: CreateSpecialityInput): Speciality | Promise<Speciality>;

    abstract removeSpecialityType(id: string): Speciality | Promise<Speciality>;
}

export type URL = any;
export type PhoneNumber = any;
export type EmailAddress = any;
export type PasswordType = any;
