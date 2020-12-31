/* eslint-disable class-methods-use-this */
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DynamoService } from '../../dynamo/dynamo.service';
import { ValidationError } from '../../common/Validation.error';
import { RegisterUser } from '../types/index';
import { ResponseTemplate } from '../../common/Response.template';

const USER_TABLENAME = process.env.USER_TABLENAME || 'prod_user';
@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly dynamoService: DynamoService){}

  /**
   * @param payload : UserData
   * @Description validate register new user function payload
   * @writtenBy HamzaJaved
   * @date 16/11/20
  */
  validateRegisterPayload(payload: RegisterUser): boolean {
    const { birthDate, name, lastName, picture, country, email, phone } = payload;
    let errorMessage = null;
    if (!birthDate || !name || !lastName || !picture || !country || !email || !phone) {
      errorMessage = `Invalid Payload, Fields missing: ${birthDate ? '' : 'birthDate,'}${name ? '' : 'name,'}${lastName ? '' : 'lastName,'}${picture ? '' : 'picture,'}${country ? '' : 'country,'}${email ? '' : 'email,'}${phone ? '' : 'phone,'}`;
      throw new ValidationError(errorMessage);
    }

    return true;
  };

  /**
     * @param payload : UserData
     * @Description register new user with system
     * @writtenBy HamzaJaved
     * @date 16/11/20
     */
  async registerUser(payload: RegisterUser): Promise<any> {
    // eslint-disable-next-line dot-notation
    console.log(this.request['apiGateway'].event);
    // eslint-disable-next-line dot-notation
    console.log(this.request['apiGateway'].context);

    // eslint-disable-next-line dot-notation
    const { event } = this.request['apiGateway'];
    console.log(event?.requestContext?.authorizer?.claims?.sub);

    this.validateRegisterPayload(payload);
    // eslint-disable-next-line no-param-reassign
    payload.userId = event.requestContext.authorizer.claims.sub;
    const user = this.createUserParams(payload);
    await this.dynamoService.putItem(USER_TABLENAME, user);
    return ResponseTemplate(true, false, 'Data save successfully!', 201, user);
  }

  /**
   * @param payload : UserData
   * @Description create item object for dynamo, this object goes to dynamoDB
   * @writtenBy HamzaJaved
   * @date 16/11/20
  */
  createUserParams = (payload: RegisterUser): any => {
    const { userId, birthDate, name, lastName, picture, country, email, phone } = payload;
    const timestamp = new Date().getTime();
    return {
      user_id: userId,
      attributeId: 'Details',
      birthDate,
      name,
      lastName,
      picture,
      country,
      email,
      phone,
      isPhoneVerified: false,
      isEmailVerified: false,
      submittedAt: timestamp,
      updatedAt: timestamp
    };
  };
}
