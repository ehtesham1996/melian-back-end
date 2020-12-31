import { Controller, Post, Body } from '@nestjs/common';
import { ValidationError } from '../common/Validation.error';
import { Response, ResponseTemplate } from '../common/Response.template';
import { AuthService } from './service/auth.service';
import { RegisterUser } from './types';

@Controller('auth')
export class AuthController {

  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  async register(@Body() registerRequest: RegisterUser): Promise<Response> {
    try {
      return await this.authService.registerUser(registerRequest);
    } catch (error) {
      if (error instanceof ValidationError) {
        return ResponseTemplate(false, true, error.message, 400, null);
      }
      return ResponseTemplate(false, true, 'Internal Server Error', 500, error.data);
    }
  }
}
